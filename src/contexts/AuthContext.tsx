"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import api from "../services/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

type User = {
  email: string;
  name: string;
  created_at: string;
  avatar: string;
  inative_at: string;
  updated_at: string;
} | null;

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  signUp(): void;
  user: User;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(null);
  const route = useRouter();

  useEffect(() => {
    const abortController = new AbortController();
    const cookies = parseCookies();
    const token = cookies["myexpenses.token"];

    if (token && abortController.signal) {
      api
        .get("/users", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          console.log(response);
          setUser({
            name: response?.data?.name,
            email: response?.data?.email,
            avatar: response?.data?.avatar,
            created_at: response?.data?.created_at,
            inative_at: response?.data?.inative_at,
            updated_at: response?.data?.updated_at,
          });

          return () => {
            abortController.abort();
          };
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [route.asPath]);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("/auth", {
        email,
        password,
      });
      const { token, refreshToken } = response.data;

      setCookie(undefined, "myexpenses.token", token, {
        maxAge: 60 * 60 * 24 * 15,
        path: "/",
      });

      setCookie(undefined, "myexpenses.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 15,
        path: "/",
      });

      api.defaults.headers.common["Authorization"] = token;

      route.push("/dashboard");
    } catch (e: any) {
      if (e?.response?.data) {
        toast.error(e?.response?.data);
      } else {
        toast.error("Oops... Houve um erro com o servidor.");
        console.error(e);
      }
    }
  }

  function signOut() {
    destroyCookie(undefined, "myexpenses.token");
    destroyCookie(undefined, "myexpenses.refreshToken");
    route.push("/");
  }

  function signUp() {
    // to do
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, signUp, user }}>
      {children}
    </AuthContext.Provider>
  );
}
