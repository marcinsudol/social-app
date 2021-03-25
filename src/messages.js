import { useParams } from "react-router";
import Conversation from "./conversation";
import { FriendSelector } from "./friend-selector";
import "./messages.scss";

export default function Messages() {
  const { friendId } = useParams();

  return (
    <div id="messages">
      <div id="selector-wrapper">
        <FriendSelector />
      </div>
      <div id="conversation-wrapper">
        {friendId ? (
          <Conversation friendId={Number(friendId)} />
        ) : (
          <p>Select conversation</p>
        )}
      </div>
    </div>
  );
}
