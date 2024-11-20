import { Module } from '@nestjs/common';
import { CtmlSchemaService } from './ctml-schema.service';
import { CtmlSchemaController } from './ctml-schema.controller';
import {PrismaService} from "../prisma.service";

@Module({
  controllers: [CtmlSchemaController],
  providers: [CtmlSchemaService, PrismaService]
})
export class CtmlSchemaModule {}
