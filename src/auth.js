import { createContext, useMemo, useState } from "react";

export const authContext = createContext();

export const useAuth = () => {
  const [userId, setUserId] = useState(false);

  let logged = useMemo(() => !!userId, [userId]);

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

  return [userId, logged, login, logout];
};
