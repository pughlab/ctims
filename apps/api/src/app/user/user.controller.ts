import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotImplementedException,
  HttpStatus,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TrialService } from "../trial/trial.service";
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { CurrentUser } from "../auth/CurrentUser";
import { KeycloakPasswordGuard } from "../auth/KeycloakPasswordGuard";
import { user } from "@prisma/client";

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
  @ApiOperation({ summary: "Get a user record" })
  @ApiParam({ name: "id", description: "ID of the user to get." })
  @ApiFoundResponse({ description: "User record found." })
  findOne(@Param('id') id: string) {
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
  @UseGuards(KeycloakPasswordGuard)
  @ApiBearerAuth("KeycloakPasswordGuard")
  @ApiOperation({ summary: "Get all trials for a user" })
  @ApiFoundResponse({ description: "List of trials found." })
  async getTrialsForUser(@CurrentUser() user: user) {
    return await this.trialService.findTrialsByUser(user.id);
  }
}
