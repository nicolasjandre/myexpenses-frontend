import { useCostCenters } from "@/hooks/useCostCenters";
import { Dispatch, SetStateAction, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { IoMdBookmarks } from "react-icons/io";

interface CostcenterDropdownProps {
    type: string;
    isCostcenterDropdownOpen: boolean;
    setIsCostcenterDropdownOpen: Dispatch<SetStateAction<boolean>>;
    costCenter: number;
    setCostCenter: Dispatch<SetStateAction<number>>;
}

type CostCenter = {
    id: number;
    description: string;
    notes: string;
    type: "EXPENSE" | "INCOME";
    inative_at: Date | null;
};

export function CostcenterDropdown({
    type,
    isCostcenterDropdownOpen,
    setIsCostcenterDropdownOpen,
    setCostCenter,
}: CostcenterDropdownProps) {
    const [costCenterDesc, setCostCenterDesc] = useState("Categoria");
    const { data: costCenters } = useCostCenters();
    const ref = useDetectClickOutside({
        onTriggered: () => setIsCostcenterDropdownOpen(false),
    });

    function handleCostCenterDesc(costCenterId: number, costCenterDesc: string) {
        setCostCenterDesc(costCenterDesc);
        setCostCenter(costCenterId);
    }

    return (
        <>
            <div className="relative inline-block text-left">
                <div>
                    <button
                        ref={ref}
                        onClick={() => setIsCostcenterDropdownOpen((prev) => !prev)}
                        type="button"
                        className="relative mt-2 inline-flex h-12 w-[100%] items-center justify-between gap-x-1.5
            rounded-lg border border-gray-400 bg-zinc-100 p-4 pl-9 text-sm text-lg font-semibold
            text-black shadow-md transition-colors ease-in focus:outline-double focus:outline-gray-400
             dark:bg-glass-100 dark:text-white"
                        id="menu-button"
                        aria-expanded="true"
                        aria-haspopup="true"
                    >
                        <IoMdBookmarks className="absolute left-3 text-xl" />
                        {costCenterDesc}
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
            ${isCostcenterDropdownOpen ? "absolute" : "hidden"}`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                >
                    <div className="py-1" role="none">
                        {costCenters
                            ?.filter((costCenter: CostCenter) =>
                                type.includes("EXPENSE")
                                    ? costCenter.type === "EXPENSE"
                                    : costCenter.type === "INCOME"
                            )
                            .map((costCenter: CostCenter) => (
                                <a
                                    onClick={() =>
                                        handleCostCenterDesc(
                                            costCenter?.id,
                                            costCenter?.description
                                        )
                                    }
                                    key={costCenter?.id}
                                    href="#"
                                    className="text-md flex items-center gap-2 px-4 py-2 transition-colors ease-in hover:bg-gray-600
                   dark:text-white"
                                    role="menuitem"
                                    tabIndex={-1}
                                    id="menu-item-0"
                                >
                                    {costCenter?.description}
                                </a>
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}
