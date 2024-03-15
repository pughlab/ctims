import axios from "axios";
import {signOut, useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import getConfig from 'next/config';
import { getCtmlStatusLabel } from "../../../libs/types/src/CtmlStatusLabels";
import process from "process";

const useGetUserTrials = () => {
  const { publicRuntimeConfig } = getConfig();
  axios.defaults.baseURL = publicRuntimeConfig.REACT_APP_API_URL || "http://localhost:3333/api"

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {data, status} = useSession()

  useEffect(() => {
    if(status === 'unauthenticated') {
      // router.push('/');
      signOut({redirect: false}).then(() => {
        router.push(process.env.NEXT_PUBLIC_SIGNOUT_REDIRECT_URL as string || '/');
      });
    }
  }, [status])


  const getAllTrialsOperation = async () => {
    const accessToken = localStorage.getItem('ctims-accessToken');
    const headers = {
      'Authorization': 'Bearer ' + accessToken,
    }

    try {
      const userTrials = await axios.request({
        method: 'get',
        url: `/users/trials`,
        headers
      })
      const mapped = userTrials.data.map((trial) => {
        let createdAtDate = new Date(trial.createdAt)
        let updatedAtDate = new Date(trial.updatedAt)
        const createdAtFormatted = createdAtDate.toLocaleString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        });
        const updatedAtFormatted = updatedAtDate.toLocaleString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        });
        const ctml_status_label = getCtmlStatusLabel(trial.status);
        return {
          ...trial,
          createdAt: createdAtFormatted,
          updatedAt: updatedAtFormatted,
          ctml_status_label
        }
      })
      setResponse(mapped)
    } catch (error) {
      if(error.response) {
        setError(error.response.data);
      } else {
        setError(error);
      }
    }
    finally {
      setLoading(false);
    }
  }

  return {response, error, loading, getAllTrialsOperation}

};
export default useGetUserTrials;
