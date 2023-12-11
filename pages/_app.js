import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "styled-components";
import theme from "./worms/theme";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <SessionProvider session={session}>
        <SWRConfig value={{ fetcher }}>
          <ThemeProvider theme={theme} attribute="class">
            <GlobalStyle />
            <Header />
            <Component {...pageProps} />
          </ThemeProvider>
        </SWRConfig>
      </SessionProvider>
    </>
  );
}
