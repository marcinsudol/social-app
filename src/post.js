import Avatar from "./avatar";
import { useMemo, useState, useCallback } from "react";
import "./post.scss";
import Comment from "./comment";

export default function Post({ post }) {
  const [reactions, setReactions] = useState(post.reactions);
  const [comments, setComments] = useState(post.comments);

  const createdAt = useMemo(
    () => new Date(post.createdAt).toLocaleDateString("en-US"),
    [post]
  );

  const countReactions = useCallback(
    (reactionType) =>
      reactions.reduce(
        (prev, reaction) => (reaction.type === reactionType ? prev + 1 : prev),
        0
      ),
    [reactions]
  );

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-avatar">
          <Avatar user={post.user} fontSize="1.2em" />
        </div>
        <h2 className="post-header-text">
          <strong>{post.user.firstName + " " + post.user.lastName}</strong>{" "}
          wrote
        </h2>
      </div>

      <div className="post-body">
        <p className="post-date">{createdAt}</p>
        <p className="post-content">{post.content}</p>
        <div className="post-footer">
          <div className="post-footer-buttons">
            <button type="button" className="like-button">
              Like
            </button>
            <button type="Dislike" className="dislike-button">
              Dislike
            </button>
          </div>
          <div className="post-footer-stats">
            {"Likes: " +
              countReactions("like") +
              " Dislikes: " +
              countReactions("dislike")}
          </div>
        </div>
      </div>

      <div className="post-comments">
        <h3 className="comments-header">Latest comments</h3>
        <ol className="comments-list">
          {comments.map((comment) => (
            <li key={comment.id}>
              <Comment comment={comment} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
