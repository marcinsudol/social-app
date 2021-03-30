import Avatar from "./avatar";
import ContentStatistics from "./content-statistics";
import ContentMenu from "./content-menu";
import "./comment.scss";
import { useCallback, useContext, useState } from "react";
import { useDisplayDate, useReactionsSummary } from "./custom-hooks";
import { authContext } from "./auth";

export default function Comment({ comment }) {
  const [reactions, setReactions] = useState(comment.reactions);
  const auth = useContext(authContext);
  const reactionsSummary = useReactionsSummary(reactions);
  const createdAt = useDisplayDate(comment.createdAt);

  const addReaction = useCallback(
    (reactionType) => {
      if (reactionsSummary.userReaction !== reactionType) {
        let newReactions = [];
        if (reactionsSummary.userReaction) {
          // remove previous reaction
          newReactions = reactions.filter(
            (reaction) => reaction.userId !== auth.userId
          );
        } else {
          // copy previous reactions
          newReactions = [...reactions];
        }

        // create new reaction
        const newReaction = {
          id: Date.now(),
          commentId: comment.id,
          userId: auth.userId,
          type: reactionType,
        };

        // add reaction to list
        newReactions.push(newReaction);

        setReactions(newReactions);
      }
    },
    [comment, reactions, reactionsSummary, auth]
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
            reactionsSummary={reactionsSummary}
            background="dark"
            parentType="comment"
          />
        </div>

        <div className="comment-menu">
          <ContentMenu addReaction={addReaction} />
        </div>
      </div>
    </div>
  );
}
