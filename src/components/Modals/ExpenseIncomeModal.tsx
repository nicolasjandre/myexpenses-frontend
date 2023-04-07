import { ExpenseIncomesModalContext } from "@/contexts/ExpenseIncomesModalContext";
import React, { useContext, useState } from "react";
import { Input } from "../Forms/Input";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { InputBRL } from "../Forms/InputFormat";
import { Textarea } from "../Forms/Textarea";
import { Checkbox } from "../Forms/CheckBox";
import { MdClose } from "react-icons/md";
import { Datepicker } from "../Datepicker";
import { extractNumberFromString } from "@/utils/extractNumberFromString";
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "@/services/api";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CostcenterDropdown } from "../Buttons/CostcenterDropdownButton";

interface ExpenseIncomeModalProps {
  title: string;
}

interface CreateTitleData {
  description: string;
  costCenter: number;
  notes: string;
  isPaidCheckbox: boolean;
  value: string;
}

export function ExpenseIncomeModal({ title }: ExpenseIncomeModalProps) {
  const { isExpenseIncomesModalOpen, setIsExpenseIncomesModalOpen } =
    useContext(ExpenseIncomesModalContext);
  const [selectedReferenceDate, setSelectedReferenceDate] = useState<Date>(
    new Date()
  );
  const [selectedDueDate, setSelectedDueDate] = useState<Date>(new Date());
  const [costCenter, setCostCenter] = useState<number>(0);
  const [isCostcenterDropdownOpen, setIsCostcenterDropdownOpen] =
    useState<boolean>(false);
  const [isToggleBoxChecked, setIsToggleBoxChecked] = useState<boolean>(false);
  const queryClient = useQueryClient();

  function handleCloseModal() {
    reset();
    setIsToggleBoxChecked(false);
    setCostCenter(0);
    setIsExpenseIncomesModalOpen(false);
  }

  const loginFormSchema = yup.object().shape({
    value: yup.string().required("Você precisa inserir um valor"),

    description: yup
      .string()
      .required(
        title.includes("despesa")
          ? "Dê um nome ao gasto"
          : "Dê um nome à entrada"
      ),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTitleData>({
    resolver: yupResolver(loginFormSchema),
  });

  const createTitle = useMutation(
    async (data: CreateTitleData) => {
      const response = await api.post("/titles", {
        costCenter: {
          id: costCenter,
        },
        description: data?.description,
        notes: data?.notes,
        payDate: data?.isPaidCheckbox ? new Date() : null,
        value: extractNumberFromString(data?.value),
        dueDate: data?.isPaidCheckbox === true ? new Date() : selectedDueDate,
        referenceDate: selectedReferenceDate,
        type: title.includes("despesa") ? "EXPENSE" : "INCOME",
      });

      setCostCenter(0);

      return response.data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["cashFlow"]);
        await queryClient.invalidateQueries(["lastDaysIncomes"]);
        await queryClient.invalidateQueries(["lastDaysExpenses"]);
        await queryClient.invalidateQueries(["lastDaysPieExpenses"]);
        await queryClient.invalidateQueries(["lastDaysPieIncomes"]);
        setIsExpenseIncomesModalOpen(false);
        toast.success(
          title.includes("despesa")
            ? "Despesa adicionada com sucesso!"
            : "Entrada adicionada com sucesso!"
        );
      },
    }
  );

  const handleCreateTitle: SubmitHandler<CreateTitleData> = async (data) => {
    try {
      reset({
        description: "",
        notes: "",
      });

      await createTitle.mutateAsync(data);
    } catch (error: any) {
      setIsExpenseIncomesModalOpen(false);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Ooops... Ocorreu um erro com o servidor.");
      }
    }
  };

  return (
    <>
      {isExpenseIncomesModalOpen ? (
        <>
          <form onSubmit={handleSubmit(handleCreateTitle)}>
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
              <div className="relative my-6 mx-auto w-auto max-w-3xl">
                <div className="relative flex w-full flex-col rounded-lg border-0 bg-gray-300 shadow-lg shadow-glass-100 outline-none focus:outline-none">
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

                  <div className="flex w-[92vw] max-w-[500px] flex-auto flex-col gap-4 p-8 py-2 dark:bg-black_bg-100">
                    <InputBRL
                      {...register("value")}
                      name="value"
                      placeholder="R$0,00"
                      error={errors?.value}
                      autoComplete="off"
                      autoFocus
                    />

                    <Datepicker
                      title={
                        title.includes("despesa")
                          ? "Data do gasto"
                          : "Data da entrada"
                      }
                      setDate={setSelectedReferenceDate}
                    />

                    <Checkbox
                      isToggleBoxChecked={isToggleBoxChecked}
                      setIsToggleBoxChecked={setIsToggleBoxChecked}
                      checkboxName="isPaidCheckbox"
                      checkedTitle={
                        title.includes("despesa") ? "Pago!" : "Recebido!"
                      }
                      unCheckedTitle={
                        title.includes("despesa") ? "À pagar" : "A receber"
                      }
                      {...register("isPaidCheckbox")}
                    />

                    <Input
                      {...register("description")}
                      name="description"
                      type="text"
                      placeholder="Descrição"
                      error={errors?.description}
                      autoComplete="off"
                    />

                    <CostcenterDropdown
                      type={title.includes("despesa") ? "EXPENSE" : "INCOME"}
                      isCostcenterDropdownOpen={isCostcenterDropdownOpen}
                      setIsCostcenterDropdownOpen={setIsCostcenterDropdownOpen}
                      costCenter={costCenter}
                      setCostCenter={setCostCenter}
                    />

                    {isToggleBoxChecked ? (
                      <div className="flex h-12 cursor-not-allowed items-center rounded-lg border border-gray-400 bg-slate-200 opacity-60 dark:bg-glass-100">
                        <span className="px-4 text-center">
                          {title.includes("despesa") ? "Pago!" : "Recebido!"}
                        </span>
                      </div>
                    ) : (
                      <Datepicker
                        setDate={setSelectedDueDate}
                        title={
                          title.includes("despesa")
                            ? "Data do vencimento:"
                            : "Data do pagamento:"
                        }
                      />
                    )}

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
