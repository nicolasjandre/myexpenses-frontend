import { PageContext } from "@/contexts/PageContext";
import { useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getTitlesPaginated } from "@/hooks/useTitles";
import { ChoosenMonthContext } from "@/contexts/ChoosenMonthContext";

interface PaginationProps {
    totalItems: number;
    totalPages: number;
}

const MAX_ITEMS = 9;

export function Pagination({ totalPages }: PaginationProps) {
    const { pageSize, page, setPage, sort, property } = useContext(PageContext);
    const MAX_LEFT = Math.ceil((pageSize - 1) / 2);
    const queryClient = useQueryClient();
    const { firstDayOfMonth, lastDayOfMonth } = useContext(ChoosenMonthContext);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const first = isMobile ?  Math.max(page + 6 - MAX_LEFT, 1) : Math.max(page + 2 - MAX_LEFT, 1);
    let mediaQuery: any;

    if (typeof window !== "undefined") {
        mediaQuery = window.matchMedia("(max-width: 874px)");
    }

    useEffect(() => {
        setIsMobile(mediaQuery.matches);

        const handleMediaQueryChange = (event: MediaQueryListEvent) => {
            setIsMobile(event.matches);
        };

        mediaQuery.addListener(handleMediaQueryChange);

        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        };
    }, []);

    function handlePageChange(pageNum: number) {
        setPage(pageNum - 1);
    }

    async function prefetchTitles(mapPage: number) {
        await queryClient.prefetchQuery(
            ["Titles", firstDayOfMonth + " - " + sort + " " + property + " - " + (mapPage - 1)],
            () =>
                getTitlesPaginated(
                    mapPage - 1,
                    pageSize,
                    sort,
                    property,
                    firstDayOfMonth,
                    lastDayOfMonth
                )
        );
    }

    return (
        <div
            className="mt-4 mb-6 flex h-12 w-full max-w-5xl items-center justify-center rounded-xl border-black_bg-100 text-black
            shadow-glass backdrop-blur-md dark:border-glass-100 dark:border-black_bg-100 dark:bg-black_bg-100 dark:text-white smw:h-8 smw:text-sm"
        >
            <ul className="flex items-center justify-center gap-4 smw:gap-2">
                {Array.from({ length: isMobile ? 5 : MAX_ITEMS })
                    .map((_, index: number) => index + first)
                    .map(
                        (mapPage) =>
                            mapPage - 1 < totalPages && (
                                <li key={mapPage}>
                                    <button
                                        className={`h-10 w-10 rounded-lg shadow-sm dark:shadow-none smw:h-6 smw:w-6
                                    ${
                                        page + 1 === mapPage
                                            ? "dark:bg--900 cursor-default bg-gray-400"
                                            : "cursor-pointer bg-gray-200 hover:bg-slate-300 dark:bg-black_bg-500 dark:hover:bg-slate-900"
                                    }`}
                                        onClick={() => {
                                                mapPage !== page + 1 && handlePageChange(mapPage)
                                                isMobile && window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
                                            }
                                        }
                                        onMouseEnter={() => prefetchTitles(mapPage)}
                                    >
                                        {mapPage}
                                    </button>
                                </li>
                            )
                    )}
            </ul>
        </div>
    );
}
