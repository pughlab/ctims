import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { KeycloakPasswordStrategy } from "./keycloak-password.strategy";

@Module({
  imports: [PassportModule],
  providers: [KeycloakPasswordStrategy],
  exports: [PassportModule, KeycloakPasswordStrategy],
})
export class AuthModule {}
