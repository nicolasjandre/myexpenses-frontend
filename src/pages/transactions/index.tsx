import { DropdownButtonDashboard } from "@/components/Buttons/DropdownButtonDashboard";
import Header from "@/components/Header";
import { ExpenseIncomeModal } from "@/components/Modals/ExpenseIncomeModal";
import { UpdateUserBalanceModal } from "@/components/Modals/UpdateUserBalanceModal";
import Sidebar from "@/components/Sidebar";
import { Table } from "@/components/TransactionsTable/Table";
import { ExpenseIncomesModalContext } from "@/contexts/ExpenseIncomesModalContext";
import { SidebarContext } from "@/contexts/SidebarContext";
import { UserBalanceModalContext } from "@/contexts/UserBalanceModalContext";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useTheme } from "next-themes";
import nookies from "nookies";
import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
    const { isSidebarClosed } = useContext(SidebarContext);
    const { isUserBalanceModalOpen } =
        useContext(UserBalanceModalContext);
    const [modalType, setModalType] = useState<string>("");
    const { theme } = useTheme();
    const { isExpenseIncomesModalOpen } = useContext(ExpenseIncomesModalContext);

    useEffect(() => {
        if (isUserBalanceModalOpen || isExpenseIncomesModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isUserBalanceModalOpen, isExpenseIncomesModalOpen]);

    return (
        <>
            <ToastContainer autoClose={1500} theme={`${theme === "dark" ? "dark" : "light"}`} />
            <ExpenseIncomeModal title={modalType} />
            <UpdateUserBalanceModal />
            <Sidebar />

            <div
                className={`flex min-h-screen flex-col gap-4 p-6 pl-24 pr-24
      transition-all ease-in ${
          isSidebarClosed ? "ml-[71px]" : "ml-[231px]"
      } xlw:pl-8 xlw:pr-8 mdw:ml-[71px]`}
            >
                <Header />
                <div className={"flex items-center justify-between smw:flex-col smw:gap-2"}>
                    <h1 className="text-4xl text-black dark:text-white smw:text-center">
                        Transações
                    </h1>
                    <DropdownButtonDashboard
                        setModalType={setModalType}
                        tailwindCss="smw:-left-[40px]"
                    />
                </div>
                <div className="m-auto flex max-w-full w-[1000px] rounded-lg transition-colors ease-in smw:flex-col">
                    <Table />
                </div>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
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
