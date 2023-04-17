import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SchemaCtmlService } from './schema-ctml.service';
import { CreateSchemaCtmlDto } from './dto/create-schema-ctml.dto';
import { UpdateSchemaCtmlDto } from './dto/update-schema-ctml.dto';

@Controller('schema-ctml')
export class SchemaCtmlController {
  constructor(private readonly schemaCtmlService: SchemaCtmlService) {}

  @Post()
  create(@Body() createSchemaCtmlDto: CreateSchemaCtmlDto) {
    return this.schemaCtmlService.create(createSchemaCtmlDto);
  }

  @Get()
  findAll() {
    return this.schemaCtmlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schemaCtmlService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSchemaCtmlDto: UpdateSchemaCtmlDto) {
    return this.schemaCtmlService.update(+id, updateSchemaCtmlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schemaCtmlService.remove(+id);
  }
}
