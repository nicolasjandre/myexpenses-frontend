// remove before building
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// ----------------------------------------------------------------
import { AuthProvider } from "@/contexts/AuthContext";
import type { AppProps } from "next/app";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import "../styles/input.css";
import { DropdownButtonProvider } from "@/contexts/DropdownButtonContext";
import { ExpenseIncomesModalProvider } from "@/contexts/ExpenseIncomesModalContext";
import { ThemeProvider } from "next-themes";
import { UserBalanceModalProvider } from "@/contexts/userBalanceModalContext";
import { ChoosenMonthProvider } from "@/contexts/ChoosenMonthContext";
import { Last7OrLast30DaysChartProvider } from "@/contexts/Last7OrLast30DaysChartContext";

export default function App({ Component, pageProps }: AppProps) {
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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class">
        <Last7OrLast30DaysChartProvider>
          <ChoosenMonthProvider>
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
          </ChoosenMonthProvider>
        </Last7OrLast30DaysChartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
