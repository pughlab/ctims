import {useEffect, useState} from "react";
import axios, {AxiosRequestConfig} from "axios";
import {signOut} from "next-auth/react";
import { useRouter } from 'next/router';
import getConfig from "next/config";
import {store} from "../store/store";
import {logout} from "../pages/api/auth/[...nextauth]";

const useAxios = () => {

  const { publicRuntimeConfig } = getConfig();
  axios.defaults.baseURL = publicRuntimeConfig.REACT_APP_API_URL || "http://localhost:3333/api"

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (error) {
      if (error.statusCode === 401) {
        signOut({redirect: false}).then(() => {
          store.dispatch(logout());
          router.push(process.env.NEXT_PUBLIC_SIGNOUT_REDIRECT_URL as string || '/');
        });
      }
    }
  }, [error]);

  const operation = async (params: AxiosRequestConfig) => {
    // params.headers = {
    //   'Authorization': 'Bearer ' + data['accessToken'],
    // }
    try {
      const res = await axios.request(params);
      setResponse(res);
      return res;
    } catch (error) {
      console.log('useAxios err response', error.response)
      if (error.response) {
        setError(error.response.data)
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return {response, error, loading, operation};
}

export default useAxios;
