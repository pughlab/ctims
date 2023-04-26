import { Module } from '@nestjs/common';
import { TrialService } from './trial.service';
import { TrialController } from './trial.controller';
import {PrismaService} from "../prisma.service";

@Module({
  controllers: [TrialController],
  providers: [TrialService, PrismaService]
})
export class TrialModule {}
