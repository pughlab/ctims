import {Controller, Get, Post, Body, Patch, Param, Delete, NotImplementedException} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    throw new NotImplementedException();
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    throw new NotImplementedException();
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    throw new NotImplementedException();
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    throw new NotImplementedException();
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    throw new NotImplementedException();
    return this.userService.remove(+id);
  }
}
