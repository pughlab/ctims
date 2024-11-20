import {useState} from "react";
import { getCtmlStatusLabel } from "../../../libs/types/src/CtmlStatusLabels";
import useAxios from "./useAxios";

const useGetUserTrials = () => {

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { operation } = useAxios();

  const getAllTrialsOperation = async () => {
    const accessToken = localStorage.getItem('ctims-accessToken');
    const headers = {
      'Authorization': 'Bearer ' + accessToken,
    }

    try {
      const userTrials = await operation({
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
