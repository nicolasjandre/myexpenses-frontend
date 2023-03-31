import api from "@/services/api";
import { formatCurrency } from "@/utils/formatCurrency";
import { useQuery } from "@tanstack/react-query";

type ExpenseTitles = {
  id: number;
  description: string;
  value: number;
  type: "EXPENSE";
  notes?: string;
  referenceDate: string;
  dueDate?: string;
  payDate?: string;
  inative_at?: string | null;
};

type IncomeTitles = {
  id: number;
  description: string;
  value: number;
  type: "INCOME";
  notes?: string;
  referenceDate: string;
  dueDate?: string;
  payDate?: string;
  inative_at?: string | null;
};

type CashFlow = {
  totalExpenses: string;
  totalIncomes: string;
  balance: string;
  expenseTitles: ExpenseTitles[];
  incomeTitles: IncomeTitles[];
};

export async function getCashFlow(initialDate: string, finalDate: string): Promise<CashFlow> {
  const { data } = await api.get("/dashboard", {
    params: {
      initialDate: initialDate,
      finalDate: finalDate
    },
  });

  return {
    totalExpenses: formatCurrency(data?.totalExpenses),
    totalIncomes: formatCurrency(data?.totalIncomes),
    balance: formatCurrency(data?.balance),
    expenseTitles: data?.expenseTitles,
    incomeTitles: data?.incomeTitles,
  };
}

export function useCashFlow(initialDate: string, finalDate: string) {
  return useQuery(["cashFlow"], () => getCashFlow(initialDate, finalDate));
}
