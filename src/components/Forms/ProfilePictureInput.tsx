import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import { FieldError } from "react-hook-form";
import { IoMdReverseCamera } from "react-icons/io";
import React, { Ref, forwardRef, useState } from "react";
import { FiUser } from "react-icons/fi";
import { toast } from "react-toastify";

interface ProfilePictureInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: FieldError | any;
  type: string;
}

const ProfilePictureInputBase = (
  { name, error = null, type, ...rest }: ProfilePictureInputProps,
  ref: Ref<HTMLInputElement>
) => {
  const { data } = useUser();
  const [base64String, setBase64String] = useState<string>("");

  function handleFileInput(e: any) {
    console.log(base64String)
    try {
      const type = e?.target?.files?.[0].type;

      if (
        !type.includes("jpeg") &&
        !type.includes("png") &&
        !type.includes("svg") &&
        !type.includes("jpg")
      ) {
        throw new Error(
          "Este formato de arquivo não é suportado. Por favor, use PNG/JPG/SVG."
        );
      }

      const fileReader = new FileReader();

      fileReader.onload = async (e: ProgressEvent<FileReader>) => {
        var base64String = e?.target?.result as string;
        setBase64String(base64String);
      };

      fileReader.readAsDataURL(e?.target?.files?.[0]);
    } catch (e: any) {
      toast.error(e?.message);
      console.error(e);
    }
  }

  return (
    <>
      <div className="relative m-auto">
        <div
          className="absolute right-8 bottom-0 z-10 flex h-12 w-12 items-center justify-center rounded-full
             bg-black transition-colors ease-in dark:bg-blue-700"
        >
          <label
            htmlFor="profilePicture"
            className="relative z-50 cursor-pointer"
          >
            <IoMdReverseCamera className="text-3xl text-white" />
          </label>
          <input
            type={type}
            name={name}
            id={name}
            className="absolute z-20 h-[100%] w-[100%] rounded-full opacity-0"
            ref={ref}
            onInput={(e) => handleFileInput(e)}
            {...rest}
          />
        </div>

        <div
          className="relative flex h-[50vw] max-h-[250px] w-[50vw] max-w-[250px]
         items-center justify-center overflow-hidden rounded-full bg-black_bg-100"
        >
          {data?.image || base64String !== "" ? (
            <Image
              src={
                base64String !== undefined &&
                base64String !== "" &&
                base64String !== null
                  ? base64String
                  : data?.image
              }
              alt="Foto do Perfil"
              fill
            />
          ) : (
            <FiUser className="h-full w-full text-white" />
          )}
        </div>
      </div>
      <div>
        {error && <p className="text-sm text-red-600">{error?.message}</p>}
      </div>
    </>
  );
};

export const ProfilePictureInput = forwardRef(ProfilePictureInputBase);
