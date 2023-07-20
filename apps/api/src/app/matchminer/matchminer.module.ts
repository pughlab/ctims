import { Module } from '@nestjs/common';
import { MatchminerService } from './matchminer.service';
import { MatchminerController } from './matchminer.controller';

@Module({
  controllers: [MatchminerController],
  providers: [MatchminerService],
})
export class MatchminerModule {}
