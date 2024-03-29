import {
  Body,
  Controller,
  Get,
  NotFoundException,
  OnModuleInit,
  Param, Post,
  UseGuards
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiFoundResponse, ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags
} from "@nestjs/swagger";
import { event_type, trial, user } from "@prisma/client";
import {KeycloakPasswordGuard} from "../../auth/KeycloakPasswordGuard";
import {CurrentUser} from "../../auth/CurrentUser";
import { EventService } from "../../event/event.service";
import { ModuleRef } from "@nestjs/core";
import {TrialResultService} from "./trial-result.service";

@Controller('trial-result')
@ApiTags("Trial Result")
export class TrialResultController implements OnModuleInit{

  private eventService: EventService;

  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly trialResultService: TrialResultService
  ) { }

  onModuleInit(): any {
    this.eventService = this.moduleRef.get(EventService, { strict: false });
  }

  @Get()
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Get all trials and results" })
  @ApiOkResponse({ description: "List of trials and results found." })
  async findAllWithResults(@CurrentUser() user: user) {
    this.eventService.createEvent({
      type: event_type.TrialReadMany,
      description: "Trials with results read via Get to /trials",
      user
    });

    const trials = await this.trialResultService.findAllWithResults();
    return trials;
  }

  @Post(':id/export')
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Called when trial result has been downloaded on the front end." })
  @ApiNoContentResponse()
  async resultExported(
    @CurrentUser() user: user,
    @Param('id') id: string
  ) {
    return this.trialResultService.downloadTrialResult(+id, user);
  }
}
