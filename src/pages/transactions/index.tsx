import { DropdownButtonDashboard } from "@/components/Buttons/DropdownButtonDashboard";
import Header from "@/components/Header";
import { ExpenseIncomeModal } from "@/components/Modals/ExpenseIncomeModal";
import { UpdateUserBalanceModal } from "@/components/Modals/UpdateUserBalanceModal";
import { Pagination } from "@/components/Pagination";
import Sidebar from "@/components/Sidebar";
import { Table } from "@/components/TransactionsTable/Table";
import { ExpenseIncomesModalContext } from "@/contexts/ExpenseIncomesModalContext";
import { PageContext } from "@/contexts/PageContext";
import { SidebarContext } from "@/contexts/SidebarContext";
import { UserBalanceModalContext } from "@/contexts/UserBalanceModalContext";
import { useTitlesPaginated } from "@/hooks/useTitles";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useTheme } from "next-themes";
import nookies from "nookies";
import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CostCenter {
    id: number;
    description: string;
}

interface CreditCard {
    id: number;
    name: string;
}

interface Invoice {
    id: number;
    dueDate: string;
    paid: boolean;
}

interface Title {
    id: number;
    description: string;
    type: string;
    costCenter: CostCenter;
    creditCard: CreditCard;
    invoice: Invoice;
    value: number;
    referenceDate: string;
    createdAt: string;
    inactiveAt: null | string;
    notes: string;
}

interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}

interface Data {
    content: Title[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export default function Dashboard() {
    const { isSidebarClosed } = useContext(SidebarContext);
    const { isUserBalanceModalOpen } = useContext(UserBalanceModalContext);
    const [modalType, setModalType] = useState<string>("");
    const { theme } = useTheme();
    const { isExpenseIncomesModalOpen } = useContext(ExpenseIncomesModalContext);
    const { page, pageSize, property, sort } = useContext(PageContext);
    const [prevData, setPrevData] = useState<Data>();
    const { data, isLoading } = useTitlesPaginated(pageSize, page, sort, property);

    useEffect(() => {
        if (!isLoading) {
            setPrevData(data);
        }
    }, [data, isLoading]);

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
                className={`flex min-h-screen flex-col gap-4 bg-none p-6 pl-24 pr-24
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
                <div className="mx-auto w-[1000px] max-w-full rounded-lg transition-colors ease-in smw:flex-col">
                    <Table />
                    <Pagination
                        totalItems={prevData?.totalElements!}
                        totalPages={prevData?.totalPages!}
                    />
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
