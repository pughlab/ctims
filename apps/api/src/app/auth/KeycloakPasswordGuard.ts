import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

@Injectable()
export class KeycloakPasswordGuard extends PassportAuthGuard('keycloak') {
  getRequest(context: ExecutionContext) {
    const req =  context.switchToHttp().getRequest();
    return req;
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
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
