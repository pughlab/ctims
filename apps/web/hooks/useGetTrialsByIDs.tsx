import {useEffect, useState} from "react";
import useAxios from "./useAxios";

const useGetTrialsByIDs = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { operation, error: axiosError} = useAxios();

  useEffect(() => {
    if (axiosError) {
      setError(axiosError)
    }
  }, [axiosError]);

  const getTrialsByIDsOperation = async (trialIDList: string[]) => {
    const accessToken = localStorage.getItem('ctims-accessToken');
    const headers = {
      'Authorization': 'Bearer ' + accessToken,
    }

    try {
      const userTrials = await operation({
        method: 'post',
        url: `/trials/trialsByIds`,
        data: { trialIDList: trialIDList },
        headers
      })
      setResponse(userTrials)
    } catch (error) {
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

  return {response, error, loading, getTrialsByIDsOperation}
};

export default useGetTrialsByIDs;
