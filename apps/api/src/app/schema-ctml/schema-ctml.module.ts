import { Module } from '@nestjs/common';
import { SchemaCtmlService } from './schema-ctml.service';
import { SchemaCtmlController } from './schema-ctml.controller';

@Module({
  controllers: [SchemaCtmlController],
  providers: [SchemaCtmlService]
})
export class SchemaCtmlModule {}
