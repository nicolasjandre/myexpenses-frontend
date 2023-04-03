import { useLast7DaysIncomes } from "@/hooks/useWeeklyChartExpensesAndIncomes";
import actualWeek from "@/utils/last7Days";
import { formatCurrency } from "@/utils/formatCurrency";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

export function WeeklyIncomesChart() {
  const { data: weeklyChartIncome } = useLast7DaysIncomes();
  const { theme } = useTheme();

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
        style: {},
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
        format: "dd/MMM",
      },
      axisTicks: {
        color: `${theme === "dark" ? "white" : "black"}`,
      },
      categories: actualWeek, // will be dynamically set
    },
  };

  const weeklyIncomes = [{ name: "Entradas", data: weeklyChartIncome ? weeklyChartIncome : []}];

  return (
    <div className="w-[50%] bg-gray-300 dark:bg-black_bg-100 shadow-lg shadow-glass-100 rounded-lg xlw:w-[100%] 
    transition-colors ease-in px-2 pb-2 overflow-hidden">
      <h2 className="flex justify-between px-4 pt-4 text-black dark:text-white">
        Frequência de entradas {"(Semanal)"}
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
