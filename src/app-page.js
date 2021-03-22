import AppHeader from "./app-header";
import AppContent from "./app-content";
import FullScreenComponent from "./full-screen-component";
import "./app-page.scss";

export default function AppPage() {
  return (
    <FullScreenComponent>
      <div id="app-page">
        <AppHeader />
        <AppContent />
      </div>
    </FullScreenComponent>
  );
}
