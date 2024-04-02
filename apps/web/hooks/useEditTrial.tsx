import getConfig from "next/config";
import axios from "axios";
import {useEffect, useState} from "react";
import {signOut, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import process from "process";
import useAxios from "./useAxios";

const useEditTrial = () => {
  // const { publicRuntimeConfig } = getConfig();
  // axios.defaults.baseURL = publicRuntimeConfig.REACT_APP_API_URL || "http://localhost:3333/api"

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {data, status} = useSession()

  const { operation } = useAxios();

  // useEffect(() => {
  //   if(status === 'unauthenticated') {
  //     // router.push('/');
  //     signOut({redirect: false}).then(() => {
  //       router.push(process.env.NEXT_PUBLIC_SIGNOUT_REDIRECT_URL as string || '/');
  //     });
  //   }
  // }, [status])

  const editTrialOperation = async (trialId: string) => {
    setLoading(true);
    console.log('editTrialOperation trialId', trialId)
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
