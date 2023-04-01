import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";

type IncomeAndExpenseTitles = {
  id: number;
  description: string;
  value: number;
  type: string;
  notes?: string;
  referenceDate: string;
  dueDate?: string;
  payDate?: string;
  inative_at?: string | null;
};

async function getLast7DaysExpenses(type: string) {
  const today = new Date();
  const last7Days = new Date(today);
  last7Days.setDate(today.getDate() - 6); // set last 7 days period

  last7Days.setHours(0, 0, 0, 0);

  const last7DaysStr = last7Days.toISOString().slice(0, 19).replace("T", " ");

  const { data } = await api.get("/dashboard", {
    params: {
      initialDate: last7DaysStr,
      finalDate: today.toISOString().slice(0, 19).replace("T", " "),
    },
  });

  const titles: IncomeAndExpenseTitles[] =
    type === "EXPENSE" ? data?.expenseTitles : data?.incomeTitles;

  const last7DaysExpenses: any = 
    Array.from({ length: 7 }, (_, i) => {
      const day = new Date(last7Days);
      day.setDate(last7Days.getDate() + i);
      return day.toISOString().split("T")[0];
    }).map((day) => {
      const filteredData = titles?.filter((item) => {
        const itemDate = new Date(item.referenceDate);
        const itemDateStr = itemDate.toISOString().split("T")[0];
        return itemDateStr === day;
      });

      return filteredData?.reduce((acc, curr) => acc + curr.value, 0) ?? 0;
    })

  return last7DaysExpenses.reverse();
}

export function useLast7DaysExpenses() {
  return useQuery(["last7DaysExpenses"], () => getLast7DaysExpenses("EXPENSE"));
}

export function useLast7DaysIncomes() {
  return useQuery(["last7DaysIncomes"], () => getLast7DaysExpenses("INCOME"));
}
