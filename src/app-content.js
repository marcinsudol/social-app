import Posts from "./posts";
import Friends from "./friends";
import Messages from "./messages";
import Profile from "./profile";
import { Switch, Redirect, Route, useRouteMatch } from "react-router-dom";

export default function AppContent() {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={`${match.path}/posts`}>
          <Posts />
        </Route>

        <Route path={`${match.path}/friends`}>
          <Friends />
        </Route>

        <Route path={`${match.path}/messages`}>
          <Messages />
        </Route>

        <Route path={`${match.path}/profile`}>
          <Profile />
        </Route>

        <Redirect from={match.path} to={`${match.path}/posts`} />
      </Switch>
    </div>
  );
}
