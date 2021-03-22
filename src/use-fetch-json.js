import { useCallback, useEffect, useState } from "react";

export function useFetchJson() {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [abortController] = useState(new AbortController());

  const fetchJson = useCallback(
    (url) => {
      setData(null);
      setLoaded(false);
      setError(false);

      fetch(url, { signal: abortController.signal })
        .then((response) => response.json())
        .then((fetchedData) => {
          setLoaded(true);
          setData(fetchedData);
        })
        .catch((e) => {
          if (!abortController.signal.aborted) {
            setError(true);
            setData(e);
          }
        });
    },
    [abortController]
  );

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, [abortController]);

  return [data, loaded, error, fetchJson];
}
