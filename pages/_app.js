import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <SessionProvider session={session}>
        <SWRConfig value={{ fetcher }}>
          <GlobalStyle />
          <Header />
          <Component {...pageProps} />
        </SWRConfig>
      </SessionProvider>
    </>
  );
}
