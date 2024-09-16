import {Injectable, OnModuleDestroy, OnModuleInit} from "@nestjs/common";
import {EventService} from "../event/event.service";
import {ModuleRef} from "@nestjs/core";
import {PrismaService} from "../prisma.service";
import * as amqplib from 'amqplib';
import {TrialStatusEnum} from "../../../../../libs/types/src/trial-status.enum";
import { sendMail } from "../utils/mail.service";
import { IEventMessage } from "./message.interface";

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
    const json_message: IEventMessage = JSON.parse(message);

    if (json_message.run_status === 'success') {
      const trialInternalIds: string[] = json_message.trial_internal_ids;

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

      // send out email notification to user who run the match
      const user = await this.prismaService.user.findFirst({
        where: {
          id: {
            equals: Number(json_message.user_id)
          }
        }
      });

      const from: string = 'ctims@uhn.ca';
      const to: string = user.email;
      const subject: string = 'Trial match run successfully';
      const mailTemplate: string = 'Dear User, <br><br>' + json_message.run_message + '<br><br>Yours PMCDI team';
      
      await sendMail(from, to, subject, mailTemplate);
    }
    else {
      // send out email notification to user who run the match
      const user = await this.prismaService.user.findFirst({
        where: {
          id: {
            equals: Number(json_message.user_id)
          }
        }
      });

      const from: string = 'ctims@uhn.ca';
      const to: string = user.email;
      const subject: string = 'Error running trial match';
      const mailTemplate: string = 'Dear User, <br><br>' + json_message.run_message + '<br><br>Yours PMCDI team';
      
      await sendMail(from, to, subject, mailTemplate);
    }
  }
}

