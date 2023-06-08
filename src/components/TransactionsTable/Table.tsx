import { Tr } from "./Tr";
import { useContext, useEffect, useState } from "react";
import { PageContext } from "@/contexts/PageContext";
import { getTitlesPaginated, useTitlesPaginated } from "@/hooks/useTitles";
import { useQueryClient } from "@tanstack/react-query";
import { ChoosenMonthContext } from "@/contexts/ChoosenMonthContext";

interface CostCenter {
    id: number;
    description: string;
}

interface CreditCard {
    id: number;
    name: string;
}

interface Invoice {
    id: number;
    dueDate: string;
    paid: boolean;
}

interface Title {
    id: number;
    description: string;
    type: string;
    costCenter: CostCenter;
    creditCard: CreditCard;
    invoice: Invoice;
    value: number;
    referenceDate: string;
    createdAt: string;
    inactiveAt: null | string;
    notes: string;
}

interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}

interface Data {
    content: Title[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export function Table() {
    const { property, setProperty, sort, setSort, pageSize, page } = useContext(PageContext);
    const { data, refetch, isLoading } = useTitlesPaginated(pageSize, page, sort, property);
    const { firstDayOfMonth, lastDayOfMonth } = useContext(ChoosenMonthContext);
    const [prevData, setPrevData] = useState<Data>();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!isLoading) {
            setPrevData(data);
        }
    }, [data, isLoading]);

    async function handleChangeProperty(newProperty: string) {
        if (property === newProperty) {
            setSort((prev) => (prev === "DESC" ? "ASC" : "DESC"));
        }

        await setProperty(newProperty);
        refetch();
    }

    async function prefetchSortType(propertyToPrefetch: string) {
        if (property === propertyToPrefetch) {
            await queryClient.prefetchQuery(
                [
                    "Titles",
                    firstDayOfMonth +
                        " - " +
                        (sort === "ASC" ? "DESC" : "ASC") +
                        " " +
                        propertyToPrefetch +
                        " - " +
                        page,
                ],
                () => {
                    getTitlesPaginated(
                        page,
                        pageSize,
                        sort === "ASC" ? "DESC" : "ASC",
                        propertyToPrefetch,
                        firstDayOfMonth,
                        lastDayOfMonth
                    );
                }
            );
        } else {
            await queryClient.prefetchQuery(
                [
                    "Titles",
                    firstDayOfMonth + " - " + sort + " " + propertyToPrefetch + " - " + page,
                ],
                () => {
                    getTitlesPaginated(
                        page,
                        pageSize,
                        sort,
                        propertyToPrefetch,
                        firstDayOfMonth,
                        lastDayOfMonth
                    );
                }
            );
        }
    }

    return (
        <table
            className="my-5 w-full max-w-5xl overflow-hidden mdw:border-gray-400 mdw:border-2
            rounded-xl border-black_bg-100 shadow-glass backdrop-blur-md dark:border-glass-100 dark:border-black_bg-100 dark:bg-black_bg-100
            dark:text-white sm:bg-white mdw:flex mdw:max-w-none mdw:flex-row mdw:flex-nowrap"
        >
            <thead className="h-14 w-1/2 mdw:h-auto">
                {prevData?.content?.map((title) => (
                    <tr
                        key={title?.id + title?.type + "tableRow"}
                        className="hidden text-center text-black first:table-row dark:text-white mdw:mb-4 mdw:flex mdw:w-full mdw:last:border-b-0
                        mdw:flex-col mdw:flex-nowrap mdw:items-center mdw:justify-center mdw:border-b-2 mdw:border-gray-400 mdw:first:flex
                        mdw:dark:border-white"
                    >
                        <th
                            className="w-[60px] cursor-pointer transition-transform duration-300 hover:scale-110 mdw:w-full mdw:p-1"
                            onClick={() => handleChangeProperty("type")}
                            scope="col"
                            onMouseEnter={() => prefetchSortType("type")}
                        >
                            Tipo
                        </th>
                        <th
                            className="w-[140px] cursor-pointer transition-transform duration-300 hover:scale-110 mdw:w-full mdw:p-1"
                            onClick={() => handleChangeProperty("referenceDate")}
                            scope="col"
                            onMouseEnter={() => prefetchSortType("referenceDate")}
                        >
                            Data
                        </th>
                        <th
                            className="w-[200px] cursor-pointer transition-transform duration-300 hover:scale-110 mdw:w-full mdw:p-1"
                            onClick={() => handleChangeProperty("description")}
                            scope="col"
                            onMouseEnter={() => prefetchSortType("description")}
                        >
                            Descrição
                        </th>
                        <th
                            className="w-[200px] cursor-pointer transition-transform duration-300 hover:scale-110 mdw:w-full mdw:p-1"
                            onClick={() => handleChangeProperty("costCenter")}
                            scope="col"
                            onMouseEnter={() => prefetchSortType("costCenter")}
                        >
                            Categoria
                        </th>
                        <th
                            className="w-[200px] cursor-pointer transition-transform duration-300 hover:scale-110 mdw:w-full mdw:p-1"
                            onClick={() => handleChangeProperty("creditCard")}
                            scope="col"
                            onMouseEnter={() => prefetchSortType("creditCard")}
                        >
                            Pagamento
                        </th>
                        <th
                            className="w-[200px] cursor-pointer transition-transform duration-300 hover:scale-110 mdw:w-full mdw:p-1"
                            onClick={() => handleChangeProperty("value")}
                            scope="col"
                            onMouseEnter={() => prefetchSortType("value")}
                        >
                            Valor
                        </th>
                    </tr>
                ))}
            </thead>
            <tbody className="mwd:flex-1 h-14 w-1/2 mdw:h-auto">
                {prevData?.content?.length! > 0 ? (
                    prevData?.content?.map((title) => (
                        <Tr key={title?.id + title?.type} title={title} />
                    ))
                ) : (
                    <tr>
                        <td
                            colSpan={6}
                            className="py-4 pb-8 text-center text-2xl text-black dark:text-white"
                        >
                            Nenhuma transação encontrada
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
