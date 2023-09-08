import {
  Controller,
  Get,
} from '@nestjs/common';
import { GeneService } from './gene.service';
import {ModuleRef} from "@nestjs/core";


@Controller('genes')
export class GeneController {
  constructor(private readonly geneService: GeneService) {}

    @Get()
  async getHugoGenes() {
    try {
      return await this.geneService.fetchGeneSymbols();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
