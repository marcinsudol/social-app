import Avatar from "./avatar";
import { useCallback, useContext, useState } from "react";
import "./post.scss";
import Comment from "./comment";
import ContentStatistics from "./content-statistics";
import ContentMenu from "./content-menu";
import { useDisplayDate, useReactionsSummary } from "./custom-hooks";
import { authContext } from "./auth";

export default function Post({ post }) {
  const [reactions, setReactions] = useState(post.reactions);
  const [comments, setComments] = useState(post.comments);
  const auth = useContext(authContext);
  const reactionsSummary = useReactionsSummary(reactions);
  const createdAt = useDisplayDate(post.createdAt);

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
          postId: post.id,
          userId: auth.userId,
          type: reactionType,
        };

        // add reaction to list
        newReactions.push(newReaction);

        setReactions(newReactions);
      }
    },
    [post, reactions, reactionsSummary, auth]
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

        <div className="post-statistics">
          <ContentStatistics
            reactionsSummary={reactionsSummary}
            commentsCount={comments.length}
            parentType="post"
          />
        </div>

        <div className="post-menu">
          <ContentMenu addReaction={addReaction} />
        </div>
      </div>

      <div className="post-comments">
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
    </div>
  );
}
