import { forwardRef, ForwardRefRenderFunction, TextareaHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

interface TextareaProps extends TextareaHTMLAttributes<any> {
  label?: string;
  name: string;
  error?: FieldError | any;
}

const TextareaBase: ForwardRefRenderFunction<HTMLTextAreaElement, TextareaProps> = (
  { name, label, error = null, ...rest },
  ref
) => {
  return (
    <>
      <label className="font-bold" htmlFor={name}>{label}</label>
      <textarea
        className={`relative w-full h-32 p-4 bg-slate-200 dark:bg-glass-100 focus:outline-double outline-offset-1 
        ${error ? "outline-red-600" : "outline-glass-100"} resize-none text-black dark:text-white border border-gray-400
        rounded-lg`}
        name={name}
        id={name}
        ref={ref}
        {...rest}
      />
      {error && <p className="text-sm text-red-600">{error?.message}</p>}
    </>
  );
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(TextareaBase);
