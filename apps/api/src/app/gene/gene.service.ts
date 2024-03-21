import {Injectable, OnModuleInit} from '@nestjs/common';
import {PrismaService} from "../prisma.service";

@Injectable()
export class GeneService {
  constructor(private readonly prismaService: PrismaService) {}

  async fetchHugoSymbols() {
    try {
      const hugoJSON = await this.prismaService.gene.findMany();
      return hugoJSON.map((entry) => entry.hugoSymbol);
    } catch (error) {
      console.error('Error fetching', error);
      throw error;
    }
  }

  async filterGeneSymbols(query: string) {

    if (query === undefined || query === '') {
      return [];
    }

    try {
      const symbols = await this.fetchHugoSymbols();
      const filteredSymbols = symbols.filter((symbol) =>
        symbol.toLowerCase().startsWith(query?.toLowerCase())
      );
      return filteredSymbols;
    } catch (error) {
      console.error('Error filtering', error);
      throw error;
    }
  }
}
