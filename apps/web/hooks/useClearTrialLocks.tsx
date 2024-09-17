import { useEffect, useState } from 'react';
import useAxios from "./useAxios";

const useClearTrialLocks = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { operation, error: axiosError } = useAxios();

  useEffect(() => {
    if (axiosError) {
      setError(axiosError)
    }
  }, [axiosError]);

  const clearTrialLocksOperation = async () => {
    setLoading(true);
    const accessToken = localStorage.getItem('ctims-accessToken');
    const headers = {
      'Authorization': 'Bearer ' + accessToken,
    }

    try {
      const clearLockResponse = await operation({
        method: 'post',
        url: `/trial-lock/release-user-locks`,
        headers,
      });
      setResponse(clearLockResponse);
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

  return {response, error, loading, clearTrialLocksOperation};

}
export default useClearTrialLocks;
