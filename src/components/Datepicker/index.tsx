import { Dispatch, SetStateAction, useState } from "react";
import { MdArrowBack, MdArrowForward, MdCalendarMonth } from "react-icons/md";
import DatePicker from "tailwind-datepicker-react";

interface DatepickerProps {
  title: string;
  setDate: Dispatch<SetStateAction<Date>>;
}

export function Datepicker({ title, setDate, ...rest }: DatepickerProps) {
  const [show, setShow] = useState<boolean>(false);
  const handleChange = (selectedDate: Date) => {
    setDate(selectedDate);
  };
  const handleClose = (state: boolean) => {
    setShow(state);
  };

  const options = {
    title: `${title}`,
    autoHide: true,
    todayBtn: false,
    clearBtn: false,
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
      background: "dark:bg-black_bg-100",
      todayBtn: "",
      clearBtn: "",
      icons: "",
      text: "",
      disabledText: "bg-red-500",
      input:
        "dark:bg-glass-100 bg-slate-200 h-12 focus:outline-double focus:outline-gray-500 dark:outline-glass-100 outline-gray-400 border-gray-400 border rounded-lg",
      inputIcon: "",
      selected: "",
    },
    icons: {
      // () => ReactElement | JSX.Element
      prev: () => <MdArrowBack />,
      next: () => <MdArrowForward />,
    },
    datepickerClassNames: "",
    defaultDate: new Date(),
    language: "pt-BR",
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="">{title}</label>
      <DatePicker
        {...rest}
        options={options}
        onChange={handleChange}
        show={show}
        setShow={handleClose}
      ></DatePicker>
    </div>
  );
}
