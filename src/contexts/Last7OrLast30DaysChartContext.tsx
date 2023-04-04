import {
   createContext,
   Dispatch,
   ReactNode,
   SetStateAction,
   useState,
 } from "react";
 
 type Last7OrLast30DaysChartContextData = {
  isLast7OrLast30DaysExpensesChart: number;
  setIsLast7OrLast30DaysExpensesChart: Dispatch<SetStateAction<number>>;
  isLast7OrLast30DaysIncomesChart: number;
  setIsLast7OrLast30DaysIncomesChart: Dispatch<SetStateAction<number>>;
 };
 
 type Last7OrLast30DaysChartProviderProps = {
   children: ReactNode;
 };
 
 export const Last7OrLast30DaysChartContext = createContext(
   {} as Last7OrLast30DaysChartContextData
 );
 
 export function Last7OrLast30DaysChartProvider({
   children,
 }: Last7OrLast30DaysChartProviderProps) {
   const [isLast7OrLast30DaysExpensesChart, setIsLast7OrLast30DaysExpensesChart] = useState<number>(6);
   const [isLast7OrLast30DaysIncomesChart, setIsLast7OrLast30DaysIncomesChart] = useState<number>(6);

 
   return (
     <Last7OrLast30DaysChartContext.Provider
       value={{ isLast7OrLast30DaysExpensesChart, setIsLast7OrLast30DaysExpensesChart, isLast7OrLast30DaysIncomesChart, setIsLast7OrLast30DaysIncomesChart }}
     >
       {children}
     </Last7OrLast30DaysChartContext.Provider>
   );
 }
 