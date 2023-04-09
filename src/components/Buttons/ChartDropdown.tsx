import { Dispatch, SetStateAction, useContext } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

interface DropdownButtonProps {
  tailwindCss?: string;
  isChartDropdownOpen: boolean;
  isLast7OrLast30DaysChart: number;
  setIsLast7OrLast30DaysChart: Dispatch<SetStateAction<number>>;
  setIsChartDropdownOpen: Dispatch<SetStateAction<boolean>>;
}

export function ChartDropdown({
  tailwindCss,
  isChartDropdownOpen,
  setIsChartDropdownOpen,
  isLast7OrLast30DaysChart,
  setIsLast7OrLast30DaysChart,
}: DropdownButtonProps) {
  const ref = useDetectClickOutside({
    onTriggered: () => setIsChartDropdownOpen(false),
    disableTouch: true,
  });

  return (
    <>
      <div className="relative inline-block text-left">
        <div>
          <button
            ref={ref}
            onClick={() => setIsChartDropdownOpen((prev) => !prev)}
            type="button"
            className="inline-flex w-[145px] justify-center gap-x-1.5 rounded-md bg-white backdrop-blur-md
             dark:bg-black_bg-100 px-3 py-2 text-sm font-semibold shadow-md
             shadow-glass-100 hover:bg-zinc-100 dark:hover:bg-black_bg-50
              transition-colors ease-in border dark:border-gray-700"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            <span className="text-black dark:text-white">
              {isLast7OrLast30DaysChart === 6
                ? "Últimos 7 dias"
                : "Últimos 30 dias"}
            </span>
            <svg
              className="-mr-1 h-5 w-5 text-black dark:text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div
          className={`-left-[95px] z-10 mt-2 w-56 origin-top-right rounded-md bg-white backdrop-blur-md shadow-glass-100
           dark:bg-black_bg-100 shadow-lg ring-1 ring-black ring-opacity-10 focus:outline-none smw:-left-[45px]
            ${isChartDropdownOpen ? "absolute" : "hidden"} ${tailwindCss}`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <span
              onClick={() => {
                setIsLast7OrLast30DaysChart(6);
              }}
              className="cursor-pointer dark:text-white block px-4 py-2 text-sm hover:bg-zinc-100 transition-colors ease-in"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
            >
              Últimos 7 dias
            </span>
            <span
              onClick={() => {
                setIsLast7OrLast30DaysChart(29);
              }}
              className="cursor-pointer dark:text-white block px-4 py-2 text-sm hover:bg-zinc-100 transition-colors ease-in"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-1"
            >
              Últimos 30 dias
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
