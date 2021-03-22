import AppHeader from "./app-header";
import AppContent from "./app-content";

import "./app-page.scss";

export default function AppPage() {
  return (
    <div id="app-page">
      <AppHeader />
      <div id="app-content-wrapper">
        <AppContent />
      </div>
    </div>
  );
}
