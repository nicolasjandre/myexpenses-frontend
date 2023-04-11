import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useContext, useState } from "react";
import { ChartDropdown } from "../Buttons/ChartDropdown";
import { Last7OrLast30DaysChartContext } from "@/contexts/Last7OrLast30DaysChartContext";
import {
  getLast7Or30DaysPieChart,
  useLastDaysPieIncomes,
} from "@/hooks/useWeeklyPieChartExpensesAndIncomes";
import { formatCurrency } from "@/utils/formatCurrency";
import { useQueryClient } from "@tanstack/react-query";
import { MiniLoader } from "../Loaders/MiniLoader";

const IncomesPieChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export function CategoryIncomesPieChart() {
  const { data, isInitialLoading } = useLastDaysPieIncomes();
  const { theme } = useTheme();
  const queryClient = useQueryClient();
  const [isChartDropdownOpen, setIsChartDropdownOpen] =
    useState<boolean>(false);
  const {
    isLast7OrLast30DaysIncomesPieChart,
    setIsLast7OrLast30DaysIncomesPieChart,
  } = useContext(Last7OrLast30DaysChartContext);

  function prefetchLastDaysPieExpensesAndIncomes(days: number) {
    queryClient.prefetchQuery(["lastDaysPieIncomes", days], () =>
      getLast7Or30DaysPieChart("INCOME", days)
    );
  }

  const incomeOptions: ApexOptions = {
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
      <div
        className="w-[50%] overflow-hidden rounded-lg bg-white px-2 pb-2 shadow-glass
    shadow-glass-100 backdrop-blur-md transition-colors ease-in dark:bg-black_bg-100 xlw:w-[100%]
    2smw:flex 2smw:flex-col 2smw:items-center 2smw:justify-center"
      >
        <h2
          className="flex justify-between px-4 pt-4 text-black dark:text-white
        2smw:flex-col 2smw:items-center 2smw:justify-center 2smw:gap-4 2smw:pb-6"
        >
          Ganhos por categoria
          <ChartDropdown
            onLast30DaysMouseEnter={prefetchLastDaysPieExpensesAndIncomes}
            isChartDropdownOpen={isChartDropdownOpen}
            setIsChartDropdownOpen={setIsChartDropdownOpen}
            isLast7OrLast30DaysChart={isLast7OrLast30DaysIncomesPieChart}
            setIsLast7OrLast30DaysChart={setIsLast7OrLast30DaysIncomesPieChart}
          />
        </h2>

        <div className="min-h-[22vw] mdw:min-h-[30vw]">
        {isInitialLoading ? (
          <div className="flex h-[160px] w-full items-center justify-center">
            <MiniLoader />
          </div>
        ) : (
          <IncomesPieChart
            width="100%"
            type="pie"
            options={incomeOptions}
            series={incomeOptions?.series}
            height={400}
          />
        )}
        </div>
      </div>
    </>
  );
}
