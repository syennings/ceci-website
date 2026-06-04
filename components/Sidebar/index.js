import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import WormPicture from "@/components/Worms";
import styles from "./sidebar.module.css";

export default function Sidebar({ isOpen }) {
  const router = useRouter();
  const { data: wormData } = useSWR("/api/worms/");
  const { data: workData } = useSWR("/api/works");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  if (!wormData || !workData) return null;

  // same worm as homepage
  const desiredWormId = "6568862e2ff078c1d2b0adf1";
  const selectedWorm = wormData.find((worm) => worm._id === desiredWormId);

  const uniqueTypes = [...new Set(workData.flatMap((work) => work.type))];

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    // navigate to homepage with search query param
    router.push({ pathname: "/", query: { search: query, type: selectedType } });
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    // navigate to homepage with type query param
    router.push({ pathname: "/", query: { search: searchQuery, type } });
  };

  return (
    <aside className={`${styles.sidebar} ${!isOpen ? styles.sidebarClosed : ""}`}>
      {selectedWorm && <WormPicture selectedWorm={selectedWorm} />}

      <h3 className={styles.bio}>
        <Link href="/contact">Ana Cecilia Breña</Link> is a Mexican designer
        currently working with{" "}
        <a href="https://www.santiagodasilva.com/" target="_blank">
          Studio Santiago da Silva
        </a>{" "}
        in{" "}
        <a href="https://maps.app.goo.gl/xLqE6SFSnQnYHpVr8" target="_blank">
          Berlin.
        </a>
      </h3>

      <div className={styles.searchBar}>
        <h3>Search for a work</h3>
        <input
          type="text"
          placeholder="Search By Title..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.typeOptions}>
          <div
            className={`${styles.typeOption} ${selectedType === "all" ? styles.selected : ""}`}
            onClick={() => handleTypeChange("all")}
          >
            All
          </div>
          {uniqueTypes.map((type) => (
            <div
              key={type}
              className={`${styles.typeOption} ${selectedType === type ? styles.selected : ""}`}
              onClick={() => handleTypeChange(type)}
            >
              {type}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
