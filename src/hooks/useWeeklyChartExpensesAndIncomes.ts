import { Last7OrLast30DaysChartContext } from "@/contexts/Last7OrLast30DaysChartContext";
import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

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

export async function getLast7DaysExpenses(type: string, isSevenOrIsThirty: number) {
  const today = new Date();
  const last7Days = new Date(today.getTime() - isSevenOrIsThirty * 24 * 60 * 60 * 1000); // set last 7 days period
  
  // set hours to 00:00:00 and 23:59:59.999 with -3h gmt time
  last7Days.setHours(-3, 0, 0, 0);
  today.setHours(20, 59, 59, 999);


  const initialDate = formatDateString(last7Days);
  const finalDate = formatDateString(today);
  const { data } = await api.get("/dashboard", {
    params: {
      initialDate,
      finalDate,
    },
  });

  const titles: IncomeAndExpenseTitles[] =
    type === "EXPENSE" ? data?.expenseTitles : data?.incomeTitles;

  const last7DaysExpenses: any = Array.from({ length: isSevenOrIsThirty + 1 }, (_, i) => {
    const day = new Date(last7Days);
    day.setDate(last7Days.getDate() + i + 1);
    day.setHours(-3, 0, 0, 0)
    
    if (isSevenOrIsThirty === 6 && i === 6 || isSevenOrIsThirty === 29 && i === 29) {
      day.setHours(23, 59, 59, 999)
    }

    return day.toISOString().split("T")[0];
  }).map((day) => {
    const filteredData = titles?.filter((item) => {
      const itemDate = new Date(item?.referenceDate);
      itemDate.setHours(-3, 0, 0, 0);
      const itemDateStr = itemDate?.toISOString().split("T")[0];
      return itemDateStr === day && item.type === type;
    });

    return filteredData?.reduce((acc, curr) => acc + curr.value, 0) ?? 0;
  });

  return last7DaysExpenses.reverse();
}

function formatDateString(date: Date): string {
  const isoString = date.toISOString();
  return isoString.replace("T", " ").replace("Z", "");
}

export function useLastDaysExpenses() {
  const { isLast7OrLast30DaysExpensesChart } = useContext(Last7OrLast30DaysChartContext)

  return useQuery(["lastDaysExpenses", isLast7OrLast30DaysExpensesChart], () => getLast7DaysExpenses("EXPENSE", isLast7OrLast30DaysExpensesChart));
}

export function useLastDaysIncomes() {
  const { isLast7OrLast30DaysIncomesChart } = useContext(Last7OrLast30DaysChartContext)

  return useQuery(["lastDaysIncomes", isLast7OrLast30DaysIncomesChart], () => getLast7DaysExpenses("INCOME", isLast7OrLast30DaysIncomesChart));
}