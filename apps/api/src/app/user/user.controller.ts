import { Controller, Get, Post, Body, Patch, Param, Delete, NotImplementedException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TrialService } from "../trial/trial.service";
import { ApiExcludeEndpoint, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly trialService: TrialService
  ) {
  }

  @Post()
  @ApiExcludeEndpoint()
  create(@Body() createUserDto: CreateUserDto) {
    throw new NotImplementedException();
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiExcludeEndpoint()
  findAll() {
    throw new NotImplementedException();
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiExcludeEndpoint()
  findOne(@Param('id') id: string) {
    throw new NotImplementedException();
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiExcludeEndpoint()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    throw new NotImplementedException();
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  remove(@Param('id') id: string) {
    throw new NotImplementedException();
    return this.userService.remove(+id);
  }

  @Get(':id/trials')
  @ApiOperation({ summary: "Get all trials for a user" })
  @ApiParam({ name: "userId", description: "ID of the user to find the trials for." })
  @ApiResponse({ status: HttpStatus.OK, description: "List of trials found." })
  async getTrialsForUser(@Param('id') id: string) {
    return await this.trialService.findTrialsByUser(+id);
  }
}
