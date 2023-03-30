import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import api from "../services/api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

type User = {
  id: number;
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
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
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
          setUser({
            id: response?.data?.id,
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
          console.error(e);
        });
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
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
        maxAge: 60 * 60 * 2, // 2 hours
        path: "/",
      });

      api.defaults.headers.common["Authorization"] = token;

      setUser({
        id: response?.data?.user?.id,
        name: response?.data?.user?.name,
        email: response?.data?.user?.email,
        avatar: response?.data?.user?.avatar,
        created_at: response?.data?.user?.created_at,
        inative_at: response?.data?.user?.inative_at,
        updated_at: response?.data?.user?.updated_at,
      });

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
    setUser(null);
    route.push("/");
  }

  async function signUp({
    name,
    email,
    password,
    passwordConfirmation,
  }: SignUpCredentials) {
    try {
      console.log(name, email, password, passwordConfirmation);

      await api.post("/users", {
        name,
        email,
        password,
        passwordConfirmation,
      });

      alert("Usuário cadastrado com sucesso");

      route.push("/");
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, signUp, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
