import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  // start closed, set correct default after mount based on screen size
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(window.innerWidth >= 768);
  }, []); // only on mount — user can toggle freely after

  return (
    <>
      <ThemeProvider
        themes={["light", "dark"]}
        defaultTheme="light"
        attribute="class"
        enableSystem={false}
        storageKey="theme"
      >
        <SessionProvider session={session}>
          <SWRConfig value={{ fetcher }}>
            <GlobalStyle />
            <Header />
            <div style={{ display: "flex", paddingTop: "80px" }}>
              <Sidebar isOpen={sidebarOpen} />

              {/* pink circle toggle button — always visible */}
              <button
                onClick={() => setSidebarOpen((prev) => !prev)}
                style={{
                  position: "fixed",
                  // sits at the edge of the sidebar when open, stays put when closed
                  left: sidebarOpen ? "268px" : "8px",
                  top: "100px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  zIndex: 1100,
                  transition: "left 0.3s ease",
                  padding: 0,
                }}
                aria-label="Toggle sidebar"
              >
                <svg width="22" height="22" viewBox="0 0 22 22">
                  <circle cx="11" cy="11" r="11" fill="pink" />
                </svg>
              </button>

              {/* main content shifts right when sidebar is open, on desktop only */}
              <main
                style={{
                  marginLeft: sidebarOpen ? "280px" : "0px",
                  flex: 1,
                  minWidth: 0, /* prevents flex children from overflowing */
                  overflow: "hidden",
                  transition: "margin-left 0.3s ease",
                }}
              >
                <Component {...pageProps} />
              </main>
            </div>
          </SWRConfig>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
