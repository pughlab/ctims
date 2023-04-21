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
import {ApiOkResponse, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateTrialWithCtmlDto} from "./dto/create-trial-with-ctml.dto";
import {trial} from "@prisma/client";

@Controller('trial')
@ApiTags("Trial")
export class TrialController {
  constructor(private readonly trialService: TrialService) {}

  @Post('create')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "New trial created.",
    // content: { 'application/json': { schema: { $ref: '#/components/schemas/trial' } } }
  })
  async create(@Body() createTrialDto: CreateTrialDto): Promise<trial> {
    const newTrial = await this.trialService.createTrial(createTrialDto);
    return newTrial;
  }

  @Post('createWithJson')
  @ApiResponse({ status: HttpStatus.CREATED, description: "New trial and associated JSON created." })
  async createWithJson(@Body() creationDto: CreateTrialWithCtmlDto) {
    const newTrial = await this.trialService.createTrialWithCtml(creationDto);
    return newTrial;
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
  @ApiParam({ name: "id", description: "ID of the trial to delete." })
  @ApiResponse({ status: HttpStatus.OK, description: "Object deleted." })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Trial with the requested ID could not be found." })
  async delete(@Param('id') id: string) {
    await this.trialService.delete(+id);
  }
}
