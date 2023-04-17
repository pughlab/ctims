import { Module } from '@nestjs/common';
import { CtmlJsonService } from './ctml-json.service';
import { CtmlJsonController } from './ctml-json.controller';

@Module({
  controllers: [CtmlJsonController],
  providers: [CtmlJsonService]
})
export class CtmlJsonModule {}
