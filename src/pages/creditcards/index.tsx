import { useContext, useEffect, useState } from "react";
import nookies from "nookies";
import { GetServerSideProps } from "next";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { SidebarContext } from "@/contexts/SidebarContext";
import { ToastContainer } from "react-toastify";
import { useTheme } from "next-themes";
import { CreditCard } from "@/components/CreditCard";
import { ButtonNewCreditCard } from "@/components/Buttons/ButtonNewCreditCard";
import { useCreditCards } from "@/hooks/useCreditCards";
import { useUser } from "@/hooks/useUser";
import { CreditCardModalContext } from "@/contexts/CreditCardModalContext";
import { CreditCardModal } from "@/components/Modals/CreditCardModal";

type CreditCard = {
    id: number;
    name: string;
    creditLimit: number;
    availableLimit: number;
    closingDay: number;
    dueDay: number;
    flag: string;
    bank: string;
    inative_at: Date | null;
};

export default function Dashboard() {
    const { isSidebarClosed } = useContext(SidebarContext);
    const { theme } = useTheme();
    const { data: creditCards } = useCreditCards();
    const { data: user } = useUser();
    const { isCreditCardModalOpen, setIsCreditCardModalOpen } = useContext(CreditCardModalContext);
    const [creditCardBeingEdited, setCreditCardBeingEdited] = useState<CreditCard | null>(null);

    useEffect(() => {
        if (isCreditCardModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isCreditCardModalOpen]);

    return (
        <>
            <ToastContainer autoClose={1500} theme={`${theme === "dark" ? "dark" : "light"}`} />
            <CreditCardModal
                creditCardBeingEdited={creditCardBeingEdited}
                setCreditCardBeingEdited={setCreditCardBeingEdited}
            />
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
                        Cartões de Crédito
                    </h1>
                    <ButtonNewCreditCard title="Novo cartão" />
                </div>

                <div className="flex flex-wrap justify-center gap-6">
                    {creditCards?.length > 0 ? (
                        creditCards?.map((creditCard: CreditCard) => {
                            return (
                                <CreditCard
                                    name={user?.name!}
                                    key={creditCard?.id}
                                    creditCard={creditCard}
                                    onClick={() => {
                                        setCreditCardBeingEdited(creditCard);
                                        setIsCreditCardModalOpen(true);
                                    }}
                                />
                            );
                        })
                    ) : (
                        <p className="text-2xl">Nenhum cartão cadastrado</p>
                    )}
                </div>
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
