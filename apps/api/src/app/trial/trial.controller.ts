import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotImplementedException,
  NotFoundException, HttpStatus
} from '@nestjs/common';
import { TrialService } from './trial.service';
import { CreateTrialDto } from './dto/create-trial.dto';
import { UpdateTrialDto } from './dto/update-trial.dto';
import {ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";

@Controller('trial')
@ApiTags("Trial")
export class TrialController {
  constructor(private readonly trialService: TrialService) {}

  @Post('create')
  @ApiResponse({ status: HttpStatus.CREATED, description: "New trial created." })
  async create(@Body() createTrialDto: CreateTrialDto) {
    const newTrial = await this.trialService.createTrial(createTrialDto);
    return newTrial.id;
  }

  @Get('getAll')
  @ApiResponse({ status: HttpStatus.OK, description: "List of trials found." })
  findAll() {
    return this.trialService.findAll();
  }

  @Get('getTrialsForUser/:userId')
  @ApiParam({ name: "userId", description: "ID of the user to find the trials for." })
  @ApiResponse({ status: HttpStatus.OK, description: "List of trials found." })
  getTrialsForUser(@Param('userId') userId: string) {
    return this.trialService.findTrialsByUser(+userId);
  }

  @Get('getTrial/:id')
  @ApiParam({ name: "id", description: "ID of the trial." })
  @ApiResponse({ status: HttpStatus.OK, description: "Object found." })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Trial with the requested ID could not be found." })
  async findOne(@Param('id') id: string) {
    const result = await this.trialService.findOne(+id);
    if (!result) {
      throw new NotFoundException(`Trial with ID ${id} was not found.`)
    }
    return result
  }

  @Patch('update/:id')
  @ApiParam({ name: "id", description: "ID of the trial to update." })
  @ApiResponse({ status: HttpStatus.OK, description: "Object updated." })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Trial with the requested ID could not be found." })
  update(@Param('id') id: string, @Body() updateTrialDto: UpdateTrialDto) {
    return this.trialService.update(+id, updateTrialDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    throw new NotImplementedException();
    return this.trialService.remove(+id);
  }
}
