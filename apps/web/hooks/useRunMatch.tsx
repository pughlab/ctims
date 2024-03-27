import getConfig from 'next/config';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useSession} from 'next-auth/react';

const useRunMatch = () => {
  const {publicRuntimeConfig} = getConfig();
  axios.defaults.baseURL = publicRuntimeConfig.REACT_APP_API_URL || "http://localhost:3333/api"

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {data,status} = useSession()

  useEffect(() => {
    if(status === 'unauthenticated') {
      router.push('/');
    }
  }, [status])

  const runMatchOperation = async (trial_internal_ids: string) => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem('ctims-accessToken');
      const headers = {
        'Authorization': 'Bearer ' + accessToken,
      }
      const matchRun = await axios.request({
        method: 'get',
        url: `/ctml-jsons/mm/run_match?trial_internal_ids=${trial_internal_ids}`,
        headers,
      })
      console.log('response: ' + JSON.stringify(matchRun));
      setResponse(matchRun);
    } catch (error) {
      setLoading(false)
      console.log('there is an error', error, 'response', error.response);
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
    runMatchOperation
  }
}
export default useRunMatch;
