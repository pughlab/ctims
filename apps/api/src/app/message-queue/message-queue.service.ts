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
  }

  onModuleDestroy(): any {
    if (this.conn) {
      this.conn.close();
    }
  }

  async initRabbitMQ() {
    try {
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
    catch (e) {
      console.log(e);
    }
  }

  onMessageReceived = async (msg) => {
    const message = msg.content.toString();
    const json_message: IEventMessage = JSON.parse(message);
    
    const trialInternalIds: string[] = json_message.trial_internal_ids;

    // get all trial ids (NCT-ID)
    const trials = await this.prismaService.trial.findMany({
      where: {
        trial_internal_id: {
          in: trialInternalIds
        }
      }
    })
    const trialIds = trials.map((t) => t.nct_id);

    // get the user who run the match
    const user = await this.prismaService.user.findFirst({
      where: {
        id: {
          equals: Number(json_message.user_id)
        }
      }
    });
    
    if (json_message.run_status === 'success') {
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

      // send out email notification to user
      const from: string = process.env.CTIMS_SUPPORT_EMAIL;
      const ctims_url: string = process.env.CTIMS_URL;
      const to: string = user.email;
      const subject: string = 'CTIMS: Your trial(s) was successfully run';
      const mailTemplate: string = 'Dear User, <br><br>' 
        + 'Your recently run trial(s) "'
        + trialIds.toString()
        + '" was successfully run through the CTIMS Matcher.<br><br>' 
        + 'To see results:<br>'
        + '<ol><li>Sign into <a href="' + ctims_url + '">CTIMS</a>.</li><li>Select trial group.</li><li>Click the Results tab.</li></ol>'
        + 'Please note results may take up to 10 minutes to be displayed.<br><br>'
        + 'Regards,<br>'
        + 'CTIMS team';

      await sendMail(from, to, subject, mailTemplate);
    }
    else {
      const result = await this.prismaService.trial.updateMany({
        where: {
          trial_internal_id: {
            in: trialInternalIds
          },
          trial_status: TrialStatusEnum.PENDING,
        },
        data: {
          trial_status: TrialStatusEnum.ERROR
        }
      });

      // send out email notification to user
      const from: string = process.env.CTIMS_SUPPORT_EMAIL;
      const to: string = user.email;
      const subject: string = 'CTIMS: Your trial(s) was unsuccessful';
      const mailTemplate: string = 'Dear User, <br><br>' 
        + 'Your recently run trial(s) "'
        + trialIds.toString()
        + '" was unsuccessful. Please try again.<br><br>'
        + 'If you have any questions please contact your support team.<br><br>'
        + 'Regards,<br>'
        + 'PMCDI team';

      await sendMail(from, to, subject, mailTemplate);
    }
  }
}

