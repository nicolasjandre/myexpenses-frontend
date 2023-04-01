import { useLast7DaysIncomes } from "@/hooks/useWeeklyChartExpensesAndIncomes";
import actualWeek from "@/utils/last7Days";
import { formatCurrency } from "@/utils/formatCurrency";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

export function WeeklyIncomesChart() {
  const { data: weeklyChartIncome } = useLast7DaysIncomes();

  const IncomesChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
  });

  const incomeOptions: ApexOptions = {
    colors: ["#4d7c0f"],
    chart: {
      events: {
        mounted: (chart) => {
          chart.windowResizeHandler();
        }
      },
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
        text: "Entradas",
        style: {
          color: "#16ff29",
        },
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
  };

  const weeklyIncomes = [{ name: "Entradas", data: weeklyChartIncome?.[0] }];

  return (
    <div className="w-[50%] bg-black_bg-100 rounded-lg xlw:w-[100%] px-2 pb-2 overflow-hidden">
      <h2 className="flex justify-between px-4 pt-4">Frequência de entradas {"(Semanal)"}</h2>
      <IncomesChart
        heigth="100%"
        width="100%"
        type="line"
        options={incomeOptions}
        series={weeklyIncomes}
        height={160}
      />
    </div>
  );
}
