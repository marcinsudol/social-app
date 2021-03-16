import { Link } from "react-router-dom";

export default function AppHeader() {
  return (
    <nav>
      <button>Feed</button>
      <button>Friends</button>
      <button>Messages</button>
      <Link to="/login">Log out</Link>
    </nav>
  );
}
