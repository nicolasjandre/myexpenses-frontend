import { Dispatch, ReactNode, SetStateAction } from "react";
import { MiniLoader } from "../Loaders/MiniLoader";

interface BoxProps {
  icon?: ReactNode;
  title?: string;
  value?: string;
  setModalOpen?: Dispatch<SetStateAction<boolean>>;
}

export function Box({ icon, title, value, setModalOpen, ...rest }: BoxProps) {
  return (
    <div onClick={() => setModalOpen && setModalOpen(true)} className="bg-gray-300 shadow-lg shadow-glass-100 dark:bg-black_bg-100 p-6 w-[24.5%] h-[130px] 
    rounded-lg xxlw:w-[49.5%] smw:w-[100%] cursor-pointer mb-6 hover:bg-gray-400 dark:hover:bg-black_bg-50
         transition-colors ease-in" {...rest}>
      <div className="flex items-center justify-between">
        <span className="text-2xl text-black dark:text-white">{title}</span>
        <span className="text-4xl text-black dark:text-white">{icon}</span>
      </div>
      <div className="flex item-center justify-start w-full mt-4">
         <span className="text-xl text-black dark:text-white">{value ? value : <MiniLoader />}</span>
      </div>
    </div>
  );
}
