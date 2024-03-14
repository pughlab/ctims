import getConfig from 'next/config';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {signOut, useSession} from 'next-auth/react';
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import process from "process";

const useSendCTML = () => {
  const {publicRuntimeConfig} = getConfig();
  axios.defaults.baseURL = publicRuntimeConfig.REACT_APP_API_URL || "http://localhost:3333/api"

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const trialId = useSelector((state: RootState) => state.context.trialId);
  const ctmlModel = useSelector((state: RootState) => state.finalModelAndErrors.ctmlModel);

  const router = useRouter();

  const {data,status} = useSession()

  useEffect(() => {
    if(status === 'unauthenticated') {
      // router.push('/');
      signOut({redirect: false}).then(() => {
        router.push(process.env.NEXT_PUBLIC_SIGNOUT_REDIRECT_URL as string || '/');
      });
    }
  }, [status])

  const move = () => {
    let ctmlModelCopy;
    const age_group = ctmlModel.age_group;
    const trialInformation = ctmlModel.trialInformation;
    ctmlModelCopy = {'trial_list' : [{...ctmlModel, ...trialInformation, ...age_group}]};
    delete ctmlModelCopy.age_group;
    delete ctmlModelCopy.trialInformation;
    delete ctmlModelCopy.ctml_status;
    delete ctmlModelCopy.nickname;
    return ctmlModelCopy;
  }

  const sendCTMLOperation = async () => {
    setLoading(true);
    const ctmlModelCopy = move();
    try {
      const accessToken = localStorage.getItem('ctims-accessToken');
      const headers = {
        'Authorization': 'Bearer ' + accessToken,
      }
      const ret = await axios.request({
        method: 'post',
        url: `/ctml-jsons/${trialId}/send_to_matchminer`,
        headers,
        data: ctmlModelCopy
      });
      setResponse(ret);
    } catch (error) {
      setLoading(false)
      if (error.response) {
        setError(error.response.data);
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    response,
    error,
    loading,
    sendCTMLOperation
  }
}
export default useSendCTML;
