import { Module } from '@nestjs/common';
import { CtmlJsonService } from './ctml-json.service';
import { CtmlJsonController } from './ctml-json.controller';
import {PrismaService} from "../prisma.service";

@Module({
  controllers: [CtmlJsonController],
  providers: [CtmlJsonService, PrismaService]
})
export class CtmlJsonModule {}
