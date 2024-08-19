import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import axios, {AxiosResponse} from 'axios';
import { PrismaService } from '../prisma.service';
import { ModuleRef } from '@nestjs/core';
import { trial } from '@prisma/client';

export interface TrialGroup {
  id: string;
  name: string;
  composite: boolean;
  clientRole: boolean;
  containerId: string;
}

export interface IKeycloakUser {
  id: string;
  createdTimestamp: number;
  username: string;
  enabled: boolean;
  totp: boolean;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  email: string;
  disableableCredentialTypes: string[];
  requiredActions: string[];
  notBefore: number;
  attributes: any;
}

@Injectable()
export class TrialGroupService {

  private readonly logger = new Logger(TrialGroupService.name, { timestamp: true });

  constructor(
    private readonly prismaService: PrismaService,
    private readonly moduleRef: ModuleRef
  ) { }


  async getTrialGroups(): Promise<any[]> {

    try {
      const accessToken = await this.getToken();
      const getTrialGroupsConfig = {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
      const trialGroupsResponse: AxiosResponse<TrialGroup[]> = await axios.get(
        `${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/clients/${process.env.KEYCLOAK_CLIENT_UUID}/roles`,
        getTrialGroupsConfig
      );
      const trialGroups: TrialGroup[] =  trialGroupsResponse.data;

      return trialGroups.filter((trialGroup: TrialGroup) => {
        return !trialGroup.name.includes('admin')
      }).map((tg: TrialGroup) => {
        return {
          id: tg.id,
          name: tg.name,
        }
      })

    } catch (error) {
      this.logger.error(`Error while getting trial groups from Keycloak: ${error}`)
    }
  }

  private async getToken() {
    const params: URLSearchParams = new URLSearchParams();
    params.append('client_id', process.env.KEYCLOAK_ADMIN_CLIENT_ID);
    params.append('client_secret', process.env.KEYCLOAK_ADMIN_CLIENT_SECRET);
    params.append('grant_type', 'client_credentials');

    const getTokenConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    try {
      const tokenResponse = await axios.post(
        `${process.env.KEYCLOAK_TOKEN_ENDPOINT}`,
        params,
        getTokenConfig
      );
      return tokenResponse.data.access_token;
    } catch (error) {
      this.logger.error(`Error while getting token from Keycloak: ${error}`)
      throw new Error(error);
    }
  }

  async getUsersInTrialGroup(trialGroupId: string): Promise<any[]> {

    try {
      const accessToken = await this.getToken();
      const getUsersInTrialGroupConfig = {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      };

      const usersInTrialGroupResponse: AxiosResponse<IKeycloakUser[]> = await axios.get(
        `${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/clients/${process.env.KEYCLOAK_CLIENT_UUID}/roles/${trialGroupId}/users`,
        getUsersInTrialGroupConfig
      );

      const usersInTrialGroupAdminResponse: AxiosResponse<IKeycloakUser[]> = await axios.get(
        `${process.env.KEYCLOAK_URL}/admin/realms/${process.env.KEYCLOAK_REALM}/clients/${process.env.KEYCLOAK_CLIENT_UUID}/roles/${trialGroupId}-admin/users`,
        getUsersInTrialGroupConfig
      );

      const usersInTrialGroup: IKeycloakUser[] = usersInTrialGroupResponse.data.concat(usersInTrialGroupAdminResponse.data);
      // get only unique users from trial group and trial group admin, removes duplicated trial belonging to same user in normal and admin group
      const uniqueUsersInTrialGroup: IKeycloakUser[] = Array.from(new Map(usersInTrialGroup.map(user => [user.id, user])).values());

      return uniqueUsersInTrialGroup.map((user: IKeycloakUser) => {
        return {
          id: user.id,
        }
      });

    } catch (error) {
      this.logger.error(`Error while getting users in trial group from Keycloak: ${error}`)
      throw new HttpException('Error while getting users in trial group from Keycloak', HttpStatus.BAD_REQUEST)
    }
  }

  async getTrialsForUsers(keyCloakIds: string[], trialGroupId: string) {
    let trials: trial[] = [];
    for (const keyCloakId of keyCloakIds) {
      const result = await this.prismaService.trial.findMany({
        where: {
          user: {
            keycloak_id: keyCloakId
          },
          trial_group: {
            name: trialGroupId
          }
        },
        include: {
          user: {
            select: {
              first_name: true,
              last_name: true,
              email: true,
            }
          },
          modifiedBy: {
            select: {
              first_name: true,
              last_name: true,
              email: true,
            }
          },
          ctml_jsons: {
            select: {
              has_match: true
            }
          }
        }
      });
      trials = trials.concat(result);
    }
    return trials;
  }

  async getTrialsForUsersInGroup(trialGroupId: string) {
    const usersInTrialGroup = await this.getUsersInTrialGroup(trialGroupId);
    const keyCloakIds = usersInTrialGroup.map((user: any) => user.id);
    return this.getTrialsForUsers(keyCloakIds, trialGroupId);
  }

}
