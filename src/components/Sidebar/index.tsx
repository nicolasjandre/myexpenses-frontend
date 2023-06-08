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

export default function Header() {
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
        <div className="flex flex-col relative justify-center pb-2 transition-all ease-in">
            <Image
              src={logo}
              alt="My Expenses Logo"
              className={`m-auto mb-[3px] transition-all ease-in dark:bg-transparent bg-black rounded-xl ${
                isSidebarClosed ? "w-10" : "w-16"
              } mdw:w-10`} />

              <span
              className={`text-center text-black dark:text-white
                mdw:text-[11px] ${
                  isSidebarClosed ? "text-[11px]" : "text-[14px]"
                }`} >
          
              myexpenses
            </span>
        </div>

        <div
          className={`flex flex-col items-start h-screen max-h-[580px]
            lgh:gap-[1rem] justify-between  w-[100%] overflow-hidden ${
              isSidebarClosed ? "items-center pl-0" : "pl-12"
            } 2smh:overflow-y-auto mdw:items-center mdw:pl-0`}
        >
          <ActiveLink linkHref="/dashboard" title="Dashboard" Icon={MdDashboard}/>
          
          <ActiveLink linkHref="/profile" Icon={MdPerson} title="Perfil" />

          <ActiveLink linkHref="/creditcards" Icon={MdCreditCard} title="Cartões" />

          <ActiveLink linkHref="/transactions" Icon={MdMonetizationOn} title="Transações" />

          <ActiveLink linkHref="/" onClickFunc={signOut} Icon={MdLogout} title="Sair" />

        </div>
      </div>
    </>
  );
}
