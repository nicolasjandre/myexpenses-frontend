import React, { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
import { IconType } from "react-icons";
import { NumericFormat, NumericFormatProps } from "react-number-format";

interface InputProps extends NumericFormatProps {
  label?: string;
  name: string;
  Icon?: IconType;
  error?: FieldError | any;
}

const InputFormatted: ForwardRefRenderFunction<NumericFormatProps, InputProps> = (
  { name, label, error = null, Icon, ...rest },
  ref
) => {
  return (
    <div className="relative">
      {label && (
        <label className="font-bold" htmlFor={name}>
          {label}
        </label>
      )}
      <NumericFormat
        className={`relative w-full h-12 p-4 bg-zinc-100 dark:bg-glass-100 focus:outline-double focus:outline-gray-500
        ${error ? "outline-red-600" : "outline-glass-100"} text-lg border border-gray-400 ${Icon && "pl-9"}
        rounded-lg text-black dark:text-white`}
        name={name}
        id={name}
        getInputRef={ref}
        decimalScale={2}
        fixedDecimalScale
        decimalSeparator=","
        thousandSeparator="."
        prefix="R$ "
        {...rest}
      />
      {Icon && <Icon className="absolute text-xl left-3 top-[50%] -translate-y-[50%]" />}
      {error && <p className="text-sm text-red-600">{error?.message}</p>}
    </div>
  );
};

export const InputBRL = forwardRef(InputFormatted);
