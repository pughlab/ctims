import {Injectable, OnModuleInit} from '@nestjs/common';

@Injectable()
export class GeneService {
  async fetchGeneSymbols() {
    try {
      const response = await fetch(
        "https://ftp.ebi.ac.uk/pub/databases/genenames/hgnc/json/hgnc_complete_set.json"
      );
      const data = await response.json();
      const symbols = data.response.docs.map((x) => x.symbol);
      return symbols;
    } catch (error) {
      console.error("Error fetching data:", error);
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

// module.exports = new geneService();