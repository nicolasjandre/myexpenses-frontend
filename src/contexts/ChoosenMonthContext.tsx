import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type ChoosenMonthContextData = {
  firstDayOfMonth: string;
  lastDayOfMonth: string;
  setFirstDayOfMonth: Dispatch<SetStateAction<string>>;
  setLastDayOfMonth: Dispatch<SetStateAction<string>>;
};

type ChoosenMonthProviderProps = {
  children: ReactNode;
};

export const ChoosenMonthContext = createContext({} as ChoosenMonthContextData);

export function ChoosenMonthProvider({ children }: ChoosenMonthProviderProps) {
  const [firstDayOfMonth, setFirstDayOfMonth] = useState("");
  const [lastDayOfMonth, setLastDayOfMonth] = useState("");

  return (
    <ChoosenMonthContext.Provider
      value={{
        firstDayOfMonth,
        setFirstDayOfMonth,
        lastDayOfMonth,
        setLastDayOfMonth,
      }}
    >
      {children}
    </ChoosenMonthContext.Provider>
  );
}
