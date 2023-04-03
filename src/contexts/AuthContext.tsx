import { createContext, ReactNode } from "react";
import { destroyCookie, setCookie } from "nookies";
import api from "../services/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

type SignInCredentials = {
  email: string;
  password: string;
};

type SignUpCredentials = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  signUp(credentials: SignUpCredentials): Promise<void>;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const route = useRouter();
  const queryClient = useQueryClient();

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const queryClient = new QueryClient();
      const response = await api.post("/auth", {
        email,
        password,
      });
      const { token, refreshToken } = response.data;

      setCookie(undefined, "myexpenses.token", token, {
        maxAge: 60 * 20, // 20 minutes
        path: "/",
      });

      setCookie(undefined, "myexpenses.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      api.defaults.headers.common["Authorization"] = token;

      await queryClient.invalidateQueries();
      await queryClient.refetchQueries();

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

  async function signOut() {
    destroyCookie(undefined, "myexpenses.token");
    destroyCookie(undefined, "myexpenses.refreshToken");
    queryClient.removeQueries();
    
    route.push("/");
  }

  async function signUp({
    name,
    email,
    password,
    passwordConfirmation,
  }: SignUpCredentials) {
    try {
      await api.post("/users", {
        name,
        email,
        password,
        passwordConfirmation,
      });

      alert("Usuário cadastrado com sucesso");

      route.push("/");
    } catch (e: any) {
      if (e?.response?.data?.message) {
        toast.error(e?.response?.data?.message);
      } else {
        toast.error("Oops... Houve um erro com o servidor.");
        console.error(e);
      }
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}
