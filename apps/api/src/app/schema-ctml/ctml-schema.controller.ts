import {Controller, Get, Post, Body, Patch, Param, Delete, NotImplementedException, HttpStatus} from '@nestjs/common';
import { CtmlSchemaService } from './ctml-schema.service';
import { CreateCtmlSchemaDto } from './dto/create-ctml-schema.dto';
import { UpdateCtmlSchemaDto } from './dto/update-ctml-schema.dto';
import {
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiNoContentResponse, ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";

@Controller('ctml-schemas')
@ApiTags("Schema CTML")
export class CtmlSchemaController {
  constructor(private readonly schemaCtmlService: CtmlSchemaService) {}

  @Post()
  @ApiOperation({ summary: "Create a CTML schema record" })
  @ApiCreatedResponse({ description: "New CTML schema created." })
  create(@Body() createSchemaCtmlDto: CreateCtmlSchemaDto) {
    return this.schemaCtmlService.create(createSchemaCtmlDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all CTML schema records" })
  @ApiFoundResponse({ description: "CTML schema records found." })
  findAll() {
    return this.schemaCtmlService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Find a CTML schema" })
  @ApiFoundResponse({ description: "CTML schema found." })
  findOne(@Param('id') id: string) {
    return this.schemaCtmlService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Update a CTML schema" })
  @ApiOkResponse({ description: "CTML schema updated." })
  update(@Param('id') id: string, @Body() updateSchemaCtmlDto: UpdateCtmlSchemaDto) {
    return this.schemaCtmlService.update(+id, updateSchemaCtmlDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Delete a CTML schema record" })
  @ApiNoContentResponse({ description: "CTML schema deleted." })
  async remove(@Param('id') id: string) {
    await this.schemaCtmlService.remove(+id);
  }
}
