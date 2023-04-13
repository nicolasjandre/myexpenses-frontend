import { ChoosenMonthContext } from "@/contexts/ChoosenMonthContext";
import api from "@/services/api";
import { formatCurrency } from "@/utils/formatCurrency";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

type ExpenseTitles = {
  id: number;
  description: string;
  value: number;
  type: "EXPENSE";
  notes?: string;
  referenceDate: string;
  inative_at?: string | null;
};

type IncomeTitles = {
  id: number;
  description: string;
  value: number;
  type: "INCOME";
  notes?: string;
  referenceDate: string;
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
      initialDate,
      finalDate
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

export function useCashFlow() {
  const { firstDayOfMonth, lastDayOfMonth } = useContext(ChoosenMonthContext);

  return useQuery(["cashFlow", firstDayOfMonth], () => getCashFlow(firstDayOfMonth, lastDayOfMonth));
}
