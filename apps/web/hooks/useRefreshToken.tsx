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
    if (!accessToken) {
      return;
    }
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
      const oldToken = localStorage.getItem('ctims-accessToken');
      localStorage.setItem('ctims-accessToken', token.accessToken as string);
      const newToken = localStorage.getItem('ctims-accessToken');
      console.log('useRefreshToken:',new Date().toLocaleString(), oldToken?.slice(-6), newToken?.slice(-6));
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
