import "./content-statistics.scss";
import {
  IoHeart as LikeIcon,
  IoHeartDislike as DislikeIcon,
} from "react-icons/io5";

export default function ContentStatistics({
  reactionsSummary,
  commentsCount,
  background,
  parentType,
}) {
  return (
    <div
      className={
        "content-statistics" + (background ? " background-" + background : "")
      }
    >
      <ol className="content-statistics-list">
        {!isNaN(commentsCount) && (
          <li>
            <strong>{commentsCount}</strong>{" "}
            {commentsCount === 1 ? "comment" : "comments"}
          </li>
        )}
        <li>
          <strong>{reactionsSummary.likes}</strong>{" "}
          {reactionsSummary.likes === 1 ? "like" : "likes"}
        </li>
        <li>
          <strong>{reactionsSummary.dislikes}</strong>{" "}
          {reactionsSummary.dislikes === 1 ? "dislike" : "dislikes"}
        </li>
      </ol>
      {reactionsSummary.userReaction === "like" ? (
        <p className="reaction-notification">
          <LikeIcon />
          You liked this {parentType}
        </p>
      ) : reactionsSummary.userReaction === "dislike" ? (
        <p className="reaction-notification">
          <DislikeIcon />
          You disliked this {parentType}
        </p>
      ) : null}
    </div>
  );
}
