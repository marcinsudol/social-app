import "./content-menu.scss";
import {
  IoHeart as LikeIcon,
  IoHeartDislike as DislikeIcon,
} from "react-icons/io5";

export default function ContentMenu({ addReaction, background }) {
  return (
    <div
      className={
        "content-menu" + (background ? " background-" + background : "")
      }
    >
      <button
        type="button"
        className="like-button"
        onClick={(e) => {
          e.preventDefault();
          addReaction("like");
        }}
      >
        <LikeIcon />
        Like
      </button>
      <button
        type="button"
        className="dislike-button"
        onClick={(e) => {
          e.preventDefault();
          addReaction("dislike");
        }}
      >
        <DislikeIcon />
        Dislike
      </button>
    </div>
  );
}
