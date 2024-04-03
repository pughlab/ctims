import {useEffect, useState} from "react";
import axios, {AxiosRequestConfig} from "axios";
import {signOut, useSession} from "next-auth/react";
import useRefreshToken from "./useRefreshToken";
import { useRouter } from 'next/router';

const useAxios = () => {

  axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:3333/api"

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // count to retry once
  let [count, setCount] = useState(0);

  const { error: refreshTokenError, response: refreshTokenResponse, loading: refreshTokenLoading, refreshTokenOperation } = useRefreshToken();

  const router = useRouter();

  useEffect(() => {
    if (error === 'unauthenticated') {
      // signOut({redirect: false}).then(() => {
      //   router.push(process.env.NEXT_PUBLIC_SIGNOUT_REDIRECT_URL as string || '/');
      // });
    }
  }, []);

  const operation = async(params: AxiosRequestConfig): Promise<any> => {
    // params.headers = {
    //   'Authorization': 'Bearer ' + data['accessToken'],
    // }

    return axios.request(params).then(response => {
      setResponse(response);
      return response;
    }).catch(async error => {
      console.log('response', error.response)
      if (error.response) {
        // setError(error.response.data);
        if (error.response.data.message === 'jwt expired') {
          // retry once
          if (count === 0) {
            count++;
            refreshTokenOperation().then(() => {
              if (!refreshTokenError) {
                const accessToken = localStorage.getItem('ctims-accessToken');
                params.headers = {
                    'Authorization': 'Bearer ' + accessToken,
                }
                return axios.request(params).then(response => {
                  setCount(0);
                  setResponse(response);
                  return response;
                }).catch(error => {
                  setError(error.response.data);
                }).finally(() => {
                  setLoading(false);
                });
              }
            });
          } else {
            setError(error.response.data);
          }
        }
      } else {
        setError(error);
      }
    })
      .finally(() => {
        setLoading(false);
      })
  };

  return { response, error, loading, operation };
}

export default useAxios;
