import api from "@/services/api";
import { formatCurrency } from "@/utils/formatCurrency";
import { useQuery } from "@tanstack/react-query";

type CashFlow = {
   totalExpenses: string;
   totalIncomes: string;
   balance: string;
   expenseTitles: [];
   incomeTitles: [];
}

export async function getCashFlow(): Promise<CashFlow> {
  const { data } = await api.get("/dashboard" , { 
   params: { initialDate: "2023-02-01 00:00:00", finalDate: "2023-06-30 00:00:00" },
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
  return useQuery(["cashFlow"], () => getCashFlow());
}
