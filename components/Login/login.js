import { useSession, signIn, signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Login() {
  const { data: session } = useSession();

  return (
    <div>
      {session && (
        <>
          <p>Signed in as {session.user.name}</p>
          <button onClick={() => signOut()}> Sign Out Here </button>
        </>
      )}
      {!session && (
        <>
          <h1>Please Log In To Go To Secret Worms Page</h1>
          <button onClick={() => signIn()}> Sign In Here</button>
        </>
      )}
    </div>
  );
}
