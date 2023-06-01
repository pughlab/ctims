import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  OnModuleInit,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import {TrialService} from './trial.service';
import {CreateTrialDto} from './dto/create-trial.dto';
import {UpdateTrialDto} from './dto/update-trial.dto';
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
import {KeycloakPasswordGuard} from "../auth/KeycloakPasswordGuard";
import {CurrentUser} from "../auth/CurrentUser";
import {UpdateTrialSchemasDto} from "./dto/update-trial-schemas.dto";
import { EventService } from "../event/event.service";
import { ModuleRef } from "@nestjs/core";

@Controller('trials')
@ApiTags("Trial")
export class TrialController implements OnModuleInit{

  private eventService: EventService;

  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly trialService: TrialService
    ) { }

  onModuleInit(): any {
    this.eventService = this.moduleRef.get(EventService, { strict: false });
  }

  @Post()
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Create a new trial" })
  @ApiCreatedResponse({ description: "New trial created." })
  async create(
    @CurrentUser() user: user,
    @Body() createTrialDto: CreateTrialDto
  ): Promise<trial> {
    const newTrial = await this.trialService.createTrial(createTrialDto, user);
    this.eventService.createEvent({
      type: event_type.TrialCreated,
      description: "Trial created via Post to /trials",
      user,
      trial: newTrial,
      metadata: {
        input: {
          createTrialDto: { ...createTrialDto }
        }
      }
    });
    return newTrial;
  }

  @Post(':id/export')
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Called when trial has been exported on the front end." })
  @ApiNoContentResponse()
  async trialExported(
    @CurrentUser() user: user,
    @Param('id') id: string
  ) {
    this.trialService.recordTrialExported(+id, user);
  }

  @Get()
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Get all trials" })
  @ApiOkResponse({ description: "List of trials found." })
  async findAll(@CurrentUser() user: user) {
    this.eventService.createEvent({
      type: event_type.TrialReadMany,
      description: "Trials read via Get to /trials",
      user
    });
    return this.trialService.findAll();
  }

  @Get(':id')
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Get a trial by ID" })
  @ApiParam({ name: "id", description: "ID of the trial." })
  @ApiFoundResponse({ description: "Object found." })
  @ApiNotFoundResponse({ description: "Trial with the requested ID could not be found." })
  async findOne(@CurrentUser() user: user, @Param('id') id: string) {

    const trial = await this.trialService.findOne(+id);

    // Add event
    this.eventService.createEvent({
      type: event_type.TrialRead,
      description: "Trial read via Get to /trials/:id",
      user,
      trial,
      metadata: {
        input: { id }
      }
    });

    if (!trial) {
      throw new NotFoundException(`Trial with ID ${id} was not found.`)
    }
    return trial
  }

  @Get(':id/ctml-schemas')
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Get a list of CTML schema records associated with a trial" })
  @ApiParam({ name: "id", description: "ID of the trial." })
  @ApiFoundResponse({ description: "CTML schema list found." })
  @ApiNotFoundResponse({ description: "Trial with the requested ID could not be found." })
  async findRelatedSchemas(@CurrentUser() user: user, @Param('id') id: string) {

    const result = await this.trialService.findSchemasByTrial(+id);

    // Add event
    this.eventService.createEvent({
      type: event_type.CtmlSchemaReadMany,
      description: "CTML Schemas read via Get to /trials/:id/ctml-schemas",
      user,
      trial: { id: +id },
      metadata: {
        input: { id }
      }
    });

    if (!result) {
      // Add event
      this.eventService.createEvent({
        type: event_type.TrialDoesNotExist,
        description: "Trial could not be found via Get to /trials/:id/ctml-schemas",
        user,
        metadata: {
          input: { id }
        }
      });
      throw new NotFoundException(`Trial with ID ${id} was not found.`)
    }
    return result
  }

  @Patch(':id')
  @UseGuards(KeycloakPasswordGuard)
  @ApiOperation({ summary: "Update or create a trial" })
  @ApiParam({ name: "id", description: "ID of the trial to update." })
  @ApiOkResponse({ description: "Object updated." })
  @ApiNotFoundResponse({ description: "Trial with the requested ID could not be found." })
  async update(@Param('id') id: string,
         @CurrentUser() user: user,
         @Body() updateTrialDto: UpdateTrialDto) {

    const updated = await this.trialService.update(+id, updateTrialDto, user);
    // Add event
    this.eventService.createEvent({
      type: event_type.TrialUpdated,
      description: "Trial updated via Patch to /trials",
      user,
      trial: updated,
      metadata: {
        input: {
          updateTrialDto: { ...updateTrialDto }
        }
      }
    });

    return updated
  }

  @Patch(':id/ctml-schemas')
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Set the ctml schema list for a trail" })
  @ApiParam({ name: "id", description: "ID of the trial to update." })
  @ApiOkResponse({ description: "Object updated." })
  @ApiNotFoundResponse({ description: "Trial with the requested ID could not be found." })
  async updateAssocSchemas(
    @CurrentUser() user: user,
    @Param('id') id: string,
    @Body() updateTrialSchemasDto: UpdateTrialSchemasDto
  ) {
    // Add event
    this.eventService.createEvent({
      type: event_type.TrialUpdated,
      description: "Trial schema list updated via Patch to /trials/:id/ctml-schemas",
      user,
      trial: { id: +id },
      metadata: {
        input: {
          updateTrialDto: { ...updateTrialSchemasDto }
        }
      }
    });
    return this.trialService.updateTrialSchemaList(+id, updateTrialSchemasDto);
  }

  @Delete(':id')
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Delete a trial" })
  @ApiParam({ name: "id", description: "ID of the trial to delete." })
  @ApiOkResponse({ description: "Object deleted." })
  @ApiNotFoundResponse({ description: "Trial with the requested ID could not be found." })
  async delete(@CurrentUser() user: user, @Param('id') id: string) {
    // Add event
    this.eventService.createEvent({
      type: event_type.TrialDeleted,
      description: "Trial deleted via Delete to /trials/:id",
      user,
      metadata: {
        input: { id }
      }
    });

    await this.trialService.delete(+id);
  }
}
