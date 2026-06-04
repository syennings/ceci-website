import HomeButton from "./HomeButton.js";
import LoginBadge from "./LoginBaddge.js/index.js";
import { Navigation } from "./Navigation";
import styles from "./header.module.css";

export default function Header() {
  return (
    <>
      {/* fixed top bar with site title */}
      <header className={styles.header}>
        <HomeButton />
        <LoginBadge />
      </header>
      {/* nav stays fixed at bottom-right, outside the header */}
      <Navigation />
    </>
  );
}
