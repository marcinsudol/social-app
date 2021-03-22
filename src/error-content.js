import FullSizedComponent from "./full-sized-component";
import "./error-content.scss";
import { Link } from "react-router-dom";

export default function ErrorContent({ error }) {
  return (
    <FullSizedComponent>
      <div className="error-content">
        <h2>Error:</h2>
        <p>{error}</p>
        <Link to="/">Return to homepage</Link>
      </div>
    </FullSizedComponent>
  );
}
