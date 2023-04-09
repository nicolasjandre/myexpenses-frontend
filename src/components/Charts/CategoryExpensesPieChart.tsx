import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useContext, useState } from "react";
import { ChartDropdown } from "../Buttons/ChartDropdown";
import { Last7OrLast30DaysChartContext } from "@/contexts/Last7OrLast30DaysChartContext";
import { useLastDaysPieExpenses } from "@/hooks/useWeeklyPieChartExpensesAndIncomes";
import { formatCurrency } from "@/utils/formatCurrency";
import { isEmpty } from "@/utils/isObjectEmpty";

type CostCenterEntry = [string, string, number];
type ArrayOfCategoryExpenses = CostCenterEntry[];

export function CategoryExpensesPieChart() {
  const { data } = useLastDaysPieExpenses();
  const { theme } = useTheme();
  const [isChartDropdownOpen, setIsChartDropdownOpen] =
    useState<boolean>(false);
  const {
    isLast7OrLast30DaysExpensesPieChart,
    setIsLast7OrLast30DaysExpensesPieChart,
  } = useContext(Last7OrLast30DaysChartContext);

  let arrayOfCategoryExpenses: ArrayOfCategoryExpenses = [];

  if (data !== undefined) {
    arrayOfCategoryExpenses = Object.entries(data).map(([key, value]) => {
      return [key, value.description, value.sumOfValues];
    });
  }

  const ExpensesChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

  const expenseOptions: ApexOptions = {
    series: arrayOfCategoryExpenses?.map((item) => item[2]) || [],
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
      width: 380,
      type: "pie",
      foreColor: theme === "dark" ? "#fff" : "#000",
      animations: { enabled: false },
    },
    labels: arrayOfCategoryExpenses?.map((item) => item[1]) || [],
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
      {isEmpty(data) ? (
        ""
      ) : (
        <div
          className="w-[50%] overflow-hidden rounded-lg bg-white shadow-glass backdrop-blur-md px-2
    pb-2 shadow-glass-100 transition-colors ease-in dark:bg-black_bg-100 xlw:w-[100%]
    2smw:flex 2smw:flex-col 2smw:items-center 2smw:justify-center"
        >
          <h2
            className="flex justify-between px-4 pt-4 text-black dark:text-white
      2smw:flex-col 2smw:items-center 2smw:justify-center 2smw:gap-4 2smw:pb-6"
          >
            Gastos por categoria
            <ChartDropdown
              isChartDropdownOpen={isChartDropdownOpen}
              setIsChartDropdownOpen={setIsChartDropdownOpen}
              isLast7OrLast30DaysChart={isLast7OrLast30DaysExpensesPieChart}
              setIsLast7OrLast30DaysChart={
                setIsLast7OrLast30DaysExpensesPieChart
              }
            />
          </h2>

          <div className="min-h-[22vw] mdw:min-h-[30vw]">
            <ExpensesChart
              width="100%"
              type="pie"
              options={expenseOptions}
              series={expenseOptions?.series}
              height={400}
            />
          </div>
        </div>
      )}
    </>
  );
}
