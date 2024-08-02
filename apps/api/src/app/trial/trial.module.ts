import { Module } from '@nestjs/common';
import { TrialService } from './trial.service';
import { TrialController } from './trial.controller';
import {PrismaService} from "../prisma.service";
import { TrialGroupController } from './trial-group.controller';
import { TrialGroupService } from './trial-group.service';
import {TrialResultController} from "./trialWithResults/trial-result.controller";
import {TrialResultService} from "./trialWithResults/trial-result.service";
import {TrialLockService} from "../trial-lock/trial-lock.service";

@Module({
  controllers: [TrialController, TrialGroupController, TrialResultController],
  providers: [TrialService, TrialGroupService, TrialResultService, TrialLockService, PrismaService]
})
export class TrialModule {}
