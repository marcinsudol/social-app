import LoginPage from "./login-page";
import AppPage from "./app-page";
import ErrorContent from "./error-content";
import FullScreenComponent from "./full-screen-component";
import { authContext, useAuth } from "./auth";
import "./app.scss";

import {
  HashRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

export default function App() {
  const [user, logged, login, logout] = useAuth();

  return (
    <authContext.Provider value={{ user, logged, login, logout }}>
      <Router>
        <Switch>
          {logged ? (
            <Redirect from="/login" to="/app" />
          ) : (
            <Redirect from="/app" to="/login" />
          )}

          <Route path="/login">
            <LoginPage />
          </Route>

          <Route path="/app">
            <AppPage />
          </Route>

          <Route exact path="/">
            {logged ? (
              <Redirect from="/" to="/app" />
            ) : (
              <Redirect from="/" to="/login" />
            )}
          </Route>

          <Route path="*">
            <FullScreenComponent>
              <ErrorContent error={"Page does not exist"} />
            </FullScreenComponent>
          </Route>
        </Switch>
      </Router>
    </authContext.Provider>
  );
}
