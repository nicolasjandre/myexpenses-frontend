import React, { useContext, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";
import { MdCalendarMonth } from "react-icons/md";
import { ChoosenMonthContext } from "@/contexts/ChoosenMonthContext";
registerLocale("ptBR", ptBR);

export function MonthYearPicker() {
  const { setFirstDayOfMonth, setLastDayOfMonth, selectedDate, setSelectedDate } = useContext(ChoosenMonthContext);

  useEffect(() => {
    const now = selectedDate;
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // Month is zero-indexed, so add 1
    const firstDayOfMonthDate = new Date(`${year}-${month}-01 00:00:00`);
    const lastDayOfMonthDate = new Date(
      `${year}-${month}-${new Date(year, month, 0).getDate()} 23:59:59`
    );
    firstDayOfMonthDate.setHours(-3, 0, 0, 0);
    lastDayOfMonthDate.setHours(20, 59, 59, 999);
    const firstDayOfMonthStr = firstDayOfMonthDate
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const lastDayOfMonthStr = lastDayOfMonthDate
      .toISOString()
      .slice(0, 23)
      .replace("T", " ");

    setFirstDayOfMonth(firstDayOfMonthStr);
    setLastDayOfMonth(lastDayOfMonthStr);
  }, [selectedDate]);

  return (
    <div className="flex items-center gap-2">
      <MdCalendarMonth className="text-black dark:text-white" />
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date) => setSelectedDate(date)}
        dateFormat="MMMM"
        locale="ptBR"
        calendarClassName="dark:text-white dark:bg-black_bg-100"
        className="text-black dark:text-white bg-transparent caret-transparent dark:bg-transparent capitalize outline-none dark:outline-none cursor-pointer w-[100%]"
        showMonthYearPicker
      />
    </div>
  );
}
