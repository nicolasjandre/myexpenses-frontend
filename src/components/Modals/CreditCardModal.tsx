import React, { useCallback, useContext, useEffect, useState } from "react";
import { Input } from "../Forms/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputBRL } from "../Forms/InputFormat";
import { MdClose, MdDescription } from "react-icons/md";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "@/services/api";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaCalendar, FaMoneyBillWave } from "react-icons/fa";
import { CreditCardModalContext } from "@/contexts/CreditCardModalContext";
import { BanksDropdown } from "../Buttons/BanksDropdown";
import { useBanks } from "@/hooks/useBanks";
import { FlagsDropdown } from "../Buttons/FlagsDropdown";
import { useFlags } from "@/hooks/useFlags";
import { extractNumberFromString } from "@/utils/extractNumberFromString";
import "react-toastify/dist/ReactToastify.css";

interface CreateCreditCardData {
    name: string;
    creditLimit: string;
    flag: string;
    bank: string;
    closingDay: number | string;
    dueDay: number | string;
}

export function CreditCardModal() {
    const { isCreditCardModalOpen, setIsCreditCardModalOpen } = useContext(CreditCardModalContext);
    const [isBankDropdownOpen, setIsBankDropdownOpen] = useState<boolean>(false);
    const [isFlagDropdownOpen, setIsFlagDropdownOpen] = useState<boolean>(false);
    const [bank, setBank] = useState<string>("");
    const [flag, setFlag] = useState<string>("");
    const { data: banks } = useBanks();
    const { data: flags } = useFlags();
    const queryClient = useQueryClient();

    function handleCloseModal() {
        setIsCreditCardModalOpen(false);
    }

    const KEY_NAME_ESC = "Escape";
    const KEY_EVENT_TYPE = "keyup";

    function useEscapeKey(handleCloseModal: () => void) {
        const handleEscKey = useCallback(
            (event: any) => {
                if (event.key === KEY_NAME_ESC) {
                    handleCloseModal();
                }
            },
            [handleCloseModal]
        );

        useEffect(() => {
            document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);

            return () => {
                document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
            };
        }, [handleEscKey]);
    }

    useEscapeKey(handleCloseModal);

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
    });

    const createCreditCard = useMutation(
        async (data: CreateCreditCardData) => {
            const response = await api.post("/creditcard", {
                name: data?.name,
                creditLimit: extractNumberFromString(data?.creditLimit),
                flag: flag,
                bank: bank,
                closingDay: data?.closingDay,
                dueDay: data?.dueDay,
            });

            return response.data;
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["creditCards"]);
                setIsCreditCardModalOpen(false);
                toast.success("Cartão de crédito cadastrado com sucesso");
            },
        }
    );

    const handleCreateCreditCard: SubmitHandler<CreateCreditCardData> = async (data) => {
        try {
            if (bank === "" || flag === "") {
                throw new Error("Erro: É necessário escolher um banco e uma bandeira.");
            }

            await createCreditCard.mutateAsync(data);

            setBank("");
            setFlag("");

            reset({
                name: "",
                closingDay: "",
                dueDay: "",
            });
        } catch (error: any) {
            setIsCreditCardModalOpen(false);
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            } else if (error?.message) {
                toast.error(error?.message);
            } else {
                toast.error("Ooops... Ocorreu um erro com o servidor.");
            }
        }
    };

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
                                            Cadastrar cartão
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
                                        />

                                        <Input
                                            {...register("name")}
                                            name="name"
                                            type="text"
                                            placeholder="Nome do cartão"
                                            error={errors?.name}
                                            Icon={MdDescription}
                                            autoComplete="off"
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
                                        />

                                        <BanksDropdown
                                            isBanksDropdownOpen={isBankDropdownOpen}
                                            setIsBanksDropdownOpen={setIsBankDropdownOpen}
                                            banks={banks}
                                            setBank={setBank}
                                        />

                                        <FlagsDropdown
                                            flags={flags}
                                            isFlagsDropdownOpen={isFlagDropdownOpen}
                                            setFlag={setFlag}
                                            setIsFlagsDropdownOpen={setIsFlagDropdownOpen}
                                        />
                                    </div>

                                    {/*footer*/}
                                    <div className="flex items-center justify-end rounded-b p-6 dark:bg-black_bg-100">
                                        <button
                                            className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all ease-in hover:text-red-600 focus:outline-none"
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
                                            Salvar
                                        </button>
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
