import "./content-menu.scss";
import {
  IoHeart as LikeIcon,
  IoHeartDislike as DislikeIcon,
} from "react-icons/io5";

export default function ContentMenu() {
  return (
    <div className="content-menu">
      <button type="button" className="like-button">
        <LikeIcon />
        Like
      </button>
      <button type="Dislike" className="dislike-button">
        <DislikeIcon />
        Dislike
      </button>
    </div>
  );
}
