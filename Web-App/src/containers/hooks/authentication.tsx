import { createContext, useEffect, useState } from "react";
import { login } from "../services/authentication";
import { Platform } from "react-native";

export const authContext = createContext<IAuthContext>(null);

export interface User {
  // accessToken?: string;
  avatar: string;
  phone: string;
  email: string;
  name: string;
  gender: boolean;
  address: string;
}

export interface IAuthContext {
  signIn: (payload: { phone: string; email: string; password: string }) => void;
  signOut: () => void;
  user: User;
}

export const useProviderAuth = () => {
  let previousToken = undefined;
  let previousUser = undefined;

  const [user, setUser] = useState<User>({
    accessToken: previousToken,
    ...previousUser,
  });

  const [users, setUsers] = useState<User[]>([]);

  const getUserInfo = async (accessToken) => {
    const body = accessToken.split(".")[1];
    const user = JSON.parse(Buffer.from(body, "base64").toString());

    setUser({
      accessToken,
      ...user,
    });
  };

  const signIn = async ({ phone, email, password }) => {
    const res = await login({ phone, email, password });

    if (res.data.status == "ok") {
      getUserInfo("");
    }

    return res.data;
  };

  const signOut = () => {
    if (Platform.OS === "web") {
      localStorage.clear();
    }

    setUser(null);
  };

  return {
    user,
    signIn,
    signOut,
  };
};

export const AuthenticationProvider = ({ children }) => {
  const auth = useProviderAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
