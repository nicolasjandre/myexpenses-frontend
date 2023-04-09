import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useContext, useEffect, useState } from "react";
import { ChartDropdown } from "../Buttons/ChartDropdown";
import { Last7OrLast30DaysChartContext } from "@/contexts/Last7OrLast30DaysChartContext";
import { useLastDaysPieIncomes } from "@/hooks/useWeeklyPieChartExpensesAndIncomes";
import { formatCurrency } from "@/utils/formatCurrency";
import { isEmpty } from "@/utils/isObjectEmpty";

type CostCenterEntry = [string, string, number];
type ArrayOfCategoryIncomes = CostCenterEntry[];

export function CategoryIncomesPieChart() {
  const { data } = useLastDaysPieIncomes();
  const { theme } = useTheme();
  const [isChartDropdownOpen, setIsChartDropdownOpen] =
    useState<boolean>(false);
  const {
    isLast7OrLast30DaysIncomesPieChart,
    setIsLast7OrLast30DaysIncomesPieChart,
  } = useContext(Last7OrLast30DaysChartContext);

  let arrayOfCategoryExpenses: ArrayOfCategoryIncomes = [];

  if (data !== undefined) {
    arrayOfCategoryExpenses = Object.entries(data).map(([key, value]) => {
      return [key, value.description, value.sumOfValues];
    });
  }

  const IncomesPieChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

  const expenseOptions: ApexOptions = {
    series: arrayOfCategoryExpenses?.map((item) => item[2]) || [],
    dataLabels: {
      style: {
        fontSize: "14px",
      },
    },
    chart: {
      width: 380,
      type: "pie",
      foreColor: theme === "dark" ? "#fff" : "#000",
      animations: { enabled: false },
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
    labels: arrayOfCategoryExpenses?.map((item) => item[1]) || [],
    colors: ["#92C020", "#228B22", "#50C878", "#15C050", "#808000", "#DFFF00"],
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
          className="w-[50%] overflow-hidden rounded-lg bg-gray-200 px-2
    pb-2 shadow-lg shadow-glass-100 transition-colors ease-in dark:bg-black_bg-100 xlw:w-[100%]
    2smw:flex 2smw:flex-col 2smw:items-center 2smw:justify-center"
        >
          <h2
            className="flex justify-between px-4 pt-4 text-black dark:text-white
        2smw:flex-col 2smw:items-center 2smw:justify-center 2smw:gap-4 2smw:pb-6"
          >
            Ganhos por categoria
            <ChartDropdown
              isChartDropdownOpen={isChartDropdownOpen}
              setIsChartDropdownOpen={setIsChartDropdownOpen}
              isLast7OrLast30DaysChart={isLast7OrLast30DaysIncomesPieChart}
              setIsLast7OrLast30DaysChart={
                setIsLast7OrLast30DaysIncomesPieChart
              }
            />
          </h2>

          <div className="min-h-[22vw] mdw:min-h-[30vw]">
          <IncomesPieChart
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
