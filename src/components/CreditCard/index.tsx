import { formatCurrency } from "@/utils/formatCurrency";
import { RiMastercardFill, RiVisaFill } from "react-icons/ri";

type CreditCardProp = {
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

interface CreditCardProps {
    name: string;
    creditCard: CreditCardProp;
    onClick: () => void;
}

export function CreditCard({ name, creditCard, onClick }: CreditCardProps) {
    const bankNames = [
        "NUBANK",
        "BTG_PACTUAL",
        "CAIXA_ECONOMICA",
        "NEON",
        "DIGIO",
        "NEXT",
        "WILL_BANK",
        "BANCO_INTER",
        "BANCO_ORIGINAL",
        "ITAU",
    ];

    const defaultColor = !bankNames.some((name) => creditCard?.bank === name);

    return (
        <div
            onClick={onClick}
            className={`w-[440px] cursor-pointer overflow-hidden rounded-lg shadow-2xl transition-transform duration-500 hover:scale-105
                ${defaultColor && "bg-slate-700"}
                ${creditCard?.bank === "NUBANK" && "bg-violet-600"}
                ${creditCard?.bank === "BTG_PACTUAL" && "bg-blue-900"}
                ${creditCard?.bank === "CAIXA_ECONOMICA" && "bg-blue-700"}
                ${creditCard?.bank === "DIGIO" && "bg-blue-700"}
                ${creditCard?.bank === "NEXT" && "bg-green-500"}
                ${creditCard?.bank === "WILL_BANK" && "bg-yellow-400"}
                ${creditCard?.bank === "BANCO_INTER" && "bg-orange-500"}
                ${creditCard?.bank === "BANCO_ORIGINAL" && "bg-green-600"}
                ${creditCard?.bank === "NEON" && "bg-blue-400"}
                ${creditCard?.bank === "ITAU" && "bg-pink-500"}
            `}
        >
            <div className="relative md:flex">
                <div className="w-full p-4">
                    <div className="flex items-center justify-between text-white">
                        <span className="text-3xl font-bold">
                            {creditCard?.creditLimit
                                ? formatCurrency(creditCard?.creditLimit)
                                : "1000"}
                            <span className="ml-4 text-sm font-normal">
                                {formatCurrency(creditCard?.availableLimit)}
                            </span>
                        </span>
                        {creditCard?.flag === "MASTERCARD" && (
                            <RiMastercardFill className="text-4xl" />
                        )}
                        {creditCard?.flag === "VISA" && <RiVisaFill className="text-4xl" />}
                    </div>

                    <div className="mt-10 flex items-center justify-between">
                        <div className="flex flex-row">
                            <span className="text-3xl font-bold text-white smw:text-lg">*</span>
                            <span className="text-3xl font-bold text-white smw:text-lg">*</span>
                            <span className="text-3xl font-bold text-white smw:text-lg">*</span>
                            <span className="text-3xl font-bold text-white smw:text-lg">*</span>
                        </div>

                        <div className="flex flex-row">
                            <span className="text-3xl font-bold text-white smw:text-lg">*</span>
                            <span className="text-3xl font-bold text-white smw:text-lg">*</span>
                            <span className="text-3xl font-bold text-white smw:text-lg">*</span>
                            <span className="text-3xl font-bold text-white smw:text-lg">*</span>
                        </div>

                        <div className="flex flex-row">
                            <span className="text-3xl font-bold text-white smw:text-lg">*</span>
                            <span className="text-3xl font-bold text-white smw:text-lg">*</span>
                            <span className="text-3xl font-bold text-white smw:text-lg">*</span>
                            <span className="text-3xl font-bold text-white smw:text-lg">*</span>
                        </div>

                        <div className="flex flex-row">
                            <span className="text-3xl font-bold text-white smw:text-lg">*</span>
                            <span className="text-3xl font-bold text-white smw:text-lg">*</span>
                            <span className="text-3xl font-bold text-white smw:text-lg">*</span>
                            <span className="text-3xl font-bold text-white smw:text-lg">*</span>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between text-white">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-300">Nome</span>
                            <span className="font-bold">{name ? name : "John Doe"}</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-300">Cartão</span>
                            <span className="font-bold">{creditCard?.name}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
