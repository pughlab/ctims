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

  async removeDuplicates() {
    try {
      const genes = await this.prismaService.gene.findMany();

      // group records of genes by hugoSymbol
      const groupedRecords = genes.reduce((acc, record) => {
        acc[record.hugoSymbol] = (acc[record.hugoSymbol] || []).concat(record);
        return acc;
      }, []);

      // Iterate over grouped records and keep only the first record of each group
      for (const [key, records] of Object.entries(groupedRecords)) {
        if (records.length > 1) {
          // Keep the first record and delete the rest
          const recordsToDelete = records.slice(1);
          for (const recordToDelete of recordsToDelete) {
            await this.prismaService.gene.delete({
              where: { id: recordToDelete.id },
            });
          }
        }
      }

    } catch (error) {
      console.error('Error removing duplicates', error);
      throw error;
    }
  }
}
