import {Controller, Get, Post, Body, Patch, Param, Delete, NotImplementedException} from '@nestjs/common';
import { TrialService } from './trial.service';
import { CreateTrialDto } from './dto/create-trial.dto';
import { UpdateTrialDto } from './dto/update-trial.dto';

@Controller('trial')
export class TrialController {
  constructor(private readonly trialService: TrialService) {}

  @Post('create')
  create(@Body() createTrialDto: CreateTrialDto) {
    throw new NotImplementedException();
    return this.trialService.create(createTrialDto);
  }

  @Get('getAll')
  findAll() {
    return this.trialService.findAll();
  }

  @Get('getTrial/:id')
  findOne(@Param('id') id: string) {
    return this.trialService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateTrialDto: UpdateTrialDto) {
    throw new NotImplementedException();
    return this.trialService.update(+id, updateTrialDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    throw new NotImplementedException();
    return this.trialService.remove(+id);
  }
}
