import LoadableComponent from "./loadable-component";
import FullSizedComponent from "./full-sized-component";
import ProfileStatisticCard from "./profile-statistic-card";
import { useFetchUser } from "./use-fetch";
import "./profile.scss";

import { Link } from "react-router-dom";
import Avatar from "./avatar";

export default function Profile({ userId }) {
  const [user, error] = useFetchUser(userId);

  return (
    <FullSizedComponent>
      <LoadableComponent loading={!user && !error} error={error}>
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
