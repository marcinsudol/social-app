import { useParams } from "react-router";
import Conversation from "./conversation";
import { FriendSelector } from "./friend-selector";
import FullSizedComponent from "./full-sized-component";
import "./messages.scss";

export default function Messages() {
  const { friendId } = useParams();

  const view = friendId ? "conversation-view" : "contacts-view";

  return (
    <div id="messages" className={view}>
      <div id="selector-wrapper">
        <FriendSelector />
      </div>
      <div id="conversation-wrapper">
        {friendId ? (
          <Conversation friendId={Number(friendId)} />
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
