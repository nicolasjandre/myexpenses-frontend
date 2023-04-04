import Image from "next/image";
import { MdNotificationsNone, MdSearch } from "react-icons/md";
import { DarkModeButton } from "../Buttons/DarkModeButton";
import { MonthYearPicker } from "../Datepicker/MonthlyDatepicker";

export default function Header() {

  return (
    <div className={`flex items-center justify-between w-[100%] h-[80px] transition-all ease-in `}>
      <div className="flex w-[66%] max-w-[130px] h-[3.2rem] pl-4 pr-4 items-center transition-all ease-in
        shadow-md shadow-glass-100 bg-slate-200 dark:bg-black_bg-100 rounded-lg	mdw:hidden">
        <MonthYearPicker />
      </div>

      <div className="flex gap-8 justify-end items-center w-[33%] mdw:w-[100%] mdw:justify-center mdw:m-auto">
        
        <MdNotificationsNone className="text-[2.4rem] cursor-pointer" />
        <div className="dark:bg-black_bg-100 w-[48px] h-[48px] overflow-hidden rounded-full">
          <Image
            src="https://www.github.com/nicolasjandre.png"
            alt="Foto do Perfil"
            width="80"
            height="80"
          />
        </div>
        <DarkModeButton />
      </div>
    </div>
  );
}
