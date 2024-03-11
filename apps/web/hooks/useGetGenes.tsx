import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useGetGenes = () => {
  const [filteredHugoSymbols, setFilteredHugoSymbols] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchSymbols = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(`genes?query=${query}`);
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