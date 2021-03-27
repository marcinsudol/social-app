import FullSizedComponent from "./full-sized-component";
import LoadableComponent from "./loadable-component";
import Message from "./message";
import { useFetchUser, useFetchMessages } from "./use-fetch";
import { authContext } from "./auth";
import "./conversation.scss";
import { useCallback, useContext, useEffect, useState } from "react";
import ContentInput from "./content-input";

export default function Conversation({ friendId }) {
  const [messages, setMessages] = useState(null);
  const auth = useContext(authContext);
  const [user, userError] = useFetchUser(auth.userId);
  const [friend, friendError] = useFetchUser(friendId);
  const [fetchedMessages, messagesError] = useFetchMessages(friendId);

  useEffect(() => {
    setMessages(fetchedMessages);
  }, [fetchedMessages]);

  // send message - add to messages list
  const sendMessage = useCallback(
    (newMessageContent) => {
      // create new message object
      const newMessage = {
        id: new Date().getTime(),
        userId: auth.userId,
        friendId,
        content: newMessageContent,
        createdAt: new Date().toUTCString(),
      };
      const newMessages = [...messages, newMessage];
      setMessages(newMessages);
    },
    [auth, friendId, messages]
  );

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
            <ol id="messages-list">
              {messages.map((message) => (
                <li key={message.id}>
                  <Message user={user} friend={friend} message={message} />
                </li>
              ))}
            </ol>
            <div id="new-message-form">
              <ContentInput buttonLabel="Send" submit={sendMessage} />
            </div>
          </div>
        ) : null}
      </LoadableComponent>
    </FullSizedComponent>
  );
}
