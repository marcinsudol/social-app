import { authContext } from "./auth";
import "./login-form.scss";

import { ImSpinner3 as SpinnerIcon } from "react-icons/im";
import { useContext, useRef } from "react";

export default function LoginForm() {
  const auth = useContext(authContext);
  const loginButtonRef = useRef();

  return (
    <form
      id="login-form"
      onSubmit={(e) => {
        e.preventDefault();
        loginButtonRef.current.classList.add("logging");

        auth.login(1);
      }}
    >
      <label htmlFor="login-username">Username</label>
      <input id="login-username" name="username" type="text" />

      <label htmlFor="login-password">Password</label>
      <input id="login-password" name="password" type="password" />

      <button id="login-button" type="submit" ref={loginButtonRef}>
        <span>Log in</span>
        <SpinnerIcon />
      </button>
    </form>
  );
}
