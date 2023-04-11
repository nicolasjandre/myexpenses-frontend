import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useContext, useState } from "react";
import { ChartDropdown } from "../Buttons/ChartDropdown";
import { Last7OrLast30DaysChartContext } from "@/contexts/Last7OrLast30DaysChartContext";
import {
  getLast7Or30DaysPieChart,
  useLastDaysPieExpenses,
} from "@/hooks/useWeeklyPieChartExpensesAndIncomes";
import { formatCurrency } from "@/utils/formatCurrency";
import { useQueryClient } from "@tanstack/react-query";
import { MiniLoader } from "../Loaders/MiniLoader";

const ExpensesPieChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export function CategoryExpensesPieChart() {
  const { data, isInitialLoading } = useLastDaysPieExpenses();
  const queryClient = useQueryClient();
  const { theme } = useTheme();
  const [isChartDropdownOpen, setIsChartDropdownOpen] =
    useState<boolean>(false);
  const {
    isLast7OrLast30DaysExpensesPieChart,
    setIsLast7OrLast30DaysExpensesPieChart,
  } = useContext(Last7OrLast30DaysChartContext);

  function prefetchLastDaysPieExpensesAndIncomes(days: number) {
    queryClient.prefetchQuery(["lastDaysPieExpenses", days], () =>
      getLast7Or30DaysPieChart("EXPENSE", days)
    );
  }

  const expenseOptions: ApexOptions = {
    series: data?.series || [],
    dataLabels: {
      style: {
        fontSize: "14px",
      },
    },
    tooltip: {
      enabled: true,
      enabledOnSeries: undefined,
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      y: {
        formatter: formatCurrency,
      },
    },
    chart: {
      foreColor: theme === "dark" ? "#fff" : "#000",
    },
    labels: data?.label || [],
    colors: ["#880808", "#CC5500", "#702963", "#954535", "#FF3131", "#722F37"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <>
      <div
        className="w-[50%] overflow-hidden rounded-lg bg-white px-2 pb-2 shadow-glass
    shadow-glass-100 backdrop-blur-md transition-colors ease-in dark:bg-black_bg-100 xlw:w-[100%]
    2smw:flex 2smw:flex-col 2smw:items-center 2smw:justify-center"
      >
        <h2
          className="flex justify-between px-4 pt-4 text-black dark:text-white
      2smw:flex-col 2smw:items-center 2smw:justify-center 2smw:gap-4 2smw:pb-6"
        >
          Gastos por categoria
          <ChartDropdown
            onLast30DaysMouseEnter={prefetchLastDaysPieExpensesAndIncomes}
            isChartDropdownOpen={isChartDropdownOpen}
            setIsChartDropdownOpen={setIsChartDropdownOpen}
            isLast7OrLast30DaysChart={isLast7OrLast30DaysExpensesPieChart}
            setIsLast7OrLast30DaysChart={setIsLast7OrLast30DaysExpensesPieChart}
          />
        </h2>

        <div className="min-h-[22vw] mdw:min-h-[30vw]">
          {isInitialLoading ? (
            <div className="flex h-[160px] w-full items-center justify-center">
              <MiniLoader />
            </div>
          ) : (
            <ExpensesPieChart
              width="100%"
              type="pie"
              options={expenseOptions}
              series={expenseOptions?.series}
              height={400}
            />
          )}
        </div>
      </div>
    </>
  );
}
