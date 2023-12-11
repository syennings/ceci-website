import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <ThemeProvider>
        <SessionProvider session={session}>
          <SWRConfig value={{ fetcher }}>
            <GlobalStyle />
            <Header />
            <Component {...pageProps} />
          </SWRConfig>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
