import Image from "next/image";
import { MdNotificationsNone, MdArrowBackIos, MdSearch } from "react-icons/md";

interface Header {
  tailwindClass?: string;
}

export default function Header({ tailwindClass }: Header) {
  return (
    <div className={`flex items-center justify-around w-[100%] h-[80px] `}>
      <div className="flex w-[66%] max-w-[700px] h-[3.2rem] pl-4 pr-4 items-center bg-black_bg-100 rounded-lg	">
        <MdSearch className="text-[1.5rem]" />
        <input placeholder="Buscar transações por nome" type="text" className="w-full h-full pl-2 outline-none bg-black_bg-100" />
      </div>

      <div className="flex gap-8 justify-end items-center w-[33%]">
        <MdNotificationsNone className="text-[1.9rem] cursor-pointer" />

        <div className="bg-black_bg-100 w-[3.6rem] h-[3.6rem] overflow-hidden rounded-full">
          <Image
            src="https://www.github.com/nicolasjandre.png"
            alt="Foto do Perfil"
            width="80"
            height="80"
          />
        </div>

        <MdArrowBackIos className="text-[1.65rem] -rotate-90 -translate-y-1/4 cursor-pointer" />
      </div>
    </div>
  );
}
