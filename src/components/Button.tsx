import { ButtonHTMLAttributes } from "react";

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
      className={`text-white bg-gradient-to-b from-blue-400 via-blue-800 to-isActive-50 bg-size-200 bg-pos-0 h-12 w-full rounded-lg font-bold text-xl 
      transition-all duration-500 opacity-30 cursor-not-allowed ${tailwindClass}`}
      {...rest}
    >
      {title}
    </button>
  ) : (
    <button
      className={`text-white bg-gradient-to-b from-blue-400 via-blue-800 to-isActive-50 bg-size-200 bg-pos-0 h-12 w-full rounded-lg font-bold text-xl 
      hover:bg-pos-100 transition-all duration-500 ${tailwindClass}`}
      {...rest}
    >
      {title}
    </button>
  );
}
