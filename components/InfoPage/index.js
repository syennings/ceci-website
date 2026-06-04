import ContactPage from "../ContactPage";
import Link from "next/link";
import styles from "./contact.module.css";

export default function Contact() {
  return (
    <div className={styles.main}>
      <div className={styles.contactContainer}>
        <ContactPage />

        <div className={styles.linksContainer}>
          <Link href="./impressum" target="_blank">
            Impressum | Datenschutz
          </Link>
        </div>
      </div>
    </div>
  );
}
