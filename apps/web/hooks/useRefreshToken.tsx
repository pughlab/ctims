import getConfig from "next/config";
import axios from "axios";
import {useState} from "react";

const useRefreshToken = () => {
  const { publicRuntimeConfig } = getConfig();
  axios.defaults.baseURL = publicRuntimeConfig.REACT_APP_API_URL || "http://localhost:3333/api"

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const refreshTokenOperation = async () => {
    const accessToken = localStorage.getItem('ctims-accessToken');
    const headers = {
      'Authorization': 'Bearer ' + accessToken,
    }

    try {
      const response = await axios.request({
        method: 'get',
        url: `/auth/refresh`,
        headers,
      });
      const token: any = response.data;
      localStorage.setItem('ctims-accessToken', token.accessToken);
      setResponse(token);
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

  return {response, error, loading, refreshTokenOperation};
}
export default useRefreshToken;
