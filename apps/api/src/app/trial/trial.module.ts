import { Module } from '@nestjs/common';
import { TrialService } from './trial.service';
import { TrialController } from './trial.controller';
import {PrismaService} from "../prisma.service";
import { EventService } from "../event/event.service";

@Module({
  controllers: [TrialController],
  providers: [TrialService, PrismaService, EventService]
})
export class TrialModule {}
