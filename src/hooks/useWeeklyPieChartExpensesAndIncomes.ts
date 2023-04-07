import { Last7OrLast30DaysChartContext } from "@/contexts/Last7OrLast30DaysChartContext";
import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

type costCenter = {
  description: string;
  id: number;
  inative_at: Date;
  standard: boolean;
  type: "EXPENSE" | "INCOME";
};

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
  costCenter: costCenter;
};

type FilteredDataByCostCenter = {
  [costCenterId: number]: {
    description: string;
    sumOfValues: number;
  };
};

async function getLast7Or30DaysPieChart(
  type: string,
  isSevenOrIsThirty: number
) {
  const today = new Date();
  const last7Days = new Date(
    today.getTime() - isSevenOrIsThirty * 24 * 60 * 60 * 1000
  ); // set last 7 days period

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

  const last7DaysExpenses: any = Array.from(
    { length: isSevenOrIsThirty + 1 },
    (_, i) => {
      const day = new Date(last7Days);
      day.setDate(last7Days.getDate() + i + 1);
      day.setHours(-3, 0, 0, 0);

      if (
        (isSevenOrIsThirty === 6 && i === 6) ||
        (isSevenOrIsThirty === 29 && i === 29)
      ) {
        day.setHours(23, 59, 59, 999);
      }

      return day.toISOString().split("T")[0];
    }
  ).map((day) => {
    const filteredData = titles?.filter((item) => {
      const itemDate = new Date(item?.referenceDate);
      const itemDateStr = itemDate?.toISOString().split("T")[0];
      return itemDateStr === day && item.type === type;
    });
    return filteredData;
  });

  const filteredDataByCostCenter: FilteredDataByCostCenter = {};

  last7DaysExpenses.forEach((filteredData: IncomeAndExpenseTitles[]) => {
    filteredData.forEach((item: IncomeAndExpenseTitles) => {
      const costCenterId = item?.costCenter?.id;
      const costCenterDescription = item?.costCenter?.description;
      const value = item.value;

      if (!filteredDataByCostCenter[costCenterId]) {
        filteredDataByCostCenter[costCenterId] = {
          description: costCenterDescription,
          sumOfValues: 0,
        };
      }
      filteredDataByCostCenter[costCenterId].sumOfValues += value;
    });
  });

  return filteredDataByCostCenter;
}

function formatDateString(date: Date): string {
  const isoString = date.toISOString();
  return isoString.replace("T", " ").replace("Z", "");
}

export function useLastDaysPieExpenses() {
  const { isLast7OrLast30DaysExpensesPieChart } = useContext(Last7OrLast30DaysChartContext)

  return useQuery(["lastDaysPieExpenses", isLast7OrLast30DaysExpensesPieChart], () => getLast7Or30DaysPieChart("EXPENSE", isLast7OrLast30DaysExpensesPieChart));
}

export function useLastDaysPieIncomes() {
  const { isLast7OrLast30DaysIncomesPieChart } = useContext(Last7OrLast30DaysChartContext)

  return useQuery(["lastDaysPieIncomes", isLast7OrLast30DaysIncomesPieChart], () => getLast7Or30DaysPieChart("INCOME", isLast7OrLast30DaysIncomesPieChart));
}
