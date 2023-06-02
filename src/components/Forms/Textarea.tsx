import {
  forwardRef,
  ForwardRefRenderFunction,
  TextareaHTMLAttributes,
} from "react";
import { FieldError } from "react-hook-form";

interface TextareaProps extends TextareaHTMLAttributes<any> {
  label?: string;
  name: string;
  error?: FieldError | any;
}

const TextareaBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextareaProps
> = ({ name, label, error = null, ...rest }, ref) => {
  return (
    <>
      {label && (
        <label className="font-bold" htmlFor={name}>
          {label}
        </label>
      )}
      <textarea
        className={`relative h-32 w-full bg-zinc-100 p-4
         placeholder:text-black placeholder:opacity-60 focus:outline-double dark:bg-glass-100 dark:placeholder:text-white 
        ${
          error ? "outline-red-600" : "outline-glass-100"
        } resize-none rounded-lg border border-gray-400 text-black focus:outline-gray-500
        dark:text-white`}
        name={name}
        id={name}
        ref={ref}
        {...rest}
      />
      {error && <p className="text-sm text-red-600">{error?.message}</p>}
    </>
  );
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  TextareaBase
);
