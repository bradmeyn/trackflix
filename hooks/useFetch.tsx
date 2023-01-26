import { useState, useEffect } from 'react';

const useFetch = (url: string) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(url);
        const json = await res.json();

        const { results } = json;
        setData(results);
        setIsLoading(false);
      } catch (error: any) {
        setError(error);
      }
    };
    fetchData();
  }, [url]);
  return { data, error, isLoading };
};

export default useFetch;
