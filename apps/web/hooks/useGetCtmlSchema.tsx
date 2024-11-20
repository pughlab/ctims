import {useState} from "react";
import {store} from "../store/store";
import useAxios from "./useAxios";

const useGetCtmlSchema = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { operation } = useAxios();

  const getCtmlSchemaOperation = async() => {

    const state = store.getState();
    const schemaVersion = state.context.schema_version

    const accessToken = localStorage.getItem('ctims-accessToken');

    await operation({
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
