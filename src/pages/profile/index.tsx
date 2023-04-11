import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useContext, useEffect, useState } from "react";
import nookies from "nookies";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Sidebar from "@/components/Sidebar";
import { SidebarContext } from "@/contexts/SidebarContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "next-themes";
import { Button } from "@/components/Buttons/Button";
import { Input } from "@/components/Forms/Input";
import { ProfilePictureInput } from "@/components/Forms/ProfilePictureInput";
import { useUser } from "@/hooks/useUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import { DarkModeButton } from "@/components/Buttons/DarkModeButton";
import { Form } from "@/components/Forms/Form";

interface UpdateProfileValues {
  name: string;
  email: string;
  password: string;
  newPassword?: string | null;
  passwordConfirmation?: string | null;
  image?: string;
  profilePicture?: Blob[];
}

export default function Dashboard() {
  const queryClient = useQueryClient();
  const { isSidebarClosed } = useContext(SidebarContext);
  const { theme } = useTheme();
  const { data: user } = useUser();
  const [newPassword, setNewPassword] = useState("");

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const loginFormSchema = yup.object().shape({
    name: yup.string().required("Nome é obrigatório."),

    email: yup
      .string()
      .required("E-mail é obrigatório.")
      .email("Digite um e-mail válido.")
      .matches(emailRegex, "Digite um e-mail válido"),

    password: yup.string().required("Senha é obrigatório")
    .min(8, "A senha precisa ter ao menos 8 caracteres."),

    newPassword: newPassword.length > 0 
    ?
    yup.string()
    .min(8, "A nova senha precisa ter ao menos 8 caracteres.")
    : 
    yup.string()
    ,

    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("newPassword")], "A nova senha e a confirmação precisam ser iguais."),
  });

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileValues>({ resolver: yupResolver(loginFormSchema) });

  useEffect(() => {
    if (user) {
      setValue("name", user?.name);
      setValue("email", user?.email);
    }
  }, [user, setValue]);

  const updateProfile = useMutation(
    async (data: UpdateProfileValues) => {
      const response = await api.put(`/users/${user?.id}`, data);

      return response.data;
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["users"]);
        toast.success("Perfil atualizado com sucesso!");
        reset();
      },
    }
  );

  const onSubmit: SubmitHandler<UpdateProfileValues> = async (data) => {
    const fileReader = new FileReader();

    fileReader.onload = async (e: ProgressEvent<FileReader>) => {
      var base64String = e?.target?.result as string;

      const formData: UpdateProfileValues = {
        name: data?.name,

        email: data?.email,

        password: data?.password,

        newPassword:
          data?.newPassword !== null &&
          data?.newPassword !== "" &&
          data?.newPassword !== undefined
            ? data?.newPassword
            : null,

        passwordConfirmation:
          data?.passwordConfirmation !== null &&
          data?.passwordConfirmation !== "" &&
          data?.passwordConfirmation !== undefined
            ? data?.passwordConfirmation
            : null,

        image: base64String,
      };
      try {
        await updateProfile.mutateAsync(formData);
      } catch (err: any) {
        toast.error(err?.response?.data?.message);
      }
    };

    if (data?.profilePicture?.[0]) {
      fileReader.readAsDataURL(data?.profilePicture?.[0]);
    } else {
      const formData: UpdateProfileValues = {
        name: data?.name,

        email: data?.email,

        password: data?.password,

        newPassword:
          data?.newPassword !== null &&
          data?.newPassword !== "" &&
          data?.newPassword !== undefined
            ? data?.newPassword
            : null,

        passwordConfirmation:
          data?.passwordConfirmation !== null &&
          data?.passwordConfirmation !== "" &&
          data?.passwordConfirmation !== undefined
            ? data?.passwordConfirmation
            : null,
      };
      try {
        await updateProfile.mutateAsync(formData);
      } catch (err: any) {
        toast.error(err?.response?.data?.message);
      }
    }
  };

  return (
    <>
      <ToastContainer
        autoClose={2000}
        theme={`${theme === "dark" ? "dark" : "light"}`}
      />
      <Sidebar />

      <div
        className={`flex min-h-screen flex-col items-center justify-center gap-4 p-6 pl-24 pr-24
      transition-all ease-in ${
        isSidebarClosed ? "ml-[71px]" : "ml-[231px]"
      } xlw:pl-8 xlw:pr-8 mdw:ml-[71px]`}
      >
        <DarkModeButton tailwindCss="absolute top-11 right-28 z-50 lgw:top-12 lgw:right-10 2smw:top-16 " />

        <div className="flex w-full items-center justify-center">

          <Form handleSubmit={handleSubmit} handleSubmitParam={onSubmit}>
            <ProfilePictureInput
              {...register("profilePicture")}
              name="profilePicture"
              type="file"
              error={errors?.profilePicture}
            />

            <Input
              {...register("name")}
              label="Nome:"
              name="name"
              type="text"
              error={errors?.name}
              requiredField
            />

            <Input
              {...register("email")}
              label="E-mail:"
              name="email"
              type="text"
              error={errors?.email}
              requiredField
            />

            <Input
              {...register("password")}
              label="Senha atual:"
              name="password"
              type="password"
              error={errors?.password}
              requiredField
            />

            <Input
              {...register("newPassword")}
              label="Nova senha:"
              name="newPassword"
              type="password"
              error={errors?.newPassword}
              onChangeFunc={setNewPassword}
            />

            <Input
              {...register("passwordConfirmation")}
              label="Confirme a nova senha:"
              name="passwordConfirmation"
              type="password"
              error={errors?.passwordConfirmation}
            />

            <Button
              type="submit"
              tailwindClass={"mt-4"}
              title={isSubmitting ? "" : "Editar Perfil"}
              isDisabled={isSubmitting}
              disabled={isSubmitting}
            />
          </Form>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const cookies = nookies.get(ctx);
  const token = cookies["myexpenses.token"];

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
