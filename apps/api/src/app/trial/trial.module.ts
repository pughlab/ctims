import { Module } from '@nestjs/common';
import { TrialService } from './trial.service';
import { TrialController } from './trial.controller';

@Module({
  controllers: [TrialController],
  providers: [TrialService]
})
export class TrialModule {}
