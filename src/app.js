import LoginPage from "./login-page";
import AppPage from "./app-page";
import "./app.scss";

import {
  HashRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>

        <Route path="/app">
          <AppPage />
        </Route>

        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}
