import AuthContext from "./auth-context";
import "./login-form.scss";

import { useContext } from "react";

export default function LoginForm() {
  const authContext = useContext(AuthContext);
  return (
    <form
      id="login-form"
      onSubmit={(e) => {
        e.preventDefault();
        authContext.login();
      }}
    >
      <label htmlFor="login-username">Username</label>
      <input id="login-username" name="username" type="text" />

      <label htmlFor="login-password">Password</label>
      <input id="login-password" name="password" type="password" />

      <button type="submit">Log in</button>
    </form>
  );
}
