import { Controller, Get, OnModuleInit, Param } from '@nestjs/common';
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

  @Get(':groupId')
  async getTrialsForUsersInGroup(@Param('groupId') groupId: string): Promise<any> {
    return this.trialGroupService.getTrialsForUsersInGroup(groupId);
  }
}
