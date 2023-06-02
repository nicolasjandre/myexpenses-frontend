import { CreditCardModalContext } from "@/contexts/CreditCardModalContext";
import { useContext } from "react";

interface ButtonNewCreditCardProps {
    title: string;
}

export function ButtonNewCreditCard({ title, ...rest }: ButtonNewCreditCardProps) {
    const { setIsCreditCardModalOpen } = useContext(CreditCardModalContext);

    return (
        <button onClick={() => setIsCreditCardModalOpen(true)} className="inline-flex w-[155px] justify-center gap-x-1.5 rounded-md bg-white backdrop-blur-md
             dark:bg-black_bg-100 px-3 py-2 text-sm font-semibold shadow-md
             shadow-glass-100
              ring-1 ring-inset ring-gray-200 dark:ring-gray-700 hover:bg-zinc-100 dark:hover:bg-black_bg-50
              transition-colors ease-in"

              {...rest}
          >
            {title}
          </button>
    )
}