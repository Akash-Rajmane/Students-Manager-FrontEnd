import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState<Array<any>>([]);
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
  }, [url]);

  return { data, isLoading, setData };
};

export default useFetch;
