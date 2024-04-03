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
        // handle if token expired but refresh token is valid
      //   if (info.message === 'jwt expired') {
      //     console.log('Token expired, refreshing token')
      //     const req = this.getRequest(context);
      //     const accessToken = req.headers.authorization.split(' ')[1];
      //     console.log('old token:', accessToken);
      //     this.validateAndRefreshToken(accessToken)
      //       .then(newToken => {
      //         console.log('new token:', newToken.accessToken);
      //         req.headers.authorization = `Bearer ${newToken.accessToken}`;
      //         return super.handleRequest(err, user, info, context);
      //       })
      //       .catch(refreshErr => {
      //         console.log('Error refreshing token:', refreshErr);
      //         throw refreshErr;
      //       });
      //   }
        throw new UnauthorizedException(info.message);
      }
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
