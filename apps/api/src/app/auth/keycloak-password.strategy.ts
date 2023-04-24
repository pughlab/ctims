import {Injectable, NotFoundException, OnModuleInit} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as KeycloakConnect from 'keycloak-connect';
import * as KeycloakBearerStrategy from 'passport-keycloak-bearer'
import { Grant, Token } from "keycloak-connect";
import {UserService} from "../user/user.service";
import {ModuleRef} from "@nestjs/core";
import {KeycloakUser} from "../user/dto/IKeycloadUser";


const keycloakConfig = {
  "realm": "UHN",
  "auth-server-url": "https://cbioportal.pmgenomics.ca/newauth",
  "ssl-required": "external",
  "resource": "ctims",
  "credentials": {
    "secret": "yEV5YAWsE7XbhBEwUDHLRqXrR5jMhEwm"
  },
  "confidential-port": 0
}


@Injectable()
export class KeycloakPasswordStrategy extends PassportStrategy(KeycloakBearerStrategy, 'keycloak')  implements OnModuleInit {
  private readonly keycloak: KeycloakConnect.Keycloak;
  private userService: UserService;

  constructor(public moduleRef: ModuleRef) {
    super({
      realm: keycloakConfig['realm'],
      url: `https://cbioportal.pmgenomics.ca/newauth`,
    });

    this.keycloak = new KeycloakConnect({}, keycloakConfig);
  }

  async login(username: string, password: string): Promise<any> {
    const grant: Grant = await this.keycloak.grantManager.obtainDirectly(username, password);
    const userInfo: KeycloakUser = await this.keycloak.grantManager.userInfo<KeycloakConnect.Token, KeycloakUser>(grant.access_token)

    const keycloakToken: KeycloakConnect.Token = grant.access_token;
    const refreshToken: KeycloakConnect.Token = grant.refresh_token;

    let user = await this.userService.findUserBySub(userInfo.sub)
    if (!user) {
      user = await this.userService.createUserFromKeycloak(userInfo, refreshToken['token'])
    }
    await this.userService.updateRefreshToken(userInfo.sub, refreshToken['token'])

    return {accessToken: keycloakToken['token']};
    // return grant;
  }

  async refreshToken(access_token: Token): Promise<any> {

    const grant: Grant = await this.keycloak.grantManager.createGrant({access_token});
    const userInfo: KeycloakUser = await this.keycloak.grantManager.userInfo<KeycloakConnect.Token, KeycloakUser>(grant.access_token)

    const user = await this.userService.findUserBySub(userInfo.sub)
    if (!user) {
      throw new NotFoundException('User not found')
    }

    const grantFromRefreshToken: Grant = await this.keycloak.grantManager.createGrant({access_token, refresh_token: user.refresh_token as unknown as Token})
    const freshGrant: Grant = await this.keycloak.grantManager.ensureFreshness(grantFromRefreshToken);
    const keycloakToken: KeycloakConnect.Token = freshGrant.access_token;

    return {accessToken: keycloakToken['token']};
  }

  async validate(accessToken: string, done: (err: any, user: any, info?: any) => void): Promise<void> {
    // Here you can implement additional validation or store the user information in your application.
    // You can also attach roles and permissions to the user object based on the token's claims.
    // const r = await this.keycloak.grantManager.obtainFromCode(accessToken)
    done(null, { accessToken });
  }

  onModuleInit(): any {
    this.userService = this.moduleRef.get(UserService, {strict: false});
  }
}
