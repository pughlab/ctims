import {Injectable, OnModuleDestroy, OnModuleInit} from "@nestjs/common";
import {EventService} from "../event/event.service";
import {ModuleRef} from "@nestjs/core";
import {PrismaService} from "../prisma.service";
import * as amqplib from 'amqplib';
import {TrialStatusEnum} from "../../../../../libs/types/src/trial-status.enum";
import {MatchRunStatusEnum} from "../../../../../libs/types/src/match-run-status.enum";
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
    const jsonMessage: IEventMessage = JSON.parse(message);
    const matchRunStatus: MatchRunStatusEnum = jsonMessage.run_status as MatchRunStatusEnum;
    const trialInternalIds: string[] = jsonMessage.trial_internal_ids;
    const failedTrialInternalIds: string[] = jsonMessage.failed_trial_internal_ids;

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
          equals: Number(jsonMessage.user_id)
        }
      }
    });
    
    if (matchRunStatus === MatchRunStatusEnum.SUCCESS) {
      const result = await this.prismaService.trial.updateMany({
        where: {
          trial_internal_id: {
            in: trialInternalIds
          },
          trial_status: TrialStatusEnum.PENDING
        },
        data: {
          trial_status: TrialStatusEnum.MATCHED
        }
      });

      // send out email notification to user
      const from: string = process.env.CTIMS_SUPPORT_EMAIL;
      const ctims_url: string = process.env.CTIMS_URL;
      const to: string = user.email;
      const subject: string = 'CTIMS: Trial matching is complete';
      const mailTemplate: string = 'Dear User, <br><br>' 
        + 'Your recently run trial(s) "'
        + trialIds.toString()
        + '" was successfully run through the CTIMS Matcher.<br><br>' 
        + 'To see results:<br>'
        + '<ol><li>Sign into <a href="' + ctims_url + '">CTIMS</a>.</li><li>Select trial group.</li><li>Click the Results tab.</li></ol>'
        + 'Regards,<br>'
        + 'CTIMS team';

      await sendMail(from, to, subject, mailTemplate);
    }
    else if (matchRunStatus === MatchRunStatusEnum.FAIL) {
      const result = await this.prismaService.trial.updateMany({
        where: {
          trial_internal_id: {
            in: trialInternalIds
          },
          trial_status: TrialStatusEnum.PENDING
        },
        data: {
          trial_status: TrialStatusEnum.ERROR
        }
      });

      // send out email notification to user
      const from: string = process.env.CTIMS_SUPPORT_EMAIL;
      const ctims_url: string = process.env.CTIMS_URL;
      const to: string = user.email;
      const subject: string = 'CTIMS: An error during trial matching';
      const mailTemplate: string = 'Dear User, <br><br>' 
        + 'An error occurred when sending your trial(s) "'
        + trialIds.toString()
        + '" to the CTIMS Matcher. Please contact your support team to troubleshoot and then try again.<br><br>'
        + 'To try again:<br>'
        + '<ol><li>Sign into <a href="' + ctims_url + '">CTIMS</a>.</li><li>Select trial group.</li><li>Click the "Send CTML(s) to Matcher" button.</li><li>Select trial(s).</li><li>Click "Send".</li></ol>'
        + 'Regards,<br>'
        + 'CTIMS team';

      await sendMail(from, to, subject, mailTemplate);
    }
    else if (matchRunStatus === MatchRunStatusEnum.PARTIAL_SUCCESS) {
      const result = await this.prismaService.trial.updateMany({
        where: {
          trial_internal_id: {
            in: trialInternalIds
          },
          trial_status: TrialStatusEnum.PENDING
        },
        data: {
          trial_status: TrialStatusEnum.MATCHED
        }
      });
      const result2 = await this.prismaService.trial.updateMany({
        where: {
          trial_internal_id: {
            in: failedTrialInternalIds
          },
          trial_status: TrialStatusEnum.MATCHED
        },
        data: {
          trial_status: TrialStatusEnum.ERROR
        }
      });

      // send out email notification to user
      const from: string = process.env.CTIMS_SUPPORT_EMAIL;
      const ctims_url: string = process.env.CTIMS_URL;
      const to: string = user.email;
      const subject: string = 'CTIMS: An error during trial matching';
      const mailTemplate: string = 'Dear User, <br><br>' 
        + 'An error occurred when sending your trial(s) "'
        + trialIds.toString()
        + '" to the CTIMS Matcher. Some trial match was successful while others were not. Please contact your support team to troubleshoot and then try again.<br><br>'
        + 'To try again:<br>'
        + '<ol><li>Sign into <a href="' + ctims_url + '">CTIMS</a>.</li><li>Select trial group.</li><li>Click the "Send CTML(s) to Matcher" button.</li><li>Select trial(s).</li><li>Click "Send".</li></ol>'
        + 'Regards,<br>'
        + 'CTIMS team';

      await sendMail(from, to, subject, mailTemplate);

    }
  }
}

