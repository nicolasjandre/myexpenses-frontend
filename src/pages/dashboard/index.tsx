import nookies, { destroyCookie } from "nookies";

import { AuthContext } from "@/contexts/AuthContext";
import { GetServerSideProps } from "next";
import { useContext, useEffect } from "react";
import { api } from "@/services/api";

type UserResponse = {
  data: {
    email: string;
    name: string;
    created_at: string;
    avatar: string;
    inative_at: string;
    updated_at: string;
  };
};

type DashboardProps = {
   userProps: {
    email: string;
    name: string;
    created_at: string;
    avatar: string;
    inative_at: string;
    updated_at: string;
  };
};

export default function Dashboard({ userProps }: DashboardProps) {
  const { signOut } = useContext(AuthContext);
  

  return (
    <>
      <h1>Hello, {userProps?.name ? userProps.name : 'romario'}</h1>

      <button onClick={() => signOut()}>Logout</button>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  const token = cookies["myexpenses.token"];
  let user;

  if (token) {
    try {
      const { data: userCookies }: UserResponse = await api.get("/users", {
         headers: {
            Authorization: token
          },
      });

      user = {
        name: userCookies?.name,
        email: userCookies?.email,
        avatar: userCookies?.avatar,
        created_at: userCookies?.created_at,
        inative_at: userCookies?.inative_at,
        updated_at: userCookies?.updated_at,
      };
      console.log(user);

    } catch (err) {
      destroyCookie(ctx, "myexpenses.token");
      console.error(err);
    }
  }

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      userProps: user || null,
    },
  };
};
