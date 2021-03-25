import Avatar from "./avatar";
import { authContext } from "./auth";
import "./message.scss";
import { useContext } from "react";

export default function Message({ user, friend, message }) {
  const auth = useContext(authContext);
  const typeClass = message.userId === auth.userId ? "sent" : "received";

  return (
    <div className={"message " + typeClass}>
      {typeClass === "received" && (
        <div className="message-avatar">
          <Avatar user={friend} />
        </div>
      )}
      <div className="message-body">
        <p className="message-content">{message.content}</p>
        <p className="message-date">{message.createdAt}</p>
      </div>
    </div>
  );
}
