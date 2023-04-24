import {Injectable, OnModuleInit} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {KeycloakUser} from "./dto/IKeycloadUser";
import {PrismaService} from "../prisma.service";
import {KeycloakPasswordStrategy} from "../auth/keycloak-password.strategy";
import {ModuleRef} from "@nestjs/core";
import { PrismaPromise, user } from "@prisma/client";

@Injectable()
export class UserService {

  constructor(
    private readonly prismaService: PrismaService,
    public moduleRef: ModuleRef,
  ) { }


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async createUserFromKeycloak(createUserDto: KeycloakUser, refreshToken?: string) {
    const newUserFromKeycloak = await this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        keycloak_id: createUserDto.sub,
        first_name: createUserDto.given_name,
        last_name: createUserDto.family_name,
        name: createUserDto.name,
        username: createUserDto.preferred_username,
        email_verified: createUserDto.email_verified,
        refresh_token: refreshToken
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

  findOne(id: number): PrismaPromise<user> {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }


  async updateRefreshToken(keycloak_id: string, refreshToken: string) {
    return await this.prismaService.user.update({
      where: {
        keycloak_id: keycloak_id
      },
      data: {
        refresh_token: refreshToken
      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
