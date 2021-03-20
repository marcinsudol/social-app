import LoginPage from "./login-page";
import AppPage from "./app-page";
import AuthContext from "./auth-context";
import "./app.scss";

import { useState } from "react";
import {
  HashRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

export default function App() {
  const [logged, setLogged] = useState(false);
  const [auth, setAuth] = useState({
    login: () => {
      setTimeout(() => {
        setLogged(true);
      }, 1000);
    },
    logout: () => {
      setTimeout(() => {
        setLogged(false);
      }, 500);
    },
  });

  return (
    <AuthContext.Provider value={auth}>
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

          <Route path="/">
            {logged ? (
              <Redirect from="/" to="/app" />
            ) : (
              <Redirect from="/" to="/login" />
            )}
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}
