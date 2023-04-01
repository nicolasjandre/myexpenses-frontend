import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MdDarkMode, MdLightMode } from "react-icons/md";

type DarkModeButtonProps = {
  tailwindCss?: string;
};

export function DarkModeButton({ tailwindCss }: DarkModeButtonProps) {
  const { theme, setTheme } = useTheme();

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <button
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      className={` ${tailwindCss}
       transition-all ease-in text-white dark:text-gray-800 text-4xl rounded-lg`}
    >
      {isSSR ? "" : theme === "dark" ? (
        <MdLightMode className="text-yellow-400" />
      ) : (
        <MdDarkMode className="text-black" />
      )}
    </button>
  );
}
