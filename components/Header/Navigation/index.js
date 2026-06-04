import Link from "next/link";
import styles from "./navigation.module.css";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export function Navigation() {
  const { data: session } = useSession();
  // open by default on desktop, closed on mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMenuOpen(window.innerWidth >= 768);
    handleResize(); // set on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.menuToggle} onClick={handleToggleMenu}>
          ☰
        </div>
        {isMenuOpen && (
          <div className={styles.menuItems}>
            <Link href="/works" passHref>
              <div className={styles.works}>Work</div>
            </Link>
            {/* was: session-gated — worms is now public */}
            {/* {session ? (
              <Link href="/worms" passHref>
                <div className={styles.contact}>Worms</div>
              </Link>
            ) : null} */}
            <Link href="/contact" passHref>
              <div className={styles.info}>Contact</div>
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
