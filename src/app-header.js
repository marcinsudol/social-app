import "./app-header.scss";

import { Link } from "react-router-dom";

export default function AppHeader() {
  return (
    <nav id="app-header">
      <Link to="/app/posts">Posts</Link>
      <Link to="/app/friends">Friends</Link>
      <Link to="/app/messages">Messages</Link>
      <Link to="/app/profile">Profile</Link>
      <Link to="/login">Log out</Link>
    </nav>
  );
}
