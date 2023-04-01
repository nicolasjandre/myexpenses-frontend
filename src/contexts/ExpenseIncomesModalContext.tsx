import {
   createContext,
   Dispatch,
   ReactNode,
   SetStateAction,
   useState,
 } from "react";
 
 type ExpenseIncomesModalContextData = {
   isExpenseIncomesModalOpen: boolean;
   setIsExpenseIncomesModalOpen: Dispatch<SetStateAction<boolean>>;
 };
 
 type ExpenseIncomesModalProviderProps = {
   children: ReactNode;
 };
 
 export const ExpenseIncomesModalContext = createContext(
   {} as ExpenseIncomesModalContextData
 );
 
 export function ExpenseIncomesModalProvider({
   children,
 }: ExpenseIncomesModalProviderProps) {
   const [isExpenseIncomesModalOpen, setIsExpenseIncomesModalOpen] = useState<boolean>(false);
 
   return (
     <ExpenseIncomesModalContext.Provider
       value={{ isExpenseIncomesModalOpen, setIsExpenseIncomesModalOpen }}
     >
       {children}
     </ExpenseIncomesModalContext.Provider>
   );
 }
 