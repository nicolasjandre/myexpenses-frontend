import { Last7OrLast30DaysChartContext } from "@/contexts/Last7OrLast30DaysChartContext";
import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

type Data = {
    expenseTitles: number[];
    incomeTitles: number[];
}

interface DataProps {
    data: Data;
}

export async function getLastXDaysExpenses(numberOfDays: number) {
 
    const { data }: DataProps = await api.get("/dashboard/lastdays", {
        params: {
            days: numberOfDays
        },
    });

    return data;
}

export function useLastXDaysExpense() {
    const { isLast7OrLast30DaysExpensesChart } = useContext(Last7OrLast30DaysChartContext);

    return useQuery(["lastXDays", isLast7OrLast30DaysExpensesChart], () =>
        getLastXDaysExpenses(isLast7OrLast30DaysExpensesChart)
    );
}

export function useLastXDaysIncome() {
    const { isLast7OrLast30DaysIncomesChart } = useContext(Last7OrLast30DaysChartContext);

    return useQuery(["lastXDays", isLast7OrLast30DaysIncomesChart], () =>
        getLastXDaysExpenses(isLast7OrLast30DaysIncomesChart)
    );
}
