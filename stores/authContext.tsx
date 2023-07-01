"use client";
import {
  type FC,
  type ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import netlifyIdentity, { type User } from "netlify-identity-widget";

interface IAUthContext {
  user: User | null;
  login: () => void;
  logout: () => void;
  authReady: boolean;
}

const AuthContext = createContext<IAUthContext>({
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false,
});

interface IProps {
  children: ReactNode;
}

export const AuthContextProvider: FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState<boolean>(false);

  useEffect(() => {
    netlifyIdentity.on("login", (user: User) => {
      setUser(user);
      netlifyIdentity.close();
    });
    netlifyIdentity.on("logout", () => {
      setUser(null);
    });

    netlifyIdentity.on("init", (user: User | null) => {
      setUser(user);
      setAuthReady(true);
    });

    netlifyIdentity.init();

    return () => {
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
      netlifyIdentity.off("init");
    };
  }, []);

  const login = () => {
    netlifyIdentity.open();
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
