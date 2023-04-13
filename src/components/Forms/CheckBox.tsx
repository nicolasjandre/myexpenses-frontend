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
  setIsToggleBoxChecked?: Dispatch<SetStateAction<boolean>>;
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
    <div className="flex items-center">
      <span
        className={`text-md ml-3 font-medium ${
          isToggleBoxChecked ? "text-green-600" : "text-red-400"
        }`}
      >
        {isToggleBoxChecked ? checkedTitle : unCheckedTitle}
      </span>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          {...rest}
          className="peer sr-only"
          onChange={() => {
            setIsToggleBoxChecked && setIsToggleBoxChecked((prev) => !prev);
          }}
          ref={ref}
        />
        <div
          className="peer-checked:after:border-green h-6 w-11 rounded-full bg-gray-200 after:absolute
                 after:top-[2px]
                 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border
                 after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-focus:outline-none
                 peer-focus:ring-4"
        ></div>

        {label && (
          <label className="font-bold" htmlFor={checkboxName}>
            {label}
          </label>
        )}
        {error && <p className="text-sm text-red-600">{error?.message}</p>}
      </label>
    </div>
  );
};

export const Checkbox = forwardRef(CheckboxBase);
