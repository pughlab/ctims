import getConfig from 'next/config';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useSession} from 'next-auth/react';

const useDownloadResults = () => {
  const {publicRuntimeConfig} = getConfig();
  axios.defaults.baseURL = publicRuntimeConfig.REACT_APP_MM_API_URL || "http://localhost:5000/api"

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {data} = useSession()

  useEffect(() => {
    if (!data) {
      router.push('/');
    }
  }, [data])

  const getDownloadResultsOperation = async () => {
    setLoading(true);
    try {
      const csvBlob = await axios.request({
        method: 'get',
        url: `/trial_download`,
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
