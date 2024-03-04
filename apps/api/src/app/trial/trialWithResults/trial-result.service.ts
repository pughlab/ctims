import {Injectable, OnModuleInit} from "@nestjs/common";
import {EventService} from "../../event/event.service";
import {PrismaService} from "../../prisma.service";
import {ModuleRef} from "@nestjs/core";
import {trialWithResults, trialWithResultsMiner} from "./trialWithResults";
import axios from "axios";
import {event_type, trial, user} from "@prisma/client";
import {getCtmlStatusLabel} from "../../../../../../libs/types/src/CtmlStatusLabels";
import {CtmlStatusEnum} from "../../../../../../libs/types/src/ctml-status.enum";
import {TrialStatusEnum} from "../../../../../../libs/types/src/trial-status.enum";
import {CtmlJsonService} from "../../ctml-json/ctml-json.service";
import {headers} from "next/headers";
import * as process from "process";

@Injectable()
export class TrialResultService implements OnModuleInit {

  private eventService: EventService;
  private ctmlJsonService: CtmlJsonService;

  private MM_API_TOKEN = process.env.MM_API_TOKEN;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly moduleRef: ModuleRef
  ) {
  }

  onModuleInit(): any {
    this.eventService = this.moduleRef.get(EventService, {strict: false});
    this.ctmlJsonService = this.moduleRef.get(CtmlJsonService, {strict: false});
  }

  async findAllWithResults(): Promise<trialWithResults[]> {
    const trials = await this.prismaService.trial.findMany({
      where: {
        OR: [
          {trial_status: TrialStatusEnum.PENDING},
          {trial_status: TrialStatusEnum.MATCHED}
        ]
      }
    });

    let trialResults: trialWithResults[] = [];
    let matchResults: any;
    if (trials.length > 0) {
      try {
        const url = `${process.env.MM_API_URL}/ctims_trial_summary`;
        matchResults = await axios.request(
          {
            method: 'get',
            url: url,
            headers: {
              'Authorization': `Bearer ${this.MM_API_TOKEN}`
            }
          },
        );
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }

      trialResults = await this.convertMatchResultsToTrialWithResults(trials, matchResults.data.values);
    }
    return trialResults;
  }

  async findResultsForProtocolNumbers(protocol_nos: string): Promise<trialWithResults[]> {
    // protocol_nos is a comma separated list of protocol numbers
    // find trials with protocol_no matching the protocol_nos, and with trial_status of PENDING or MATCHED
    const trials = await this.prismaService.trial.findMany({
      where: {
        protocol_no: {in: protocol_nos.split(',')},
        trial_status: {in: [TrialStatusEnum.PENDING, TrialStatusEnum.MATCHED]}
      }
    });

    let trialResults: trialWithResults[] = [];
    let matchResults: any;
    const protocol_no_array = protocol_nos.split(",")
    if (trials.length > 0) {
      try {
        const url = `${process.env.MM_API_URL}/ctims_trial_summary`;
        matchResults = await axios.request(
          {
            method: 'get',
            url: url,
            headers: {
              'Authorization': `Bearer ${this.MM_API_TOKEN}`
            },
            data: {
              protocol_no_list: protocol_no_array
            }
          },
        );
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
      trialResults = await this.convertMatchResultsToTrialWithResults(trials, matchResults);
    }
    return trialResults;
  }

  async convertMatchResultsToTrialWithResults(trials: trial[], matchResults: any): Promise<trialWithResults[]> {
    let trialResults: trialWithResults[] = [];
    for (let trial of trials) {
      const mm_info = await this.findMatchMinerInfo(trial.protocol_no, matchResults.data.values);
      // find short title from ctml_json data from trial info
      const ctmlJsonArray = await this.ctmlJsonService.findByTrialId(trial.id);
      const ctmlJson = ctmlJsonArray[0];
      const ctmlData = ctmlJson.data

      const result: trialWithResults = {
        trialId: trial.id,
        nct_id: trial.nct_id,
        nickname: trial.nickname,
        principal_investigator: trial.principal_investigator,
        status: CtmlStatusEnum[trial.status],
        createdAt: trial.createdAt,
        updatedAt: trial.updatedAt,
        protocol_no: trial.protocol_no,
        trialRetCount: mm_info.count,
        matchedDate: mm_info.updated,
        trialStatus: TrialStatusEnum[trial.trial_status],
        short_title: ctmlData['short_title'],
      }
      trialResults.push(result);
    }
    return trialResults;
  }

  findMatchMinerInfo = async (protocol_no: string, matchResults: trialWithResultsMiner[]) => {
    for (let matchResult of matchResults) {
      if (matchResult.protocol_no === protocol_no) {
        return {'updated': matchResult._updated, 'count': matchResult.count};
      }
    }
    return {'updated': null, 'count': 0};
  }

  async downloadTrialResult(id: number, user: user) {
    try {
      const trial = await this.prismaService.trial.findUnique(
        {
          where: {id: id},
        }
      );
      console.log('trial: ', trial);
      const protocol_no = trial.protocol_no;
      const url = `${process.env.MM_API_URL}/ctims_trial_match?where={"protocol_no":"${protocol_no}", "is_disabled": false}`
      const matchResults = await axios.request(
        {
          method: 'get',
          url: url,
          headers: {
            'Authorization': `Bearer ${this.MM_API_TOKEN}`
          }
        }
      );

      // Add event
      this.eventService.createEvent({
        type: event_type.ResultDownloaded,
        user,
        trial,
        metadata: {
          input: { id }
        }
      });

      return matchResults.data._items;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
