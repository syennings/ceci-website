import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();
  return (
    <div>
      {session && (
        <>
          <p>Signed in as {session.user.email}</p>
          <button onClick={() => signOut()}> Sign Out Here </button>
        </>
      )}
      {!session && (
        <>
          <h1>Please Sign In</h1>
          <button onClick={() => signIn()}> Sign In Here</button>
        </>
      )}
    </div>
  );
}
