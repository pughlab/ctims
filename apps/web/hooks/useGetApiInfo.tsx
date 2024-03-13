import axios, {AxiosRequestConfig} from "axios";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import getConfig from 'next/config';
import {useRouter} from "next/router";

const useGetApiInfo = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const getApiInfoOperation = async() => {

    const { publicRuntimeConfig } = getConfig();
    axios.defaults.baseURL = publicRuntimeConfig.REACT_APP_API_URL || "http://localhost:3333/api"

    axios.request({
      method: 'get',
      url: `/info`,
    })
      .then(response => {
        setResponse(response.data.version);
      })
      .catch(error => {
        if(error.response) {
          setError(error.response.data);
        } else {
          setError(error);
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }

  return { response, error, loading, operation: getApiInfoOperation };
}
export default useGetApiInfo;
