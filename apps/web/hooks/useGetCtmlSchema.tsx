import axios, {AxiosRequestConfig} from "axios";
import {useState} from "react";
import {useSession} from "next-auth/react";
import {store} from "../store/store";
import getConfig from 'next/config';

const useGetCtmlSchema = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {data} = useSession()

  const getCtmlSchemaOperation = async() => {

    const state = store.getState();
    const schemaVersion = state.context.schema_version

    const { publicRuntimeConfig } = getConfig();
    axios.defaults.baseURL = publicRuntimeConfig.REACT_APP_API_URL || "http://localhost:3333/api"
    const accessToken = localStorage.getItem('ctims-accessToken');

    axios.request({
      method: 'get',
      url: `/ctml-schemas/schema-version/${schemaVersion}`,
      headers: {
        'Authorization': 'Bearer ' + accessToken,
      },
    })
      .then(response => {
        setResponse(response.data);
      })
      .catch(error => {
        if(error.response) {
          setError(error.response.data);
        } else {
          setError(error);
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }

  return { response, error, loading, operation: getCtmlSchemaOperation };
}
export default useGetCtmlSchema;
