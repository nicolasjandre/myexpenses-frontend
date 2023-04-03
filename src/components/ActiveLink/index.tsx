import { SidebarContext } from "@/contexts/SidebarContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { LinkHTMLAttributes, ReactNode, useContext } from "react";
import { IconType } from "react-icons";

interface ActiveLinkProps extends LinkHTMLAttributes<any> {
  linkHref: string;
  Icon: IconType;
  title: string;
  signOut?: () => void;
  onClickFunc?: () => void;
}

export function ActiveLink({
  children,
  linkHref,
  onClickFunc,
  title,
  Icon,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();
  let isActive = false;
  const { isSidebarClosed } = useContext(SidebarContext);

  if (asPath.includes(String(linkHref)) && !onClickFunc) isActive = true;

  return (
    <Link
      {...rest}
      className={`
        dark:hover:text-isActive-50 hover:text-blue-500 cursor-pointer transition-colors ease-in`}
      onClick={onClickFunc}
      href={linkHref}
    >
      <span
        className={`flex items-center 
        ${isSidebarClosed ? "gap-0" : "gap-2"} ${isActive ? "text-blue-500 dark:text-isActive-50 text-[2rem]" : "text-black dark:text-white text-[1.6rem]"}
        hover:text-blue-500 dark:hover:text-isActive-50 transition-colors ease-in`}
      >
        <Icon className={`${isActive ? "text-[2rem]" : "text-[1.6rem]"}`} />
        
        <span className="text-[15px] mdw:hidden">
          {!isSidebarClosed && title}
        </span>
      </span>
    </Link>
  );
}
