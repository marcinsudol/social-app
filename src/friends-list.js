import { useFetchJson } from "./custom-hooks";
import { useEffect, useState } from "react";
import FullSizedComponent from "./full-sized-component";
import LoadableComponent from "./loadable-component";
import FriendCard from "./friend-card";
import ContentInput from "./content-input";
import { IoClose as CloseIcon } from "react-icons/io5";
import "./friends-list.scss";

export default function FriendsList() {
  const [friends, error, fetchFriends] = useFetchJson();
  const [pattern, setPattern] = useState("");
  const [filteredFriends, setFilteredFriends] = useState();

  // fetch friends
  useEffect(() => {
    fetchFriends("./data/friends.json");
  }, [fetchFriends]);

  // filter friends
  useEffect(() => {
    if (friends) {
      if (pattern) {
        const newFilteredFriends = friends.filter((friend) => {
          const friendName =
            friend.firstName.toUpperCase() +
            " " +
            friend.lastName.toUpperCase();
          return friendName.search(pattern.toUpperCase()) !== -1;
        });
        setFilteredFriends(newFilteredFriends);
      } else {
        setFilteredFriends(friends);
      }
    }
  }, [friends, pattern]);

  return (
    <FullSizedComponent>
      <LoadableComponent loading={!friends && !error} error={error}>
        <div id="friends-list">
          <header>
            <h1>Friends</h1>
            <div id="find-friend-input">
              <ContentInput
                buttonLabel="Find"
                submit={(content) => {
                  setPattern(content);
                }}
              />
            </div>
          </header>
          {pattern && (
            <button
              id="remove-pattern-button"
              onClick={() => {
                setPattern("");
              }}
            >
              <CloseIcon />
              {pattern}
            </button>
          )}
          {filteredFriends ? (
            <div id="friends-cards">
              {filteredFriends.map((user) => (
                <FriendCard user={user} key={user.id} />
              ))}
            </div>
          ) : null}
        </div>
      </LoadableComponent>
    </FullSizedComponent>
  );
}
