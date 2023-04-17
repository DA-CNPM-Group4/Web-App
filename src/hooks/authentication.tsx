import { createContext, useEffect, useState } from "react";
import { getInfoUser, login } from "../services/authentication";
import { Platform } from "react-native";

export const authContext = createContext<IAuthContext>(null);

export interface User {
  accessToken?: string;
  refreshToken?: string;
  accountId?: string;
  avatar: string;
  phone: string;
  email: string;
  identityNumber: string;
  name: string;
  gender: boolean;
  address: string;
}

export interface IAuthContext {
  signIn: (payload: { phone: string; email: string; password: string }) => void;
  signOut: () => void;
  updateUser: (payload: { name: string; address: string }) => void;
  SetID: (payload: { id: string }) => void;
  user: User;
  id: string;
}

export const useProviderAuth = () => {
  let previousToken = undefined;
  let previousRefeshToken = undefined;
  let previousUser = undefined;
  let previousAccountId = undefined;

  if (Platform.OS === "web") {
    let flag = false;
    previousToken = localStorage.getItem("accessToken");
    previousRefeshToken = localStorage.getItem("refreshToken");
    previousAccountId = localStorage.getItem("accountId");
    if (previousToken && previousAccountId) {
      if (flag) return;
      flag = true;
      const userinfo = getInfoUser({ accountId: previousAccountId }).then(
        (useri) => {
          setUser({
            name: useri.data?.data?.name,
            identityNumber: useri.data?.data?.identityNumber,
            email: useri.data?.data?.email,
            gender: useri.data?.data?.gender,
            phone: useri.data?.data?.phone,
            address: useri.data?.data?.address,
            ...user,
          });
        }
      );
    }
  }
  const [id, setId] = useState("");

  const [user, setUser] = useState<User>({
    accessToken: previousToken,
    refreshToken: previousRefeshToken,
    accountId: previousAccountId,
    ...previousUser,
  });

  const SetID = ({ id }) => {
    setId(id);
  };

  const updateUser = async ({ name, address }) => {
    const userinfo = await getInfoUser({ accountId: user.accountId }).then(
      (useri) => {
        console.log(1);
        setUser({
          name: name,
          address: address,
          ...user,
        });
      }
    );
  };

  const getUserInfo = async (accessToken, refreshToken, accountId) => {
    setUser({
      accessToken: accessToken,
      refreshToken: refreshToken,
      accountId: accountId,
      ...user,
    });

    if (Platform.OS === "web") {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("accountId", accountId);
    }
  };

  const signIn = async ({ phone, email, password }) => {
    const res = await login({ phone, email, password });

    if (res.data.status == true) {
      await getUserInfo(
        res.data?.data.accessToken,
        res.data?.data.refreshToken,
        res.data?.data.accountId
      );
    }
    return res.data;
  };

  const signOut = () => {
    setUser(null);
    if (Platform.OS === "web") {
      localStorage.clear();
    }
  };

  return {
    user,
    id,
    SetID,
    updateUser,
    signIn,
    signOut,
  };
};

export const AuthenticationProvider = ({ children }) => {
  const auth = useProviderAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
