import { useCreditCards } from "@/hooks/useCreditCards";
import { Dispatch, SetStateAction, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { AiFillBank } from "react-icons/ai";

interface CostcenterDropdownProps {
  isCreditCardDropdownOpen: boolean;
  setIsCreditCardDropdownOpen: Dispatch<SetStateAction<boolean>>;
  creditCard: number;
  setCreditCard: Dispatch<SetStateAction<number>>;
}

type CreditCard = {
  id: number;
  name: string;
  creditLimit: number;
  availableLimit: number;
  closingDay: number;
  dueDay: number;
  flag: string;
  bank: string;
  inative_at: Date | null;
};

export function CreditCardDropdown({
  isCreditCardDropdownOpen,
  setIsCreditCardDropdownOpen,
  setCreditCard,
}: CostcenterDropdownProps) {
  const [creditCardName, setCreditCardName] = useState("Opção de pagamento");
  const { data: creditCards } = useCreditCards();
  const ref = useDetectClickOutside({
    onTriggered: () => setIsCreditCardDropdownOpen(false),
  });

  function handleCreditCardName(creditCardId: number, creditCardName: string) {
    setCreditCardName(creditCardName);
    setCreditCard(creditCardId);
  }

  return (
    <>
      <div className="relative inline-block text-left">
        <div>
          <button
            ref={ref}
            onClick={() => setIsCreditCardDropdownOpen((prev) => !prev)}
            type="button"
            className="mt-2 inline-flex h-12 w-[100%] items-center justify-between gap-x-1.5
            rounded-lg border border-gray-400 bg-zinc-100 p-4 pl-9 text-sm text-lg font-semibold
            text-black shadow-md transition-colors ease-in focus:outline-double focus:outline-gray-400
             dark:bg-glass-100 dark:text-white"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            <AiFillBank className="absolute left-3 text-xl" />
            {creditCardName}
            <svg
              className="-mr-1 h-5 w-5 text-black dark:text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08
                 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div
          className={`-left-[0px] z-10 mt-2 max-h-[30vh] w-[100%] origin-top-right overflow-auto rounded-md bg-zinc-100
           shadow-lg shadow-glass-100 ring-1 ring-black ring-opacity-10 focus:outline-none dark:bg-black_bg-100
            ${isCreditCardDropdownOpen ? "absolute" : "hidden"}`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <a
              onClick={() => handleCreditCardName(-1, "Carteira")}
              href="#"
              className="text-md flex items-center gap-2 px-4 py-2 transition-colors ease-in hover:bg-gray-600
                   dark:text-white"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
            >
              Carteira
            </a>
            {creditCards?.map((creditCard: CreditCard) => (
              <a
                onClick={() =>
                  handleCreditCardName(creditCard?.id, creditCard?.name)
                }
                key={creditCard?.id}
                href="#"
                className="text-md flex items-center gap-2 px-4 py-2 transition-colors ease-in hover:bg-gray-600
                   dark:text-white"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-0"
              >
                {creditCard?.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
