import { getLastXDaysExpenses, useLastXDaysExpense } from "@/hooks/useWeeklyChartExpensesAndIncomes";
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

const ExpensesChartComp = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

export function ExpensesChart() {
    const { data: weeklyChartExpense, isInitialLoading } = useLastXDaysExpense();
    const { theme } = useTheme();
    const queryClient = useQueryClient();
    const [isChartDropdownOpen, setIsChartDropdownOpen] = useState<boolean>(false);
    const { isLast7OrLast30DaysExpensesChart, setIsLast7OrLast30DaysExpensesChart } = useContext(
        Last7OrLast30DaysChartContext
    );

    function prefetchLastDaysLineExpensesAndIncomes(days: number) {
        queryClient.prefetchQuery(["lastXDays", days], () =>
            getLastXDaysExpenses(days)
        );
    }

    const expenseOptions: ApexOptions = {
        colors: ["#ff1616"],
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
                formatter: formatCurrency,
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
            categories: weeklyChartExpense?.expenseTitles?.length === 7 ? last7Days : last30Days, // will be dynamically set
        },
    };

    const weeklyExpenses = [{ name: "Gastos", data: weeklyChartExpense?.expenseTitles ? weeklyChartExpense?.expenseTitles : [] }];

    return (
        <>
            <div
                className="min-h-[238px] w-[50%] overflow-hidden rounded-lg bg-white px-2
    pb-2 shadow-glass shadow-glass-100 backdrop-blur-md transition-colors ease-in dark:bg-black_bg-100 xlw:w-[100%]"
            >
                <h2
                    className="flex justify-between px-4 pt-4 text-black dark:text-white
      2smw:flex-col 2smw:items-center 2smw:justify-center 2smw:gap-4 2smw:pb-6"
                >
                    Frequência de gastos
                    <ChartDropdown
                        onLast30DaysMouseEnter={prefetchLastDaysLineExpensesAndIncomes}
                        isChartDropdownOpen={isChartDropdownOpen}
                        setIsChartDropdownOpen={setIsChartDropdownOpen}
                        isLast7OrLast30DaysChart={isLast7OrLast30DaysExpensesChart}
                        setIsLast7OrLast30DaysChart={setIsLast7OrLast30DaysExpensesChart}
                    />
                </h2>

                {isInitialLoading ? (
                    <div className="flex h-[160px] w-full items-center justify-center">
                        <MiniLoader />
                    </div>
                ) : (
                    <ExpensesChartComp
                        width="100%"
                        type="area"
                        options={expenseOptions}
                        series={weeklyExpenses}
                        height={160}
                    />
                )}
            </div>
        </>
    );
}
