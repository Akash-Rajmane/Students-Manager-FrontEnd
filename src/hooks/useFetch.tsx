import { useEffect, useState } from 'react';

const useFetch = (url: string, dataChange?:boolean) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      try {
        await fetch(url)
          .then((res) => res.json())
          .then((resData) => {
            setData(resData);
          });
        
          setIsLoading(false);
      
        } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    
  }, [url,dataChange]);

  return { data, isLoading, setData };
};

export default useFetch;
