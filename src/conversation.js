import FullSizedComponent from "./full-sized-component";
import LoadableComponent from "./loadable-component";
import Message from "./message";
import ProfileStatus from "./profile-status";
import ContentInput from "./content-input";
import { useFetchUser, useFetchMessages } from "./custom-hooks";
import { authContext } from "./auth";
import { useCallback, useContext, useEffect, useState, useMemo } from "react";
import "./conversation.scss";

export default function Conversation({ friendId, scrollToBottom }) {
  const [messages, setMessages] = useState(null);
  const auth = useContext(authContext);
  const [friend, friendError] = useFetchUser(friendId);
  const [fetchedMessages, messagesError] = useFetchMessages(friendId);

  // set messages after initial fetching
  useEffect(() => {
    if (fetchedMessages) {
      setMessages(fetchedMessages);
    }
  }, [fetchedMessages]);

  // send message - add new message to messages list
  const sendMessage = useCallback(
    (newMessageContent) => {
      // create new message object
      const newMessage = {
        id: Date.now(),
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

  // if messages change, scroll to bottom
  useEffect(() => {
    if (scrollToBottom) scrollToBottom();
  }, [messages, scrollToBottom]);

  const error = useMemo(
    () => (friendError || messagesError ? "Error fetching data" : null),
    [friendError, messagesError]
  );

  const loading = useMemo(() => !friend && !messages && !error, [
    friend,
    messages,
    error,
  ]);

  return (
    <FullSizedComponent>
      <LoadableComponent loading={loading} error={error}>
        {friend && messages ? (
          <div id="conversation">
            <header>
              <h1>{friend.firstName + " " + friend.lastName}</h1>
              <ProfileStatus status={friend.status} />
            </header>
            <ol id="messages-list">
              {messages.map((message) => (
                <li key={message.id}>
                  <Message friend={friend} message={message} />
                </li>
              ))}
            </ol>
            <div id="new-message-form">
              <ContentInput
                buttonLabel="Send"
                rows="2"
                submit={sendMessage}
                focusOnRender={true}
                focusAfterSubmit={true}
              />
            </div>
          </div>
        ) : null}
      </LoadableComponent>
    </FullSizedComponent>
  );
}
