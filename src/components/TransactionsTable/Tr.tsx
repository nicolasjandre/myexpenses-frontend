import { formatCurrency } from "@/utils/formatCurrency";
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from "react-icons/bs";
import { FaCreditCard, FaWallet } from "react-icons/fa";

interface Invoice {
    id: number;
    dueDate: string;
    paid: boolean;
}

type CreditCard = {
    id: number;
    name: string;
};

type CostCenter = {
    id: number;
    description: string;
};

interface Title {
    id: number;
    description: string;
    type: string;
    costCenter: CostCenter;
    creditCard: CreditCard;
    invoice: Invoice;
    value: number;
    referenceDate: string;
    createdAt: string;
    inactiveAt: null | string;
    notes: string;
}

interface TrProps {
    title: Title;
}

export function Tr({ title }: TrProps) {
    return (
        <tr
            className={`h-12 items-center justify-center text-center text-black dark:border-l-4 dark:border-r-4
             dark:border-black_bg-100 dark:text-white dark:last:border-b-4 dark:odd:bg-black_bg-500 mdw:mb-4 mdw:flex
             mdw:h-auto mdw:w-full mdw:flex-col mdw:flex-nowrap mdw:border-b-2 mdw:border-gray-400 mdw:last:border-b-0 mdw:dark:border-x-0
             mdw:dark:border-b-2 mdw:dark:border-white mdw:dark:last:border-b-0 mdw:dark:odd:bg-transparent`}
        >
            <td className="p-1 mdw:h-[32px]" data-label="Tipo">
                {title?.type === "EXPENSE" ? (
                    <BsFillArrowDownCircleFill className="m-auto text-xl text-red-500" />
                ) : (
                    <BsFillArrowUpCircleFill className="m-auto text-xl text-green-500" />
                )}
            </td>
            <td className="mdw:p-1" data-label="Data">
                {new Date(title?.referenceDate).toLocaleDateString("pt-BR")}
            </td>
            <td className="mdw:p-1" data-label="Descrição">
                {title?.description}
            </td>
            <td className="mdw:p-1" data-label="Categoria">
                {title?.costCenter?.description}
            </td>
            <td className="mdw:p-1" data-label="Conta">
                {title?.creditCard?.id !== null ? (
                    <span className="flex items-center justify-center gap-2">
                        <FaCreditCard />
                        {title?.creditCard?.name}
                    </span>
                ) : (
                    <span className="flex items-center justify-center gap-2">
                        <FaWallet />
                        Carteira
                    </span>
                )}
            </td>
            <td className="mdw:p-1" data-label="Valor">
                {formatCurrency(title?.value)}
            </td>
        </tr>
    );
}
