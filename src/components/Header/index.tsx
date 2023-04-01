import Image from "next/image";
import { MdNotificationsNone, MdSearch } from "react-icons/md";
import { DarkModeButton } from "../Buttons/DarkModeButton";

export default function Header() {

  return (
    <div className={`flex items-center justify-between w-[100%] h-[80px] transition-all ease-in `}>
      <div className="flex w-[66%] max-w-[700px] h-[3.2rem] pl-4 pr-4 items-center transition-all ease-in
        shadow-md shadow-glass-100 bg-slate-200 dark:bg-black_bg-100 rounded-lg	mdw:hidden">
        <MdSearch className="text-[1.5rem] text-black dark:text-white" />
        <input
          placeholder="Buscar transações por nome"
          type="text"
          className="w-full h-full pl-2 outline-none dark:bg-black_bg-100 bg-slate-200 transition-all ease-in
           placeholder:text-gray-700 dark:placeholder:text-white placeholder:opacity-40"
        />
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
