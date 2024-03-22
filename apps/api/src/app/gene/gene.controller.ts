import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { GeneService } from './gene.service';

@Controller('genes')
export class GeneController {
  constructor(private readonly geneService: GeneService) {}

  @Get()
  async searchGenes(@Query("query") query: string) {
    try {
      return (await this.geneService.filterGeneSymbols(query)).slice(0,10);
    } catch (error) {
      console.error('Error fetching data:', error);

      throw error;
    };
  }

  @Get('/removeDuplicates')
  async removeDuplicates() {
    try {
      return await this.geneService.removeDuplicates();
    } catch (error) {
      console.error('Error removing data:', error);

      throw error;
    };
  }
}
