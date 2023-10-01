import { Toaster } from "@/components/ui/Toaster";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NextNProgress from "nextjs-progressbar";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextNProgress color="#16a34a" options={{ showSpinner: false }} />
      <Component {...pageProps} className={inter.className} />
      <Toaster />
    </QueryClientProvider>
  );
}
