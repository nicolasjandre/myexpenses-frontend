import { useLastDaysIncomes } from "@/hooks/useWeeklyChartExpensesAndIncomes";
import { formatCurrency } from "@/utils/formatCurrency";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import last7Days from "@/utils/last7Days";
import last30Days from "@/utils/last30Days";
import { SetStateAction, useContext, useState } from "react";
import { ChartDropdown } from "../Buttons/ChartDropdown";
import { Last7OrLast30DaysChartContext } from "@/contexts/Last7OrLast30DaysChartContext";

export function IncomesChart() {
  const { data: weeklyChartIncome } = useLastDaysIncomes();
  const { theme } = useTheme();
  const [isChartDropdownOpen, setIsChartDropdownOpen] =
    useState<boolean>(false);
  const { isLast7OrLast30DaysIncomesChart, setIsLast7OrLast30DaysIncomesChart } = useContext(
    Last7OrLast30DaysChartContext
  );

  const IncomesChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

  const incomeOptions: ApexOptions = {
    colors: ["#4d7c0f"],
    chart: {
      type: "area",
      events: {
        mounted: (chart) => {
          chart.windowResizeHandler();
        },
      },
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
    <div
      className="w-[50%] bg-gray-200 dark:bg-black_bg-100 shadow-lg shadow-glass-100 rounded-lg xlw:w-[100%] 
    transition-colors ease-in px-2 pb-2 overflow-hidden"
    >
      <h2 className="flex justify-between px-4 pt-4 text-black dark:text-white">
        Frequência de entradas
        <ChartDropdown
          isChartDropdownOpen={isChartDropdownOpen}
          setIsChartDropdownOpen={setIsChartDropdownOpen}
          isLast7OrLast30DaysChart={isLast7OrLast30DaysIncomesChart}
          setIsLast7OrLast30DaysChart={setIsLast7OrLast30DaysIncomesChart}
        />
      </h2>
      <IncomesChart
        width="100%"
        type="area"
        options={incomeOptions}
        series={weeklyIncomes}
        height={160}
      />
    </div>
  );
}
