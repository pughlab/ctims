import axios, {AxiosResponse} from "axios";
import {useState} from "react";
import {useSession} from "next-auth/react";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {UpdateTrialDto} from "../../api/src/app/trial/dto/update-trial.dto";
import {UpdateCtmlJsonDto} from "../../api/src/app/ctml-json/dto/update-ctml-json.dto";

const useSaveTrial = () => {

  axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:3333/api"

  const schemaVersion = useSelector((state: RootState) => state.ctmlSchema.schema_version);


  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {data} = useSession()

  const saveTrialOperation = async (trialModel: any, ctmlJson: any) => {
    const headers = {
      'Authorization': 'Bearer ' + data['accessToken'],
    }

    try {
     const trialResponse =  await axios.request({
        method: 'patch',
        url: `/trials`,
        headers,
        data: {ctml_schema_version: schemaVersion, ...trialModel}
      });

      const updateCtmlResponse = await axios.request<UpdateCtmlJsonDto>({
        method: 'patch',
        url: `/ctml-jsons`,
        headers,
        data: {
          version: schemaVersion,
          data: ctmlJson,
          trialId: trialResponse.data.id
        }
      });

      setResponse(updateCtmlResponse.data)
    } catch (error) {
      console.log('response', error.response)
      if(error.response) {
        setError(error.response.data);
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }

  };

  return { response, error, loading, saveTrialOperation };

}
export default useSaveTrial;
