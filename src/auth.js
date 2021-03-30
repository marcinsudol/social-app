import { createContext, useMemo, useState } from "react";
import { useFetchUser } from "./custom-hooks";

export const authContext = createContext();

export const useAuth = () => {
  const [userId, setUserId] = useState(false);
  const [user, error] = useFetchUser(userId);

  const logged = useMemo(() => !!userId, [userId]);

  const login = (userId) => {
    setTimeout(() => {
      setUserId(userId);
    }, 500);
  };

  const logout = () => {
    setTimeout(() => {
      setUserId(null);
    }, 500);
  };

  return [userId, user, logged, login, logout];
};
