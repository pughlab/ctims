import { Module } from '@nestjs/common';
import { SchemaCtmlService } from './schema-ctml.service';
import { SchemaCtmlController } from './schema-ctml.controller';
import {PrismaService} from "../prisma.service";

@Module({
  controllers: [SchemaCtmlController],
  providers: [SchemaCtmlService, PrismaService]
})
export class SchemaCtmlModule {}
