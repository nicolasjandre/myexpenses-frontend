import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Logo from "@/components/Header/logo";
import { Button } from "../components/Buttons/Button";
import { Input } from "../components/Forms/Input";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import nookies from "nookies";
import { GetServerSideProps } from "next";
import { DarkModeButton } from "@/components/Buttons/DarkModeButton";
import { useTheme } from "next-themes";
import { useQueryClient } from "@tanstack/react-query";
import { Form } from "@/components/Forms/Form";

export default function Home() {
  const { signIn } = useContext(AuthContext);
  const { theme } = useTheme();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.removeQueries([]);
  }, []);

  interface InputValues {
    email: string;
    password: string;
  }

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const loginFormSchema = yup.object().shape({
    email: yup
      .string()
      .required("E-mail é obrigatório.")
      .email("Digite um e-mail válido.")
      .matches(emailRegex, "Digite um e-mail válido"),

    password: yup.string().required("Senha é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputValues>({ resolver: yupResolver(loginFormSchema) });
  const onSubmit: SubmitHandler<InputValues> = async (data) =>
    await signIn(data);

  return (
    <main className="flex min-h-screen min-w-full flex-col items-center justify-center p-6">
      <DarkModeButton tailwindCss="absolute right-20 top-16" />
      <ToastContainer
        autoClose={2000}
        theme={`${theme === "dark" ? "dark" : "light"}`}
      />
      <Logo tailwindClass="mb-12" />
      <Form handleSubmit={handleSubmit} handleSubmitParam={onSubmit} tailwindCss="mb-32 h-96">
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

        <Button
          type="submit"
          tailwindClass={"mt-4"}
          title={isSubmitting ? "Entrando..." : "Entrar"}
          isDisabled={isSubmitting}
          disabled={isSubmitting}
        />

        <p className="text-center">
          Não possui uma conta?{" "}
          <Link
            className="font-bold text-blue-700 transition-colors hover:text-blue-500"
            href="/register"
          >
            Registre-se
          </Link>{" "}
          agora!
        </p>
      </Form>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  const token = cookies["myexpenses.token"];

  if (token) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      userProps: {},
    },
  };
};
