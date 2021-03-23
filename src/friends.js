import { useFetchJson } from "./use-fetch";
import { useEffect } from "react";
import FullSizedComponent from "./full-sized-component";
import LoadableComponent from "./loadable-component";
import FriendCard from "./friend-card";
import "./friends.scss";

export default function Friends() {
  const [friends, error, fetchFriends] = useFetchJson();

  // fetch users
  useEffect(() => {
    fetchFriends("./data/friends.json");
  }, [fetchFriends]);

  return (
    <FullSizedComponent>
      <LoadableComponent loading={!friends && !error} error={error}>
        {friends ? (
          <div id="friends">
            <h1>Friends</h1>
            <div id="friends-cards">
              {friends.map((user) => (
                <FriendCard user={user} />
              ))}
            </div>
          </div>
        ) : null}
      </LoadableComponent>
    </FullSizedComponent>
  );
}
