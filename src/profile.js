import LoadableComponent from "./loadable-component";
import FullSizedComponent from "./full-sized-component";
import { useFetchJson } from "./use-fetch-json";
import "./profile.scss";

import { useEffect } from "react";

export default function Profile({ userId }) {
  const [users, loaded, error, fetchUsers] = useFetchJson();

  useEffect(() => {
    fetchUsers("./data/users.json");
  }, [fetchUsers]);

  return (
    <LoadableComponent loading={!loaded && !error}>
      <FullSizedComponent>
        <div id="profile">
          {loaded ? <p>Profile loaded</p> : <p>Error loading</p>}
        </div>
      </FullSizedComponent>
    </LoadableComponent>
  );
}
