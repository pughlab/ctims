import getConfig from 'next/config';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useSession} from 'next-auth/react';
import MatchResult from "../model/MatchResult";
import {getCtmlStatusLabel} from "../../../libs/types/src/CtmlStatusLabels";

const useGetMatchResults = () => {
  const {publicRuntimeConfig} = getConfig();
  axios.defaults.baseURL = publicRuntimeConfig.REACT_APP_MM_API_URL || "http://localhost:5000/api"

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {data} = useSession()

  useEffect(() => {
    if (!data) {
      router.push('/');
    }
  }, [data])

  const getMatchResultsOperation = async () => {
    setLoading(true);
    try {
      const matchResults = await axios.request({
        method: 'get',
        url: `/trial_match`,
      });

      console.log(matchResults.data._items);
      const mapped = matchResults.data._items.map((result) => {
        let val: MatchResult = {
          trialId: result.protocol_no,
          nickName: result.nickName,
          pi: result.pi,
          status: result.status,
          createdOn: result.createdOn,
          modifiedOn: result.modifiedOn,
          matchDate: result._update
        }
        return val;
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
