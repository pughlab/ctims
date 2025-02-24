import { useState } from 'react';
import { getCtmlStatusLabel } from '../../../libs/types/src/CtmlStatusLabels';
import useAxios from "./useAxios";

const useGetTrialsForUsersInGroup = () => {

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { operation } = useAxios();

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

      // Sort the trials by updatedAt before mapping
      const sortedTrials = [...userTrials.data].sort((a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

      const mapped = sortedTrials.map((trial) => {
        let createdAtDate = new Date(trial.createdAt)
        let updatedAtDate = new Date(trial.updatedAt)

        // Store raw dates for sorting
        const rawUpdatedAt = trial.updatedAt;
        const rawCreatedAt = trial.createdAt;

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
          _rawUpdatedAt: rawUpdatedAt,  // Keep raw date for sorting
          _rawCreatedAt: rawCreatedAt,  // Keep raw date for sorting
          ctml_status_label,
          user: trial.user,
          lockStatus: trial.trial_lock[0] ? "Locked" : "Unlocked",
          lockedUser: trial.trial_lock[0] ? trial.trial_lock[0].user.first_name +" " +trial.trial_lock[0].user.last_name : "unlocked"
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
