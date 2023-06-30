import {Injectable, OnModuleInit} from "@nestjs/common";
import {EventService} from "../../event/event.service";
import {PrismaService} from "../../prisma.service";
import {ModuleRef} from "@nestjs/core";
import {trialWithResults, trialWithResultsMiner} from "./trialWithResults";
import axios from "axios";
import {event_type, user} from "@prisma/client";
import {getCtmlStatusLabel} from "../../../../../../libs/types/src/CtmlStatusLabels";
import {CtmlStatusEnum} from "../../../../../../libs/types/src/ctml-status.enum";

@Injectable()
export class TrialResultService implements OnModuleInit {

  private eventService: EventService;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly moduleRef: ModuleRef
  ) {
  }

  onModuleInit(): any {
    this.eventService = this.moduleRef.get(EventService, {strict: false});
  }

  async findAllWithResults(): Promise<trialWithResults[]> {
    const trials = await this.prismaService.trial.findMany();
    let trialResults: trialWithResults[] = [];
    let matchResults: any;
    if (trials.length > 0) {
      try {
        const url = `${process.env.MM_API_URL}/ctims_trial_summary`;
        matchResults = await axios.request(
          {
            method: 'get',
            url: url,
          }
        );
        console.log(matchResults.data.values);
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }

      for (let trial of trials) {
        const mm_info = await this.findMatchMinerInfo(trial.nct_id, matchResults.data.values);
        const myStatus = trial.status;
        const ctml_status_label = getCtmlStatusLabel(CtmlStatusEnum[myStatus]);
        const result: trialWithResults = {
          trialId: trial.id,
          nct_id: trial.nct_id,
          nickname: trial.nickname,
          principal_investigator: trial.principal_investigator,
          status: CtmlStatusEnum[ctml_status_label],
          createdAt: trial.createdAt,
          updatedAt: trial.updatedAt,
          trialRetCount: mm_info.count,
          matchedDate: mm_info.updated
        }
        trialResults.push(result);
      }
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
      const protocol_no = trial.nct_id;
      const url = `${process.env.MM_API_URL}/ctims_trial_match?where={"protocol_no":"${protocol_no}"}`;
      const matchResults = await axios.request(
        {
          method: 'get',
          url: url,
        }
      );

      await this.prismaService.event.create({
        data: {
          type: event_type.ResultDownloaded,
          trial: {connect: {id}},
          user: {connect: {id: user.id}}
        }
      });

      return matchResults.data._items;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
