import LoadingIcon from "./loading-icon";
import { authContext } from "./auth";
import "./login-form.scss";

import { useContext, useState } from "react";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const auth = useContext(authContext);

  return (
    <form
      id="login-form"
      onSubmit={(e) => {
        e.preventDefault();
        setLoading(true);
        auth.login(11321);
      }}
    >
      <label htmlFor="login-username">Username</label>
      <input id="login-username" name="username" type="text" />

      <label htmlFor="login-password">Password</label>
      <input id="login-password" name="password" type="password" />

      <button id="login-button" type="submit">
        {loading ? <LoadingIcon /> : <p>Log in</p>}
      </button>
    </form>
  );
}
