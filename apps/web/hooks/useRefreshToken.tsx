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
    console.log('refresh was called')
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
      console.log('-----------------got token', token)
      localStorage.setItem('ctims-accessToken', token.accessToken as string);
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
