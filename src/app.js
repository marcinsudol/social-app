import LoginPage from "./login-page";
import AppPage from "./app-page";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/login" />
        {/* Login Page */}
        <Route path="/login">
          <LoginPage />
        </Route>
        {/* Main Page */}
        <Route path="/app">
          <AppPage />
        </Route>
      </Switch>
    </Router>
  );
}
