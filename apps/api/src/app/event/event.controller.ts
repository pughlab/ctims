import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import {EventService} from "./event.service";
import { KeycloakPasswordGuard } from '../auth/KeycloakPasswordGuard';

@Controller("events")
@ApiTags("Events")
export class EventController {
  constructor(private readonly eventService: EventService) {

  }

  @Get()
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({summary: "Get all events"})
  async findAll() {
    //return { key1: "Hello"}
    return this.eventService.findAll()
  }
  @Get("userId/:userId")
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({summary: "Find events by user id"})
  async findByUserId(@Param("userId") id: string) {
    //return {userid: id}
    return this.eventService.findByUserId(+id)
  }

  @Get("trialId/:trialId")
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({summary: "Find events by trial id"})
  async findByTrialId(@Param("trialId") id: string) {
    return this.eventService.findByTrialId(+id)
  }
}
