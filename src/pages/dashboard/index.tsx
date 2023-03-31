import { useContext } from "react";
import nookies from "nookies";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { SidebarContext } from "@/contexts/SidebarContext";
import { GlobalLoader } from "@/components/GlobalLoader";
import { Box } from "@/components/Dashboard/Box";
import { MdAccountBalanceWallet, MdBalance, MdAddBox } from "react-icons/md";
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";
import { useCashFlow } from "@/hooks/useCashFlow";
import { DropdownButton } from "@/components/Buttons/DropdownButton";

export default function Dashboard() {
  const { data: cashFlow, isLoading } = useCashFlow();
  const { isSidebarClosed } = useContext(SidebarContext);

  return isLoading ? (
    <GlobalLoader />
  ) : (
    <>
      <Sidebar />

      <div
        className={`flex flex-col gap-6 pl-24 pr-24 p-6 h-screen border-l-2 border-black_bg-100
      transition-all duration-500 ${
        isSidebarClosed ? "ml-[71px]" : "ml-[231px]"
      } xlw:pl-8 xlw:pr-8 mdw:ml-[71px]`}
      >
        <Header />

        <div className="flex items-center justify-between">
          <h1 className="text-4xl smw:text-center">Dashboard</h1>
          <DropdownButton />
        </div>

        <div className="flex justify-between flex-wrap bg-black_bg-500 w-[100%] rounded-lg smw:flex-col">
          <Box
            value="R$157,23"
            title="Saldo"
            icon={<MdAccountBalanceWallet className="text-isActive-50" />}
          />
          <Box
            value={cashFlow?.totalExpenses}
            title="Despesas"
            icon={<IoMdArrowRoundDown className="text-red-600" />}
          />
          <Box
            value={cashFlow?.totalIncomes}
            title="Entradas"
            icon={<IoMdArrowRoundUp className="text-green-600" />}
          />
          <Box
            value={cashFlow?.balance}
            title="Balanço"
            icon={<MdBalance className="text-yellow-600" />}
          />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
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
    props: {},
  };
};
