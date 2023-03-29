import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import nookies from "nookies";
import { GetServerSideProps } from "next";

export default function Dashboard() {
  const { signOut, user } = useContext(AuthContext);

  return (
    <>
      <h1>Hello, {user?.name}</h1>

      <button onClick={() => signOut()}>Logout</button>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  const token = cookies["myexpenses.token"];

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
      userProps: {},
    },
  };
};
