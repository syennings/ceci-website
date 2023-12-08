import WormPicture from "@/components/Worms";
import useSWR from "swr";
import styles from "./homepage.module.css";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import { useState, useEffect } from "react";

export default function HomePage() {
  const { data: wormData, isLoading: wormsAreLoading } = useSWR(`/api/worms/`);
  const { data: workData, isLoading: worksAreLoading } = useSWR("/api/works");
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200); // Adjust the scroll threshold as needed
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (wormsAreLoading || worksAreLoading) {
    return <h1>Loading...</h1>;
  }

  if (!wormData || !workData) {
    return <p>Data not found</p>;
  }

  //find specific worm//
  const desiredWormId = "6568862e2ff078c1d2b0adf1";
  const selectedWorm = wormData.find((worm) => worm._id === desiredWormId);
  if (!selectedWorm) {
    return <p>Invalid Worm</p>;
  }
  //find works by type//
  const worksByType = workData.reduce((acc, work) => {
    work.type.forEach((type) => {
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(work);
    });
    return acc;
  }, {});

  const uniqueTypes = Object.keys(worksByType);

  const displayedWorks = workData
    .filter((work) =>
      work.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (work) =>
        selectedType === "all" || worksByType[selectedType]?.includes(work)
    );

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className={styles.homePage}>
        <div className={styles.contentWrapper}>
          <WormPicture className={styles.worm} selectedWorm={selectedWorm} />

          <h3 className={styles.text}>
            <Link href="/info">Ana Breña Cecilia</Link> is a Mexican designer
            currently working with{" "}
            <a href="https://www.santiagodasilva.com/" target="_blank">
              Studio Santiago de Silva
            </a>{" "}
            in{" "}
            <a href="https://maps.app.goo.gl/xLqE6SFSnQnYHpVr8" target="_blank">
              Berlin.
            </a>
            <p>Ceci is basically, Berlins biggest underground designer.</p>
          </h3>
        </div>
        <SearchBar
          uniqueTypes={uniqueTypes}
          workData={workData}
          onSearch={(query, type) => {
            setSearchQuery(query);
            setSelectedType(type);
          }}
        />
      </div>
      <div className={styles.images}>
        {displayedWorks.map((work) => (
          <div key={work.id}>
            <Link href={`/works/${work.slug}`}>
              <Image
                src={work.images[0]}
                alt={`Image of ${work.title}`}
                width={300}
                height={320}
                layout="responsive"
                objectFit="contain"
              />
            </Link>
          </div>
        ))}

        {showBackToTop && (
          <button className={styles.backToTopButton} onClick={handleBackToTop}>
            Back to Top 🪱
          </button>
        )}
      </div>
    </>
  );
}
