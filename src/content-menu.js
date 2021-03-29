import "./content-menu.scss";

export default function ContentMenu() {
  return (
    <div className="content-menu">
      <button type="button" className="like-button">
        Like
      </button>
      <button type="Dislike" className="dislike-button">
        Dislike
      </button>
    </div>
  );
}
