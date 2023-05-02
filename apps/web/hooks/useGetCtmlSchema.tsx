import axios, {AxiosRequestConfig} from "axios";
import {useState} from "react";
import {useSession} from "next-auth/react";

const useGetCtmlSchema = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {data} = useSession()

  const SCHEMA_VERSION = 1;

  const getCtmlSchemaOperation = async() => {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:3333/api"

    axios.request({
      method: 'get',
      url: `/ctml-schemas/schema-version/${SCHEMA_VERSION}`,
      headers: {
        'Authorization': 'Bearer ' + data['accessToken'],
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
