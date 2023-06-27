import axios from "axios";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {useRouter} from "next/router";
import {setTrialId} from "../store/slices/contextSlice";
import getConfig from 'next/config';
import {v4 as uuidv4} from "uuid";
import {store} from "../store/store";


const useSaveTrial = () => {

  const { publicRuntimeConfig } = getConfig();
  axios.defaults.baseURL = publicRuntimeConfig.REACT_APP_API_URL || "http://localhost:3333/api"

  const schemaVersion = useSelector((state: RootState) => state.context.schema_version);
  const trialId = useSelector((state: RootState) => state.context.trialId);


  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  const {data, status} = useSession()

  useEffect(() => {
    if(status === 'unauthenticated') {
      router.push('/');
    }
  }, [status])

  const saveTrialOperation = async (trialModel: any, ctmlJson: any) => {
    const state = store.getState();
    const group_id = state.context.seletedTrialGroupId;
    const accessToken = localStorage.getItem('ctims-accessToken');
    const headers = {
      'Authorization': 'Bearer ' + accessToken,
    }

    try {
     const trialResponse =  await axios.request({
        method: 'patch',
        url: `/trials/${trialId}`,
        headers,
        data: {ctml_schema_version: schemaVersion, group_id, ...trialModel}
      });

      dispatch(setTrialId(trialResponse.data.id));

      const updateCtmlResponse = await axios.request({
        method: 'patch',
        url: `/ctml-jsons`,
        headers,
        data: {
          version: schemaVersion,
          data: ctmlJson,
          trialId: trialId === 0 ? trialResponse.data.id : trialId
        }
      });

      setResponse(uuidv4())
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
