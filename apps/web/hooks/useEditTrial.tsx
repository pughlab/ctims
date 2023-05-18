import getConfig from "next/config";
import axios from "axios";
import {useState} from "react";

const useEditTrial = () => {
  const { publicRuntimeConfig } = getConfig();
  axios.defaults.baseURL = publicRuntimeConfig.REACT_APP_API_URL || "http://localhost:3333/api"

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const editTrialOperation = async (trialId: string) => {
    console.log('editTrialOperation trialId', trialId)
    const accessToken = localStorage.getItem('ctims-accessToken');
    const headers = {
      'Authorization': 'Bearer ' + accessToken,
    }

    try {
      const response = await axios.request({
        method: 'get',
        url: `/trials/${trialId}`,
        headers,
      });
      const trial: any = response.data;
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
