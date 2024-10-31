import {useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import useAxios from "./useAxios";

const useSendCTML = () => {

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const trialId = useSelector((state: RootState) => state.context.trialId);
  const ctmlModel = useSelector((state: RootState) => state.finalModelAndErrors.ctmlModel);

  const { operation } = useAxios();

  const move = () => {
    let ctmlModelCopy;
    const age_group = ctmlModel.age_group;
    const trialInformation = ctmlModel.trialInformation;
    ctmlModelCopy = {'trial_list' : [{...ctmlModel, ...trialInformation, ...age_group}]};
    delete ctmlModelCopy.age_group;
    delete ctmlModelCopy.trialInformation;
    delete ctmlModelCopy.ctml_status;
    console.log("ctmlModelCopy",ctmlModelCopy)
    return ctmlModelCopy;
  }

  const sendCTMLOperation = async () => {
    setLoading(true);
    const ctmlModelCopy = move();
    try {
      const accessToken = localStorage.getItem('ctims-accessToken');
      const headers = {
        'Authorization': 'Bearer ' + accessToken,
      }
      const ret = await operation({
        method: 'post',
        url: `/ctml-jsons/${trialId}/send_to_matchminer`,
        headers,
        data: ctmlModelCopy
      });
      setResponse(ret);
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
    sendCTMLOperation
  }
}
export default useSendCTML;
