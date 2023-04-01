import { ExpenseIncomesModalContext } from "@/contexts/ExpenseIncomesModalContext";
import React, { useContext, useState } from "react";
import { Input } from "../Forms/Input";
import { useForm, Controller } from "react-hook-form";
import { InputBRL } from "../Forms/InputFormat";
import { Textarea } from "../Forms/Textarea";

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
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black_bg-100 outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-black_bg-100 rounded-t">
                    <h3 className="text-2xl font-semibold">{title}</h3>
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

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        {...register("isPaid")}
                        name="isPaid"
                        className="sr-only peer"
                        onChange={() => setIsToggleBoxChecked((prev) => !prev)}
                      />
                      <div
                        className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full
                        peer-checked:after:translate-x-full
                         peer-checked:after:border-green after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                          after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                            peer-checked:bg-green-600"
                      ></div>
                      <span
                        className={`ml-3 font-medium text-md ${
                          isToggleBoxChecked ? "text-green-600" : "text-red-400"
                        }`}
                      >
                        {isToggleBoxChecked ? "Pago!" : "À pagar!"}
                      </span>
                    </label>

                    <Input
                      {...register("description")}
                      name="description"
                      type="text"
                      placeholder="Descrição"
                      error={errors?.description}
                      autoComplete="off"
                    />

                    <select
                      id="costcenter"
                      {...register("costcenter")}
                      name="costcenter"
                      className="bg-glass-100 px-4 text-white rounded-lg h-12 p-2 focus:outline-double outline-offset-1 focus:ring-black_bg-100 focus:border-black_bg-100 block text-[14px] w-full mt-2"
                    >
                      <option value="">Categoria</option>
                      <option value="house">Casa</option>
                      <option value="education">Educação</option>
                      <option value="health">Saúde</option>
                      <option value="leisure">Lazer</option>
                    </select>


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
                      className="text-red-500 hover:text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setIsExpenseIncomesModalOpen(false)}
                    >
                      Fechar
                    </button>
                    <button
                      className="hover:bg-green-600 text-white active:bg-emerald-700 font-bold uppercase bg-green-700
                    text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
