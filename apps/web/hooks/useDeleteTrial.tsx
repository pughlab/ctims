import getConfig from 'next/config';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';

const useDeleteTrial = () => {
  const { publicRuntimeConfig } = getConfig();
  axios.defaults.baseURL = publicRuntimeConfig.REACT_APP_API_URL || "http://localhost:3333/api"

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {data} = useSession()

  useEffect(() => {
    if(!data) {
      router.push('/');
    }
  }, [data])

  const deleteTrialOperation = async (trialId: number) => {
    const accessToken = localStorage.getItem('ctims-accessToken');
    const headers = {
      'Authorization': 'Bearer ' + accessToken,
    }

    try {
      setLoading(true);
      const response = await axios.request({
        method: 'delete',
        url: `/trials/${trialId}`,
        headers
      });
      setResponse(uuidv4());
    }
    catch (error) {
      if(error.response) {
        setError(error.response.data);
      } else {
        setError(error);
      }
    }
    finally {
      setLoading(false);
    }
  }

  return {response, error, loading, deleteTrialOperation}

}
export default useDeleteTrial;
