import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { KeycloakPasswordStrategy } from "./keycloak-password.strategy";
import {AuthController} from "./auth.controller";

@Module({
  imports: [PassportModule],
  providers: [KeycloakPasswordStrategy],
  exports: [PassportModule, KeycloakPasswordStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
