import Image from "next/image";
import { MdNotificationsNone, MdSearch } from "react-icons/md";
import { DarkModeButton } from "../Buttons/DarkModeButton";
import { MonthYearPicker } from "../Datepicker/MonthlyDatepicker";
import { useUser } from "@/hooks/useUser";
import { FiUser } from "react-icons/fi";

export default function Header() {
  const { data } = useUser();

  return (
    <div
      className={`border-bottom flex h-[80px] w-[100%] items-center justify-between transition-all ease-in`}
    >
      <div
        className="flex h-[3.2rem] w-[66%] max-w-[130px] items-center rounded-lg bg-slate-200 pl-4 pr-4
        shadow-md shadow-glass-100 transition-all ease-in dark:bg-black_bg-100	mdw:hidden"
      >
        <MonthYearPicker />
      </div>

      <div className="flex w-[33%] items-center justify-end gap-8 mdw:m-auto mdw:w-[100%] mdw:justify-center">
        <MdNotificationsNone className="cursor-pointer text-[2.4rem] text-black dark:text-white" />
        <div className="relative h-[48px] w-[48px] overflow-hidden rounded-full bg-black_bg-100">
          {data?.image ? (
            <Image src={data?.image} alt="Foto do Perfil" fill/>
          ) : (
            <FiUser className="w-full h-full text-white"/>
          )}
        </div>
        <DarkModeButton />
      </div>
    </div>
  );
}
