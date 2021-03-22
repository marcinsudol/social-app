import LoadableComponent from "./loadable-component";
import FullSizedComponent from "./full-sized-component";
import { useFetchJson } from "./use-fetch-json";
import "./profile.scss";

import { useEffect, useMemo, useState } from "react";

export default function Profile({ userId }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const loading = useMemo(() => !user && !error, [user, error]);

  const [users, fetchError, fetchUsers] = useFetchJson();

  // fetch users
  useEffect(() => {
    fetchUsers("./data/users.json");
  }, [fetchUsers]);

  // set correct user after fetching
  useEffect(() => {
    if (users) {
      const foundUser = users.find((user) => user.id === userId);
      if (foundUser) {
        setUser(foundUser);
      } else {
        setError("User does not exist");
      }
    }
  }, [userId, users]);

  // fetch error
  useEffect(() => {
    if (fetchError) {
      setError("Error while fetching the data");
    }
  }, [fetchError]);

  return (
    <LoadableComponent loading={loading}>
      <FullSizedComponent>
        <div id="profile">
          {!error ? <p>Profile loaded</p> : <p>{error}</p>}
        </div>
      </FullSizedComponent>
    </LoadableComponent>
  );
}
