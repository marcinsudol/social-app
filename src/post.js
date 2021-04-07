import Avatar from "./avatar";
import { useCallback, useContext, useState } from "react";
import "./post.scss";
import ContentStatistics from "./content-statistics";
import ContentMenu from "./content-menu";
import { useDisplayDate, useReactionsSummary } from "./custom-hooks";
import { authContext } from "./auth";
import CommentsList from "./comments-list";
import DropdownMenu from "./dropdown-menu";
import { Link } from "react-router-dom";

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

        // update reactions
        setReactions(newReactions);
      }
    },
    [post, reactions, reactionsSummary, auth]
  );

  const addComment = useCallback(
    (content) => {
      // create new comment
      const newComment = {
        id: Date.now(),
        content: content,
        createdAt: new Date().toUTCString(),
        postId: post.id,
        userId: auth.userId,
        user: { ...auth.user },
        reactions: [],
      };

      // create new comments
      const newComments = [newComment, ...comments];

      // update comments
      setComments(newComments);
    },
    [post, comments, auth]
  );

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-avatar">
          <Avatar user={post.user} fontSize="1.2em" />
        </div>
        <h2 className="post-header-text">
          {post.user.firstName + " " + post.user.lastName}
        </h2>
        <DropdownMenu buttonLabel="User's menu">
          <Link to={"/app/friends/" + post.userId}>Go to profile</Link>
          <Link to={"/app/messages/" + post.userId}>Start conversation</Link>
        </DropdownMenu>
      </div>

      <div className="post-body">
        <p className="post-date">{createdAt}</p>
        <p className="post-content">{post.content}</p>
      </div>

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

      <div className="post-comments">
        <CommentsList comments={comments} addComment={addComment} />
      </div>
    </div>
  );
}
