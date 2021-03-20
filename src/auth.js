import { createContext, useMemo, useState } from "react";

export const authContext = createContext();

export const useAuth = () => {
  const [user, setUser] = useState(false);

  let logged = useMemo(() => !!user, [user]);

  const login = (user) => {
    setTimeout(() => {
      setUser(user);
    }, 1000);
  };

  const logout = () => {
    setTimeout(() => {
      setUser(null);
    }, 500);
  };

  return [user, logged, login, logout];
};
