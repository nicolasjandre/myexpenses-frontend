import { useLast7DaysExpenses } from "@/hooks/useWeeklyChartExpensesAndIncomes";
import actualWeek from "@/utils/last7Days";
import { formatCurrency } from "@/utils/formatCurrency";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

export function WeeklyExpensesChart() {
  const { data: weeklyChartExpense } = useLast7DaysExpenses();

  const ExpensesChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

  const expenseOptions: ApexOptions = {
    colors: ["#b91c1c"],
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      foreColor: "white",
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
    xaxis: {
      type: "datetime",
      labels: {
        format: "dd/MMM",
      },
      axisTicks: {
        color: "white",
      },
      categories: actualWeek, // will be dynamically set
    },
    yaxis: {
      axisTicks: {
        show: true,
      },
      axisBorder: {
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
  };

  const weeklyExpenses = [{ name: "Gastos", data: weeklyChartExpense?.[0] }];

  return (
    <div className="w-[50%] bg-black_bg-100 rounded-lg xlw:w-[100%] px-2 pb-2">
      <h2 className="px-4 pt-4">Frequência de gastos {"(Semanal)"}</h2>
      <ExpensesChart
        heigth="100%"
        width="100%"
        type="line"
        options={expenseOptions}
        series={weeklyExpenses}
        height={160}
      />
    </div>
  );
}
