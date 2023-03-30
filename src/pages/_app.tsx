import { AuthProvider } from "@/contexts/AuthContext";
import "../styles/input.css";
import type { AppProps } from "next/app";
import { SidebarProvider } from "@/contexts/SidebarContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Component {...pageProps} />
      </SidebarProvider>
    </AuthProvider>
  );
}
