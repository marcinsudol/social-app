import LoadingIcon from "./loading-icon";
import "./loading-content.scss";

export default function LoadingContent() {
  return (
    <div className="loading-content">
      <i>
        <LoadingIcon />
      </i>
      <p>Loading</p>
    </div>
  );
}
