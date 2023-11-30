import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import Header from "@/components/Header";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  return (
    <>
      <SWRConfig value={{ fetcher }}>
        <Header />
        <GlobalStyle />
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
