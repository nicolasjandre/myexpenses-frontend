'use client';

import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Logo from "@/components/Header/logo";
import { Button } from "../../components/Button";
import { Input } from "../../components/Forms/Input";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Home() {
  const { signUp } = useContext(AuthContext);


  interface InputValues {
    email: string;
    password: string;
    passwordConfirmation: string;
    name: string;
  }

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const loginFormSchema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório"),

    email: yup
      .string()
      .required("E-mail é obrigatório")
      .email("Digite um e-mail válido")
      .matches(emailRegex, "Digite um e-mail válido"),

    password: yup.string().required("Senha é obrigatório").min(8, 'A senha precisa ter ao menos 8 caracteres'),
    passwordConfirmation: yup.string()
     .oneOf([yup.ref('password')], 'As senhas não conferem')
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputValues>({ resolver: yupResolver(loginFormSchema) });
  const onSubmit: SubmitHandler<InputValues> = (data) => console.log(data);
  return (
    <main className="flex justify-center items-center flex-col min-w-full min-h-screen p-6">
            <ToastContainer autoClose={2500} theme="dark" />

      <Logo tailwindClass="mb-12" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-32 flex flex-col p-6 pt-4 pb-4 gap-2
         justify-around text-left w-full max-w-md h-360px shadow-glass
          backdrop-blur-md rounded-xl border-glass-100 border-2 bg-glass-50"
      >
        <Input
          {...register("name")}
          label="Nome:"
          name="name"
          type="text"
          error={errors?.name}
        />

        <Input
          {...register("email")}
          label="E-mail:"
          name="email"
          type="text"
          error={errors?.email}
        />

        <Input
          {...register("password")}
          label="Senha:"
          name="password"
          type="password"
          error={errors?.password}
        />
        
        <Input
          {...register("passwordConfirmation")}
          label="Confirme sua senha:"
          name="passwordConfirmation"
          type="password"
          error={errors?.passwordConfirmation}
        />

        <Button
          type="submit"
          tailwindClass={"mt-4"}
          title={isSubmitting ? "Registrando..." : "Registrar"}
          isDisabled={isSubmitting}
          disabled={isSubmitting}
        />

        <p className="text-center">
          Já é cadastrado?{" "}
          <Link
            className="transition-colors font-bold text-blue-500 hover:text-blue-400"
            href="/"
          >
            Entre
          </Link>{" "}
          aqui!
        </p>
      </form>
    </main>
  );
}
