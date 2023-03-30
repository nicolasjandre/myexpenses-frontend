import { AuthContext } from "@/contexts/AuthContext";
import axios from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { useContext } from "react";

let cookies = parseCookies();

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    Authorization: `${cookies["myexpenses.token"]}`,
  },
});

api.interceptors.request.use(
  (config) => {
    cookies = parseCookies();
    const { "myexpenses.token": token } = cookies;
    if (token) {
      config.headers["Authorization"] = token; // for Spring Boot back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res: any) => {
    return res;
  },
  async (error) => {
    const originalConfig = error.config;
    if (error?.response) {
      if (error?.response?.status === 401) {
        if (
          error?.response?.data?.message.includes(
            "Token inválido ou expirado"
          ) &&
          !originalConfig._retry
        ) {
          originalConfig._retry = true;

          cookies = parseCookies();
          const { "myexpenses.refreshToken": refreshToken } = cookies;

          try {
            const res = await api.post("/refresh", {
              refreshToken,
            });

            const { accessToken } = res?.data;

            setCookie(undefined, "myexpenses.token", accessToken, {
              maxAge: 60 * 60 * 24 * 15,
              path: "/",
            });

            return api(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      } else {
        const { setUser } = useContext(AuthContext);
        setUser(null);
        destroyCookie(undefined, "myexpenses.token");
        destroyCookie(undefined, "myexpenses.refreshToken");
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
