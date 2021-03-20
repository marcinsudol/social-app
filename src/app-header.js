import AuthContext from "./auth-context";
import "./app-header.scss";

import {
  IoGridOutline,
  IoPeople,
  IoChatbubblesOutline,
  IoPersonCircleOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

export default function AppHeader() {
  const authContext = useContext(AuthContext);

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

      <button id="logout-button" onClick={authContext.logout}>
        <IoLogOutOutline />
        <span>Log out</span>
      </button>
    </nav>
  );
}
