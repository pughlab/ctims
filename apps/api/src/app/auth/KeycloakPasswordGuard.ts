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
        if (info.message === 'jwt expired') {
          console.log('Token expired, refreshing token')
          const req = this.getRequest(context);
          const accessToken = req.headers.authorization.split(' ')[1];
          console.log('old token:', accessToken);
          this.validateAndRefreshToken(accessToken)
            .then(newToken => {
              console.log('new token:', newToken.accessToken);
              req.headers.authorization = `Bearer ${newToken.accessToken}`;
              return super.handleRequest(err, user, info, context);
            })
            .catch(refreshErr => {
              console.log('Error refreshing token:', refreshErr);
              throw refreshErr;
            });
        }
        throw new UnauthorizedException(info.message);
      }
      throw err || new UnauthorizedException();
    }
    return user;
  }

  async validateAndRefreshToken(access_token: Token): Promise<any> {
  //   const decoded: any = jwt_decode(access_token as unknown as string);
  //   const user = await this.userService.findUserBySub(decoded.sub)
  //   if (!user) {
  //     throw new NotFoundException('User not found')
  //   }
  //   const grantFromRefreshToken: Grant = await this.keycloak.grantManager.createGrant(
  //     {
  //       access_token,
  //       refresh_token: user.refresh_token as unknown as Token
  //     });
  //   const freshGrant: Grant = await this.keycloak.grantManager.ensureFreshness(grantFromRefreshToken);
  //   await this.userService.updateRefreshToken(decoded.sub, freshGrant.refresh_token['token'])
  //
  //   const keycloakToken: KeycloakConnect.Token = freshGrant.access_token;
  //   return {accessToken: keycloakToken['token']};
    return null;
  }
}
