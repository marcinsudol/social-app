import "./app-header.scss";

import {
  IoGridOutline,
  IoPeople,
  IoChatbubblesOutline,
  IoPersonCircleOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { NavLink } from "react-router-dom";

export default function AppHeader() {
  return (
    <nav id="app-header">
      <NavLink to="/app/posts">
        <IoGridOutline />
        <span>Posts</span>
      </NavLink>
      <NavLink to="/app/friends">
        <IoPeople />
        <span>Friends</span>
      </NavLink>
      <NavLink to="/app/messages">
        <IoChatbubblesOutline />
        <span>Messages</span>
      </NavLink>
      <NavLink to="/app/profile">
        <IoPersonCircleOutline />
        <span>Profile</span>
      </NavLink>
      <NavLink to="/login" id="logout-button">
        <IoLogOutOutline />
        <span>Log out</span>
      </NavLink>
    </nav>
  );
}
