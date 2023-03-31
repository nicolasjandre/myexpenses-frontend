import Image from "next/image";
import { MdNotificationsNone, MdSearch } from "react-icons/md";

export default function Header() {

  return (
    <div className={`flex items-center justify-between w-[100%] h-[80px] `}>
      <div className="flex w-[66%] max-w-[700px] h-[3.2rem] pl-4 pr-4 items-center bg-black_bg-100 rounded-lg	smw:hidden">
        <MdSearch className="text-[1.5rem]" />
        <input
          placeholder="Buscar transações por nome"
          type="text"
          className="w-full h-full pl-2 outline-none bg-black_bg-100"
        />
      </div>

      <div className="flex gap-8 justify-end items-center w-[33%] smw:w-[100%] smw:justify-center smw:m-auto">
        <MdNotificationsNone className="text-[1.9rem] cursor-pointer" />

        <div className="bg-black_bg-100 w-[48px] h-[48px] overflow-hidden rounded-full">
          <Image
            src="https://www.github.com/nicolasjandre.png"
            alt="Foto do Perfil"
            width="80"
            height="80"
          />
        </div>
      </div>
    </div>
  );
}
