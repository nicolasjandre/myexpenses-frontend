import { ExpenseIncomesModalContext } from "@/contexts/ExpenseIncomesModalContext";
import React, { useContext, useEffect, useState } from "react";
import { Input } from "../Forms/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputBRL } from "../Forms/InputFormat";
import { Textarea } from "../Forms/Textarea";
import { MdClose, MdDescription } from "react-icons/md";
import { Datepicker } from "../Datepicker";
import { extractNumberFromString } from "@/utils/extractNumberFromString";
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "@/services/api";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CostcenterDropdown } from "../Buttons/CostcenterDropdownButton";
import { FaMoneyBillWave } from "react-icons/fa";
import { CreditCardDropdown } from "../Buttons/CreditCardDropdown";
import "react-toastify/dist/ReactToastify.css";
import { useEscapeKey } from "@/utils/handleEscapeKey";

interface ExpenseIncomeModalProps {
    title: string;
}

interface CreateTitleData {
    description: string;
    costCenter: number;
    notes: string;
    installment: number;
    isPaidCheckbox: boolean;
    value: string;
}

export function ExpenseIncomeModal({ title }: ExpenseIncomeModalProps) {
    const { isExpenseIncomesModalOpen, setIsExpenseIncomesModalOpen } = useContext(
        ExpenseIncomesModalContext
    );
    const [selectedReferenceDate, setSelectedReferenceDate] = useState<Date>(new Date());
    const [costCenterId, setCostCenterId] = useState<number>(0);
    const [creditCardId, setCreditCardId] = useState<number>(0);
    const [isCostcenterDropdownOpen, setIsCostcenterDropdownOpen] = useState<boolean>(false);
    const [isCreditCardDropdownOpen, setIsCreditCardDropdownOpen] = useState<boolean>(false);
    const queryClient = useQueryClient();

    function handleCloseModal() {
        reset({
            installment: 1,
        });
        setSelectedReferenceDate(new Date());
        setCostCenterId(0);
        setCreditCardId(0);
        setIsExpenseIncomesModalOpen(false);
    }

    useEscapeKey(handleCloseModal);

    const loginFormSchema = yup.object().shape({
        value: yup.string().required("Você precisa inserir um valor"),

        installment: yup.number().required("Você precisa inserir um valor").max(99).min(1),

        description: yup
            .string()
            .required(title.includes("despesa") ? "Dê um nome ao gasto" : "Dê um nome à entrada"),
    });

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<CreateTitleData>({
        resolver: yupResolver(loginFormSchema),
    });

    const createTitle = useMutation(
        async (data: CreateTitleData) => {
            const response = await api.post("/titles", {
                costCenter: {
                    id: costCenterId,
                },
                description: data?.description,
                notes: data?.notes,
                payDate: data?.isPaidCheckbox ? new Date() : null,
                installment: creditCardId === 0 ? 1 : data?.installment,
                creditCardId: title.includes("despesa") ? creditCardId : null,
                value: extractNumberFromString(data?.value),
                referenceDate: selectedReferenceDate,
                type: title.includes("despesa") ? "EXPENSE" : "INCOME",
            });

            return response.data;
        },
        {
            onSuccess: async () => {
                toast.success(
                    title.includes("despesa")
                        ? "Despesa adicionada com sucesso!"
                        : "Entrada adicionada com sucesso!"
                );

                await Promise.all([
                    queryClient.invalidateQueries(["cashFlow"]),
                    queryClient.invalidateQueries(["users"]),
                    queryClient.invalidateQueries(["lastXDays"]),                    queryClient.invalidateQueries(["lastDaysPie"]),
                    queryClient.invalidateQueries(["creditCards"]),
                ]);
            },
        }
    );

    const handleCreateTitle: SubmitHandler<CreateTitleData> = async (data) => {
        try {
            setIsExpenseIncomesModalOpen(false);

            reset({
                description: "",
                notes: "",
                installment: 1,
            });

            if (selectedReferenceDate.getHours() > 20) {
                setSelectedReferenceDate(new Date(selectedReferenceDate.setHours(selectedReferenceDate.getHours() - 3)));
            }
            
            await createTitle.mutateAsync(data);

            setCreditCardId(0);
            setCostCenterId(0);
            setSelectedReferenceDate(new Date());
        } catch (error: any) {
            setIsExpenseIncomesModalOpen(false);
            if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message);
            } else {
                toast.error("Ooops... Ocorreu um erro com o servidor.");
            }
        }
    };

    useEffect(() => {
        setValue("installment", 1);
    }, []);

    return (
        <>
            {isExpenseIncomesModalOpen ? (
                <>
                    <form onSubmit={handleSubmit(handleCreateTitle)}>
                        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                            <div className="relative my-6 mx-auto w-auto max-w-3xl">
                                <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-glass shadow-glass-100 outline-none backdrop-blur-md focus:outline-none">
                                    <div className="flex items-start justify-between rounded-t p-5 dark:bg-black_bg-100">
                                        <h3 className="flex items-center gap-2 text-2xl font-semibold text-black dark:text-white">
                                            {title.includes("despesa") ? (
                                                <IoMdArrowRoundDown className="text-3xl text-red-600" />
                                            ) : (
                                                <IoMdArrowRoundUp className="text-3xl text-green-600" />
                                            )}{" "}
                                            {title}
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
                                            {...register("value")}
                                            name="value"
                                            placeholder="R$ 0,00"
                                            error={errors?.value}
                                            autoComplete="off"
                                            Icon={FaMoneyBillWave}
                                            autoFocus
                                        />

                                        <Input
                                            {...register("description")}
                                            name="description"
                                            type="text"
                                            placeholder="Descrição"
                                            error={errors?.description}
                                            Icon={MdDescription}
                                            autoComplete="off"
                                        />

                                        {title.includes("despesa") && (
                                            <div
                                                className={`flex items-center justify-end gap-2 ${
                                                    creditCardId === 0 ? "opacity-50" : ""
                                                }`}
                                            >
                                                <label htmlFor="installment">
                                                    <span className="pl-1 font-bold text-black dark:text-white">
                                                        Prestações:
                                                    </span>
                                                </label>

                                                <Input
                                                    {...register("installment")}
                                                    error={errors?.installment}
                                                    maxLength={2}
                                                    tailwindCss={`w-[79px] ${
                                                        creditCardId === 0 ? "opacity-50" : ""
                                                    }`}
                                                    name="installment"
                                                    type="number"
                                                    disabled={creditCardId === 0}
                                                    max={99}
                                                />
                                            </div>
                                        )}

                                        {title.includes("despesa") && (
                                            <CreditCardDropdown
                                                isCreditCardDropdownOpen={isCreditCardDropdownOpen}
                                                setIsCreditCardDropdownOpen={
                                                    setIsCreditCardDropdownOpen
                                                }
                                                creditCard={creditCardId}
                                                setCreditCard={setCreditCardId}
                                            />
                                        )}

                                        <CostcenterDropdown
                                            type={title.includes("despesa") ? "EXPENSE" : "INCOME"}
                                            isCostcenterDropdownOpen={isCostcenterDropdownOpen}
                                            setIsCostcenterDropdownOpen={
                                                setIsCostcenterDropdownOpen
                                            }
                                            costCenter={costCenterId}
                                            setCostCenter={setCostCenterId}
                                        />

                                        <Datepicker
                                            title={
                                                title.includes("despesa")
                                                    ? "Data do gasto:"
                                                    : "Data da entrada:"
                                            }
                                            setDate={setSelectedReferenceDate}
                                        />

                                        <Textarea
                                            {...register("notes")}
                                            name="notes"
                                            placeholder="Observação"
                                            error={errors?.notes}
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
