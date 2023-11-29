import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h2> Welcome To Cecilias website</h2>
      <Link href="/works">
        <Image src="/worm.png" alt="worm1" width={250} height={150} />
      </Link>
    </div>
  );
}
