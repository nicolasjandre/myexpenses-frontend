import { ExpenseIncomesModalContext } from "@/contexts/ExpenseIncomesModalContext";
import React, { useContext, useState } from "react";
import { Input } from "../Forms/Input";
import { useForm, Controller } from "react-hook-form";
import { InputBRL } from "../Forms/InputFormat";
import { Textarea } from "../Forms/Textarea";
import { Checkbox } from "../Forms/CheckBox";
import { Select } from "../Forms/Select";

interface ExpenseIncomeModalProps {
  title: string;
}

export function ExpenseIncomeModal({ title }: ExpenseIncomeModalProps) {
  const { isExpenseIncomesModalOpen, setIsExpenseIncomesModalOpen } =
    useContext(ExpenseIncomesModalContext);
  const [isToggleBoxChecked, setIsToggleBoxChecked] = useState<boolean>(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      {isExpenseIncomesModalOpen ? (
        <>
          <form onSubmit={handleSubmit((data) => console.log(data))}>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg relative flex flex-col w-full bg-gray-300 shadow-lg shadow-glass-100 outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-black_bg-100 rounded-t">
                    <h3 className="text-2xl font-semibold text-black dark:text-white">
                      {title}
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setIsExpenseIncomesModalOpen(false)}
                    ></button>
                  </div>

                  <div className="flex flex-col w-screen max-w-[500px] p-8 py-2 flex-auto gap-4">
                    <InputBRL
                      {...register("value")}
                      name="value"
                      placeholder="R$0,00"
                      error={errors?.value}
                      autoComplete="off"
                    />

                    <Checkbox
                      checkboxName="isPaidCheckbox"
                      checkedTitle="Pago!"
                      unCheckedTitle="À pagar"
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

                    <Select selectName="costcenter">
                      <option value="">Categoria</option>
                      <option value="house">Casa</option>
                      <option value="education">Educação</option>
                      <option value="health">Saúde</option>
                      <option value="leisure">Lazer</option>
                    </Select>

                    <Textarea
                      {...register("notes")}
                      name="notes"
                      placeholder="Observação"
                      error={errors?.notes}
                    />
                  </div>

                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-black_bg-100 rounded-b">
                    <button
                      className="text-red-500 hover:text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 transition-all ease-in"
                      type="button"
                      onClick={() => setIsExpenseIncomesModalOpen(false)}
                    >
                      Fechar
                    </button>
                    <button
                      className="hover:bg-green-600 text-black dark:text-white active:bg-emerald-700 font-bold uppercase bg-green-700
                    text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 transition-all ease-in"
                      type="submit"
                      onClick={() => setIsExpenseIncomesModalOpen(true)}
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </form>
        </>
      ) : null}
    </>
  );
}
