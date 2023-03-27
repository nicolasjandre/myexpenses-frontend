"use client";

import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie } from "nookies";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

type UserResponse = {
  data: {
    email: string;
    name: string;
    created_at: string;
    avatar: string;
    inative_at: string;
    updated_at: string;
  };

  user: {
    email: string;
    name: string;
    created_at: string;
    avatar: string;
    inative_at: string;
    updated_at: string;
  };
};

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
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const route = useRouter();

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("/auth", {
        email,
        password,
      });
      const { token } = response.data;

      setCookie(undefined, "myexpenses.token", token, {
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
    destroyCookie(undefined, 'myexpenses.token');
    route.push("/");
  }

  function signUp() {
    // to do
  }

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}
