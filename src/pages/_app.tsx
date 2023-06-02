// remove before building
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// ----------------------------------------------------------------
import { AuthProvider } from "@/contexts/AuthContext";
import type { AppProps } from "next/app";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import "../styles/input.css";
import { DropdownButtonProvider } from "@/contexts/DropdownButtonContext";
import { ExpenseIncomesModalProvider } from "@/contexts/ExpenseIncomesModalContext";
import { ThemeProvider } from "next-themes";
import { UserBalanceModalProvider } from "@/contexts/userBalanceModalContext";
import { ChoosenMonthProvider } from "@/contexts/ChoosenMonthContext";
import { Last7OrLast30DaysChartProvider } from "@/contexts/Last7OrLast30DaysChartContext";
import { useRouter } from "next/router";
import { GlobalLoader } from "@/components/Loaders/GlobalLoader";
import { CreditCardModalProvider } from "@/contexts/CreditCardModalContext";

export default function App({ Component, pageProps }: AppProps) {
  const [load, setLoad] = useState({
    loading: false,
    loadedOnce: false
  });
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setLoad({
        loading: true,
        loadedOnce: false
      });
    };

    const handleComplete = () => {
      setLoad({
        loading: false,
        loadedOnce: false
      });
    };

    const handleRouteChange = () => {
      if (router?.asPath !== "/") {
        setLoad({loading: false, loadedOnce: true})
      } else {
        setLoad({loading: true, loadedOnce: false})
      }
    }

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleComplete); 
    window.addEventListener("beforeunload", handleStart);

  }, [router.asPath]);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 60, // 60 minutes
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <>
      { load.loading && !load.loadedOnce ? (
        <GlobalLoader />
      ) : (
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class">
            <Last7OrLast30DaysChartProvider>
              <ChoosenMonthProvider>
                <CreditCardModalProvider>
                  <UserBalanceModalProvider>
                    <AuthProvider>
                      <ExpenseIncomesModalProvider>
                        <SidebarProvider>
                          <DropdownButtonProvider>
                            <Component {...pageProps} />
                          </DropdownButtonProvider>
                        </SidebarProvider>
                      </ExpenseIncomesModalProvider>
                    </AuthProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
                  </UserBalanceModalProvider>
                </CreditCardModalProvider>
              </ChoosenMonthProvider>
            </Last7OrLast30DaysChartProvider>
          </ThemeProvider>
        </QueryClientProvider>
      )}
    </>
  );
}
