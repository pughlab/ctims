import axios, {AxiosResponse} from "axios";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {UpdateTrialDto} from "../../api/src/app/trial/dto/update-trial.dto";
import {UpdateCtmlJsonDto} from "../../api/src/app/ctml-json/dto/update-ctml-json.dto";
import {useRouter} from "next/router";
import {setTrialId} from "../store/slices/contextSlice";

const useSaveTrial = () => {

  axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:3333/api"

  const schemaVersion = useSelector((state: RootState) => state.context.schema_version);
  const trialId = useSelector((state: RootState) => state.context.trialId);


  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  const {data} = useSession()

  useEffect(() => {
    if(!data) {
      router.push('/');
    }
  }, [data])

  const saveTrialOperation = async (trialModel: any, ctmlJson: any) => {
    const headers = {
      'Authorization': 'Bearer ' + data['accessToken'],
    }

    try {
     const trialResponse =  await axios.request({
        method: 'patch',
        url: `/trials/${trialId}`,
        headers,
        data: {ctml_schema_version: schemaVersion, ...trialModel}
      });

      dispatch(setTrialId(trialResponse.data.id));

      const updateCtmlResponse = await axios.request<UpdateCtmlJsonDto>({
        method: 'patch',
        url: `/ctml-jsons`,
        headers,
        data: {
          version: schemaVersion,
          data: ctmlJson,
          trialId: trialId === 0 ? trialResponse.data.id : trialId
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
