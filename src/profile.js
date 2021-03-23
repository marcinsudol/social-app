import LoadableComponent from "./loadable-component";
import FullSizedComponent from "./full-sized-component";
import ProfileStatisticCard from "./profile-statistic-card";
import { useFetchJson } from "./use-fetch-json";
import "./profile.scss";

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "./avatar";

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
    <FullSizedComponent>
      <LoadableComponent loading={loading} error={error}>
        {user ? (
          <div id="profile">
            <div id="profile-avatar">
              <Avatar user={user} fontSize={"5em"} />
            </div>
            <div>
              <div id="profile-header">
                <h1 className="display-name">
                  {user.firstName + " " + user.lastName}
                </h1>
                <p>{user.info}</p>
              </div>
              <div id="profile-statistics">
                <ProfileStatisticCard label={"Friends"} value={136} />
                <ProfileStatisticCard label={"Posts"} value={342} />
                <ProfileStatisticCard label={"Comments"} value={752} />
              </div>
              <Link
                id="open-conversation-button"
                to={`/app/messages/${userId}`}
              >
                Open conversation
              </Link>
            </div>
          </div>
        ) : null}
      </LoadableComponent>
    </FullSizedComponent>
  );
}
