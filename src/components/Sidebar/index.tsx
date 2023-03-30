import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useState } from "react";
import {
  MdDashboard,
  MdPerson,
  MdLogout,
  MdSettings,
  MdCreditCard,
  MdMonetizationOn,
  MdArrowCircleLeft,
} from "react-icons/md";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { ActiveLink } from "../ActiveLink";
import { SidebarContext } from "@/contexts/SidebarContext";

interface HeaderProps {
  tailwindClass?: string;
}

export default function Header({ tailwindClass }: HeaderProps) {
  const [isInsideSidebar, setIsInsideSidebar] = useState(false);

  const { isSidebarClosed, setIsSidebarClosed } = useContext(SidebarContext);

  const { signOut } = useContext(AuthContext);
  return (
    <>
      <div
        onMouseLeave={() => setIsInsideSidebar(false)}
        onMouseEnter={() => setIsInsideSidebar(true)}
        className={`flex gap-[3rem] pt-[3.5rem] pb-[8rem] flex-col items-center fixed z-10 w-[230px] bg-black_bg-500 h-screen min-h-screen
        mdh:pb-10 transition-all duration-500 ${isSidebarClosed && "w-[70px]"}
      `}
      >
        <MdArrowCircleLeft
          onClick={() => setIsSidebarClosed((prev) => !prev)}
          className={`absolute text-white z-50 -translate-x-[15px] cursor-pointer text-3xl top-[140px] left-[100%] duration-500 transition-all
         ${isInsideSidebar ? "opacity-70" : "opacity-0"} hover:opacity-90 ${
            isSidebarClosed && "rotate-180"
          }`}
        />
        <div className="flex relative justify-center pb-2">
          <ActiveLink linkHref="/dashboard">
            <Image
              src={logo}
              alt="My Expenses Logo"
              className={`m-auto mb-[3px] transition-all duration-500 ${
                isSidebarClosed ? "w-10" : "w-16"
              }`}
            />
            <p
              className={`text-center text-white transition-all duration-500 ${
                isSidebarClosed ? "text-[11px]" : "text-[14px]"
              }`}
            >
              myexpenses
            </p>
          </ActiveLink>
        </div>
        <div
          className={`flex gap-[4.2rem] flex-col items-start justify-center bg-black_bg-500 h-screen
            mdh:gap-[1rem] mdh:justify-between  w-[100%] transition-all duration-500 overflow-hidden ${
              isSidebarClosed ? "items-center pl-0" : "pl-12"
            }
          `}
        >
          <ActiveLink linkHref="/dashboard">
            <span className="flex items-center gap-2">
              <MdDashboard />
              <span className="text-[15px]">
                {!isSidebarClosed && "Dashboard"}
              </span>
            </span>
          </ActiveLink>
          <ActiveLink linkHref="/profile">
            <span className="flex items-center gap-2">
              <MdPerson />
              <span className="text-[15px]">
                {!isSidebarClosed && "Perfil"}
              </span>
            </span>
          </ActiveLink>

          <ActiveLink linkHref="/creditcards">
            <span className="flex items-center gap-2">
              <MdCreditCard />
              <span className="text-[15px]">
                {!isSidebarClosed && "Cartões"}
              </span>
            </span>
          </ActiveLink>

          <ActiveLink linkHref="/favorites">
            <span className="flex items-center gap-2">
              <MdMonetizationOn />
              <span className="text-[15px]">
                {!isSidebarClosed && "Transações"}
              </span>
            </span>
          </ActiveLink>

          <ActiveLink linkHref="/settings">
            <span className="flex items-center gap-2">
              <MdSettings />
              <span className="text-[15px]">
                {!isSidebarClosed && "Configurações"}
              </span>
            </span>
          </ActiveLink>

          <ActiveLink onClickFunc={signOut} linkHref="/">
            <span className="flex items-center gap-2">
              <MdLogout />
              <span className="text-[15px]">{!isSidebarClosed && "Sair"}</span>
            </span>
          </ActiveLink>
        </div>
      </div>
    </>
  );
}
