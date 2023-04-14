import { Module } from '@nestjs/common';
import { CtmlJsonController } from './ctml-json.controller';
import { CtmlJsonService } from './ctml-json.service';

@Module({
  controllers: [CtmlJsonController],
  providers: [CtmlJsonService]
})
export class CtmlJsonModule {}
