import { useLastDaysExpenses } from "@/hooks/useWeeklyChartExpensesAndIncomes";
import { formatCurrency } from "@/utils/formatCurrency";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import last7Days from "@/utils/last7Days";
import last30Days from "@/utils/last30Days";
import { useContext, useState } from "react";
import { ChartDropdown } from "../Buttons/ChartDropdown";
import { Last7OrLast30DaysChartContext } from "@/contexts/Last7OrLast30DaysChartContext";

export function ExpensesChart() {
  const { data: weeklyChartExpense } = useLastDaysExpenses();
  const { theme } = useTheme();
  const [isChartDropdownOpen, setIsChartDropdownOpen] =
    useState<boolean>(false);
  const { isLast7OrLast30DaysExpensesChart, setIsLast7OrLast30DaysExpensesChart } = useContext(
    Last7OrLast30DaysChartContext
  );

  const ExpensesChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

  const expenseOptions: ApexOptions = {
    colors: ["#ff1616"],
    chart: {
      type: "area",
      animations: {enabled: false},
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
        text: "Gastos",
        style: {
          color: "#ff1616",
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
      categories: weeklyChartExpense?.length === 7 ? last7Days : last30Days, // will be dynamically set
    },
  };

  const weeklyExpenses = [
    { name: "Gastos", data: weeklyChartExpense ? weeklyChartExpense : [] },
  ];

  return (
    <div
      className="w-[50%] bg-white shadow-glass backdrop-blur-md dark:bg-black_bg-100 overflow-hidden
    transition-colors ease-in shadow-glass-100 rounded-lg xlw:w-[100%] px-2 pb-2"
    >
      <h2 className="flex justify-between px-4 pt-4 text-black dark:text-white
      2smw:flex-col 2smw:gap-4 2smw:justify-center 2smw:items-center 2smw:pb-6">
        Frequência de gastos
        <ChartDropdown
          isChartDropdownOpen={isChartDropdownOpen}
          setIsChartDropdownOpen={setIsChartDropdownOpen}
          isLast7OrLast30DaysChart={isLast7OrLast30DaysExpensesChart}
          setIsLast7OrLast30DaysChart={setIsLast7OrLast30DaysExpensesChart}
        />
      </h2>

      <ExpensesChart
        width="100%"
        type="area"
        options={expenseOptions}
        series={weeklyExpenses}
        height={160}
      />
    </div>
  );
}
