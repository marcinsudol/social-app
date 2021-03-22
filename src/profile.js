import { useEffect } from "react";
import LoadingContent from "./loading-content";
import { useFetchJson } from "./use-fetch-json";

export default function Profile({ userId }) {
  const [users, loaded, error, fetchUsers] = useFetchJson();

  useEffect(() => {
    fetchUsers("./data/users.json");
  }, [fetchUsers]);

  return (
    <div>
      {!loaded && !error ? (
        <LoadingContent />
      ) : loaded ? (
        <p>Profile loaded</p>
      ) : (
        <p>Error loading</p>
      )}
    </div>
  );
}
