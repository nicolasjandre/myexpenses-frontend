import { DropdownButtonContext } from "@/contexts/DropdownButtonContext";
import { useContext } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

export function DropdownButton() {
   const { isDropdownOpen, setIsDropdownOpen } = useContext(DropdownButtonContext)
   
   const ref = useDetectClickOutside({ onTriggered: () => setIsDropdownOpen(false) });

  return (
    <>
      <div className="relative inline-block text-left">
        <div>
          <button
            ref={ref}
            onClick={() => setIsDropdownOpen(prev => !prev)}
            type="button"
            className="inline-flex w-[155px] justify-center gap-x-1.5 rounded-md
             bg-black_bg-100 px-3 py-2 text-sm font-semibold text-white shadow-md
              ring-1 ring-inset ring-gray-300 hover:bg-black_bg-50"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            Novo
            <svg
              className="-mr-1 h-5 w-5 text-white"
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
          className={`-left-[200px] z-10 mt-2 w-56 origin-top-right rounded-md
           bg-black_bg-100 shadow-lg ring-1 ring-black ring-opacity-10 focus:outline-none
            ${isDropdownOpen ? "absolute" : "hidden"}`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <a
              href="#"
              className="text-white block px-4 py-2 text-sm hover:bg-blue-700"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
            >
              Ajustar saldo
            </a>
            <a
              href="#"
              className="text-white block px-4 py-2 text-sm hover:bg-red-700"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-1"
            >
              Adicionar despesa
            </a>
            <a
              href="#"
              className="text-white block px-4 py-2 text-sm hover:bg-green-600"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-2"
            >
              Adicionar entrada
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
