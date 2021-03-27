import Avatar from "./avatar";
import { useMemo } from "react";
import "./post.scss";
import Comment from "./comment";

export default function Post({ post }) {
  const createdAt = useMemo(
    () => new Date(post.createdAt).toLocaleDateString("en-US"),
    [post]
  );

  return (
    <div className="post">
      <div className="post-avatar">
        <Avatar user={post.user} fontSize="1.2em" />
      </div>

      <div className="post-body">
        <p className="post-date">{createdAt}</p>
        <p className="post-content">{post.content}</p>
      </div>

      <ol className="post-comments">
        {post.comments.map((comment) => (
          <li key={comment.id}>
            <Comment comment={comment} />
          </li>
        ))}
      </ol>
    </div>
  );
}
