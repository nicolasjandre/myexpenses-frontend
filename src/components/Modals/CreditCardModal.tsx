import React, { useContext, useEffect, useState } from "react";
import { Input } from "../Forms/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputBRL } from "../Forms/InputFormat";
import { MdClose, MdDescription } from "react-icons/md";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { FaCalendar, FaMoneyBillWave } from "react-icons/fa";
import { CreditCardModalContext } from "@/contexts/CreditCardModalContext";
import { BanksDropdown } from "../Buttons/BanksDropdown";
import { useBanks } from "@/hooks/useBanks";
import { FlagsDropdown } from "../Buttons/FlagsDropdown";
import { useFlags } from "@/hooks/useFlags";
import "react-toastify/dist/ReactToastify.css";
import { formatCurrency } from "@/utils/formatCurrency";
import { useEscapeKey } from "@/utils/handleEscapeKey";
import CreditCardCrud from "@/services/CreditCardCrud";
import { ConfirmActionModalContext } from "@/contexts/ConfirmActionModalContext";

interface CreateCreditCardData {
    id?: number;
    name: string;
    creditLimit: string;
    flag: string;
    bank: string;
    closingDay: number | string;
    dueDay: number | string;
    actionType: string | null;
}

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
    actionType: string | null;
};

interface CreditCardModalProps {
    creditCardBeingEdited: CreditCard | null;
    setCreditCardBeingEdited: React.Dispatch<React.SetStateAction<CreditCard | null>>;
}

