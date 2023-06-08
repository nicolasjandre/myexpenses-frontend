import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

type PageContextData = {
    pageSize: number;
    setPageSize: Dispatch<SetStateAction<number>>;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    property: string;
    setProperty: Dispatch<SetStateAction<string>>;
    sort: string;
    setSort: Dispatch<SetStateAction<string>>;
};

type PageProviderProps = {
    children: ReactNode;
};

export const PageContext = createContext({} as PageContextData);

export function PageProvider({ children }: PageProviderProps) {
    const [pageSize, setPageSize] = useState<number>(15);
    const [page, setPage] = useState<number>(0);
    const [property, setProperty] = useState("referenceDate");
    const [sort, setSort] = useState("ASC");

    return (
        <PageContext.Provider
            value={{ pageSize, setPageSize, page, setPage, property, setProperty, sort, setSort }}
        >
            {children}
        </PageContext.Provider>
    );
}
