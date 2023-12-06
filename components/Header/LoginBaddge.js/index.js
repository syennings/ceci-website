import { useSession } from "next-auth/react";
import Image from "next/image";

export default function LoginBadge() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <Image
          src={
            "https://res.cloudinary.com/ddgzpe5cw/image/upload/v1701860990/Screenshot_2023-12-06_at_12.07.55_udsstv.png"
          }
          alt={"badge"}
          width={200}
          height={200}
        />
      ) : null}
    </>
  );
}
