import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useAxios from "./useAxios";

const useDeleteTrial = () => {

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { operation } = useAxios();

  const deleteTrialOperation = async (trialId: number) => {
    setLoading(true);
    const accessToken = localStorage.getItem('ctims-accessToken');
    const headers = {
      'Authorization': 'Bearer ' + accessToken,
    }

    try {
      const response = await operation({
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
