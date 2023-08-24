import {
  Controller,
  Get,
  Query,
  Res,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotImplementedException,
  HttpStatus,
  UseGuards, OnModuleInit
} from '@nestjs/common';
import { GeneService } from './gene.service';
import {ModuleRef} from "@nestjs/core";


@Controller('genes')
export class GeneController {
  constructor(private readonly geneService: GeneService) {}

  @Get()
  async getHugoGenes(@Query('query') query: string, @Res() res) {
    try {
      const symbols = await this.geneService.fetchGeneSymbols();
      const filteredSymbols = this.geneService.filterGeneSymbols(symbols, query);
      const topSymbols = this.geneService.getTopGeneSymbols(filteredSymbols);

      return topSymbols;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}