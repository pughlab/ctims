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
      }
      const data = await response.json();
      const symbols = data.response.docs.map((x) => x.symbol);
      return symbols;
    } catch (error) {
      if (error instanceof Error) {
        console.error("Server error:", error.message);
      } else {
        console.error("Unknown error:", error.message);
      }
      throw error;
    }
  }
}