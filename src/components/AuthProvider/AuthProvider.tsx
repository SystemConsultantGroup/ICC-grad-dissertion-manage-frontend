/* eslint-disable @typescript-eslint/no-shadow */

"use client";

import { JWT_COOKIE_NAME, JWT_MAX_AGE } from "@/components/AuthProvider/constant/jwt";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { CommonApiResponse, Role } from "@/api/_types/common";
import { ClientAxios } from "@/components/ClientAxios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { CustomJwtPayload } from "./_types/jwtPayload";

type TLoginAsUser = {
  typeId: number; // professorId 또는 studentId
  role: Exclude<Role, "ADMIN">;
};

interface AuthContextValue {
  // user: User | null;
  userType: Role | null;
  token: string | null;
  login: (token: string) => void;
  loginAsUser: (params: TLoginAsUser) => void;
  logout: () => void;
  isLoggedIn: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  // const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<Role | null>(null);
  const [isLoadingCookie, setIsLoadingCookie] = useState(true);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // const fetchAndSetUser = useCallback(async (token: string) => {
  //   setIsLoadingUser(true);

  //   try {
  //     const { data } = await ClientAxios.get<User>("/users/me", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setUser(data);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsLoadingUser(false);
  //   }
  // }, []);

  useEffect(() => {
    setIsLoadingCookie(true);

    const storedValue = Cookies.get(JWT_COOKIE_NAME);
    if (storedValue) {
      setToken(storedValue);
      ClientAxios.defaults.headers.Authorization = `Bearer ${token}`;
      // fetchAndSetUser(storedValue);
      const claims: CustomJwtPayload = jwtDecode(storedValue);
      setUserType(claims.type);
    } else {
      setToken(null);
      setIsLoadingUser(false);
    }

    setIsLoadingCookie(false);
  }, [token]);

  const login = (token: string) => {
    setIsLoadingCookie(true);

    setToken(token);
    ClientAxios.defaults.headers.Authorization = `Bearer ${token}`;
    Cookies.set(JWT_COOKIE_NAME, token, { "max-age": String(JWT_MAX_AGE) });
    // fetchAndSetUser(token);

    // user Type 저장
    const claims: CustomJwtPayload = jwtDecode(token);
    setUserType(claims.type);

    setIsLoadingCookie(false);
  };

  const loginAsUser = async ({ typeId, role }: TLoginAsUser) => {
    // 여기서 말하는 typeId 는 userId 가 아니라 professorId 또는 studentId 를 의미합니다
    const url = `/auth/${typeId}?type=${role}`;
    const {
      data: { accessToken },
    } = await ClientAxios.get<CommonApiResponse & { accessToken: string }>(url);

    login(accessToken);
    window.location.href = "/";
  };

  const logout = () => {
    setIsLoadingCookie(true);

    setToken(null);
    setUserType(null);
    Cookies.remove(JWT_COOKIE_NAME);

    setIsLoadingCookie(false);
    window.location.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        userType,
        token,
        login,
        logout,
        loginAsUser,
        isLoggedIn: !!token,
        isLoading: isLoadingCookie || isLoadingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context == null) {
    throw new Error("AuthProvider 안에서 사용해주세요");
  }

  return context;
}
