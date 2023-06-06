import {
   createContext,
   Dispatch,
   ReactNode,
   SetStateAction,
   useState,
 } from "react";
 
 type UserBalanceModalContextData = {
   isUserBalanceModalOpen: boolean;
   setIsUserBalanceModalOpen: Dispatch<SetStateAction<boolean>>;
 };
 
 type UserBalanceModalProviderProps = {
   children: ReactNode;
 };
 
 export const UserBalanceModalContext = createContext(
   {} as UserBalanceModalContextData
 );
 
 export function UserBalanceModalProvider({
   children,
 }: UserBalanceModalProviderProps) {
   const [isUserBalanceModalOpen, setIsUserBalanceModalOpen] = useState<boolean>(false);
 
   return (
     <UserBalanceModalContext.Provider
       value={{ isUserBalanceModalOpen, setIsUserBalanceModalOpen }}
     >
       {children}
     </UserBalanceModalContext.Provider>
   );
 }
 