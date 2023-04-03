import { useLast7DaysExpenses } from "@/hooks/useWeeklyChartExpensesAndIncomes";
import actualWeek from "@/utils/last7Days";
import { formatCurrency } from "@/utils/formatCurrency";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

export function WeeklyExpensesChart() {
  const { data: weeklyChartExpense } = useLast7DaysExpenses();
  const { theme } = useTheme();

  const ExpensesChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

  const expenseOptions: ApexOptions = {
    colors: ["#ff1616"],
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
        style: {},
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
        format: "dd/MMM",
      },
      axisTicks: {
        color: `${theme === "dark" ? "white" : "black"}`,
      },
      categories: actualWeek, // will be dynamically set
    },
  };

  const weeklyExpenses = [{ name: "Gastos", data: weeklyChartExpense ? weeklyChartExpense : []}];

  return (
    <div className="w-[50%] bg-gray-300 dark:bg-black_bg-100 shadow-lg overflow-hidden
    transition-colors ease-in shadow-glass-100 rounded-lg xlw:w-[100%] px-2 pb-2">
      <h2 className="px-4 pt-4 text-black dark:text-white">Frequência de gastos {"(Semanal)"}</h2>
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
