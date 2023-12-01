import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import Draggable from "react-draggable";
import { useState } from "react";
import { useRouter } from "next/router";

export default function WormPicture({ desiredWorm }) {
  const { data, isLoading } = useSWR(`/api/worms/`);
  const { data: dataWorks, isLoading: isLoadingWorks } = useSWR(`/api/works/`);

  const router = useRouter();

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

  const handleImageClick = () => {
    router.push(`/works/${randomWork.slug}`);
  };

  return (
    <>
      {/* <Link href={`/works/${randomWork.slug}`}> */}
      <Draggable>
        <Image
          src={selectedWorm.url}
          alt={selectedWorm.label}
          width={300}
          height={200}
          onClick={handleImageClick}
        />
      </Draggable>
      {/* </Link> */}
    </>
  );
}
