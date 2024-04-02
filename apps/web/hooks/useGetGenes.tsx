import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAxios from "./useAxios";

const useGetGenes = () => {
  const [filteredHugoSymbols, setFilteredHugoSymbols] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { operation } = useAxios();

  const searchSymbols = async (query) => {
    try {
      setLoading(true);
      const response = await operation(
        {
          method: 'get',
          url: `genes?query=${query}`
        }
        );
      const symbols = response.data;
      setFilteredHugoSymbols(symbols);
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
    filteredHugoSymbols,
    error,
    loading,
    searchSymbols,
  };
};

export default useGetGenes;
