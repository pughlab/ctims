import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {KeycloakUser} from "./dto/IKeycloadUser";
import {PrismaService} from "../prisma.service";

@Injectable()
export class UserService {

  constructor(
    private readonly prismaService: PrismaService
  ) { }


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async createUserFromKeycloak(createUserDto: KeycloakUser) {
    const newUserFromKeycloak = await this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        keycloak_id: createUserDto.sub,
        first_name: createUserDto.given_name,
        last_name: createUserDto.family_name,
        name: createUserDto.name,
        username: createUserDto.preferred_username,
        email_verified: createUserDto.email_verified
      }
    });
    return newUserFromKeycloak;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findUserBySub(sub: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        keycloak_id: sub
      }
    });
    return user;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
