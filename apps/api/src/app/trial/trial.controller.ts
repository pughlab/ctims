import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException, HttpStatus, UseGuards
} from '@nestjs/common';
import { TrialService } from './trial.service';
import { CreateTrialDto } from './dto/create-trial.dto';
import { UpdateTrialDto } from './dto/update-trial.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse, ApiFoundResponse,
  ApiNotFoundResponse, ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { trial } from "@prisma/client";
import { KeycloakPasswordGuard } from "../auth/KeycloakPasswordGuard";
import { CurrentUser } from "../auth/CurrentUser";
import { user } from "@prisma/client";
import { CtmlSchemaService } from "../schema-ctml/ctml-schema.service";
import { CtmlJsonService } from "../ctml-json/ctml-json.service";

@Controller('trials')
@ApiTags("Trial")
export class TrialController {
  constructor(
    private readonly trialService: TrialService,
    ) { }

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
    return newTrial;
  }

  @Get()
  @ApiOperation({ summary: "Get all trials" })
  @ApiOkResponse({ description: "List of trials found." })
  findAll() {
    return this.trialService.findAll();
  }

  @Get(':id')
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Get a trial by ID" })
  @ApiParam({ name: "id", description: "ID of the trial." })
  @ApiFoundResponse({ description: "Object found." })
  @ApiNotFoundResponse({ description: "Trial with the requested ID could not be found." })
  async findOne(@Param('id') id: string) {
    const result = await this.trialService.findOne(+id);
    if (!result) {
      throw new NotFoundException(`Trial with ID ${id} was not found.`)
    }
    return result
  }

  @Get(':id/ctml-schemas')
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Get a list of CTML schema records associated with a trial" })
  @ApiParam({ name: "id", description: "ID of the trial." })
  @ApiFoundResponse({ description: "CTML schema list found." })
  @ApiNotFoundResponse({ description: "Trial with the requested ID could not be found." })
  async findRelatedSchemas(@Param('id') id: string) {
    const result = await this.trialService.findSchemasByTrial(+id);
    if (!result) {
      throw new NotFoundException(`Trial with ID ${id} was not found.`)
    }
    return result
  }

  @Get(':id/ctml-jsons')
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Get a list of CTML JSON records associated with a trial" })
  @ApiParam({ name: "id", description: "ID of the trial." })
  @ApiFoundResponse({ description: "CTML JSON record list found." })
  @ApiNotFoundResponse({ description: "Trial with the requested ID could not be found." })
  async findRelatedJsons(@Param('id') id: string) {
    const result = await this.trialService.findRelatedJsons(+id);
    if (!result) {
      throw new NotFoundException(`Trial with ID ${id} was not found.`)
    }
    return result
  }

  @Patch(':id')
  @ApiOperation({ summary: "Update a trial" })
  @ApiParam({ name: "id", description: "ID of the trial to update." })
  @ApiOkResponse({ description: "Object updated." })
  @ApiNotFoundResponse({ description: "Trial with the requested ID could not be found." })
  update(@Param('id') id: string, @Body() updateTrialDto: UpdateTrialDto) {
    return this.trialService.update(+id, updateTrialDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Delete a trial" })
  @ApiParam({ name: "id", description: "ID of the trial to delete." })
  @ApiOkResponse({ description: "Object deleted." })
  @ApiNotFoundResponse({ description: "Trial with the requested ID could not be found." })
  async delete(@Param('id') id: string) {
    await this.trialService.delete(+id);
  }
}
