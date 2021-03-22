import { useEffect, useState } from "react";

export function useFetchJson(url) {
  const [data, setData] = useState();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [abortController, setController] = useState(new AbortController());

  useEffect(() => {
    fetch(url, { signal: abortController.signal })
      .then((response) => response.json())
      .then((fetchedData) => {
        setLoaded(true);
        setData(fetchedData);
      })
      .catch((e) => {
        setError(true);
        setData(e);
      });
    return () => {
      abortController.abort();
    };
  }, [abortController]);

  return [data, loaded, error];
}
