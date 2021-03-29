import Avatar from "./avatar";
import ContentStatistics from "./content-statistics";
import ContentMenu from "./content-menu";
import "./comment.scss";
import { useState } from "react";
import { useDisplayDate, useReactionsSummary } from "./custom-hooks";

export default function Comment({ comment }) {
  const [reactions, setReactions] = useState(comment.reactions);
  const reactionsSummary = useReactionsSummary(reactions);
  const createdAt = useDisplayDate(comment.createdAt);

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
            reactionsSummary={reactionsSummary}
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
