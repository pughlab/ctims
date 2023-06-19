import {Controller, Get, Param} from "@nestjs/common";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {EventService} from "./event.service";

@Controller("events")
@ApiTags("Events")
export class EventController {
  constructor(private readonly eventService: EventService) {

  }

  @Get()
  @ApiOperation({summary: "Get all events"})
  async findAll() {
    //return { key1: "Hello"}
    return this.eventService.findAll()
  }
  @Get("userId/:userId")
  @ApiOperation({summary: "Find events by user id"})
  async findByUserId(@Param("userId") id: string) {
    //return {userid: id}
    return this.eventService.findByUserId(+id)
  }

  @Get("trialId/:trialId")
  @ApiOperation({summary: "Find events by trial id"})
  async findByTrialId(@Param("trialId") id: string) {
    return this.eventService.findByTrialId(+id)
  }
}
