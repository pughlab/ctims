import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import { AgentService } from './agent.service';

@Controller('agents')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Get("/agentdrug")
  async searchAgents(@Query("query") query: string) {
    try {
      return (await this.agentService.filterAgent(query)).slice(0,10);
    } catch (error) {
      console.error('Error fetching data:', error);

      throw error;
    };
  }


  @Get("/agentclass")
  async searchAgentsClass(@Query("query") query: string) {
    try {
      return (await this.agentService.filterAgentClass(query)).slice(0,10);
    } catch (error) {
      console.error('Error fetching data:', error);

      throw error;
    };
  }

}
