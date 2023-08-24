import {BadRequestException, Controller, Get, Post, Req, UseGuards} from "@nestjs/common";
import {KeycloakPasswordStrategy} from "./keycloak-password.strategy";
import {AccessToken} from "./AccessToken";
import { Token } from "keycloak-connect";
import {KeycloakPasswordGuard} from "./KeycloakPasswordGuard";
import {ApiTags} from "@nestjs/swagger";
import {CurrentUser} from "./CurrentUser";
import {user} from "@prisma/client";


@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(public strategy: KeycloakPasswordStrategy) {}

  @Post('login')
  async login(@Req() req) {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
      throw new BadRequestException('Username and password are required')
    }
    return await this.strategy.login(req.body.username, req.body.password);
  }

  @Get('refresh')
  async refresh(@AccessToken() accessToken: Token) {
    if (!accessToken) {
      throw new BadRequestException('Access token is required')
    }
    return await this.strategy.refreshToken(accessToken);
  }

  @Get('protected')
  @UseGuards(KeycloakPasswordGuard)
  getHello(@CurrentUser() user: user): any {
    const a = '';
    return {message: 'Hello World!'}
  }
}
