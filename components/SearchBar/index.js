import { useState } from "react";
import styles from "./search.module.css";

export default function SearchBar({ onSearch, uniqueTypes, workData }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const handleTypeChange = (type) => {
    setSelectedType(type);
    onSearch(searchQuery, type);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const lowercaseQuery = query.toLowerCase();

    // Filter works based on a case-insensitive partial match
    const filteredWorks = workData.filter((work) =>
      work.title.toLowerCase().includes(lowercaseQuery)
    );

    // Include the selected type if needed
    onSearch(lowercaseQuery, selectedType, filteredWorks);
  };

  return (
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
          className={`${styles.typeOption} ${
            selectedType === "all" ? styles.selected : ""
          }`}
          onClick={() => handleTypeChange("all")}
        >
          All
        </div>

        {uniqueTypes.map((type) => (
          <div
            key={type}
            className={`${styles.typeOption} ${
              selectedType === type ? styles.selected : ""
            }`}
            onClick={() => handleTypeChange(type)}
          >
            {type}
          </div>
        ))}
      </div>
    </div>
  );
}
