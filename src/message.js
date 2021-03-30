import Avatar from "./avatar";
import { authContext } from "./auth";
import "./message.scss";
import { useContext } from "react";
import { useDisplayDate } from "./custom-hooks";

export default function Message({ friend, message }) {
  const auth = useContext(authContext);
  const createdAt = useDisplayDate(message.createdAt);

  const type = message.userId === auth.userId ? "sent" : "received";

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
