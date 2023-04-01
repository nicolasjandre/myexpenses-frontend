import { ButtonHTMLAttributes } from "react";
import { MiniLoader } from "../Loaders/MiniLoader";

interface ButtonProps extends ButtonHTMLAttributes<any> {
  title: string;
  tailwindClass?: string;
  isDisabled?: boolean;
}

export function Button({
  title,
  tailwindClass,
  isDisabled,
  ...rest
}: ButtonProps) {
  return isDisabled ? (
    <button
      className={`text-white flex gap-2 items-center justify-center text-center bg-gradient-to-b bg-blue-700 bg-size-200 bg-pos-0 h-12 w-full rounded-lg font-bold text-xl 
      hover:bg-pos-100 transition-all ease-in opacity-30 cursor-not-allowed ${tailwindClass}`}
      {...rest}
    >
      <MiniLoader />
      {title}
    </button>
  ) : (
    <button
      className={`text-white bg-gradient-to-b bg-blue-700 bg-size-200 bg-pos-0 h-12 w-full rounded-lg font-bold text-xl 
      hover:bg-pos-100 transition-all ease-in hover:bg-blue-800 hover:shadow-lg ${tailwindClass}`}
      {...rest}
    >
      {title}
    </button>
  );
}
