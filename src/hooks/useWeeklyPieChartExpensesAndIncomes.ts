import { Last7OrLast30DaysChartContext } from "@/contexts/Last7OrLast30DaysChartContext";
import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

type ExpensesIncomesByCostCenter = {
    id: number;
    costCenter: string;
    total: number;
}

type Data = {
    expensesByCostCenter: ExpensesIncomesByCostCenter[];
    incomesByCostCenter: ExpensesIncomesByCostCenter[];
};

interface DataProps {
    data: Data;
}

export async function getLast7Or30DaysPieChart(days: number) {
    const { data }: DataProps = await api.get("/dashboard/costcenter", {
        params: {
            days,
        },
    });

    return data;
}

export function useLastDaysPieExpenses() {
    const { isLast7OrLast30DaysExpensesPieChart } = useContext(Last7OrLast30DaysChartContext);

    return useQuery(["lastDaysPie", isLast7OrLast30DaysExpensesPieChart], () =>
        getLast7Or30DaysPieChart(isLast7OrLast30DaysExpensesPieChart)
    );
}

export function useLastDaysPieIncomes() {
    const { isLast7OrLast30DaysIncomesPieChart } = useContext(Last7OrLast30DaysChartContext);

    return useQuery(["lastDaysPie", isLast7OrLast30DaysIncomesPieChart], () =>
        getLast7Or30DaysPieChart(isLast7OrLast30DaysIncomesPieChart)
    );
}
