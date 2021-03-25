import FullSizedComponent from "./full-sized-component";
import LoadableComponent from "./loadable-component";
import { useFetchMessages } from "./use-fetch";
import "./conversation.scss";

export default function Conversation({ friendId }) {
  const [messages, error] = useFetchMessages(friendId);

  return (
    <FullSizedComponent>
      <LoadableComponent loading={!messages && !error} error={error}>
        <div id="conversation">
          <h1>Conversation</h1>
          {messages
            ? messages.map((message) => (
                <div key={message.id}>
                  <p>{message.content}</p>
                  <p>{message.createdAt}</p>
                </div>
              ))
            : null}
        </div>
      </LoadableComponent>
    </FullSizedComponent>
  );
}
