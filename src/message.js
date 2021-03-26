import Avatar from "./avatar";
import { authContext } from "./auth";
import "./message.scss";
import { useContext, useMemo } from "react";

export default function Message({ user, friend, message }) {
  const auth = useContext(authContext);
  const type = message.userId === auth.userId ? "sent" : "received";
  const createdAt = useMemo(
    () => new Date(message.createdAt).toLocaleDateString("en-US"),
    [message]
  );

  return (
    <div className={"message " + type}>
      {type === "received" && (
        <div className="message-avatar">
          <Avatar user={friend} />
        </div>
      )}
      <div className="message-body">
        <p className="message-content">{message.content}</p>
        <p className="message-date">{createdAt}</p>
      </div>
    </div>
  );
}
