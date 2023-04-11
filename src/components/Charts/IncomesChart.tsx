import {
  getLast7DaysExpenses,
  useLastDaysIncomes,
} from "@/hooks/useWeeklyChartExpensesAndIncomes";
import { formatCurrency } from "@/utils/formatCurrency";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import last7Days from "@/utils/last7Days";
import last30Days from "@/utils/last30Days";
import { useContext, useState } from "react";
import { ChartDropdown } from "../Buttons/ChartDropdown";
import { Last7OrLast30DaysChartContext } from "@/contexts/Last7OrLast30DaysChartContext";
import { useQueryClient } from "@tanstack/react-query";
import { MiniLoader } from "../Loaders/MiniLoader";

const IncomesChartComp = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export function IncomesChart() {
  const { data: weeklyChartIncome, isInitialLoading } = useLastDaysIncomes();
  const { theme } = useTheme();
  const queryClient = useQueryClient();
  const [isChartDropdownOpen, setIsChartDropdownOpen] =
    useState<boolean>(false);
  const {
    isLast7OrLast30DaysIncomesChart,
    setIsLast7OrLast30DaysIncomesChart,
  } = useContext(Last7OrLast30DaysChartContext);

  function prefetchLastDaysLineExpensesAndIncomes(days: number) {
    queryClient.prefetchQuery(["lastDaysIncomes", days], () =>
      getLast7DaysExpenses("INCOME", days)
    );
  }

  const incomeOptions: ApexOptions = {
    colors: ["#4d7c0f"],
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      foreColor: `${theme === "dark" ? "white" : "black"}`,
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
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
    yaxis: {
      axisTicks: {
        show: true,
      },
      axisBorder: {
        color: `${theme === "dark" ? "white" : "black"}`,
        show: true,
      },
      labels: {
        style: { fontWeight: "bold" },
      },
      title: {
        text: "Entradas",
        style: {
          color: "green",
        },
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        format: "dd/MM",
      },
      axisTicks: {
        color: `${theme === "dark" ? "white" : "black"}`,
      },
      categories: weeklyChartIncome?.length === 7 ? last7Days : last30Days, // will be dynamically set
    },
  };

  const weeklyIncomes = [
    { name: "Entradas", data: weeklyChartIncome ? weeklyChartIncome : [] },
  ];

  return (
    <>
      <div
        className="min-h-[238px] w-[50%] overflow-hidden rounded-lg bg-white px-2 pb-2 shadow-glass 
    shadow-glass-100 backdrop-blur-md transition-colors ease-in dark:bg-black_bg-100 xlw:w-[100%]"
      >
        <h2
          className="flex justify-between px-4 pt-4 text-black dark:text-white
      2smw:flex-col 2smw:items-center 2smw:justify-center 2smw:gap-4 2smw:pb-6"
        >
          Frequência de entradas
          <ChartDropdown
            onLast30DaysMouseEnter={prefetchLastDaysLineExpensesAndIncomes}
            isChartDropdownOpen={isChartDropdownOpen}
            setIsChartDropdownOpen={setIsChartDropdownOpen}
            isLast7OrLast30DaysChart={isLast7OrLast30DaysIncomesChart}
            setIsLast7OrLast30DaysChart={setIsLast7OrLast30DaysIncomesChart}
          />
        </h2>

        {isInitialLoading ? (
          <div className="flex items-center justify-center w-full h-[160px]">
            <MiniLoader />
          </div>
        ) : (
          <IncomesChartComp
            width="100%"
            type="area"
            options={incomeOptions}
            series={weeklyIncomes}
            height={160}
          />
        )}
      </div>
    </>
  );
}
