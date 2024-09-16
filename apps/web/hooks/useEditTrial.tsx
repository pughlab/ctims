import {useEffect, useState} from "react";
import useAxios from "./useAxios";

const useEditTrial = () => {

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { operation, error: axiosError } = useAxios();

  useEffect(() => {
    if (axiosError) {
      setError(axiosError)
    }
  }, [axiosError]);

  const editTrialOperation = async (trialId: string) => {
    setLoading(true);
    const accessToken = localStorage.getItem('ctims-accessToken');
    const headers = {
      'Authorization': 'Bearer ' + accessToken,
    }

    try {
      const trialResponse = await operation({
        method: 'get',
        url: `/trials/${trialId}`,
        headers,
      });
      let updatedAtDate = new Date(trialResponse.data.updatedAt)
      let updatedAtFormatted = updatedAtDate.toLocaleString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      });
      const mappedTrialResponse = {
        ...trialResponse.data,
        updatedAt: updatedAtFormatted
      }

      const trial: any = mappedTrialResponse;
      setResponse(trial);
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

  return {response, error, loading, editTrialOperation};

}
export default useEditTrial;
