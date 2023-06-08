import { Module } from '@nestjs/common';
import { TrialService } from './trial.service';
import { TrialController } from './trial.controller';
import {PrismaService} from "../prisma.service";
import { TrialGroupController } from './trial-group.controller';
import { TrialGroupService } from './trial-group.service';

@Module({
  controllers: [TrialController, TrialGroupController],
  providers: [TrialService, TrialGroupService, PrismaService]
})
export class TrialModule {}
