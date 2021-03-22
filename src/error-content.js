import FullSizedComponent from "./full-sized-component";
import "./error-content.scss";

export default function ErrorContent({ error }) {
  return (
    <FullSizedComponent>
      <div className="error-content">
        <h2>Error:</h2>
        <p>{error}</p>
      </div>
    </FullSizedComponent>
  );
}
