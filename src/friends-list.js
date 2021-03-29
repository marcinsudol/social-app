import { useFetchJson } from "./custom-hooks";
import { useEffect } from "react";
import FullSizedComponent from "./full-sized-component";
import LoadableComponent from "./loadable-component";
import FriendCard from "./friend-card";
import "./friends-list.scss";

export default function FriendsList() {
  const [friends, error, fetchFriends] = useFetchJson();

  // fetch friends
  useEffect(() => {
    fetchFriends("./data/friends.json");
  }, [fetchFriends]);

  return (
    <FullSizedComponent>
      <LoadableComponent loading={!friends && !error} error={error}>
        {friends ? (
          <div id="friends-list">
            <h1>Friends</h1>
            <div id="friends-cards">
              {friends.map((user) => (
                <FriendCard user={user} key={user.id} />
              ))}
            </div>
          </div>
        ) : null}
      </LoadableComponent>
    </FullSizedComponent>
  );
}
