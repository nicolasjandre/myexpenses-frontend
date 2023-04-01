import {
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { FieldError } from "react-hook-form";

interface CheckboxProps extends InputHTMLAttributes<any> {
  label?: string;
  selectName: string;
  error?: FieldError | any;
  children: ReactNode;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, CheckboxProps> = (
  { selectName, label, error = null, children, ...rest },
  ref
) => {
  return (
    <>
      <select
        {...rest}
        id={selectName}
        name={selectName}
        className="bg-slate-200 dark:bg-glass-100 border border-gray-400 px-4 text-black
         dark:text-white rounded-lg h-12 p-2 focus:outline-double outline-offset-1 focus:ring-black_bg-100
          focus:border-black_bg-100 block text-[14px] w-full mt-2"
      >
        {children}
      </select>
      {label && (
        <label className="font-bold" htmlFor={selectName}>
          {label}
        </label>
      )}
      {error && <p className="text-sm text-red-600">{error?.message}</p>}
    </>
  );
};

export const Select = forwardRef(SelectBase);
