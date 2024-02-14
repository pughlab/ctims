import getConfig from 'next/config';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useSession} from 'next-auth/react';
import useRefreshToken from "./useRefreshToken";

const useDownloadResults = () => {
  const { refreshTokenOperation } = useRefreshToken();

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

  const getDownloadResultsOperation = async (trialId, nct_id) => {
    setLoading(true);
    const accessToken = localStorage.getItem('ctims-accessToken');
    const headers = {
      'Authorization': 'Bearer ' + accessToken,
    }

    try {
      const csvBlob = await axios.request({
        method: 'post',
        url: `/trial-result/${trialId}/export`,
        headers,
      });
      console.log(csvBlob.data);
      setResponse(csvBlob.data);
    } catch (error) {
      setLoading(false)
      if (error.response) {
        setError(error.response.data);
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
      refreshTokenOperation();
    }
  }

  return {
    response,
    error,
    loading,
    getDownloadResultsOperation
  }
}
export default useDownloadResults;
