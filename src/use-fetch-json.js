import { useCallback, useEffect, useState } from "react";

export function useFetchJson() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [abortController] = useState(new AbortController());

  const fetchJson = useCallback(
    (url) => {
      setData(null);
      setError(null);

      fetch(url, { signal: abortController.signal })
        .then((response) => response.json())
        .then((fetchedData) => {
          setData(fetchedData);
        })
        .catch((e) => {
          if (!abortController.signal.aborted) {
            setError(e);
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

  return [data, error, fetchJson];
}
