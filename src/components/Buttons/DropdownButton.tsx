import { DropdownButtonContext } from "@/contexts/DropdownButtonContext";
import { ExpenseIncomesModalContext } from "@/contexts/ExpenseIncomesModalContext";
import { useContext } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

interface DropdownButtonProps {
  tailwindCss?: string;
}

export function DropdownButton({ tailwindCss }: DropdownButtonProps) {
  const { isDropdownOpen, setIsDropdownOpen } = useContext(
    DropdownButtonContext
  );
  const { setIsExpenseIncomesModalOpen } = useContext(
    ExpenseIncomesModalContext
  );

  const ref = useDetectClickOutside({
    onTriggered: () => setIsDropdownOpen(false),
  });

  return (
    <>
      <div className="relative inline-block text-left">
        <div>
          <button
            ref={ref}
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            type="button"
            className="inline-flex w-[155px] justify-center gap-x-1.5 rounded-md bg-gray-300
             dark:bg-black_bg-100 px-3 py-2 text-sm font-semibold shadow-md
             shadow-glass-100
              ring-1 ring-inset ring-gray-300 hover:bg-gray-400 dark:hover:bg-black_bg-50
              transition-colors ease-in"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            <span className="text-black dark:text-white">Novo</span>
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
          className={`-left-[200px] z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-300 shadow-glass-100
           dark:bg-black_bg-100 shadow-lg ring-1 ring-black ring-opacity-10 focus:outline-none
            ${isDropdownOpen ? "absolute" : "hidden"} ${tailwindCss}`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <a
              href="#"
              className="dark:text-white block px-4 py-2 text-sm hover:bg-blue-500 transition-colors ease-in"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
            >
              Ajustar saldo
            </a>
            <a
              onClick={() => setIsExpenseIncomesModalOpen(true)}
              href="#"
              className="dark:text-white block px-4 py-2 text-sm hover:bg-red-700 transition-colors ease-in"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-1"
            >
              Nova despesa
            </a>
            <a
              href="#"
              className="dark:text-white block px-4 py-2 text-sm hover:bg-green-600 transition-colors ease-in"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-2"
            >
              Nova entrada
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
