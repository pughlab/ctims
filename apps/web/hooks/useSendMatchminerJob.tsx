import {useEffect, useState} from 'react';
import useAxios from "./useAxios";

const useSendMatchminerJob = () => {

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { operation, error: axiosError } = useAxios();

  useEffect(() => {
    if (axiosError) {
      setError(axiosError)
    }
  }, [axiosError]);

  const sendMatchJobOperation = async (trial_internal_ids: string[]) => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem('ctims-accessToken');
      const headers = {
        'Authorization': 'Bearer ' + accessToken,
      }
      const ret = await operation({
        method: 'post',
        url: `/matchminer/trial_match_jobs`,
        headers,
        data: trial_internal_ids
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
    sendMatchJobOperation
  }
}
export default useSendMatchminerJob;
