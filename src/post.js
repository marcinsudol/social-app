import Avatar from "./avatar";
import { useMemo } from "react";
import "./post.scss";

export default function Post({ post }) {
  const createdAt = useMemo(
    () => new Date(post.createdAt).toLocaleDateString("en-US"),
    [post]
  );

  return (
    <div className="post">
      <div className="post-avatar">
        <Avatar user={post.user} />
      </div>

      <div className="post-body">
        <p className="post-date">{createdAt}</p>
        <p className="post-content">{post.content}</p>
      </div>
    </div>
  );
}
