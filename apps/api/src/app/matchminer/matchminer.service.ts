import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventService } from '../event/event.service';
import { ModuleRef } from '@nestjs/core';
import { PrismaService } from '../prisma.service';
import { TrialStatusEnum } from 'libs/types/src/trial-status.enum';
import axios from "axios";
import {event_type, trial, user} from "@prisma/client";
import { CtmlStatusEnum } from 'libs/types/src/ctml-status.enum';
const amqplib = require('amqplib');

@Injectable()
export class MatchminerService implements OnModuleInit {

    private eventService: EventService;

    private MM_API_TOKEN = process.env.MM_API_TOKEN;

    private queue = 'run_match';
    private conn = null;
    private chReceive = null;
    private chSend = null;

    constructor(
      private readonly prismaService: PrismaService,
      private readonly moduleRef: ModuleRef
    ) { }
  
    onModuleInit(): any {
      this.eventService = this.moduleRef.get(EventService, { strict: false });
      this.initRabbitMQ();
    }

    async initRabbitMQ() {
      this.conn = await amqplib.connect('amqp://localhost');
    
      this.chReceive = await this.conn.createChannel();
      await this.chReceive.assertQueue(this.queue);

      this.chSend = await this.conn.createChannel();
    
      // Listener
      // ch1.consume(queue, (msg) => {
      //   if (msg !== null) {
      //     console.log('Received:', msg.content.toString());
      //     ch1.ack(msg);
      //   } else {
      //     console.log('Consumer cancelled by server');
      //   }
      // });
    }

    async createTrialMatchJobs(user: user, trialInternalIds: any) {
      await this.chSend.sendToQueue(this.queue, Buffer.from(trialInternalIds.toString()));
    }

    async getTrialMatchResults(user: user) {
        try {
          const trials = await this.prismaService.trial.findMany({
            where: {status: CtmlStatusEnum.COMPLETED, trial_status: TrialStatusEnum.MATCHED}
          });
          if (trials != null && trials.length > 0) {
            const trial_internal_ids = [];
            for (const trial of trials) {
              trial_internal_ids.push(trial.trial_internal_id);
            }
            const trial_internal_id_list_str = '[' + trial_internal_ids.map(s => `"${s}"`).join(',') + ']';
            const url = `${process.env.MM_API_URL}/prioritizer_trial_match?where={"trial_internal_id":{"$in": ${trial_internal_id_list_str}},"is_disabled":false}`
            const matchResults = await axios.request(
              {
                method: 'get',
                url: url,
                headers: {
                  'Authorization': `Bearer ${this.MM_API_TOKEN}`
                }
              }
            );
      
            return matchResults.data._items;
          } else {
            return;
          }
        } catch (error) {
          console.log(error);
          throw new Error(error);
        }
      }

}
