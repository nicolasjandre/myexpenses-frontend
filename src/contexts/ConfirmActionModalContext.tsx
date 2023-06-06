import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

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

type ConfirmActionModalContextData = {
    isConfirmActionModalOpen: boolean;
    setIsConfirmActionModalOpen: Dispatch<SetStateAction<boolean>>;
    confirmModalActionType: CreateCreditCardData | CreditCard | null;
    setConfirmModalActionType: Dispatch<SetStateAction<CreateCreditCardData | CreditCard | null>>;
    confirmationModalTitle: string;
    setConfirmationModalTitle: Dispatch<SetStateAction<string>>;
};

type ConfirmActionModalProviderProps = {
    children: ReactNode;
};

export const ConfirmActionModalContext = createContext({} as ConfirmActionModalContextData);

export function ConfirmActionModalProvider({ children }: ConfirmActionModalProviderProps) {
    const [isConfirmActionModalOpen, setIsConfirmActionModalOpen] = useState<boolean>(false);
    const [confirmModalActionType, setConfirmModalActionType] = useState<CreateCreditCardData | CreditCard | null>(null);
    const [confirmationModalTitle, setConfirmationModalTitle] = useState<string>("");
    // "delete", "edit", "create"

    return (
        <ConfirmActionModalContext.Provider
            value={{
                isConfirmActionModalOpen,
                setIsConfirmActionModalOpen,
                confirmModalActionType,
                setConfirmModalActionType,
                confirmationModalTitle,
                setConfirmationModalTitle
            }}
        >
            {children}
        </ConfirmActionModalContext.Provider>
    );
}
