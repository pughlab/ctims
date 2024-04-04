import getConfig from 'next/config';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {signOut, useSession} from 'next-auth/react';
import { getCtmlStatusLabel } from '../../../libs/types/src/CtmlStatusLabels';
import process from "process";
import useAxios from "./useAxios";

const useGetTrialsForUsersInGroup = () => {
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

  const getTrialsForUsersInGroupOperation = async (groupId) => {
    setLoading(true)
    const accessToken = localStorage.getItem('ctims-accessToken');
    const headers = {
      'Authorization': 'Bearer ' + accessToken,
    }
    try {

      const userTrials = await operation({
        method: 'get',
        url: `/trial-group/${groupId}`,
        headers
      });

      const mapped = userTrials.data.map((trial) => {
        let createdAtDate = new Date(trial.createdAt)
        let updatedAtDate = new Date(trial.updatedAt)
        let createdAtFormatted = createdAtDate.toLocaleString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        });
        createdAtFormatted += ` by ${trial.user.first_name} ${trial.user.last_name}`
        let updatedAtFormatted = updatedAtDate.toLocaleString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        });
        updatedAtFormatted += ` by ${trial.modifiedBy.first_name} ${trial.modifiedBy.last_name}`
        const ctml_status_label = getCtmlStatusLabel(trial.status);
        return {
          ...trial,
          createdAt: createdAtFormatted,
          updatedAt: updatedAtFormatted,
          ctml_status_label,
          user: trial.user
        }
      })
      setResponse(mapped)
    }
    catch (error) {
      setLoading(false)
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

  return {
    response,
    error,
    loading,
    getTrialsForUsersInGroupOperation
  }
}
export default useGetTrialsForUsersInGroup;
