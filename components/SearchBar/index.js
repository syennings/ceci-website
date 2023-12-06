import { useState } from "react";
import styles from "./search.module.css";

export default function SearchBar({ onSearch, uniqueTypes }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  const handleTypeChange = (type) => {
    setSelectedType(type);
    onSearch(searchQuery, type);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    onSearch(query, selectedType); // Include the selected type if needed
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
