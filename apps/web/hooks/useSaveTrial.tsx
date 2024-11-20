import axios from "axios";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {selectedTrialGroupId, setTrialId} from "../store/slices/contextSlice";
import {store} from "../store/store";
import useAxios from "./useAxios";
import {SELECTED_TRIAL_GROUP_ID} from "../constants/appConstants";


const useSaveTrial = () => {

  const schemaVersion = useSelector((state: RootState) => state.context.schema_version);
  const trialId = useSelector((state: RootState) => state.context.trialId);

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { operation, error: axiosError } = useAxios();

  useEffect(() => {
    if (axiosError) {
      setError(axiosError)
    }
  }, [axiosError]);

  const saveTrialOperation = async (trialModel: any, ctmlJson: any) => {
    const state = store.getState();
    let group_id = state.context.seletedTrialGroupId;
    if (!group_id) {
      group_id = sessionStorage.getItem(SELECTED_TRIAL_GROUP_ID)
      dispatch(selectedTrialGroupId(group_id));
    }
    const accessToken = localStorage.getItem('ctims-accessToken');
    const headers = {
      'Authorization': 'Bearer ' + accessToken,
    }

    try {
     const trialResponse =  await operation({
        method: 'patch',
        url: `/trials/${trialId}`,
        headers,
        data: {ctml_schema_version: schemaVersion, group_id, ...trialModel}
      });

     console.log('useSaveTrial trialResponse', trialResponse)
      if (trialResponse) {
        let updatedAtDate = new Date(trialResponse.data.updatedAt)
        console.log('useSaveTrial trialResponse2', trialResponse)
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


        dispatch(setTrialId(trialResponse.data.id));

        const updateCtmlResponse = await axios.request({
          method: 'patch',
          url: `/ctml-jsons`,
          headers,
          data: {
            version: schemaVersion,
            data: ctmlJson,
            trialId: trialId === 0 ? trialResponse.data.id : trialId
          }
        });

        setResponse(mappedTrialResponse)
      }
    } catch (error) {
      console.log('err response', error)
      if(error.response) {
        setError(error.response.data);
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }

  };

  return { response, error, loading, saveTrialOperation };

}
export default useSaveTrial;
