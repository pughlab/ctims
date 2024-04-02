import {KeycloakPasswordStrategy} from "./keycloak-password.strategy";
import {Test} from "@nestjs/testing";
import {UserService} from "../user/user.service";
import {PrismaService} from "../prisma.service";
import jwt_decode from "jwt-decode";
import * as jwtEncode from "jwt-encode";
import {EventService} from "../event/event.service";

const EXPIRES_IN = 60;

describe('KeycloakPasswordStrategy', () => {
  let strategy: KeycloakPasswordStrategy;
  let usersService: UserService;
  let eventService: EventService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [KeycloakPasswordStrategy, UserService, PrismaService, EventService],
    }).compile();

    strategy = module.get<KeycloakPasswordStrategy>(KeycloakPasswordStrategy);
    await strategy.onModuleInit();
    usersService = module.get<UserService>(UserService);
    eventService = module.get<EventService>(EventService);
  });


  it('should login', async () => {
    const result = await strategy.login(
      'ctims_test_user',
      'ctims2023'
    );
    const accessToken = result.accessToken;
    const decodedAccessToken: any = jwt_decode(accessToken);


    // Make sure the token expires in 60 seconds
    expect(decodedAccessToken.exp - decodedAccessToken.iat).toBe(EXPIRES_IN);
  });

  it('should refresh token', async () => {
    const result = await strategy.login(
      'ctims_test_user',
      'ctims2023'
    );
    const accessToken = result.accessToken;
    const decodedAccessToken: any = jwt_decode(accessToken);
    decodedAccessToken.exp = decodedAccessToken.exp - 60;
    const expiredAccessToken = jwtEncode(decodedAccessToken, 'secret');
    const refreshedAccessToken = await strategy.refreshToken(expiredAccessToken);

    const decodedRefreshedAccessToken: any = jwt_decode(refreshedAccessToken.accessToken);

    expect(decodedRefreshedAccessToken.exp - decodedRefreshedAccessToken.iat).toBe(EXPIRES_IN);

    const a = ''
  });

});
