import getConfig from 'next/config';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {signOut, useSession} from 'next-auth/react';
import process from "process";
import useAxios from "./useAxios";

const useDownloadResults = () => {
  // const {publicRuntimeConfig} = getConfig();
  // axios.defaults.baseURL = publicRuntimeConfig.REACT_APP_API_URL || "http://localhost:3333/api"

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {data,status} = useSession()

  const { operation } = useAxios();

  // useEffect(() => {
  //   if(status === 'unauthenticated') {
  //     // router.push('/');
  //     signOut({redirect: false}).then(() => {
  //       router.push(process.env.NEXT_PUBLIC_SIGNOUT_REDIRECT_URL as string || '/');
  //     });
  //   }
  // }, [status])

  const getDownloadResultsOperation = async (trialId) => {
    setLoading(true);
    const accessToken = localStorage.getItem('ctims-accessToken');
    const headers = {
      'Authorization': 'Bearer ' + accessToken,
    }

    try {
      const csvBlob = await operation({
        method: 'post',
        url: `/trial-result/${trialId}/export`,
        headers,
      });
      console.log(csvBlob.data);
      setResponse(csvBlob.data);
    } catch (error) {
      setLoading(false)
      if (error.response) {
        setError(error.response.data);
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    response,
    error,
    loading,
    getDownloadResultsOperation
  }
}
export default useDownloadResults;
