import {Injectable, OnModuleDestroy, OnModuleInit} from "@nestjs/common";
import {EventService} from "../event/event.service";
import {ModuleRef} from "@nestjs/core";
import {PrismaService} from "../prisma.service";
import * as amqplib from 'amqplib';
import {TrialStatusEnum} from "../../../../../libs/types/src/trial-status.enum";

@Injectable()
export class MessageQueueService implements OnModuleInit, OnModuleDestroy {

  private eventService: EventService;

  private queue = process.env.MATCHMINER_RECEIVE_QUEUE || 'match_message';
  private rabbitmqUrl = process.env.RABBITMQ_URL || 'localhost';
  private rabbitmqPort = process.env.RABBITMQ_PORT || '5672';

  private conn = null;
  private chReceive = null;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly moduleRef: ModuleRef
  ) { }

  onModuleInit(): any {
    this.eventService = this.moduleRef.get(EventService, { strict: false });
    this.initRabbitMQ();
  }

  onModuleDestroy(): any {
    if (this.conn) {
      this.conn.close();
    }
  }

  async initRabbitMQ() {
    this.conn = await amqplib.connect(`amqp://${this.rabbitmqUrl}:${this.rabbitmqPort}`);

    this.chReceive = await this.conn.createChannel();
    await this.chReceive.assertQueue(this.queue);

    this.chReceive.consume(this.queue, (msg) => {
      if (msg !== null) {
        this.onMessageReceived(msg);
        this.chReceive.ack(msg);
      }
    });
  }

  onMessageReceived = async (msg) => {
    const message = msg.content.toString();
    const SUCCESS_MSG = 'Successfully ran job for trial internal ids';
    if (message.startsWith(SUCCESS_MSG)) {
      // grab the stuff inside square brackets
      const matched = message.match(/\[(.*?)\]/); // Match anything between square brackets

      if (matched) {
        const trialInternalIds: string[] = JSON.parse(matched[0].replace(/'/g, '"'));

        console.log('Trial internal ids:', trialInternalIds)

        const result = await this.prismaService.trial.updateMany({
          where: {
            trial_internal_id: {
              in: trialInternalIds
            },
            trial_status: TrialStatusEnum.PENDING,
          },
          data: {
            trial_status: TrialStatusEnum.MATCHED
          }
        });
      }
    }
  }
}
