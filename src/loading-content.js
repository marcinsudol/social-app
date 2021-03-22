import "./loading-content.scss";

import { ImSpinner3 as SpinnerIcon } from "react-icons/im";

export default function LoadingContent() {
  return (
    <div className="loading-content">
      <SpinnerIcon />
    </div>
  );
}
