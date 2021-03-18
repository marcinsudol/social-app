import { useHistory } from "react-router-dom";
import "./login-form.scss";

export default function LoginForm() {
  const history = useHistory();

  return (
    <form id="login-form">
      <label htmlFor="login-username">Username</label>
      <input id="login-username" name="username" type="text" />

      <label htmlFor="login-password">Password</label>
      <input id="login-password" name="password" type="password" />

      <button
        onClick={() => {
          history.push("/app");
        }}
      >
        Log in
      </button>
    </form>
  );
}
