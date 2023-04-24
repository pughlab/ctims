import {Controller, Get, Post, Body, Patch, Param, Delete, NotImplementedException, HttpStatus} from '@nestjs/common';
import { CtmlSchemaService } from './ctml-schema.service';
import { CreateCtmlSchemaDto } from './dto/create-ctml-schema.dto';
import { UpdateCtmlSchemaDto } from './dto/update-ctml-schema.dto';
import {ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('ctml-schemas')
@ApiTags("Schema CTML")
export class CtmlSchemaController {
  constructor(private readonly schemaCtmlService: CtmlSchemaService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: "New CTML schema created." })
  create(@Body() createSchemaCtmlDto: CreateCtmlSchemaDto) {
    return this.schemaCtmlService.create(createSchemaCtmlDto);
  }

  @Get()
  findAll() {
    throw new NotImplementedException();
    return this.schemaCtmlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    throw new NotImplementedException();
    return this.schemaCtmlService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSchemaCtmlDto: UpdateCtmlSchemaDto) {
    throw new NotImplementedException();
    return this.schemaCtmlService.update(+id, updateSchemaCtmlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    throw new NotImplementedException();
    return this.schemaCtmlService.remove(+id);
  }
}
