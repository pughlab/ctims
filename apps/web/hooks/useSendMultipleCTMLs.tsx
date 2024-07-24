import {useEffect, useState} from 'react';
import useAxios from "./useAxios";

const useSendMultipleCTMLs = () => {

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { operation, error: axiosError } = useAxios();

  useEffect(() => {
    if (axiosError) {
      setError(axiosError)
    }
  }, [axiosError]);

  const sendMultipleCTMLsOperation = async (selectedCTMLs: string[]) => {
    setLoading(true);
    // convert the string array of json strings into array of json objects
    const ctmlModelCopy = selectedCTMLs.map(ctml => JSON.parse(ctml));
    try {
      const accessToken = localStorage.getItem('ctims-accessToken');
      const headers = {
        'Authorization': 'Bearer ' + accessToken,
      }
      const ret = await operation({
        method: 'post',
        url: `/ctml-jsons/send_multiples_to_matchminer`,
        headers,
        data: ctmlModelCopy
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
    sendMultipleCTMLsOperation
  }
}
export default useSendMultipleCTMLs;
