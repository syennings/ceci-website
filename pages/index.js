import Image from "next/image";
import Link from "next/link";
import WormPicture from "@/components/Worms";

export default function HomePage() {
  return (
    <>
      <h2> Welcome To Cecilias website</h2>
      <Link href="/works">
        <Image src="/worm.png" alt="dummy-worm1" width={250} height={150} />
      </Link>
      <WormPicture desiredWorm={"worm1"} />
    </>
  );
}
