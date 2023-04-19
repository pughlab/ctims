import {Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotImplementedException} from '@nestjs/common';
import { CtmlJsonService } from './ctml-json.service';
import { CreateCtmlJsonDto } from './dto/create-ctml-json.dto';
import { UpdateCtmlJsonDto } from './dto/update-ctml-json.dto';
import {ApiTags} from "@nestjs/swagger";

@Controller('ctml-json')
export class CtmlJsonController {
  constructor(private readonly ctmlJsonService: CtmlJsonService) {}

  @Post()
  create(@Body() createCtmlJsonDto: CreateCtmlJsonDto) {
    throw new NotImplementedException();
    return this.ctmlJsonService.create(createCtmlJsonDto);
  }

  @Get('all')
  @ApiTags('ctims')
  findAll() {
    return this.ctmlJsonService.findAll();
  }

  @Get(':id')
  @ApiTags('ctims')
  async findOne(@Param('id') id: string) {
    const entities = await this.ctmlJsonService.findOne(+id)
    return entities;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCtmlJsonDto: UpdateCtmlJsonDto) {
    throw new NotImplementedException();
    return this.ctmlJsonService.update(+id, updateCtmlJsonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    throw new NotImplementedException();
    return this.ctmlJsonService.remove(+id);
  }
}
