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
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  setFirstDayOfMonth: Dispatch<SetStateAction<string>>;
  setLastDayOfMonth: Dispatch<SetStateAction<string>>;
};

type ChoosenMonthProviderProps = {
  children: ReactNode;
};

export const ChoosenMonthContext = createContext({} as ChoosenMonthContextData);

export function ChoosenMonthProvider({ children }: ChoosenMonthProviderProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [firstDayOfMonth, setFirstDayOfMonth] = useState("");
  const [lastDayOfMonth, setLastDayOfMonth] = useState("");

  return (
    <ChoosenMonthContext.Provider
      value={{
        firstDayOfMonth,
        setFirstDayOfMonth,
        lastDayOfMonth,
        setLastDayOfMonth,
        selectedDate,
        setSelectedDate
      }}
    >
      {children}
    </ChoosenMonthContext.Provider>
  );
}
