import Comment from "./comment";
import ContentInput from "./content-input";
import "./comments-list.scss";
import { useState } from "react";

export default function CommentsList({ comments, addComment }) {
  const [inputVisible, setInputVisible] = useState(false);

  return (
    <div>
      <div className="comments-menu">
        {inputVisible ? (
          <ContentInput
            buttonLabel="Add comment"
            rows="1"
            submit={(content) => {
              addComment(content);
              setInputVisible(false);
            }}
          />
        ) : (
          <button
            type="button"
            className="new-comment-button"
            onClick={(e) => {
              e.preventDefault();
              setInputVisible(true);
            }}
          >
            Add new Comment
          </button>
        )}
      </div>

      <h3 className="comments-header">
        {comments.length > 0 ? "Latest comments" : "No comments"}
      </h3>

      <ol className="comments-list">
        {comments.map((comment) => (
          <li key={comment.id}>
            <Comment comment={comment} />
          </li>
        ))}
      </ol>
    </div>
  );
}
