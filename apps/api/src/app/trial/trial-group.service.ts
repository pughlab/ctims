import { Injectable, Logger } from '@nestjs/common';
import axios, {AxiosResponse} from 'axios';

export interface TrialGroup {
  id: string;
  name: string;
  composite: boolean;
  clientRole: boolean;
  containerId: string;
}

@Injectable()
export class TrialGroupService {

  private readonly logger = new Logger(TrialGroupService.name, { timestamp: true });


  async getTrialGroups(): Promise<any[]> {

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
      const accessToken = tokenResponse.data.access_token;
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

}
