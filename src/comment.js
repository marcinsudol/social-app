import Avatar from "./avatar";
import "./comment.scss";
import { useMemo } from "react";

export default function Comment({ comment }) {
  const createdAt = useMemo(
    () => new Date(comment.createdAt).toLocaleDateString("en-US"),
    [comment]
  );

  return (
    <div className="comment">
      <div className="comment-avatar">
        <Avatar user={comment.user} />
      </div>
      <div className="comment-body">
        <p className="comment-content">{comment.content}</p>
        <p className="comment-date">{createdAt}</p>
      </div>
    </div>
  );
}
