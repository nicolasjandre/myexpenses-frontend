import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type DropdownButtonContextData = {
  isDropdownOpen: boolean;
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
};

type DropdownButtonProviderProps = {
  children: ReactNode;
};

export const DropdownButtonContext = createContext(
  {} as DropdownButtonContextData
);

export function DropdownButtonProvider({
  children,
}: DropdownButtonProviderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  return (
    <DropdownButtonContext.Provider
      value={{ isDropdownOpen, setIsDropdownOpen }}
    >
      {children}
    </DropdownButtonContext.Provider>
  );
}
