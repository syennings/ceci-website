import { useSession, signIn, signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "./login.module.css";

export default function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignIn = async () => {
    await signIn();
    const newSession = await getSession();
    console.log("Session after sign in:", newSession);
    router.push("/worms");
  };

  return (
    <div className={styles.loginForm}>
      {session && (
        <>
          <p>Signed in as {session.user.name}</p>
          <button className={styles.button} onClick={() => signOut()}>
            Sign Out Here
          </button>
        </>
      )}
      {!session && (
        <>
          <h1 className={styles.title}>Secret Worms</h1>
          <button className={styles.button} onClick={handleSignIn}>
            {" "}
            Secret Login
          </button>
        </>
      )}
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log("getServerSideProps called", session);

  console.log("getServerSideProps called");
  if (session) {
    return {
      redirect: { destination: "/worms" },
      permanent: false,
    };
  }
  return { props: { session } };
};
