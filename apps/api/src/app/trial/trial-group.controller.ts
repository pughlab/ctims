import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TrialGroupService } from './trial-group.service';

@Controller('trial-group')
@ApiTags('Trial Group')
export class TrialGroupController implements OnModuleInit {

  constructor(private readonly trialGroupService: TrialGroupService) {
  }

  onModuleInit(): any {
  }

  @Get()
  async getTrialGroups(): Promise<any> {
    return this.trialGroupService.getTrialGroups();
  }
}
