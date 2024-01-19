import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { GeneService } from './gene.service';
import {ModuleRef} from "@nestjs/core";

@Controller('genes')
export class GeneController {
  constructor(private readonly geneService: GeneService) {}

    @Get()
  async getHugoGenes(@Query("query") query: string) {
    try {
      return await this.geneService.filterGeneSymbols(query);
    } catch (error) {
      console.error('Error fetching data:', error);

  throw error;
    };
  } 
}