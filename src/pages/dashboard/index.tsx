import { useContext, useState } from "react";
import nookies from "nookies";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { SidebarContext } from "@/contexts/SidebarContext";
import { Box } from "@/components/Dashboard/Box";
import { MdAccountBalanceWallet, MdBalance } from "react-icons/md";
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";
import { useCashFlow } from "@/hooks/useCashFlow";
import { DropdownButton } from "@/components/Buttons/DropdownButton";
import { IncomesChart } from "@/components/Charts/IncomesChart";
import { ExpensesChart } from "@/components/Charts/ExpensesChart";
import { ExpenseIncomeModal } from "@/components/Modals/ExpenseIncomeModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "next-themes";
import { useUser } from "@/hooks/useUser";
import { UpdateUserBalanceModal } from "@/components/Modals/UpdateUserBalanceModal";
import { UserBalanceModalContext } from "@/contexts/userBalanceModalContext";

export default function Dashboard() {
  const { data: cashFlow } = useCashFlow();

  const { data: user } = useUser();
  const { isSidebarClosed } = useContext(SidebarContext);
  const { setIsUserBalanceModalOpen } = useContext(UserBalanceModalContext);
  const [modalType, setModalType] = useState<string>("");
  const { theme } = useTheme();

  return (
    <>
      <ToastContainer
        autoClose={1500}
        theme={`${theme === "dark" ? "dark" : "light"}`}
      />
      <ExpenseIncomeModal title={modalType} />
      <UpdateUserBalanceModal />
      <Sidebar />

      <div
        className={`flex flex-col gap-6 pl-24 pr-24 p-6 h-screen
      transition-all ease-in ${
        isSidebarClosed ? "ml-[71px]" : "ml-[231px]"
      } xlw:pl-8 xlw:pr-8 mdw:ml-[71px]`}
      >
        <Header />

        <div className="flex items-center justify-between smw:flex-col smw:gap-2">
          <h1 className="text-4xl smw:text-center text-black dark:text-white">
            Dashboard
          </h1>
          <DropdownButton
            setModalType={setModalType}
            tailwindCss="smw:-left-[40px]"
          />
        </div>

        <div className="flex justify-between flex-wrap w-[100%] rounded-lg smw:flex-col transition-colors ease-in">
          <Box
            setModalOpen={setIsUserBalanceModalOpen}
            value={user?.userBalance}
            title="Saldo"
            icon={<MdAccountBalanceWallet />}
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
            icon={<MdBalance className={`${cashFlow?.balance.includes("-") ? "text-red-600 dark:text-red-600" : "text-blue-700 dark:text-blue-500"}`} />}
          />
        </div>

        <div className="flex gap-[13px] w-[100%] xlw:flex-col items-center justify-center transition-colors ease-in">
          <IncomesChart />
          <ExpensesChart />
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
