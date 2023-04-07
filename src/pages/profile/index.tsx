import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import nookies from "nookies";
import { GetServerSideProps } from "next";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { SidebarContext } from "@/contexts/SidebarContext";
import { useCashFlow } from "@/hooks/useCashFlow";

export default function Dashboard() {
 

  return (
    <>
      <Sidebar />

      <div
        className={`h-screen pl-10 pr-10 p-6 ml-[230px] border-l-2 border-black_bg-100
      transition-all duration-500 `}
      >
      </div>
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
