import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./workdetails.module.css";

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
      <div className={styles.container}>
        <div className={styles.overlayText}>
          <small>ID: {data._id}</small>
          <p>
            {data.title}.{data.publisher}.{data.editors}.{data.school}.
          </p>
        </div>

        <p> {getImageCounter()} </p>
        <div className={styles.imageContainer}>
          <Image
            src={currentImage}
            alt={data.title}
            width={400}
            height={200}
            onClick={handleClickNext}
          />
        </div>
        {/* <button onClick={handClickPrevious}>&lt; Previous</button> */}

        <Link href="/works">Back to all</Link>
      </div>
    </>
  );
}
