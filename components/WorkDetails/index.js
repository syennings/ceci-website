import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function WorkDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useSWR(`/api/works/${id}`);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  console.log("photodataaaa???", data);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return <p>Data not found</p>;
  }

  console.log("data for id", data);

  function handleClickNext() {
    if (data) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.images.length);
    }
  }

  function handClickPrevious() {
    if (data) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? data.images.length - 1 : prevIndex - 1
      );
    }
  }
  const currentImage = data.images[currentImageIndex];
  console.log("images?!?!?!?!", data.images);
  console.log("currentImage", currentImage);

  function getImageCounter() {
    return `${currentImageIndex + 1}/${data.images.length}`;
  }

  return (
    <>
      <small>ID: {id}</small>
      <p>{data.title} </p>
      <p>{data.publisher} </p>
      <p>{data.editors} </p>
      <p>{data.school}</p>

      <p> {getImageCounter()} </p>
      <Image
        src={currentImage}
        alt={data.title}
        width={300}
        height={200}
        onClick={handleClickNext}
      />
      <button onClick={handClickPrevious}>&lt; Previous</button>

      <Link href="/works">Back to all</Link>
    </>
  );
}
