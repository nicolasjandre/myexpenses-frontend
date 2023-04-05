import Image from "next/image";
import logo from "../../../public/logo.png";

interface LogoProps {
   tailwindClass?: string;
}

export default function Logo({ tailwindClass }: LogoProps) {
  return (
    <div className={`flex items-center gap-4 ${tailwindClass}`}>
      <Image src={logo} alt="My Expenses Logo" className="2sm:w-14 bg-black rounded-2xl dark:bg-transparent transition-colors ease-in" />
      <h1 className="text-4xl 2sm:text-3xl">my expenses</h1>
    </div>
  );
}
