import axios, {AxiosRequestConfig} from "axios";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {store} from "../store/store";
import getConfig from 'next/config';
import {useRouter} from "next/router";
import useRefreshToken from "./useRefreshToken";

const useGetCtmlSchema = () => {
  const { refreshTokenOperation } = useRefreshToken();

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {data,status} = useSession()

  useEffect(() => {
    if(status === 'unauthenticated') {
      router.push('/');
    }
  }, [status])

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
        refreshTokenOperation();
      })
  }

  return { response, error, loading, operation: getCtmlSchemaOperation };
}
export default useGetCtmlSchema;
