import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrialService } from './trial.service';
import { CreateTrialDto } from './dto/create-trial.dto';
import { UpdateTrialDto } from './dto/update-trial.dto';

@Controller('trial')
export class TrialController {
  constructor(private readonly trialService: TrialService) {}

  @Post()
  create(@Body() createTrialDto: CreateTrialDto) {
    return this.trialService.create(createTrialDto);
  }

  @Get()
  findAll() {
    return this.trialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trialService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrialDto: UpdateTrialDto) {
    return this.trialService.update(+id, updateTrialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trialService.remove(+id);
  }
}
