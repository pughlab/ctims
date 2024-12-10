import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
import { keycloak_disabled_comfig } from "./keycloak-disabled-config";

@Injectable()
export class KeycloakPasswordGuard extends PassportAuthGuard('keycloak') {
  private keycloakDisabled: boolean;
  private envTokenAdmin: string;
  
  constructor() {
    super();
    this.keycloakDisabled = process.env.KEYCLOAK_DISABLED === 'true';
    this.envTokenAdmin = process.env.KD_TOKEN_ADMIN;
  }
  getRequest(context: ExecutionContext) {
    const req =  context.switchToHttp().getRequest();
    return req;
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (this.keycloakDisabled) {
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const token = authHeader ? authHeader.split(' ')[1] : null;
      const isAdmin = (token == this.envTokenAdmin) ? "admin" : "notadmin";
      const user = keycloak_disabled_comfig(isAdmin);
      return user;
    }
    if (err || !user) {
      console.log('Error:', err);
      console.log('Info:', info);
      if (info) {
        throw new UnauthorizedException(info.message);
      }
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
