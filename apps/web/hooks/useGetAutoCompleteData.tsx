import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAxios from "./useAxios";

const useGetAutoCompleteData = (autoCompleteType: any) => {
  const [filteredAutoCompleteSymbols, setFilteredAutoCompleteSymbols] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { operation } = useAxios();

  const searchAutoCompleteSymbols = async (query) => {
    try {
      setLoading(true);
      if(autoCompleteType=="AgentDrug"){
        var response = await operation(
          {
            method: 'get',
            url: `agents/agentdrug?query=${query}`
          }
          );
      }
      else if(autoCompleteType=="AgentClass"){
        var response = await operation(
          {
            method: 'get',
            url: `agents/agentclass?query=${query}`
          }
          );
      }
      else if(autoCompleteType=="Gene"){
        var response = await operation(
          {
            method: 'get',
            url: `genes?query=${query}`
          }
          );
      }
      const symbols = response.data;
      setFilteredAutoCompleteSymbols(symbols);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        setError(error.response.data);
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    filteredAutoCompleteSymbols,
    error,
    loading,
    searchAutoCompleteSymbols,
  };
};

export default useGetAutoCompleteData;
