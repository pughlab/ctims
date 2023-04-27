import {useState} from "react";
import axios, {AxiosRequestConfig} from "axios";
import {useSession} from "next-auth/react";

const useAxios = () => {

  axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:3333/api"

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {data} = useSession()


  const operation = async(params: AxiosRequestConfig) => {
    params.headers = {
      'Authorization': 'Bearer ' + data['accessToken'],
    }
    axios.request(params).then(response => {
      setResponse(response.data);
    }).catch(error => {
      console.log('response', error.response)
      if(error.response) {
        setError(error.response.data);
      } else {
        setError(error);
      }
    })
      .finally(() => {
        setLoading(false);
      })
  };

  return { response, error, loading, operation };
}

export default useAxios;
