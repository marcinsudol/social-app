import LoadableComponent from "./loadable-component";
import Avatar from "./avatar";
import { useFetchJson } from "./use-fetch";
import "./friend-selector.scss";

import { useEffect } from "react";
import { Link } from "react-router-dom";

export function FriendSelector() {
  const [friends, error, fetchFriends] = useFetchJson();

  // fetch friends
  useEffect(() => {
    fetchFriends("./data/friends.json");
  }, [fetchFriends]);

  return (
    <LoadableComponent loading={!friends && !error}>
      {friends ? (
        <nav id="friend-selector">
          {friends.map((user) => (
            <Link to={`/app/messages/${user.id}`} key={user.id}>
              <Avatar user={user} fontSize={"2em"} />
            </Link>
          ))}
        </nav>
      ) : null}
    </LoadableComponent>
  );
}
