import Posts from "./posts";
import FriendsList from "./friends-list";
import FriendProfile from "./friend-profile";
import Messages from "./messages";
import Profile from "./profile";
import ErrorContent from "./error-content";
import { authContext } from "./auth";

import { useContext } from "react";
import { Switch, Redirect, Route, useRouteMatch } from "react-router-dom";

export default function AppContent() {
  const match = useRouteMatch();
  const auth = useContext(authContext);

  return (
    <Switch>
      <Route path={`${match.path}/posts`}>
        <Posts />
      </Route>

      <Route path={`${match.path}/friends/:friendId`}>
        <FriendProfile />
      </Route>

      <Route path={`${match.path}/friends`}>
        <FriendsList />
      </Route>

      <Route path={`${match.path}/messages/:friendId`}>
        <Messages />
      </Route>

      <Route path={`${match.path}/messages`}>
        <Messages />
      </Route>

      <Route path={`${match.path}/profile`}>
        <Profile userId={auth.userId} />
      </Route>

      <Redirect exact from={match.path} to={`${match.path}/posts`} />

      <Route path="*">
        <ErrorContent error={"Page does not exist"} />
      </Route>
    </Switch>
  );
}
