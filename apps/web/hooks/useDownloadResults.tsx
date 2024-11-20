import {useState} from 'react';
import useAxios from "./useAxios";

const useDownloadResults = () => {

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { operation } = useAxios();

  const getDownloadResultsOperation = async (trialId) => {
    setLoading(true);
    const accessToken = localStorage.getItem('ctims-accessToken');
    const headers = {
      'Authorization': 'Bearer ' + accessToken,
    }

    try {
      const csvBlob = await operation({
        method: 'post',
        url: `/trial-result/${trialId}/export`,
        headers,
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
