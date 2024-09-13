import { useEffect, useState } from 'react';
import useAxios from "./useAxios";

const useUpdateTrialLock = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { operation, error: axiosError } = useAxios();

  useEffect(() => {
    if (axiosError) {
      setError(axiosError)
    }
  }, [axiosError]);

  const updateTrialLockOperation = async (trialId: number) => {
    setLoading(true);
    const accessToken = localStorage.getItem('ctims-accessToken');
    const headers = {
      'Authorization': 'Bearer ' + accessToken,
    }

    try {
      const updateLockResponse = await operation({
        method: 'patch',
        url: `/trial-lock/${trialId}/update`,
        headers,
      });
      setResponse(updateLockResponse);
    }
    catch (error) {
      if(error.response) {
        setError(error.response.data);
      } else {
        setError(error.message);
      }
    }
    finally {
      setLoading(false);
    }
  }

  return {response, error, loading, updateTrialLockOperation};

}
export default useUpdateTrialLock;
