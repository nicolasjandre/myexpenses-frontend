import { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<any> {
  label?: string;
  name: string;
  type: string;
  error?: FieldError | any;
  tailwindCss?: string;
  requiredField?: boolean;
  onChangeFunc?: (value: string) => void;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, type, error = null, onChangeFunc, requiredField, tailwindCss, ...rest },
  ref
) => {
  return (
    <>
      <label className="font-bold" htmlFor={name}>{label} {requiredField && <span className="text-red-700">*</span>}</label>
      <input
        className={`relative w-full h-12 p-4 dark:bg-glass-100 bg-zinc-100 dark:border-gray-600 focus:outline-double focus:outline-gray-500 
        ${error ? "outline-red-600" : "dark:outline-glass-100 outline-gray-400"} ${tailwindCss} border-gray-400 border
        rounded-lg dark:text-white text-black`}
        type={type}
        onInput={(e: any) => {
          if (onChangeFunc) {
            onChangeFunc(e?.target?.value)
          }
        }}
        name={name}
        id={name}
        ref={ref}
        {...rest}
      />
      {error && <p className="text-sm text-red-600">{error?.message}</p>}
    </>
  );
}

export const Input = forwardRef(InputBase);