export function CreditCardModal({
    creditCardBeingEdited,
    setCreditCardBeingEdited,
}: CreditCardModalProps) {
    const { isCreditCardModalOpen, setIsCreditCardModalOpen } = useContext(CreditCardModalContext);
    const { createCreditCard } = CreditCardCrud();
    const { setIsConfirmActionModalOpen, setConfirmModalActionType } =
        useContext(ConfirmActionModalContext);
    const [isBankDropdownOpen, setIsBankDropdownOpen] = useState<boolean>(false);
    const [isFlagDropdownOpen, setIsFlagDropdownOpen] = useState<boolean>(false);
    const [bank, setBank] = useState<string>("");
    const [flag, setFlag] = useState<string>("");
    const { data: banks } = useBanks();
    const { data: flags } = useFlags();

    const actionTypeForConfirmModal = {
        update: "update",
        delete: "delete",
    };

    function handleCloseModal() {
        reset({});
        setCreditCardBeingEdited(null);
        setIsCreditCardModalOpen(false);
    }

    function handleDeleteCreditCard() {
        creditCardBeingEdited!.actionType = actionTypeForConfirmModal.delete;
        setConfirmModalActionType(creditCardBeingEdited);
        setIsConfirmActionModalOpen(true);
        reset({});
        setCreditCardBeingEdited(null);
        setIsCreditCardModalOpen(false);
    }

    const loginFormSchema = yup.object().shape({
        name: yup
            .string()
            .required("Você precisa inserir um nome")
            .max(30, "O nome não pode ter mais que 30 caracteres")
            .min(1, "O nome precisa ter ao menos um caracter"),

        creditLimit: yup.string().required("Você precisa informar o limite"),

        closingDay: yup
            .number()
            .required("Você precisa informar o dia de fechamento")
            .min(1, "O dia de fechamento deve ser maior que 0 e menor que 31")
            .max(31, "O dia de fechamento deve ser maior que 0 e menor que 31"),

        dueDay: yup
            .number()
            .required("Você precisa informar o dia de vencimento")
            .min(1, "O dia de vencimento deve ser maior que 0 e menor que 31")
            .max(31, "O dia de vencimento deve ser maior que 0 e menor que 31"),
    });

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateCreditCardData>({
        resolver: yupResolver(loginFormSchema),
        defaultValues: {
            bank: creditCardBeingEdited?.bank,
            closingDay: creditCardBeingEdited?.closingDay,
            creditLimit:
                (creditCardBeingEdited?.creditLimit &&
                    formatCurrency(creditCardBeingEdited?.creditLimit)) ||
                "",
            dueDay: creditCardBeingEdited?.dueDay,
            flag: creditCardBeingEdited?.flag,
            name: creditCardBeingEdited?.name,
        },
    });

    const handleCreateCreditCard: SubmitHandler<CreateCreditCardData> = async (data) => {
        try {
            handleCloseModal();

            if (bank === "" || flag === "") {
                throw new Error("Erro: É necessário escolher um banco e uma bandeira.");
            }

            data.bank = bank;
            data.flag = flag;

            if (creditCardBeingEdited) {
                data.id = creditCardBeingEdited?.id;
                data.actionType = actionTypeForConfirmModal.update;

                setConfirmModalActionType(data);
                setIsConfirmActionModalOpen(true);
            } else {
                await createCreditCard.mutateAsync(data);
            }

            setBank("");
            setFlag("");

            reset({
                name: "",
                closingDay: "",
                dueDay: "",
            });
        } catch (error: any) {
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            } else if (error?.message) {
                toast.error(error?.message);
            } else {
                toast.error("Ooops... Ocorreu um erro com o servidor.");
            }
        }
    };

    useEffect(() => {
        setBank(creditCardBeingEdited?.bank!);
        setFlag(creditCardBeingEdited?.flag!);
    }, [creditCardBeingEdited]);

    useEscapeKey(handleCloseModal);

    return (
        <>
            {isCreditCardModalOpen ? (
                <>
                    <form onSubmit={handleSubmit(handleCreateCreditCard)}>
                        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                            <div className="relative my-6 mx-auto w-auto max-w-3xl">
                                <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-glass shadow-glass-100 outline-none backdrop-blur-md focus:outline-none">
                                    <div className="flex items-start justify-between rounded-t p-5 dark:bg-black_bg-100">
                                        <h3 className="flex items-center gap-2 text-2xl font-semibold text-black dark:text-white">
                                            {creditCardBeingEdited
                                                ? "Editar cartão"
                                                : "Cadastrar cartão"}
                                        </h3>

                                        <button
                                            type="button"
                                            className="float-right ml-auto border-0 bg-transparent
                      p-1 text-3xl font-semibold leading-none outline-none focus:outline-none"
                                            onClick={() => handleCloseModal()}
                                        >
                                            <MdClose className="text-red-600" />
                                        </button>
                                    </div>

                                    <div className="flex w-[92vw] max-w-[500px] flex-auto flex-col gap-6 p-8 py-2 dark:bg-black_bg-100">
                                        <InputBRL
                                            {...register("creditLimit")}
                                            name="creditLimit"
                                            placeholder="R$ 0,00 (Limite)"
                                            error={errors?.creditLimit}
                                            autoComplete="off"
                                            Icon={FaMoneyBillWave}
                                            autoFocus
                                            defaultValue={creditCardBeingEdited?.creditLimit}
                                        />

                                        <Input
                                            {...register("name")}
                                            name="name"
                                            type="text"
                                            placeholder="Nome do cartão"
                                            error={errors?.name}
                                            Icon={MdDescription}
                                            autoComplete="off"
                                            defaultValue={creditCardBeingEdited?.name}
                                        />

                                        <Input
                                            {...register("closingDay")}
                                            name="closingDay"
                                            type="number"
                                            placeholder="Dia do fechamento"
                                            error={errors?.closingDay}
                                            Icon={FaCalendar}
                                            autoComplete="off"
                                            max={31}
                                            min={1}
                                            defaultValue={creditCardBeingEdited?.closingDay}
                                        />

                                        <Input
                                            {...register("dueDay")}
                                            name="dueDay"
                                            type="number"
                                            placeholder="Dia do pagamento"
                                            error={errors?.dueDay}
                                            Icon={FaCalendar}
                                            autoComplete="off"
                                            max={31}
                                            min={1}
                                            defaultValue={creditCardBeingEdited?.dueDay}
                                        />

                                        <BanksDropdown
                                            isBanksDropdownOpen={isBankDropdownOpen}
                                            setIsBanksDropdownOpen={setIsBankDropdownOpen}
                                            banks={banks}
                                            setBank={setBank}
                                            bank={bank}
                                        />

                                        <FlagsDropdown
                                            isFlagsDropdownOpen={isFlagDropdownOpen}
                                            setIsFlagsDropdownOpen={setIsFlagDropdownOpen}
                                            flags={flags}
                                            setFlag={setFlag}
                                            flag={flag}
                                        />
                                    </div>

                                    {/*footer*/}
                                    <div
                                        className={`flex items-center rounded-b p-6 dark:bg-black_bg-100 ${
                                            creditCardBeingEdited
                                                ? "justify-between"
                                                : "justify-end"
                                        }`}
                                    >
                                        {creditCardBeingEdited && (
                                            <button
                                                className="mr-1 mb-1 rounded bg-red-700 px-6 py-3 text-sm font-bold uppercase text-white
                                                    shadow outline-none transition-all ease-in hover:bg-red-600 hover:shadow-lg
                                                    focus:outline-none active:bg-red-700"
                                                disabled={isSubmitting}
                                                type="button"
                                                onClick={() => handleDeleteCreditCard()}
                                            >
                                                Deletar
                                            </button>
                                        )}
                                        <div>
                                            <button
                                                className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all ease-in              hover:text-red-600 focus:outline-none"
                                                type="button"
                                                onClick={() => handleCloseModal()}
                                            >
                                                Fechar
                                            </button>

                                            <button
                                                className="mr-1 mb-1 rounded bg-green-700 px-6 py-3
                                                text-sm font-bold uppercase text-white shadow outline-none transition-all ease-in hover:bg-green-600 hover:shadow-lg focus:outline-none active:bg-emerald-700"
                                                type="submit"
                                                disabled={isSubmitting}
                                            >
                                                {creditCardBeingEdited ? "Editar" : "Salvar"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                    </form>
                </>
            ) : null}
        </>
    );
}
