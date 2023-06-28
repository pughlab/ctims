import {Injectable, OnModuleInit} from "@nestjs/common";
import {EventService} from "../../event/event.service";
import {PrismaService} from "../../prisma.service";
import {ModuleRef} from "@nestjs/core";
import {trialWithResults} from "./trialWithResults";
import axios from "axios";
import {event_type, user} from "@prisma/client";

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
    if (trials.length > 0) {
      // try {
      //   const url = `${process.env.REACT_APP_MM_API_URL}` + '/trial_match';
      //   const matchResults = await axios.request(
      //     {
      //       method: 'get',
      //       url: url,
      //     }
      //   );
      //   console.log(matchResults.data._items);
      // } catch (error) {
      //   console.log(error);
      //   throw new Error(error);
      // }

      for (let trial of trials) {
        const result: trialWithResults = {
          trialId: trial.id,
          nct_id: trial.nct_id,
          nickname: trial.nickname,
          principal_investigator: trial.principal_investigator,
          status: trial.status,
          createdAt: trial.createdAt,
          updatedAt: trial.updatedAt,
          trialRetCount: Math.floor(Math.random() * 1000),
          matchedDate: new Date()
        }
        trialResults.push(result);
      }
    }
    return trialResults;
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
      const url = `${process.env.REACT_APP_MM_API_URL}` + '/ctims_trial_match?where={"protocol_no":"' + protocol_no + '"}';
      //http://localhost:5000/api/ctims_trial_match?where={%22protocol_no%22:%22PM1%22}
      const matchResults = await axios.request(
        {
          method: 'get',
          url: url,
        }
      );
      console.log(matchResults.data._items);

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
