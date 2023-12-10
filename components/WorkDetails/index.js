import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./workdetails.module.css";
import { useEffect } from "react";

export default function WorkDetails() {
  const router = useRouter();
  const { slug } = router.query;

  const { data, isLoading } = useSWR(`/api/works/${slug}`);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  console.log("where is my data????", data);
  console.log("slug?????", slug);

  // useEffect(() => {
  //   const setBackgroundColor = data?.color || "#FFFFFF";
  //   document.querySelector("body").style.backgroundColor = setBackgroundColor;
  // }, [data]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return <p>Data not found</p>;
  }

  const backgroundColor = data.color || "#FFFFFF";

  function handleClickNext() {
    if (data) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.images.length);
    }
  }

  function handleClickPrevious() {
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

  const handleImageClick = (event) => {
    const { clientX, target } = event;
    const { left, width } = target.getBoundingClientRect();
    const offsetX = clientX - left;
    const halfWidth = width / 2;

    // Check if the click is on the right side (more than half of the width)
    if (offsetX > halfWidth) {
      handleClickNext();
    } else {
      handleClickPrevious();
    }
  };

  return (
    <>
      <div className={styles.outerContainer} style={{ backgroundColor }}></div>
      <div className={styles.container}>
        <div className={styles.overlayText}>
          <u className={styles.title}>{data.title}</u>
          <p>
            {data.editors} {data.year}. {data.dimensions}. {data.pages} pp.{" "}
            {data.publisher}. {data.projectType}. {data.school}
          </p>
        </div>
        <p className={styles.counter}> {getImageCounter()} </p>

        <div className={styles.imageContainer}>
          <button className={styles.arrowButton} onClick={handleClickPrevious}>
            &lt; {/* Left arrow character */}
          </button>
          <Image
            style={{ objectFit: "contain" }}
            src={currentImage}
            alt={data.title}
            width={600}
            height={620}
            onClick={handleClickNext}
            layout="responsive"
          />

          <button className={styles.arrowButton} onClick={handleClickNext}>
            &gt; {/* Right arrow character */}
          </button>
        </div>
        <Link className={styles.back} href="/works">
          Back to All
        </Link>
      </div>
    </>
  );
}
