import { useRouter } from "next/router";
import ContactPage from "../ContactPage";
import Link from "next/link";
import Login from "@/components/Login/login";
import styles from "./contact.module.css";

export default function Contact() {
  const router = useRouter();

  return (
    <>
      <div className={styles.contactContainer}>
        <ContactPage />

        <div className={styles.linksContainer}>
          <Link href="./impressum" target="_blank">
            Impressum | Datenschutz{" "}
          </Link>
        </div>

        <Login />
        <h3 className={styles.intro}>Publications </h3>
        <p className={styles.intro}>
          installations 2022 Westwärts Kunsthalle Memmingen A tree; a
          corporation; a person (public sculpture) Carnegie Museum of Art,
          Pittsburgh Strukturversagen Galerie 14a 2020 WB190621 (permanent
          installation) The Palace and Maritime Silk Road Museum, Fujian Break
          of Gauge Kunstverein Harburger Bahnhof 2018 Flowertokens Trust, Berlin
        </p>
      </div>
      <div className={styles.scrollingBanner}>
        <div className={styles.marquee}>
          <div className={styles.space}>Big Thanks To Raggy</div>
          {/* Duplicate the content as needed */}
          <div className={styles.space}>Big Thanks To Raggy</div>
        </div>
      </div>
    </>
  );
}
