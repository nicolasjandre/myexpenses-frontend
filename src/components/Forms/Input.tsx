import { forwardRef, ForwardRefRenderFunction, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<any> {
  label: string;
  name: string;
  type: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, type, error = null, ...rest },
  ref
) => {
  return (
    <>
      <label className="font-bold" htmlFor={name}>{label}</label>
      <input
        className={`relative w-full h-9 p-4 bg-glass-100 focus:outline-double outline-offset-1 
        ${error ? "outline-red-600" : "outline-glass-100"} 
        rounded-md border-0 text-white`}
        type={type}
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