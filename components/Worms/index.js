import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";

export default function WormPicture({ desiredWorm }) {
  const { data, isLoading } = useSWR(`/api/worms/`);

  console.log("data of worms", data);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return <p>Data not found</p>;
  }

  const selectedWorm = data.find((worm) => worm.label === desiredWorm);
  if (!selectedWorm) {
    return <p>Invalid Worm</p>;
  }

  return (
    <>
      <Link href="/works">
        <Image
          src={selectedWorm.url}
          alt={selectedWorm.label}
          width={300}
          height={200}
        />
      </Link>
    </>
  );
}
