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
        className={`flex gap-[3rem] pt-[3.5rem] pb-[8rem] flex-col items-center fixed z-10 w-[230px] h-screen min-h-screen
        mdh:pb-10 transition-all ease-in ${
          isSidebarClosed && "w-[70px]"
        } 2smh:pt-4 2smh:gap-4 2smh:pb-4 mdw:w-[70px] border-r-2 dark:border-gray-700
      `}
      >
        <MdArrowCircleLeft
          onClick={() => setIsSidebarClosed((prev) => !prev)}
          className={`absolute z-50 -translate-x-[15px] 
          cursor-pointer text-3xl top-[140px] left-[100%] transition-all ease-in
           ${
             isInsideSidebar ? "opacity-70" : "opacity-0"
           } hover:opacity-90 mdw:hidden ${isSidebarClosed && "rotate-180"}`}
        />
        <div className="flex relative justify-center pb-2 transition-all ease-in">
          <ActiveLink linkHref="/dashboard">
            <Image
              src={logo}
              alt="My Expenses Logo"
              className={`m-auto mb-[3px] transition-all ease-in dark:bg-transparent bg-black rounded-xl ${
                isSidebarClosed ? "w-10" : "w-16"
              } mdw:w-10`}
            />
            <p
              className={`text-center text-black dark:text-white transition-all ease-in
                mdw:text-[11px] ${
                  isSidebarClosed ? "text-[11px]" : "text-[14px]"
                }`}
            >
              myexpenses
            </p>
          </ActiveLink>
        </div>
        <div
          className={`flex flex-col items-start h-screen max-h-[580px]
            lgh:gap-[1rem] justify-between  w-[100%] overflow-hidden ${
              isSidebarClosed ? "items-center pl-0" : "pl-12"
            } 2smh:overflow-y-auto mdw:items-center mdw:pl-0`}
        >
          <ActiveLink linkHref="/dashboard">
            <span
              className={`flex items-center ${
                isSidebarClosed ? "gap-0" : "gap-2"
              }`}
            >
              <MdDashboard className="text-black dark:text-white"/>
              <span className="text-[15px] dark:text-white text-black mdw:hidden">
                {!isSidebarClosed && "Dashboard"}
              </span>
            </span>
          </ActiveLink>
          <ActiveLink linkHref="/profile">
            <span
              className={`flex items-center ${
                isSidebarClosed ? "gap-0" : "gap-2"
              }`}
            >
              <MdPerson className="text-black dark:text-white"/>
              <span className="text-[15px] dark:text-white text-black mdw:hidden">
                {!isSidebarClosed && "Perfil"}
              </span>
            </span>
          </ActiveLink>

          <ActiveLink linkHref="/creditcards">
            <span
              className={`flex items-center ${
                isSidebarClosed ? "gap-0" : "gap-2"
              }`}
            >
              <MdCreditCard className="text-black dark:text-white"/>
              <span className="text-[15px] dark:text-white text-black mdw:hidden">
                {!isSidebarClosed && "Cartões"}
              </span>
            </span>
          </ActiveLink>

          <ActiveLink linkHref="/favorites">
            <span
              className={`flex items-center ${
                isSidebarClosed ? "gap-0" : "gap-2"
              }`}
            >
              <MdMonetizationOn className="text-black dark:text-white"/>
              <span className="text-[15px] dark:text-white text-black mdw:hidden">
                {!isSidebarClosed && "Transações"}
              </span>
            </span>
          </ActiveLink>

          <ActiveLink linkHref="/settings">
            <span
              className={`flex items-center ${
                isSidebarClosed ? "gap-0" : "gap-2"
              }`}
            >
              <MdSettings className="text-black dark:text-white"/>
              <span className="text-[15px] dark:text-white text-black mdw:hidden">
                {!isSidebarClosed && "Configurações"}
              </span>
            </span>
          </ActiveLink>

          <ActiveLink onClickFunc={signOut} linkHref="/">
            <span
              className={`flex items-center ${
                isSidebarClosed ? "gap-0" : "gap-2"
              }`}
            >
              <MdLogout className="text-black dark:text-white"/>
              <span className="text-[15px] dark:text-white text-black mdw:hidden">
                {!isSidebarClosed && "Sair"}
              </span>
            </span>
          </ActiveLink>
        </div>
      </div>
    </>
  );
}
