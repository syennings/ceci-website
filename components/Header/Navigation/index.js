import Link from "next/link";
import styles from "./navigation.module.css";
import { useState } from "react";
import { useSession } from "next-auth/react";

export function Navigation() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(true);

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
            {session ? (
              <Link href="/worms" passHref>
                <div className={styles.contact}>Worms</div>
              </Link>
            ) : null}
            <Link href="/contact" passHref>
              <div className={styles.info}>Contact</div>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
