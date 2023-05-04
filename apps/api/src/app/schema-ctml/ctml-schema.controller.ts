import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards, BadRequestException
} from '@nestjs/common';
import { CtmlSchemaService } from './ctml-schema.service';
import { CreateCtmlSchemaDto } from './dto/create-ctml-schema.dto';
import { UpdateCtmlSchemaDto } from './dto/update-ctml-schema.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiNoContentResponse, ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";
import { KeycloakPasswordGuard } from "../auth/KeycloakPasswordGuard";
import { PrismaExceptionTools } from "../utils/prisma-exception-tools";

@Controller('ctml-schemas')
@ApiTags("Schema CTML")
export class CtmlSchemaController {
  constructor(private readonly schemaCtmlService: CtmlSchemaService) {}

  @Post()
  // @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Create a CTML schema record" })
  @ApiCreatedResponse({ description: "New CTML schema created." })
  async create(@Body() createSchemaCtmlDto: CreateCtmlSchemaDto) {
    try {
      return await this.schemaCtmlService.create(createSchemaCtmlDto);
    } catch (e) {
      if (PrismaExceptionTools.isUniqueConstraintFailedError(e)) {
        throw new BadRequestException("A schema with this version name already exists.");
      }
    }
  }

  @Get()
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Get all CTML schema records" })
  @ApiFoundResponse({ description: "CTML schema records found." })
  findAll() {
    return this.schemaCtmlService.findAll();
  }

  @Get(':id')
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Find a CTML schema" })
  @ApiFoundResponse({ description: "CTML schema found." })
  findOne(@Param('id') id: string) {
    return this.schemaCtmlService.findOne(+id);
  }

  @Get('/schema-version/:schemaVersion')
  // @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Find a CTML schema" })
  @ApiFoundResponse({ description: "CTML schema found." })
  findBySchemaVersion(@Param('schemaVersion') id: string) {
    return this.schemaCtmlService.findBySchemaVersion(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Update a CTML schema" })
  @ApiOkResponse({ description: "CTML schema updated." })
  update(@Param('id') id: string, @Body() updateSchemaCtmlDto: UpdateCtmlSchemaDto) {
    return this.schemaCtmlService.update(+id, updateSchemaCtmlDto);
  }

  @Delete(':id')
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Delete a CTML schema record" })
  @ApiNoContentResponse({ description: "CTML schema deleted." })
  async remove(@Param('id') id: string) {
    await this.schemaCtmlService.remove(+id);
  }
}
