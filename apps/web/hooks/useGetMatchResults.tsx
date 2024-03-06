import getConfig from 'next/config';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {signOut, useSession} from 'next-auth/react';
import {getCtmlStatusLabel} from "../../../libs/types/src/CtmlStatusLabels";
import {getTrialStatusLabel} from "../../../libs/types/src/TrialStatusLabels";
import process from "process";

const useGetMatchResults = () => {
  const {publicRuntimeConfig} = getConfig();
  axios.defaults.baseURL = publicRuntimeConfig.REACT_APP_API_URL || "http://localhost:3333/api"

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {data,status} = useSession()

  useEffect(() => {
    if(status === 'unauthenticated') {
      // router.push('/');
      signOut({redirect: false}).then(() => {
        router.push(process.env.NEXT_PUBLIC_SIGNOUT_REDIRECT_URL as string || '/');
      });
    }
  }, [status])

  const getMatchResultsOperation = async (trials: []) => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem('ctims-accessToken');
      const headers = {
        'Authorization': 'Bearer ' + accessToken,
      }

      // join each trials.protocol_no with a comma
      const protocol_nos = trials.filter((trial: any) => trial.protocol_no)
        .map((trial: any) => trial.protocol_no)
        .join(',');

      const trialsWithResults = await axios.request({
        method: 'get',
        url: `/trial-result/?protocol_nos=${protocol_nos}`,
        headers
      })
      const mapped = trialsWithResults.data.map((trial) => {
        let createdAtDate = new Date(trial.createdAt)
        let updatedAtDate = new Date(trial.updatedAt)
        let matchedDateFormatted = null;
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
        if (trial.matchedDate) {
          let matchedDate = new Date(trial.matchedDate);
          matchedDateFormatted = matchedDate.toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          });
        }
        const ctml_status_label = getCtmlStatusLabel(trial.status);
        const trial_status_label = getTrialStatusLabel(trial.status);
        return {
          ...trial,
          createdAt: createdAtFormatted,
          updatedAt: updatedAtFormatted,
          matchedDate: matchedDateFormatted,
          ctml_status_label,
          trial_status_label
        }
      });
      setResponse(mapped);
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
    getMatchResultsOperation
  }
}
export default useGetMatchResults;
