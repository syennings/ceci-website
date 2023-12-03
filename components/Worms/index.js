import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import Draggable from "react-draggable";
import { useState } from "react";
import { useRouter } from "next/router";

export default function WormPicture({ selectedWorm }) {
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

  const getRandomWork = () => {
    const randomArtIndex = Math.floor(Math.random() * dataWorks.length);
    return dataWorks[randomArtIndex];
  };

  const randomWork = getRandomWork();

  return (
    <>
      <Draggable>
        <div style={{ cursor: "grab" }}>
          <Link href={`/works/${randomWork.slug}`}>
            <Image
              src={selectedWorm.url}
              alt={selectedWorm.label}
              width={150}
              height={80}
            />
          </Link>
        </div>
      </Draggable>
    </>
  );
}
