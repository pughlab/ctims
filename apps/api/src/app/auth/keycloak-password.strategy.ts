import {Injectable, NotFoundException, OnModuleInit} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as KeycloakConnect from 'keycloak-connect';
import * as KeycloakBearerStrategy from 'passport-keycloak-bearer'
import { Grant, Token } from "keycloak-connect";
import {UserService} from "../user/user.service";
import {ModuleRef} from "@nestjs/core";
import {KeycloakUser} from "../user/dto/IKeycloadUser";
import jwt_decode from "jwt-decode";
import { EventService } from "../event/event.service";
import { event_type } from "@prisma/client";

const keycloakConfig = {
  "realm": process.env.KEYCLOAK_REALM,
  "auth-server-url": process.env.KEYCLOAK_URL,
  "ssl-required": "external",
  "resource": process.env.KEYCLOAK_CLIENT_ID,
  "credentials": {
    "secret": process.env.KEYCLOAK_CLIENT_SECRET
  },
  "confidential-port": 0
}

const isKeycloakDisabled = process.env.KEYCLOAK_DISABLED === 'true';
const envUsername = process.env.KD_USERNAME;
const envPassword = process.env.KD_PASSWORD;
const envUsernameAdmin = process.env.KD_USERNAME_ADMIN;
const envPasswordAdmin = process.env.KD_PASSWORD_ADMIN;
const envKeycloakId = process.env.KD_KEYCLOAK_ID;
const envKeycloakIdAdmin = process.env.KD_KEYCLOAK_ID_ADMIN;
const envTokenUser= process.env.KD_TOKEN_USER;
const envTokenAdmin= process.env.KD_TOKEN_ADMIN;

@Injectable()
export class KeycloakPasswordStrategy extends PassportStrategy(KeycloakBearerStrategy, 'keycloak')  implements OnModuleInit {
  private readonly keycloak: KeycloakConnect.Keycloak;
  private userService: UserService;
  private eventService: EventService;

  constructor(
    public moduleRef: ModuleRef
  ) {
    super({
      realm: keycloakConfig['realm'],
      url: keycloakConfig['auth-server-url'],
    });
    this.keycloak = new KeycloakConnect({}, keycloakConfig);
  }

  async login(username: string, password: string): Promise<any> {
    if (isKeycloakDisabled==true) {
      return this.loginWithEnvCredentials(username, password);
    }
    else{
    let grant: Grant = null;
    try {
      grant = await this.keycloak.grantManager.obtainDirectly(username, password);
    } catch (e) {
      // Login failed, output to audit log
      this.eventService.createEvent({
        type: event_type.LoginFailed,
        description: e.message,
        metadata: {
          errorMessage: e.message,
          input: {
            username,
            password: true
          }
        }
      });
      throw e;
    }
    const userInfo: KeycloakUser = await this.keycloak.grantManager.userInfo<KeycloakConnect.Token, KeycloakUser>(grant.access_token)

    const keycloakToken = grant.access_token;
    const refreshToken: KeycloakConnect.Token = grant.refresh_token;

    const roles = (keycloakToken as unknown as any).content.resource_access['ctims'].roles;

    let user = await this.userService.findUserBySub(userInfo.sub)
    if (!user) {
      user = await this.userService.createUserFromKeycloak(userInfo, refreshToken['token'])
    }

    // Login successful, output to audit log
    this.eventService.createEvent({
      type: event_type.LoginSuccessful,
      user,
      metadata: {
        input: {
          username,
          password: true
        }
      }
    });

    await this.userService.updateRefreshToken(userInfo.sub, refreshToken['token'])

    delete user['refresh_token'];
    user['roles'] = roles;

    return {
      accessToken: keycloakToken['token'],
      user
    };
   }
  }
  private async loginWithEnvCredentials(username: string, password: string): Promise<any> {
    if (username === envUsername && password === envPassword) {
      let user = await this.userService.findUserBySub(envKeycloakId)
      if(!user){
        user = await this.userService.createUserWithoutKeycloak("notAdmin")
      }
      const roles= ['default']
      user['roles'] = roles;
      return { accessToken: envTokenUser, user };
    }
    else if(username === envUsernameAdmin && password === envPasswordAdmin){
      let user = await this.userService.findUserBySub(envKeycloakIdAdmin)
      if(!user){
        user =  await this.userService.createUserWithoutKeycloak("admin")
      }
      const roles= ['default-admin']
      user['roles'] = roles;
      return { accessToken: envTokenAdmin, user };
    }
  }

  async refreshToken(access_token: Token): Promise<any> {
    if (isKeycloakDisabled==true) {
        return {accessToken: access_token};
    }
    else{
    const decoded: any = jwt_decode(access_token as unknown as string);

    const user = await this.userService.findUserBySub(decoded.sub)
    if (!user) {
      throw new NotFoundException('User not found')
    }

    let grantFromRefreshToken: Grant = await this.keycloak.grantManager.createGrant({access_token, refresh_token: user.refresh_token as unknown as Token})
    // check if the access token is still valid, if not, force it to expire to get a new access token as long as refresh token is valid
    if (!grantFromRefreshToken.isExpired()) {
      decoded.exp = 0;
      grantFromRefreshToken = await this.keycloak.grantManager.createGrant({access_token: decoded, refresh_token: user.refresh_token as unknown as Token})
    }

    const freshGrant: Grant = await this.keycloak.grantManager.ensureFreshness(grantFromRefreshToken);
    await this.userService.updateRefreshToken(decoded.sub, freshGrant.refresh_token['token'])
    const keycloakToken: KeycloakConnect.Token = freshGrant.access_token;

    return {accessToken: keycloakToken['token']};
  }
  }

  async validate(accessToken: any, done: (err: any, user: any, info?: any) => void): Promise<void> {
    // Here you can implement additional validation or store the user information in your application.
    // You can also attach roles and permissions to the user object based on the token's claims.
    // const r = await this.keycloak.grantManager.obtainFromCode(accessToken)
    const user = await this.userService.findUserBySub(accessToken.sub)
    done(null, user);
  }

  onModuleInit(): any {
    this.userService = this.moduleRef.get(UserService, {strict: false});
    this.eventService = this.moduleRef.get(EventService, { strict: false });
  }
}
