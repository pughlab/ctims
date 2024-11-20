import { Module } from '@nestjs/common';
import { GeneService } from './gene.service';
import { GeneController } from './gene.controller';

@Module({
  controllers: [GeneController],
  providers: [GeneService]
})
export class GeneModule {}