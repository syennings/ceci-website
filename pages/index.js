import useSWR from "swr";
import styles from "./homepage.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();
  // read search and type from query params set by the sidebar
  const { search = "", type = "all" } = router.query;

  const { data: workData, isLoading: worksAreLoading } = useSWR("/api/works");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (worksAreLoading) {
    return <h5>   ... some worms are loading now :) </h5>;
  }

  if (!workData) {
    return <p>Data not found</p>;
  }

  // build works-by-type map for type filtering
  const worksByType = workData.reduce((acc, work) => {
    work.type.forEach((t) => {
      if (!acc[t]) acc[t] = [];
      acc[t].push(work);
    });
    return acc;
  }, {});

  // filter by search query and type from sidebar
  const displayedWorks = workData
    .filter((work) => work.title.toLowerCase().includes(search.toLowerCase()))
    .filter((work) => type === "all" || worksByType[type]?.includes(work));

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.images}>
        {displayedWorks.map((work) => (
          <div key={work.id}>
            <Link href={`/works/${work.slug}`}>
              <Image
                style={{ objectFit: "contain" }}
                src={work.images[0]}
                alt={`Image of ${work.title}`}
                width={600}
                height={620}
              />
            </Link>
          </div>
        ))}
        {showBackToTop && (
          <button className={styles.backToTopButton} onClick={handleBackToTop}>
            Back to Top
          </button>
        )}
      </div>
    </div>
  );
}
