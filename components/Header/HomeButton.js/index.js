import Link from "next/link";
import styles from "./homebutton.module.css";

export default function HomeButton() {
  return (
    <Link href="/">
      <h1 className={styles.homebutton}>Ana Cecilia Breña</h1>
    </Link>
  );
}
