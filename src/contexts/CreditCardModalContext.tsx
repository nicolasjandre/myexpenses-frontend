import {
   createContext,
   Dispatch,
   ReactNode,
   SetStateAction,
   useState,
 } from "react";
 
 type CreditCardModalContextData = {
   isCreditCardModalOpen: boolean;
   setIsCreditCardModalOpen: Dispatch<SetStateAction<boolean>>;
 };
 
 type CreditCardModalProviderProps = {
   children: ReactNode;
 };
 
 export const CreditCardModalContext = createContext(
   {} as CreditCardModalContextData
 );
 
 export function CreditCardModalProvider({
   children,
 }: CreditCardModalProviderProps) {
   const [isCreditCardModalOpen, setIsCreditCardModalOpen] = useState<boolean>(false);
 
   return (
     <CreditCardModalContext.Provider
       value={{ isCreditCardModalOpen, setIsCreditCardModalOpen }}
     >
       {children}
     </CreditCardModalContext.Provider>
   );
 }
 