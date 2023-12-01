import Link from "next/link";
import styles from "./homebutton.module.css";

export default function HomeButton() {
  return (
    <Link href="/">
      <h1 className={styles.homebutton}>Ana Brena Cecilia</h1>
    </Link>
  );
}
