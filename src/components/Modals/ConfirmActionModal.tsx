import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import { useEscapeKey } from "@/utils/handleEscapeKey";
import { ConfirmActionModalContext } from "@/contexts/ConfirmActionModalContext";
import CreditCardCrud from "@/services/CreditCardCrud";


export function ConfirmActionModal() {
    const { isConfirmActionModalOpen, setIsConfirmActionModalOpen, confirmModalActionType } =
        useContext(ConfirmActionModalContext);
    const { editCreditCard, deleteCreditCard } = CreditCardCrud();

    function handleCloseModal() {
        setIsConfirmActionModalOpen(false);
    }

    function handleCloseYesModal() {
        setIsConfirmActionModalOpen(false);

        if (confirmModalActionType?.actionType === "update") {
            editCreditCard.mutateAsync(confirmModalActionType);
        } else if (confirmModalActionType?.actionType === "delete") {
            deleteCreditCard.mutateAsync(confirmModalActionType);
        }
    }

    useEscapeKey(handleCloseModal);

    return (
        <>
            {isConfirmActionModalOpen ? (
                <>
                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
                        <div className="relative my-6 mx-auto w-auto max-w-3xl">
                            <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-glass shadow-glass-100 outline-none backdrop-blur-md focus:outline-none">
                                <div className="flex items-start justify-between rounded-t p-5 dark:bg-black_bg-100">
                                    <h3 className="mr-6 flex items-center gap-2 text-2xl font-semibold text-black dark:text-white">
                                        {confirmModalActionType?.actionType === "update" ? "Deseja atualizar cartão?" : "Deseja excluir o cartão?"}
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

                                {/*footer*/}
                                <div className="flex items-center justify-between rounded-b p-6 dark:bg-black_bg-100">
                                    <button
                                        className="mr-1 mb-1 rounded bg-red-700 px-6 py-3
                                        text-sm font-bold uppercase text-white shadow outline-none transition-all ease-in hover:bg-red-600 hover:shadow-lg focus:outline-none active:bg-red-700"
                                        type="button"
                                        onClick={() => handleCloseModal()}
                                    >
                                        Não
                                    </button>

                                    <button
                                        className="mr-1 mb-1 rounded bg-green-700 px-6 py-3
                                        text-sm font-bold uppercase text-white shadow outline-none transition-all ease-in hover:bg-green-600 hover:shadow-lg focus:outline-none active:bg-emerald-700"
                                        type="button"
                                        onClick={() => handleCloseYesModal()}
                                    >
                                        Sim
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
                </>
            ) : null}
        </>
    );
}
