import Link from "next/link";
import { useRouter } from "next/router";
import { LinkHTMLAttributes, ReactNode } from "react";

interface ActiveLinkProps extends LinkHTMLAttributes<any> {
  children: ReactNode;
  linkHref: string;
  signOut?: () => void;
  onClickFunc?: () => void;
}

export function ActiveLink({ children, linkHref, onClickFunc, ...rest }: ActiveLinkProps) {
  const { asPath } = useRouter();
  let isActive = false;

  if (asPath.includes((String(linkHref))) && !onClickFunc) isActive = true;

  return (
      <Link
        {...rest}
        className={`${isActive ? "text-isActive-50 text-[2rem]" : "text-[1.6rem]"}
        hover:text-isActive-50 cursor-pointer transition-colors duration-300`}
        onClick={onClickFunc}
        href={linkHref}
      >
        {children}
      </Link>
  );
}
