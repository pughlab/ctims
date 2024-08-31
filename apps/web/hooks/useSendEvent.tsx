import {useEffect, useState} from 'react';
import useAxios from "./useAxios";

/*
 * temporary call to backend to record browser event for debugging
 */
const useSendEvent = () => {

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { operation, error: axiosError } = useAxios();

  useEffect(() => {
    if (axiosError) {
      setError(axiosError)
    }
  }, [axiosError]);

  const sendEventOperation = async (msg: string) => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem('ctims-accessToken');
      const headers = {
        'Authorization': 'Bearer ' + accessToken,
      }
      const ret = await operation({
        method: 'post',
        url: `/ctml-jsons/send_msg`,
        headers,
        data: msg
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
    sendEventOperation
  }
}
export default useSendEvent;
