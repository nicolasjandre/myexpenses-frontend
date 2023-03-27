import { LinkHTMLAttributes, ReactNode } from "react";

interface ActiveLinkProps extends LinkHTMLAttributes<any> {
  children: ReactNode;
  linklHref: string;
  signOut?: () => void;
}

export function ActiveLink({ children, linklHref, signOut }: ActiveLinkProps) {
  const { pathname } = useLocation();
  let isActive = false;

  if (pathname === String(linklHref)) isActive = true;

  return (
    <li onClick={signOut}>
      <Link
        className={`${
          isActive && !signOut && "text-yellow-400 font-bold"
        } hover:text-yellow-400 cursor-pointer transition-colors duration-300 text-xl`}
        to={linklHref}
      >
        {children}
      </Link>
    </li>
  );
}
