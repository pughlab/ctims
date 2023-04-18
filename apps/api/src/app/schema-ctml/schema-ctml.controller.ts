import {Controller, Get, Post, Body, Patch, Param, Delete, NotImplementedException} from '@nestjs/common';
import { SchemaCtmlService } from './schema-ctml.service';
import { CreateSchemaCtmlDto } from './dto/create-schema-ctml.dto';
import { UpdateSchemaCtmlDto } from './dto/update-schema-ctml.dto';

@Controller('schema-ctml')
export class SchemaCtmlController {
  constructor(private readonly schemaCtmlService: SchemaCtmlService) {}

  @Post()
  create(@Body() createSchemaCtmlDto: CreateSchemaCtmlDto) {
    throw new NotImplementedException();
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
  update(@Param('id') id: string, @Body() updateSchemaCtmlDto: UpdateSchemaCtmlDto) {
    throw new NotImplementedException();
    return this.schemaCtmlService.update(+id, updateSchemaCtmlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    throw new NotImplementedException();
    return this.schemaCtmlService.remove(+id);
  }
}
