import { Module } from '@nestjs/common';
import { TrialService } from './trial.service';
import { TrialController } from './trial.controller';
import {PrismaService} from "../prisma.service";
import { CtmlSchemaService } from "../schema-ctml/ctml-schema.service";

@Module({
  controllers: [TrialController],
  providers: [TrialService, PrismaService, CtmlSchemaService]
})
export class TrialModule {}
