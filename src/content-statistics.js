import "./content-statistics.scss";

export default function ContentStatistics({
  reactionsSummary,
  commentsCount,
  background,
}) {
  return (
    <ul
      className={
        "content-statistics" + (background && " background-" + background)
      }
    >
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
    </ul>
  );
}
