import Link from "next/link";
import styles from "./navigation.module.css";
import { useState } from "react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.menuToggle} onClick={handleToggleMenu}>
          ☰ Menu
        </div>
        {isMenuOpen && (
          <div className={styles.menuItems}>
            <Link href="/works" passHref>
              <div className={styles.works}>Works</div>
            </Link>
            <Link href="/contact" passHref>
              <div className={styles.contact}>Contact</div>
            </Link>
            <Link href="/info" passHref>
              <div className={styles.info}>About</div>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
