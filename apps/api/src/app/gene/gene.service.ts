import {Injectable, OnModuleInit} from '@nestjs/common';

@Injectable()
export class GeneService {
  async fetchGeneSymbols() {
    try {
      const response = await fetch(
        "https://ftp.ebi.ac.uk/pub/databases/genenames/hgnc/json/hgnc_complete_set.json"
      );
      if (!response.ok) {
        console.error("Client error:", response.status);
        throw new Error(`Client error: ${response.status}`);
      }
      const data = await response.json();
      const symbols = data.response.docs.map((x) => x.symbol);
      return symbols;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Server error:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
      throw error;
    }
  }

  filterGeneSymbols(symbols, query) {
    if (!query) {
      return symbols;
    }
    return symbols.filter((symbol) =>
      symbol.toLowerCase().includes(query.toLowerCase())
    );
  }

  getTopGeneSymbols(symbols, limit = 10) {
    return symbols.slice(0, limit);
  }
}