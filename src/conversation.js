import FullSizedComponent from "./full-sized-component";
import LoadableComponent from "./loadable-component";
import Message from "./message";
import { useFetchUser, useFetchMessages } from "./use-fetch";
import { authContext } from "./auth";
import "./conversation.scss";
import { useContext } from "react";

export default function Conversation({ friendId }) {
  const auth = useContext(authContext);
  const [user, userError] = useFetchUser(auth.userId);
  const [friend, friendError] = useFetchUser(friendId);
  const [messages, messagesError] = useFetchMessages(friendId);
  const loading =
    (!user && !userError) ||
    (!friend && !friendError) ||
    (!messages && !messagesError);
  const error = userError || friendError || messagesError;

  return (
    <FullSizedComponent>
      <LoadableComponent loading={loading} error={error}>
        {friend && messages ? (
          <div id="conversation">
            <header>
              <h1>{friend.firstName + " " + friend.lastName}</h1>
            </header>
            {messages.map((message) => (
              <Message
                user={user}
                friend={friend}
                message={message}
                key={message.id}
              />
            ))}
          </div>
        ) : null}
      </LoadableComponent>
    </FullSizedComponent>
  );
}
