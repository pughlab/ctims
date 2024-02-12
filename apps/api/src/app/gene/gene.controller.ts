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
  async searchGenes(@Query("query") query: string) {
    try {
      return await (await this.geneService.filterGeneSymbols(query)).slice(0,10);
    } catch (error) {
      console.error('Error fetching data:', error);

      throw error;
    };
  } 
}