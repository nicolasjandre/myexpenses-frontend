import {
  Dispatch,
  forwardRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  SetStateAction,
} from "react";
import { FieldError } from "react-hook-form";

interface CheckboxProps extends InputHTMLAttributes<any> {
  label?: string;
  checkboxName: string;
  error?: FieldError | any;
  checkedTitle: string;
  unCheckedTitle: string;
  isToggleBoxChecked: boolean;
  setIsToggleBoxChecked: Dispatch<SetStateAction<boolean>>;
}

const CheckboxBase: ForwardRefRenderFunction<
  HTMLInputElement,
  CheckboxProps
> = (
  {
    checkboxName,
    label,
    error = null,
    isToggleBoxChecked,
    setIsToggleBoxChecked,
    checkedTitle,
    unCheckedTitle,
    ...rest
  },
  ref
) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        {...rest}
        className="sr-only peer"
        onChange={() => setIsToggleBoxChecked((prev) => !prev)}
        ref={ref}
      />
      <div
        className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full
                 peer-checked:after:translate-x-full
                 peer-checked:after:border-green after:content-[''] after:absolute after:top-[2px] after:left-[2px]
                 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                 peer-checked:bg-green-600"
      ></div>
      <span
        className={`ml-3 font-medium text-md ${
          isToggleBoxChecked ? "text-green-600" : "text-red-400"
        }`}
      >
        {isToggleBoxChecked ? checkedTitle : unCheckedTitle}
      </span>
      {label && (
        <label className="font-bold" htmlFor={checkboxName}>
          {label}
        </label>
      )}
      {error && <p className="text-sm text-red-600">{error?.message}</p>}
    </label>
  );
};

export const Checkbox = forwardRef(CheckboxBase);
