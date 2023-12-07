import { useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./logingbade.module.css";
export default function LoginBadge() {
  const { data: session } = useSession();

  return (
    <>
      {session ? (
        <Image
          className={styles.badge}
          src={
            "https://res.cloudinary.com/ddgzpe5cw/image/upload/v1701347627/worm4_pno8bu.png"
          }
          alt={"badge"}
          width={200}
          height={200}
        />
      ) : null}
    </>
  );
}
