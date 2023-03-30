import {
   createContext,
   Dispatch,
   ReactNode,
   SetStateAction,
   useState,
 } from "react";
 
 type SidebarContextData = {
   isSidebarClosed: boolean;
   setIsSidebarClosed: Dispatch<SetStateAction<boolean>>;
 };
 
 type SidebarProviderProps = {
   children: ReactNode;
 }
 
 export const SidebarContext = createContext({} as SidebarContextData);
 
 export function SidebarProvider({ children }: SidebarProviderProps) {
   const [isSidebarClosed, setIsSidebarClosed] = useState<boolean>(false);
 
   return (
     <SidebarContext.Provider value={{ isSidebarClosed, setIsSidebarClosed }}>
       {children}
     </SidebarContext.Provider>
   );
 }
 