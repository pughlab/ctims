import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { KeycloakPasswordStrategy } from "./keycloak-password.strategy";
import {AuthController} from "./auth.controller";
import { EventService } from "../event/event.service";

@Module({
  imports: [PassportModule],
  providers: [KeycloakPasswordStrategy, EventService],
  exports: [PassportModule, KeycloakPasswordStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
