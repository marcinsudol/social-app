import AppHeader from "./app-header";
import AppContent from "./app-content";
import FullScreenComponent from "./full-screen-component";
// import "./app-page.scss";

export default function AppPage() {
  return (
    <FullScreenComponent>
      <AppHeader />
      <div style={{ overflowY: "auto" }}>
        <AppContent />
      </div>
    </FullScreenComponent>
  );
}
