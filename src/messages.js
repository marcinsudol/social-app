import Conversation from "./conversation";
import { FriendSelector } from "./friend-selector";
import "./messages.scss";
export default function Messages() {
  return (
    <div id="messages">
      <FriendSelector />
      <Conversation />
    </div>
  );
}
