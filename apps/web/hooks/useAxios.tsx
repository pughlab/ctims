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

  const {data} = useSession()

  const router = useRouter();

  // let count = 0;
  // axios.interceptors.response.use(
  //   response,
  //   async error => {
  //     // console.log('error in useAxios', error)
  //     // console.log('status text', error.statusText)
  //     // console.log('error message', error.message)
  //     // console.log('err response data', error.response.data);
  //     // console.log('err response status', error.response.status);
  //     // console.log('err response header', error.response.headers)
  //     if (error.response && error.response.status === 401 && error.response.data.message === "jwt expired") {
  //       console.log('unauthenticated')
  //       // try to refresh token
  //       if (count === 0) {
  //         console.log('this is called')
  //         count++;
  //         await refreshTokenOperation();
  //
  //         setTimeout(() => {
  //           count = 0;
  //         }, 2000);
  //       }
  //
  //       if (refreshTokenError) {
  //         console.log('refreshTokenError', refreshTokenError)
  //         signOut({redirect: false}).then(() => {
  //           router.push(process.env.NEXT_PUBLIC_SIGNOUT_REDIRECT_URL as string || '/');
  //         });
  //         return Promise.reject(refreshTokenError);
  //       }
  //       return Promise.reject(error);
  //     }
  //     return Promise.reject(error);
  //   }
  // )

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
        setError(error.response.data);
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
