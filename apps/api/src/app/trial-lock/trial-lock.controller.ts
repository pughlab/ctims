import {Body, Controller, Get, OnModuleInit, Param, Post, Query, UseGuards} from "@nestjs/common";
import {ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {EventService} from "../event/event.service";
import {ModuleRef} from "@nestjs/core";
import {TrialLockService} from "./trial-lock.service";
import {KeycloakPasswordGuard} from "../auth/KeycloakPasswordGuard";
import {CurrentUser} from "../auth/CurrentUser";
import {CreateTrialDto} from "../trial/dto/create-trial.dto";
import {event_type, trial, user} from "@prisma/client";

@Controller('trial-lock')
@ApiTags("Trial-lock")
export class TrialLockController implements OnModuleInit {
  private eventService: EventService;

  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly trialLockService: TrialLockService
  ) {
  }

  onModuleInit(): any {
    this.eventService = this.moduleRef.get(EventService, {strict: false});
  }

  @Get(':id')
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({summary: "Get trial-lock by trial id that is not locked by the user"})
  @ApiNoContentResponse({description: "Trial-lock not found."})
  async get(
    @CurrentUser() user: user,
    @Param('id') trialId: number
  ) {
    return this.trialLockService.getLockByOthers(+trialId, user);
  }

  // Post to release all locks by the user
  @Post('release-user-locks')
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({summary: "Release all locks by the user"})
  @ApiCreatedResponse({description: "All locks belonging to the user are released."})
  async releaseUserLocks(
    @CurrentUser() user: user
  ) {
    await this.trialLockService.releaseUserLocks(user);
  }

  @Post(':id')
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({summary: "Create a new trial-lock"})
  @ApiCreatedResponse({description: "New trial-lock created."})
  async create(
    @CurrentUser() user: user,
    @Body() trialId: number
  ) {
    await this.trialLockService.create(trialId, user);
  }

  @Post(':id/unlock')
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({summary: "Unlock a trial"})
  @ApiCreatedResponse({description: "Trial unlocked."})
  async unlock(
    @CurrentUser() user: user,
    @Body() trialId: number
  ) {
    await this.trialLockService.unlock(trialId, user);
  }

}

