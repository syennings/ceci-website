import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import styles from "./worklist.module.css";
import WormPicture from "../Worms";
import { useState } from "react";

export default function WorkList() {
  const { data, isLoading } = useSWR("/api/works");
  const { data: wormData, isLoading: wormIsLoading } = useSWR(`/api/worms/`);

  const [selectedType, setSelectedType] = useState("all");

  if (isLoading || wormIsLoading) {
    return <h1> is LOADING BITCH </h1>;
  }
  if (!data || !wormData) {
    return <p>Data not found</p>;
  }

  console.log("wormData", wormData);

  //find specific worm//
  const desiredWormId = "6568862e2ff078c1d2b0adf3";
  const selectedWorm = wormData.find((worm) => worm._id === desiredWormId);
  if (!selectedWorm) {
    return <p>Invalid Worm</p>;
  }

  console.log("dataaaaa", data);

  const worksByType = data.reduce((acc, work) => {
    work.type.forEach((type) => {
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(work);
    });
    return acc;
  }, {});

  // Get unique types
  const uniqueTypes = Object.keys(worksByType);

  // Filter works based on the selected type
  const filteredWorks =
    selectedType === "all" ? data : worksByType[selectedType] || [];

  const handleSearch = (searchQuery, type) => {
    // Perform additional filtering or state updates if needed
    console.log("Search query:", searchQuery);
    console.log("Selected type:", type);
  };

  const hoverColor = data.color;

  return (
    <>
      <div className={styles.tags}>
        <span
          className={selectedType === "all" ? styles.selected : ""}
          onClick={() => setSelectedType("all")}
        >
          All
        </span>

        {uniqueTypes.map((type) => (
          <span
            key={type}
            className={selectedType === type ? styles.selected : ""}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </span>
        ))}
      </div>

      <ul className={styles.workList}>
        {filteredWorks.map((work) => {
          console.log("Image URL:", work.images && work.images[0]);

          return (
            <li
              key={work.slug}
              className={styles.workItem}
              style={{ "--hover-color": hoverColor }}
            >
              <Link href={`/works/${work.slug}`}>
                {work.title}
                {work.images && work.images.length > 0 && (
                  <div className={styles.preview}>
                    <Image
                      src={work.images[0]}
                      alt={`${work.title} Preview`}
                      width={180}
                      height={200}
                      layout="responsive"
                      objectFit="contain"
                    />
                  </div>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
      <WormPicture selectedWorm={selectedWorm}></WormPicture>

      {/* Tags section to display clickable tags for unique types */}
    </>
  );
}
