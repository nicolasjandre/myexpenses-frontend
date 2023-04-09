import React, { useCallback, useContext, useEffect } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { InputBRL } from "../Forms/InputFormat";
import { MdAccountBalanceWallet, MdClose } from "react-icons/md";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "@/services/api";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserBalanceModalContext } from "@/contexts/userBalanceModalContext";
import { extractNumberFromString } from "@/utils/extractNumberFromString";

interface UpdateUserBalanceData {
  value: string;
}

export function UpdateUserBalanceModal() {
  const { isUserBalanceModalOpen, setIsUserBalanceModalOpen } = useContext(
    UserBalanceModalContext
  );
  const queryClient = useQueryClient();

  const loginFormSchema = yup.object().shape({
    value: yup.string().required("Você precisa inserir um valor"),
  });

  function handleCloseModal() {
    setIsUserBalanceModalOpen(false);
    reset();
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserBalanceData>({
    resolver: yupResolver(loginFormSchema),
  });

  const updateUserBalance = useMutation(
    async (data: UpdateUserBalanceData) => {
      const response = await api.put("/users", {
        userBalance: extractNumberFromString(data?.value),
      });

      return response.data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["users"]);
        setIsUserBalanceModalOpen(false);
        toast.success("Saldo atualizado!");
      },
    }
  );

  const handleUpdateUserBalance: SubmitHandler<UpdateUserBalanceData> = async (
    data
  ) => {
    try {
      await updateUserBalance.mutateAsync(data);
    } catch (error: any) {
      setIsUserBalanceModalOpen(false);
      toast.error("Ooops... Ocorreu um erro com o servidor.");
    }
  };

  return (
    <>
      {isUserBalanceModalOpen ? (
        <>
          <form onSubmit={handleSubmit(handleUpdateUserBalance)}>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg relative flex flex-col w-full bg-gray-300 shadow-lg shadow-glass-100 outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 rounded-t dark:bg-black_bg-100">
                    <h3 className="flex items-center gap-2 text-2xl font-semibold text-black dark:text-white">
                      <MdAccountBalanceWallet className="text-blue-700 dark:text-isActive-50 text-3xl" />
                      Atualizar saldo
                    </h3>

                    <button
                      type="button"
                      className="p-1 ml-auto bg-transparent border-0
                      float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => handleCloseModal()}
                    >
                      <MdClose className="text-red-600" />
                    </button>
                  </div>

                  <div className="flex flex-col w-[92vw] max-w-[500px] p-8 py-2 flex-auto gap-4 dark:bg-black_bg-100">
                    <InputBRL
                      {...register("value")}
                      name="value"
                      placeholder="R$0,00"
                      error={errors?.value}
                      autoComplete="off"
                      autoFocus
                    />
                  </div>

                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 dark:bg-black_bg-100 rounded-b">
                    <button
                      className="text-red-500 hover:text-red-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 transition-all ease-in"
                      type="button"
                      onClick={() => handleCloseModal()}
                    >
                      Fechar
                    </button>

                    <button
                      className="hover:bg-green-600 active:bg-emerald-700 font-bold uppercase bg-green-700 text-white
                    text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 transition-all ease-in"
                      type="submit"
                      disabled={isSubmitting}
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
