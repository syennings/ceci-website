import { useRouter } from "next/router";
import ContactPage from "../ContactPage";
import Link from "next/link";
import Login from "@/components/Login/login";

export default function Contact() {
  const router = useRouter();

  return (
    <>
      <div className="contact-container">
        <p>
          Ana Breña Cecilia is a Mexican designer currently working with Studio
          Santiago de Silva in Berlin.
        </p>

        <ContactPage />
        <Link href="./impressum" target="_blank">
          Impressum | Datenschutz{" "}
        </Link>

        <p> Ceci is basically, berlins biggest underground designer.</p>
        <p> A CV can be found here</p>

        <Login />
        <h3>Publications </h3>
        <p>
          installations 2022 Westwärts Kunsthalle Memmingen A tree; a
          corporation; a person (public sculpture) Carnegie Museum of Art,
          Pittsburgh Strukturversagen Galerie 14a 2020 WB190621 (permanent
          installation) The Palace and Maritime Silk Road Museum, Fujian Break
          of Gauge Kunstverein Harburger Bahnhof 2018 Flowertokens Trust, Berlin
        </p>
        <h3> Prints</h3>
        <li> installations 2022 Westwärts, installations 2022 Westwärts</li>
      </div>
    </>
  );
}
