import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";

export default function WormPicture({ desiredWorm }) {
  const { data, isLoading } = useSWR(`/api/worms/`);
  const { data: dataWorks, isLoading: isLoadingWorks } = useSWR(`/api/works/`);

  console.log("data of worms", data);
  console.log("art data?!?!?!", dataWorks);

  if (isLoading || isLoadingWorks) {
    return <h1>Loading...</h1>;
  }

  if (!data || !dataWorks) {
    return <p>Data not found</p>;
  }

  const selectedWorm = data.find((worm) => worm.label === desiredWorm);
  if (!selectedWorm) {
    return <p>Invalid Worm</p>;
  }

  const getRandomWork = () => {
    const randomArtIndex = Math.floor(Math.random() * dataWorks.length);
    return dataWorks[randomArtIndex];
  };

  const randomWork = getRandomWork();

  return (
    <>
      <Link href={`/works/${randomWork.slug}`}>
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
