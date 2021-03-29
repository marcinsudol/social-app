import Avatar from "./avatar";
import ContentStatistics from "./content-statistics";
import ContentMenu from "./content-menu";
import "./comment.scss";
import { useMemo, useState, useCallback } from "react";

export default function Comment({ comment }) {
  const [reactions, setReactions] = useState(comment.reactions);

  const createdAt = useMemo(
    () => new Date(comment.createdAt).toLocaleDateString("en-US"),
    [comment]
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
    <div className="comment">
      <div className="comment-avatar">
        <Avatar user={comment.user} />
      </div>
      <div className="comment-body">
        <p className="comment-date">{createdAt}</p>
        <p className="comment-content">{comment.content}</p>
        <div className="comment-statistics">
          <ContentStatistics
            statsList={[
              countReactions("like") + " likes",
              countReactions("dislike") + " dislikes",
            ]}
            background="dark"
          />
        </div>
        <div className="comment-menu">
          <ContentMenu />
        </div>
      </div>
    </div>
  );
}
