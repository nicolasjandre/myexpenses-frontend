import { formatCurrency } from "@/utils/formatCurrency";
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from "react-icons/bs";

type Invoice = {
    id: number;
    dueDate: string;
    isPaid: boolean;
};

type CreditCard = {
    id: number;
    name: string;
};

type CostCenter = {
    id: number;
    description: string;
};

type Title = {
    id: number;
    description: string;
    costCenter: CostCenter;
    creditCard?: CreditCard;
    invoice?: Invoice;
    value: number;
    type: "EXPENSE" | "INCOME";
    notes?: string;
    referenceDate: string;
    inative_at?: string | null;
};

interface TrProps {
    title: Title;
}

export function Tr({ title }: TrProps) {
    return (
        <tr
            className={`d-flex even:bg-black_bg-600 h-12 items-center justify-center border-l-4 border-r-4 border-black_bg-100 text-center text-white last:border-b-4 odd:bg-black_bg-500`}
        >
            <td data-label="Tipo" className="max-w-[60px]">
                {title?.type === "EXPENSE" ? (
                    <BsFillArrowDownCircleFill className="m-auto text-xl text-red-500" />
                ) : (
                    <BsFillArrowUpCircleFill className="m-auto text-xl text-green-500" />
                )}
            </td>
            <td data-label="Data">
                {title?.creditCard
                    ? new Date(title?.invoice?.dueDate!).toLocaleDateString("pt-BR")
                    : new Date(title?.referenceDate).toLocaleDateString("pt-BR")}
            </td>
            <td data-label="Descrição">{title?.description}</td>
            <td data-label="Categoria">{title?.costCenter?.description}</td>
            <td data-label="Conta">{title?.creditCard ? title?.creditCard?.name : "Carteira"}</td>
            <td data-label="Valor">{formatCurrency(title?.value)}</td>
        </tr>
    );
}
