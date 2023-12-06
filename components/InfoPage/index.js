import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

export default function InfoPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <>
      <div className="contact-container">
        <p>
          Ana Breña Cecilia is a Mexican designer currently working with Studio
          Santiago de Silva in Berlin.
        </p>
        <p> Ceci is basically, berlins biggest underground designer.</p>
        <p> A CV can be found here</p>
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

      <div>
        <h1>Sign In</h1>

        {session && (
          <>
            <button onClick={() => signOut()}> Sign Out Here </button>
            <p>Signed in as {session.user.email}</p>
          </>
        )}
        {!session && (
          <>
            <button onClick={() => signIn()}> Sign In Here</button>

            <p>Not signed in</p>
          </>
        )}
      </div>
    </>
  );
}
