import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function WorkDetails() {
  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading } = useSWR(`/api/works/${slug}`);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  console.log("where is my data????", data);
  console.log("slug?????", slug);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return <p>Data not found</p>;
  }

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
      <small>ID: {data._id}</small>
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
