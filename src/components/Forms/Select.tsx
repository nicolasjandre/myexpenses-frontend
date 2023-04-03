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
        id={selectName}
        name={selectName}
        className="bg-slate-200 dark:bg-glass-100 border border-gray-400 px-4 text-black
         dark:text-white rounded-lg h-12 p-2 focus:outline-double focus:border-gray-400 focus:outline-gray-500
          block text-[14px] w-full mt-2"
          ref={ref}
          {...rest}
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
