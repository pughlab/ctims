import {useState} from 'react';
import {TrialStatusEnum} from "../../../libs/types/src/trial-status.enum";
import useAxios from "./useAxios";

const useGetMatchResults = () => {

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { operation } = useAxios();

  const getMatchResultsOperation = async (trials: any[]) => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem('ctims-accessToken');
      const headers = {
        'Authorization': 'Bearer ' + accessToken,
      }

      // join each trials.trial_internal_id with a comma
      const trial_internal_ids = trials.filter((trial: any) => trial.trial_internal_id)
        .map((trial: any) => trial.trial_internal_id)
        .join(',');

      const trialsWithResults = await operation({
        method: 'post',
        url: `/trial-result/fetch`,
        data: {trial_internal_ids: trial_internal_ids},
        headers
      })

      // Only return trials that are pending or matched
      const filteredTrials = trials.filter((trial: any) =>
        trial.trial_status === TrialStatusEnum.PENDING || trial.trial_status === TrialStatusEnum.MATCHED);
      const mapped = filteredTrials.map((filteredTrial: any) => {
        // lookup the trial with results
        const trialWithResult = trialsWithResults.data.find(trial => trial.nct_id === filteredTrial.nct_id);
        if (trialWithResult) {
          const createdAtDate = new Date(trialWithResult.createdAt);
          const updatedAtDate = new Date(trialWithResult.updatedAt);
          const matchSentDate = trialWithResult.matchSentDate ? new Date(trialWithResult.matchSentDate) : "";
          const matchedDateFormatted = trialWithResult.matchedDate ? new Date(trialWithResult.matchedDate).toLocaleString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric'
                }) : null;
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
          const matchSentDateFormatted = matchSentDate.toLocaleString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
              });
          const ctml_status_label = trialWithResult.ctml_status;
          const trial_status_label = trialWithResult.status;
          const status_label = filteredTrial.trial_status;
          const trial_ret_count = trialWithResult.trialRetCount;
          return {
            ...filteredTrial,
            trialStatus: status_label,
            createdAt: createdAtFormatted,
            updatedAt: updatedAtFormatted,
            matchedDate: matchedDateFormatted,
            ctml_status_label,
            trial_status_label,
            trialRetCount: trial_ret_count,
            matchSentDate: matchSentDateFormatted
          };
        } else {
          const status_label = filteredTrial.trial_status;
          return {
            ...filteredTrial,
            trialStatus: status_label
          };
        }
      });
      console.log('mapped', mapped);
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
