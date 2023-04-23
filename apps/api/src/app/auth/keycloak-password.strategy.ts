import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as KeycloakConnect from 'keycloak-connect';
import * as KeycloakBearerStrategy from 'passport-keycloak-bearer'
import { Grant, Token } from "keycloak-connect";


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
export class KeycloakPasswordStrategy extends PassportStrategy(KeycloakBearerStrategy, 'keycloak') {
  private readonly keycloak: KeycloakConnect.Keycloak;

  constructor() {
    super({
      realm: keycloakConfig['realm'],
      url: `https://cbioportal.pmgenomics.ca/newauth`,
    });

    this.keycloak = new KeycloakConnect({}, keycloakConfig);
  }

  async login(username: string, password: string): Promise<any> {
    const grant: Grant = await this.keycloak.grantManager.obtainDirectly(username, password);
    // const access_token = grant.access_token
    // return {
    //   access_token,
    // }
    return grant;
  }

  async refreshToken(accessToken: Token, refreshToken: Token): Promise<any> {
    const grant: Grant = await this.keycloak.grantManager.createGrant({access_token: accessToken, refresh_token: refreshToken});
    const freshGrant: Grant = await this.keycloak.grantManager.ensureFreshness(grant);
    return freshGrant;
  }

  async validate(accessToken: string, done: (err: any, user: any, info?: any) => void): Promise<void> {
    // Here you can implement additional validation or store the user information in your application.
    // You can also attach roles and permissions to the user object based on the token's claims.
    // const r = await this.keycloak.grantManager.obtainFromCode(accessToken)
    done(null, { accessToken });
  }
}
