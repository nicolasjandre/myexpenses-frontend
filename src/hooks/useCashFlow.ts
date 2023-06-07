import { ChoosenMonthContext } from "@/contexts/ChoosenMonthContext";
import api from "@/services/api";
import { formatCurrency } from "@/utils/formatCurrency";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

type CreditCard = {
    id: number;
    name: string;
};

type CostCenter = {
    id: number;
    description: string;
};

type Invoice = {
    id: number;
    dueDate: string;
    isPaid: boolean;
}

type ExpenseTitles = {
    id: number;
    description: string;
    value: number;
    type: "EXPENSE";
    costCenter: CostCenter;
    creditCard?: CreditCard;
    notes?: string;
    invoice?: Invoice;
    referenceDate: string;
    inative_at?: string | null;
};

type IncomeTitles = {
    id: number;
    description: string;
    value: number;
    type: "INCOME";
    costCenter: CostCenter;
    creditCard?: CreditCard;
    notes?: string;
    invoice?: Invoice;
    referenceDate: string;
    inative_at?: string | null;
};

type CashFlow = {
    totalExpenses: string;
    totalIncomes: string;
    balance: string;
    expenseTitles: ExpenseTitles[];
    incomeTitles: IncomeTitles[];
    allTitlesByDueDate: ExpenseTitles[] | IncomeTitles[];
};

export async function getCashFlow(initialDate: string, finalDate: string): Promise<CashFlow> {
    const { data } = await api.get("/dashboard", {
        params: {
            initialDate,
            finalDate,
        },
    });
    
    return {
        totalExpenses: formatCurrency(data?.totalExpenses),
        totalIncomes: formatCurrency(data?.totalIncomes),
        balance: formatCurrency(data?.balance),
        expenseTitles: data?.expenseTitles,
        incomeTitles: data?.incomeTitles,
        allTitlesByDueDate: data?.allTitlesByDueDate
    };
}

export function useCashFlow() {
    const { firstDayOfMonth, lastDayOfMonth } = useContext(ChoosenMonthContext);

    return useQuery(["cashFlow", firstDayOfMonth], () =>
        getCashFlow(firstDayOfMonth, lastDayOfMonth)
    );
}
