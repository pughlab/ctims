import {Injectable, OnModuleInit} from '@nestjs/common';
import {PrismaService} from "../prisma.service";

@Injectable()
export class GeneService {
  constructor(private prismaService: PrismaService) {}

  async fetchGeneSymbols() {
    try {
      const hugoJSON = await this.prismaService.hugo.findMany();
      const symbols = hugoJSON.map((entry) => entry.gene);
      return symbols;
    } catch (error) {
      console.error('Error fetching', error);
      throw error;
    }
  }

  async filterGeneSymbols(query: string) {
    try {
      const symbols = await this.fetchGeneSymbols();
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