import { createContext, useContext, useState } from "react";
import type { AuthContextType, AuthProviderProps, User } from "../types/types";

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      return storedUser;
    } else {
      return null;
    }
  });

  const signIn = (newUser: User, callback: () => void) => {
    setUser(newUser);
    localStorage.setItem("user", newUser!.name);
    callback();
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value: AuthContextType = {
    user,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
