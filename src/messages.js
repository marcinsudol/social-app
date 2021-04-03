import { useCallback, useRef } from "react";
import { useParams } from "react-router";
import Conversation from "./conversation";
import { FriendSelector } from "./friend-selector";
import FullSizedComponent from "./full-sized-component";
import "./messages.scss";

export default function Messages() {
  const { friendId } = useParams();
  const conversationWrapperRef = useRef();

  const view = friendId ? "conversation-view" : "contacts-view";

  const scrollToBottom = useCallback(() => {
    conversationWrapperRef.current.scrollTo(0, 10000);
  }, [conversationWrapperRef]);

  return (
    <div id="messages" className={view}>
      <div id="selector-wrapper">
        <FriendSelector />
      </div>
      <div id="conversation-wrapper" ref={conversationWrapperRef}>
        {friendId ? (
          <Conversation
            friendId={Number(friendId)}
            scrollToBottom={scrollToBottom}
          />
        ) : (
          <FullSizedComponent>
            <div id="conversation-pane">
              <h1>Select contact to start conversation</h1>
            </div>
          </FullSizedComponent>
        )}
      </div>
    </div>
  );
}
