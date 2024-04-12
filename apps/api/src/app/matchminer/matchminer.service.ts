import { Injectable, OnModuleInit } from '@nestjs/common';
import { EventService } from '../event/event.service';
import { ModuleRef } from '@nestjs/core';
import { PrismaService } from '../prisma.service';
import { TrialStatusEnum } from 'libs/types/src/trial-status.enum';
import axios from "axios";
import {event_type, trial, user} from "@prisma/client";

@Injectable()
export class MatchminerService implements OnModuleInit {

    private eventService: EventService;

    private MM_API_TOKEN = process.env.MM_API_TOKEN;

    constructor(
      private readonly prismaService: PrismaService,
      private readonly moduleRef: ModuleRef
    ) { }
  
    onModuleInit(): any {
      this.eventService = this.moduleRef.get(EventService, { strict: false });
    }

    async getTrialMatchResults(user: user) {
        try {
          const trials = await this.prismaService.trial.findMany({
            where: {trial_status: TrialStatusEnum.PENDING}
          });

          const trial_internal_id = trials[0].trial_internal_id;
          const url = `${process.env.MM_API_URL}/prioritizer_trial_match?where={"trial_internal_id":"${trial_internal_id}"}`
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
        } catch (error) {
          console.log(error);
          throw new Error(error);
        }
      }

}
