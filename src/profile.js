import LoadableComponent from "./loadable-component";
import FullSizedComponent from "./full-sized-component";
import ProfileStatisticCard from "./profile-statistic-card";
import ProfileStatus from "./profile-status";
import Avatar from "./avatar";
import { useFetchUser } from "./custom-hooks";
import { authContext } from "./auth";
import "./profile.scss";

import { Link } from "react-router-dom";
import { useContext, useMemo } from "react";

export default function Profile({ userId }) {
  const [user, error] = useFetchUser(userId);
  const auth = useContext(authContext);
  const profileOwner = useMemo(() => userId === auth.userId, [userId, auth]);

  return (
    <FullSizedComponent>
      <LoadableComponent loading={!user && !error} error={error}>
        {user ? (
          <div id="profile-wrapper">
            <div id="profile">
              <div id="profile-avatar">
                <Avatar user={user} fontSize={"5em"} />
              </div>
              <div>
                <div id="profile-info">
                  <div id="profile-header">
                    <h1 className="display-name">
                      {user.firstName + " " + user.lastName}
                    </h1>
                    <ProfileStatus status={user.status} />
                  </div>
                  <p>{user.info}</p>
                </div>
                <div id="profile-statistics">
                  <ProfileStatisticCard label={"Friends"} value={136} />
                  <ProfileStatisticCard label={"Posts"} value={342} />
                  <ProfileStatisticCard label={"Comments"} value={752} />
                </div>
                {!profileOwner && (
                  <Link
                    id="open-conversation-button"
                    to={`/app/messages/${userId}`}
                  >
                    Open conversation
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </LoadableComponent>
    </FullSizedComponent>
  );
}
