import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import Draggable from "react-draggable";
import { useState } from "react";

export default function WormPicture({ desiredWorm }) {
  const { data, isLoading } = useSWR(`/api/worms/`);
  const { data: dataWorks, isLoading: isLoadingWorks } = useSWR(`/api/works/`);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

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

  const handleDrag = (e, ui) => {
    if (!isDragging) {
      setIsDragging(true);
    }
    const { x, y } = position;
    setPosition({ x: x + ui.deltaX, y: y + ui.deltaY });
  };

  const handleClick = () => {
    if (isDragging) {
      setIsDragging(false);
    } else {
      const randomWork = getRandomWork();
      // Handle the click action, for example, redirect to the random work page
      window.location.href = `/works/${randomWork.slug}`;
    }
  };

  return (
    <>
      <Link href={`/works/${randomWork.slug}`}>
        <Draggable position={position} onDrag={handleDrag}>
          <div onClick={handleClick}>
            <Image
              src={selectedWorm.url}
              alt={selectedWorm.label}
              width={300}
              height={200}
            />
          </div>
        </Draggable>
      </Link>
    </>
  );
}
