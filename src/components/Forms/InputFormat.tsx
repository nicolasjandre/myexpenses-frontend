import React, { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
import { NumericFormat, NumericFormatProps } from "react-number-format";

interface InputProps extends NumericFormatProps {
  label?: string;
  name: string;
  error?: FieldError | any;
}

const InputFormatted: ForwardRefRenderFunction<NumericFormatProps, InputProps> = (
  { name, label, error = null, ...rest },
  ref
) => {
  return (
    <>
      {label && (
        <label className="font-bold" htmlFor={name}>
          {label}
        </label>
      )}
      <NumericFormat
        className={`relative w-full h-12 p-4 bg-glass-100 focus:outline-double outline-offset-1 
        ${error ? "outline-red-600" : "outline-glass-100"} text-lg
        rounded-lg border-0 text-white`}
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
      {error && <p className="text-sm text-red-600">{error?.message}</p>}
    </>
  );
};

export const InputBRL = forwardRef(InputFormatted);
