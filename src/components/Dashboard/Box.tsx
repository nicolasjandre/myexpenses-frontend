import { ReactNode } from "react";

interface BoxProps {
  icon?: ReactNode;
  title?: string;
  value?: string;
}

export function Box({ icon, title, value }: BoxProps) {
  return (
    <div className="bg-black_bg-100 p-6 w-[24.5%] h-[130px] rounded-lg xxlw:w-[49.5%] smw:w-[100%] cursor-pointer mb-6 hover:bg-black_bg-50
         transition-colors duration-200">
      <div className="flex items-center justify-between">
        <span className="text-2xl">{title}</span>
        <span className="text-4xl">{icon}</span>
      </div>
      <div className="flex item-center justify-start w-full mt-4">
         <span className="text-xl">{value}</span>
      </div>
    </div>
  );
}
