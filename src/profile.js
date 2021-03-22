import LoadingContent from "./loading-content";
import { useFetchJson } from "./use-fetch-json";
import "./profile.scss";

import { useEffect } from "react";

export default function Profile({ userId }) {
  const [users, loaded, error, fetchUsers] = useFetchJson();

  useEffect(() => {
    fetchUsers("./data/users.json");
  }, [fetchUsers]);

  return (
    <div id="profile">
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
