import Link from "next/link";
import styles from "./navigation.module.css";

export function Navigation() {
  return (
    <nav className={styles.navbar}>
      <Link href="/works" passHref>
        <div className={styles.works}>Works</div>
      </Link>
      <Link href="/contact" passHref>
        <div className={styles.contact}>Contact</div>
      </Link>
      <Link href="/info" passHref>
        <div className={styles.info}>About</div>
      </Link>
    </nav>
  );
}
