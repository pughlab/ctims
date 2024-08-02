
import {useEffect, useState} from "react";
import useAxios from "./useAxios";

const useGetTrialLock = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { operation, error: axiosError } = useAxios();

  useEffect(() => {
    if (axiosError) {
      setError(axiosError)
    }
  }, [axiosError]);

  const getTrialLockOperation = async (trialId: string) => {
    setLoading(true);
    const accessToken = localStorage.getItem('ctims-accessToken');
    const headers = {
      'Authorization': 'Bearer ' + accessToken,
    }

    try {
      const trialLockResponse = await operation({
        method: 'get',
        url: `/trial-lock/${trialId}`,
        headers,
      });
      setResponse(trialLockResponse);
    }
    catch (error) {
      console.log('response', error.response)
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

  return {response, error, loading, getTrialLockOperation};

}
export default useGetTrialLock;
