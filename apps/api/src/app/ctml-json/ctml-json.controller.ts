import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {CtmlJsonService} from './ctml-json.service';
import {CreateCtmlJsonDto} from './dto/create-ctml-json.dto';
import {UpdateCtmlJsonDto} from './dto/update-ctml-json.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";
import {KeycloakPasswordGuard} from "../auth/KeycloakPasswordGuard";
import {ctml_json} from "@prisma/client";

@Controller('ctml-jsons')
@ApiTags('CTML JSON')
export class CtmlJsonController {
  constructor(private readonly ctmlJsonService: CtmlJsonService) {}

  @Post()
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Create a new CTML JSON record" })
  @ApiCreatedResponse({ description: "CTML JSON record created." })
  create(@Body() createCtmlJsonDto: CreateCtmlJsonDto) {
    return this.ctmlJsonService.create(createCtmlJsonDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all CTML JSON records" })
  @ApiFoundResponse({ description: "CTML JSON records found." })
  findAll() {
    return this.ctmlJsonService.findAll();
  }

  @Get(':id')
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Get a CTML JSON record" })
  @ApiFoundResponse({ description: "CTML JSON record found." })
  async findOne(@Param('id') id: string) {
    const entities = await this.ctmlJsonService.findOne(+id)
    return entities;
  }

  @Get('trialId/:trialId')
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Get a CTML JSON record by Trial Id" })
  @ApiFoundResponse({ description: "CTML JSON record found." })
  async findByTrialId(@Param('trialId') trialId: string) {
    return this.ctmlJsonService.findByTrialId(+trialId);
  }

  @Patch()
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Update or create CTML JSON record" })
  @ApiOkResponse({ description: "CTML JSON records found." })
  update(@Body() updateCtmlJsonDto: UpdateCtmlJsonDto): Promise<ctml_json> {
    return this.ctmlJsonService.update(updateCtmlJsonDto);
  }

  @Delete(':id')
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Get all CTML JSON records" })
  @ApiNoContentResponse({ description: "CTML JSON record deleted." })
  async remove(@Param('id') id: string) {
    await this.ctmlJsonService.remove(+id);
  }
}
