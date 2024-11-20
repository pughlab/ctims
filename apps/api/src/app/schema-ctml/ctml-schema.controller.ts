import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards, BadRequestException, OnModuleInit
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
import { EventService } from "../event/event.service";
import { ModuleRef } from "@nestjs/core";
import { event_type, user } from "@prisma/client";
import { CurrentUser } from "../auth/CurrentUser";

@Controller('ctml-schemas')
@ApiTags("Schema CTML")
export class CtmlSchemaController implements OnModuleInit {

  private eventService: EventService;

  constructor(private readonly schemaCtmlService: CtmlSchemaService,
              private readonly moduleRef: ModuleRef) {}

  onModuleInit(): any {
    this.eventService = this.moduleRef.get(EventService, { strict: false });
  }

  @Post()
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Create a CTML schema record" })
  @ApiCreatedResponse({ description: "New CTML schema created." })
  async create(
    @CurrentUser() user: user,
    @Body() createSchemaCtmlDto: CreateCtmlSchemaDto
  ) {
    try {
      const ctmlJson = await this.schemaCtmlService.create(createSchemaCtmlDto);

      // Create audit log
      this.eventService.createEvent({
        type: event_type.CtmlSchemaCreated,
        description: "CTML Schema created via Post to /ctml-schemas",
        user,
        ctml_json: ctmlJson,
        metadata: {
          input: {
            createSchemaCtmlDto: { ...createSchemaCtmlDto },
          },
          success: true,
          output: {
            id: ctmlJson.id
          }
        }
      });

      return ctmlJson;
    } catch (e) {
      if (PrismaExceptionTools.isUniqueConstraintFailedError(e)) {
        // Create audit log
        this.eventService.createEvent({
          type: event_type.CtmlSchemaCreated,
          description: "Failed CTML Schema creation attempt via Post to /ctml-schemas",
          user,
          metadata: {
            input: {
              createSchemaCtmlDto: { ...createSchemaCtmlDto }
            },
            exception: {
              prisma_code: e.code,
              description: "A schema with this version name already exists."
            },
            success: false
          }
        });
        throw new BadRequestException("A schema with this version name already exists.");
      }
      throw e;
    }
  }

  @Get()
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Get all CTML schema records" })
  @ApiFoundResponse({ description: "CTML schema records found." })
  findAll(@CurrentUser() user: user) {
    this.eventService.createEvent({
      type: event_type.CtmlSchemaReadMany,
      description: "CTML Schemas read via Get to /ctml-schemas",
      user
    });
    return this.schemaCtmlService.findAll();
  }

  @Get(':id')
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Find a CTML schema" })
  @ApiFoundResponse({ description: "CTML schema found." })
  async findOne(@CurrentUser() user: user,
          @Param('id') id: string) {
    const ctmlSchema = await this.schemaCtmlService.findOne(+id);

    // Add event
    this.eventService.createEvent({
      type: event_type.CtmlSchemaRead,
      description: "CTML Schema read via Get to /ctml-schemas/:id",
      user,
      ctml_schema: ctmlSchema,
      metadata: {
        input: { id }
      }
    });

    return ctmlSchema;
  }

  @Get('/schema-version/:schemaVersion')
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Find a CTML schema" })
  @ApiFoundResponse({ description: "CTML schema found." })
  async findBySchemaVersion(@CurrentUser() user: user,
                            @Param('schemaVersion') id: string) {

    const result = await this.schemaCtmlService.findBySchemaVersion(+id);

    // Add event
    this.eventService.createEvent({
      type: event_type.CtmlSchemaRead,
      description: "CTML Schema read via Get to /ctml-schemas/schema-version/:schemaVersion",
      user,
      ctml_schema: { id: result.id },
      metadata: {
        input: { id }
      }
    });

    return result;
  }

  @Patch(':id')
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Update a CTML schema" })
  @ApiOkResponse({ description: "CTML schema updated." })
  async update(@CurrentUser() user: user,
               @Param('id') id: string,
               @Body() updateSchemaCtmlDto: UpdateCtmlSchemaDto) {

    const ctmlSchema = await this.schemaCtmlService.update(+id, updateSchemaCtmlDto);

    // Add event
    this.eventService.createEvent({
      type: event_type.CtmlSchemaUpdated,
      description: "CTML Schema updated via Patch to /ctml-schemas/:id",
      user,
      ctml_schema: ctmlSchema,
      metadata: {
        input: {
          updateSchemaCtmlDto: { ...updateSchemaCtmlDto },
          id
        }
      }
    });

    return ctmlSchema
  }

  @Delete(':id')
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Delete a CTML schema record" })
  @ApiNoContentResponse({ description: "CTML schema deleted." })
  async remove(@CurrentUser() user: user,
               @Param('id') id: string) {

    await this.schemaCtmlService.remove(+id);

    // Add event
    this.eventService.createEvent({
      type: event_type.CtmlSchemaDeleted,
      description: "CTML Schema deleted via Delete to /ctml-schemas/:id",
      user,
      metadata: {
        input: { id }
      }
    });
  }
}
