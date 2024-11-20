import {Injectable, OnModuleInit} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {KeycloakUser} from "./dto/IKeycloadUser";
import {PrismaService} from "../prisma.service";
import {KeycloakPasswordStrategy} from "../auth/keycloak-password.strategy";
import {ModuleRef} from "@nestjs/core";
import { PrismaPromise, user } from "@prisma/client";
import {adminStatus} from "../auth/keycloak-disabled-config";

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

  async createUserWithoutKeycloak(role: string) {
    const envUsername = adminStatus(role) ? process.env.KD_USERNAME_ADMIN : process.env.KD_USERNAME;
    const envKeycloakId = adminStatus(role) ? process.env.KD_KEYCLOAK_ID_ADMIN : process.env.KD_KEYCLOAK_ID;
    const envEmail = adminStatus(role) ? process.env.KD_EMAIL_ADMIN : process.env.KD_EMAIL;
    const envFullName = adminStatus(role) ? process.env.KD_FULLNAME_ADMIN : process.env.KD_FULLNAME;
    const Id = adminStatus(role) ? 100 : 99;
    const token = adminStatus(role) ?  process.env.KD_TOKEN_ADMIN : process.env.KD_TOKEN_USER ;
    const newUserWithoutKeycloak = await this.prismaService.user.create({
      data: {
        id: Id,
        email: envEmail,
        keycloak_id: envKeycloakId,
        first_name: envUsername,
        last_name: "",
        name: envFullName,
        username: envUsername,
        email_verified: true,
        refresh_token: token
      }
    });
    return newUserWithoutKeycloak;
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
