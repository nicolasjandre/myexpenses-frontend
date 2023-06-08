import { ChoosenMonthContext } from "@/contexts/ChoosenMonthContext";
import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

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

interface DataProps {
    data: Data;
}

export async function getTitlesPaginated(
    page: number,
    size: number,
    sort: string,
    property: string,
    initialDate: string,
    finalDate: string
): Promise<Data> {
    const { data }: DataProps = await api.get("/titles/paginated", {
        params: {
            page,
            size,
            sort,
            property,
            initialDate,
            finalDate,
        },
    });

    return data;
}

export function useTitlesPaginated(pageSize: number, page: number, sort: string, property: string) {
    const { firstDayOfMonth, lastDayOfMonth } = useContext(ChoosenMonthContext);

    return useQuery(
        ["Titles", firstDayOfMonth + " - " + sort + " " + property + " - " + page],
        () => getTitlesPaginated(page, pageSize, sort, property, firstDayOfMonth, lastDayOfMonth)
    );
}
