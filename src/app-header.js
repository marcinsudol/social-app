import "./app-header.scss";

import { NavLink } from "react-router-dom";

export default function AppHeader() {
  return (
    <nav id="app-header">
      <NavLink to="/app/posts">Posts</NavLink>
      <NavLink to="/app/friends">Friends</NavLink>
      <NavLink to="/app/messages">Messages</NavLink>
      <NavLink to="/app/profile">Profile</NavLink>
      <NavLink to="/login" id="logout-button">
        Log out
      </NavLink>
    </nav>
  );
}
