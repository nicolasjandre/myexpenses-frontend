import { useCostCenters } from "@/hooks/useCostCenters";
import { Dispatch, SetStateAction } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import {
  IoMdCar,
  IoMdHappy,
  IoMdShirt,
  IoMdAirplane,
  IoMdCash,
  IoMdGift,
  IoMdSchool,
} from "react-icons/io";
import {
  MdComputer,
  MdHouse,
  MdLocalPharmacy,
  MdRestaurant,
  MdShoppingCart,
} from "react-icons/md";
import { BiHealth } from "react-icons/bi";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { FaAward, FaFileContract } from "react-icons/fa";
import { BsPersonFillUp } from "react-icons/bs";
import { AiOutlineLineChart } from "react-icons/ai";

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
  costCenter,
  setCostCenter,
}: CostcenterDropdownProps) {
  const { data: costCenters } = useCostCenters();
  const ref = useDetectClickOutside({
    onTriggered: () => setIsCostcenterDropdownOpen(false),
  });

  return (
    <>
      <div className="relative inline-block text-left">
        <div>
          <button
            ref={ref}
            onClick={() => setIsCostcenterDropdownOpen((prev) => !prev)}
            type="button"
            className="inline-flex gap-x-1.5 w-[100%] mt-2 bg-slate-200 dark:bg-glass-100 focus:outline-double
            focus:outline-gray-400 h-12 p-4 text-sm font-semibold shadow-md justify-between items-center
            text-lg border border-gray-400 rounded-lg text-black dark:text-white transition-colors ease-in"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            {costCenter === 0 ? (
              <span className="text-black dark:text-white">Categoria</span>
            ) : (
              costCenters?.map((cc: CostCenter) => {
                if (cc?.id === costCenter) {
                  switch (costCenter) {
                    case 1:
                      return (
                        <span className="flex items-center gap-1 text-black dark:text-white">
                          <MdHouse className="text-xl" /> {cc?.description}
                        </span>
                      );
                    case 2:
                      return (
                        <span className="flex items-center gap-1 text-black dark:text-white">
                          <IoMdSchool className="text-xl" /> {cc?.description}
                        </span>
                      );
                    case 3:
                      return (
                        <span className="flex items-center gap-1 text-black dark:text-white">
                          <IoMdHappy className="text-xl" /> {cc?.description}
                        </span>
                      );
                    case 4:
                      return (
                        <span className="flex items-center gap-1 text-black dark:text-white">
                          <MdShoppingCart className="text-xl" />{" "}
                          {cc?.description}
                        </span>
                      );
                    case 5:
                      return (
                        <span className="flex items-center gap-1 text-black dark:text-white">
                          <MdLocalPharmacy className="text-xl" />{" "}
                          {cc?.description}
                        </span>
                      );
                    case 6:
                      return (
                        <span className="flex items-center gap-1 text-black dark:text-white">
                          <MdComputer className="text-xl" /> {cc?.description}
                        </span>
                      );
                    case 7:
                      return (
                        <span className="flex items-center gap-1 text-black dark:text-white">
                          <MdRestaurant className="text-xl" /> {cc?.description}
                        </span>
                      );
                    case 8:
                      return (
                        <span className="flex items-center gap-1 text-black dark:text-white">
                          <BiHealth className="text-xl" /> {cc?.description}
                        </span>
                      );
                    case 9:
                      return (
                        <span className="flex items-center gap-1 text-black dark:text-white">
                          <BsPersonFillUp className="text-xl" />{" "}
                          {cc?.description}
                        </span>
                      );
                    case 10:
                      return (
                        <span className="flex items-center gap-1 text-black dark:text-white">
                          <IoMdCar className="text-xl" /> {cc?.description}
                        </span>
                      );
                    case 11:
                      return (
                        <span className="flex items-center gap-1 text-black dark:text-white">
                          <IoMdShirt className="text-xl" /> {cc?.description}
                        </span>
                      );
                    case 12:
                      return (
                        <span className="flex items-center gap-1 text-black dark:text-white">
                          <IoMdAirplane className="text-xl" /> {cc?.description}
                        </span>
                      );
                    case 13:
                      return (
                        <span className="flex items-center gap-1 text-black dark:text-white">
                          <GiPerspectiveDiceSixFacesRandom className="text-xl" />{" "}
                          {cc?.description}
                        </span>
                      );
                    case 14:
                      return (
                        <span className="flex items-center gap-1 text-black dark:text-white">
                          <IoMdCash className="text-xl" /> {cc?.description}
                        </span>
                      );
                    case 15:
                      return (
                        <span className="flex items-center gap-1 text-black dark:text-white">
                          <AiOutlineLineChart className="text-xl" />{" "}
                          {cc?.description}
                        </span>
                      );
                    case 16:
                      return (
                        <span className="flex items-center gap-1 text-black dark:text-white">
                          <FaAward className="text-xl" /> {cc?.description}
                        </span>
                      );
                    case 17:
                      return (
                        <span className="flex items-center gap-1 text-black dark:text-white">
                          <IoMdGift className="text-xl" /> {cc?.description}
                        </span>
                      );
                    case 18:
                      return (
                        <span className="flex items-center gap-1 text-black dark:text-white">
                          <FaFileContract className="text-xl" />{" "}
                          {cc?.description}
                        </span>
                      );
                    case 19:
                      return (
                        <span className="flex items-center gap-1 text-black dark:text-white">
                          <GiPerspectiveDiceSixFacesRandom className="text-xl" />{" "}
                          {cc?.description}
                        </span>
                      );
                    default:
                      return null;
                  }
                }
              })
            )}
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
          className={`-left-[0px] z-10 mt-2 w-[100%] max-h-[30vh] origin-top-right rounded-md bg-gray-300 shadow-glass-100
           dark:bg-black_bg-100 shadow-lg ring-1 ring-black ring-opacity-10 focus:outline-none overflow-auto
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
                  onClick={() => setCostCenter(costCenter?.id)}
                  key={costCenter?.id}
                  href="#"
                  className="flex items-center gap-2 dark:text-white px-4 py-2 text-md hover:bg-gray-600 transition-colors ease-in"
                  role="menuitem"
                  tabIndex={-1}
                  id="menu-item-0"
                >
                  {costCenter?.id === 1 && <MdHouse className="text-xl" />}
                  {costCenter?.id === 2 && <IoMdSchool className="text-xl" />}
                  {costCenter?.id === 3 && <IoMdHappy className="text-xl" />}
                  {costCenter?.id === 4 && (
                    <MdShoppingCart className="text-xl" />
                  )}
                  {costCenter?.id === 5 && (
                    <MdLocalPharmacy className="text-xl" />
                  )}
                  {costCenter?.id === 6 && <MdComputer className="text-xl" />}
                  {costCenter?.id === 7 && <MdRestaurant className="text-xl" />}
                  {costCenter?.id === 8 && <BiHealth className="text-xl" />}
                  {costCenter?.id === 9 && (
                    <BsPersonFillUp className="text-xl" />
                  )}
                  {costCenter?.id === 10 && <IoMdCar />}
                  {costCenter?.id === 11 && <IoMdShirt className="text-xl" />}
                  {costCenter?.id === 12 && (
                    <IoMdAirplane className="text-xl" />
                  )}
                  {costCenter?.id === 13 && (
                    <GiPerspectiveDiceSixFacesRandom className="text-xl" />
                  )}
                  {costCenter?.id === 14 && <IoMdCash className="text-xl" />}
                  {costCenter?.id === 15 && (
                    <AiOutlineLineChart className="text-xl" />
                  )}
                  {costCenter?.id === 16 && <FaAward className="text-xl" />}
                  {costCenter?.id === 17 && <IoMdGift className="text-xl" />}
                  {costCenter?.id === 18 && (
                    <FaFileContract className="text-xl" />
                  )}
                  {costCenter?.id === 19 && (
                    <GiPerspectiveDiceSixFacesRandom className="text-xl" />
                  )}
                  {costCenter?.description}
                </a>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
