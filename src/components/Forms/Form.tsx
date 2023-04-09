import { ReactNode } from "react";
import { UseFormHandleSubmit, SubmitHandler } from "react-hook-form"

interface FormProps {
   handleSubmit: UseFormHandleSubmit<any>;
   handleSubmitParam: SubmitHandler<any>;
   tailwindCss?: string;
   children: ReactNode
}
export function Form({handleSubmit, handleSubmitParam, tailwindCss, children}: FormProps) {
  return (
    <form
      onSubmit={handleSubmit(handleSubmitParam)}
      className={`flex w-full max-w-md flex-col justify-around gap-2 rounded-xl
         border-2 bg-white p-6 pt-4 text-left text-black
          shadow-glass backdrop-blur-md dark:border-glass-100 dark:bg-black_bg-100 dark:text-white
          ${tailwindCss}`}
    >
      {children}
    </form>
  );
}
