import getConfig from 'next/config';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {signOut, useSession} from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';
import process from "process";

const useDeleteTrial = () => {
  const { publicRuntimeConfig } = getConfig();
  axios.defaults.baseURL = publicRuntimeConfig.REACT_APP_API_URL || "http://localhost:3333/api"

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {data, status} = useSession()

  useEffect(() => {
    if(status === 'unauthenticated') {
      // router.push('/');
      signOut({redirect: false}).then(() => {
        router.push(process.env.NEXT_PUBLIC_SIGNOUT_REDIRECT_URL as string || '/');
      });
    }
  }, [status])

  const deleteTrialOperation = async (trialId: number) => {
    setLoading(true);
    const accessToken = localStorage.getItem('ctims-accessToken');
    const headers = {
      'Authorization': 'Bearer ' + accessToken,
    }

    try {
      const response = await axios.request({
        method: 'delete',
        url: `/trials/${trialId}`,
        headers
      });
      setResponse(uuidv4());
    }
    catch (error) {
      setLoading(false)
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
