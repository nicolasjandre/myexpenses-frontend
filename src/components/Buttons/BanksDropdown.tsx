import { formatUnderlinedString } from "@/utils/formatUnderlinedStrings";
import { Dispatch, SetStateAction, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { IoMdBookmarks } from "react-icons/io";
import { RiBankFill } from "react-icons/ri";

type Bank = {
    name: string;
    value: string;
};

interface BanksDropdownProps {
    isBanksDropdownOpen: boolean;
    setIsBanksDropdownOpen: Dispatch<SetStateAction<boolean>>;
    banks: Bank[];
    setBank: Dispatch<SetStateAction<string>>;
    bank: string;
}

export function BanksDropdown({
    isBanksDropdownOpen,
    setIsBanksDropdownOpen,
    banks,
    setBank,
    bank,
}: BanksDropdownProps) {
    const [banksDesc, setBanksDesc] = useState("Banco");
    const ref = useDetectClickOutside({
        onTriggered: () => setIsBanksDropdownOpen(false),
    });

    function handleBanksDesc(banksDesc: string) {
        setBanksDesc(banksDesc);
    }

    return (
        <>
            <div className="relative inline-block text-left">
                <div>
                    <button
                        ref={ref}
                        onClick={() => setIsBanksDropdownOpen((prev) => !prev)}
                        type="button"
                        className="relative mt-2 inline-flex h-12 w-[100%] items-center justify-between gap-x-1.5
            rounded-lg border border-gray-400 bg-zinc-100 p-4 pl-9 text-sm text-lg font-semibold
            text-black shadow-md transition-colors ease-in focus:outline-double focus:outline-gray-400
             dark:bg-glass-100 dark:text-white"
                        id="menu-button"
                        aria-expanded="true"
                        aria-haspopup="true"
                    >
                        <RiBankFill className="absolute left-3 text-xl" />
                        {bank ? formatUnderlinedString(bank) : banksDesc}
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
            ${isBanksDropdownOpen ? "absolute" : "hidden"}`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                >
                    <div className="py-1" role="none">
                        {banks?.map((bank: Bank) => (
                            <a
                                onClick={() => {
                                    handleBanksDesc(bank?.name);
                                    setBank(bank?.value);
                                }}
                                key={bank.value}
                                href="#"
                                className="text-md flex items-center gap-2 px-4 py-2 transition-colors ease-in hover:bg-gray-600
                   dark:text-white"
                                role="menuitem"
                                tabIndex={-1}
                                id="menu-item-0"
                            >
                                {bank.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
