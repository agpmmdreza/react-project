import { useState } from 'react';
import { useEffect } from 'react';

const useFetch = (url, options) => {
  const [data, setData] = useState({});
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      fetch(url, options)
        .then((res) => res.json())
        .then((result) => {
          setData(result.data);
          setStatus(result.status);
          setMessage(result.message);
        });
      setIsLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  return { data, status, message, isLoading };
};

export default useFetch;
