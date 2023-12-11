import { useRouter } from "next/router";
import WormForm from "@/components/WormForm/index.js";
import WormPicture from "@/components/Worms";
import useSWR from "swr";
import styles from "./worms.module.css";
import useLocalStorageState from "use-local-storage-state";
import { useState, useEffect } from "react";
import ThemeSwitch from "@/components/ThemeSwitch";
import { useTheme } from "next-themes";

export default function CreateWorm() {
  const [wormData, setWormData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { data, isLoading, mutate } = useSWR(`/api/worms/`);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [favoriteStatus, setFavoriteStatus] = useLocalStorageState(
    "favoritesInfo",
    {
      defaultValue: [],
    }
  );

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 200); // Adjust the scroll threshold as needed
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return <p>Data not found</p>;
  }
  const date = data[0].updatedAt ?? "nothing found";
  console.log(
    "date---------------------------------------------------------------------------------------------------------------------",
    date
  );

  const renderTimestamp = (updatedAt) => {
    if (!updatedAt) {
      return "";
    }

    const dateObject = new Date(updatedAt);

    if (isNaN(dateObject.getTime())) {
      return "Invalid update timestamp";
    }

    const daysAgo = Math.floor(
      (Date.now() - dateObject.getTime()) / (1000 * 60 * 60 * 24)
    );
    return ` ${daysAgo}d`;
  };

  const handleFavoriteToggle = (wormId) => {
    setFavoriteStatus((prevStatus) => ({
      ...prevStatus,
      [wormId]: !prevStatus[wormId],
    }));
  };

  const hasFavorites = Object.values(favoriteStatus).some((status) => status);

  async function addWorm(worm) {
    const response = await fetch("/api/worms", {
      method: "POST",
      body: JSON.stringify(worm),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      await response.json();
      mutate();
      router.push("/worms");
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  async function handleDelete(id) {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this worm?"
    );
    if (!shouldDelete) {
      return;
    }

    const response = await fetch(`/api/worms/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.log("Error deleting worm. Status:", response.status);
      return;
    }

    console.log("Worm deleted successfully");

    mutate();
    router.push("/worms");
  }

  async function handleEdit(editedWorm) {
    const response = await fetch(`/api/worms/${editedWorm._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedWorm),
    });

    if (response.ok) {
      mutate();
      setIsEditMode(false); // Exit edit mode after successful edit
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  const handleEditClick = (worm) => {
    setIsEditMode(true);
    setWormData(worm);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setWormData([]);
  };

  const favoriteWorms = data.filter((worm) => favoriteStatus[worm._id]);
  const unlikedWorms = data.filter((worm) => !favoriteStatus[worm._id]);

  const wormCount = data ? data.length : 0;

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
    setIsEditMode(false); // Close edit mode when showing/hiding the form
    setWormData([]); // Clear wormData when showing/hiding the form
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className={styles.main}>
        <h1 className={styles.WormCrawl}> Wormhole©</h1>
        <i className={styles.caption}>
          You Got {wormCount} Worms Up Your Alley{" "}
        </i>
        <div className={styles.containerForm}>
          <button
            onClick={toggleFormVisibility}
            className={styles.toggleFormButton}
          >
            {isFormVisible ? "✖️" : "➕"}
          </button>
          {isFormVisible && <WormForm addWorm={addWorm} />}
        </div>
        <h3 className={styles.favorite}>
          {hasFavorites
            ? "Your Favorite Worms"
            : "Hmm, you haven't like any worms yet..."}
        </h3>
        <ul className={styles.imageGrid}>
          {favoriteWorms.map((worm) => (
            <li key={worm._id} className={styles.wormCard}>
              <WormPicture selectedWorm={worm} />
              <button
                onClick={() => handleDelete(worm._id)}
                className={styles.deleteButton}
              >
                <span role="img" aria-label="A cross indicating deletion">
                  ❌
                </span>
              </button>
              <button
                onClick={() => handleFavoriteToggle(worm._id)}
                className={styles.likeButton}
              >
                {favoriteStatus[worm._id] ? "❤️" : "🤍"}
              </button>
              <p className={styles.timestamp}>
                {renderTimestamp(worm.updatedAt)}
              </p>
            </li>
          ))}
        </ul>

        {unlikedWorms.length > 0 && (
          <>
            <h3 className={styles.favorite}>Your Unliked Worms</h3>
            <ul className={styles.imageGrid}>
              {unlikedWorms.map((worm) => (
                <li key={worm._id} className={styles.wormCard}>
                  <WormPicture selectedWorm={worm} />
                  <button
                    onClick={() => handleDelete(worm._id)}
                    className={styles.deleteButton}
                  >
                    <span role="img" aria-label="A cross indicating deletion">
                      ❌
                    </span>
                  </button>

                  <button
                    className={styles.editButton}
                    onClick={() => {
                      if (isEditMode && worm._id === wormData._id) {
                        handleCancelEdit(); // Call handleCancelEdit if clicking the edit button again
                      } else {
                        handleEditClick(worm);
                      }
                    }}
                  >
                    {isEditMode && worm._id === wormData._id ? "🚫" : "✏️"}
                  </button>
                  <button
                    onClick={() => handleFavoriteToggle(worm._id)}
                    className={styles.likeButton}
                  >
                    {favoriteStatus[worm._id] ? "❤️" : "🤍"}
                  </button>
                  <p className={styles.timestamp}>
                    {renderTimestamp(worm.updatedAt)}
                  </p>
                </li>
              ))}
              {isEditMode && (
                <WormForm
                  wormData={wormData}
                  handleEdit={handleEdit}
                  isEditMode
                />
              )}
            </ul>
          </>
        )}

        <ThemeSwitch />

        {showBackToTop && (
          <button className={styles.backToTopButton} onClick={handleBackToTop}>
            Back to Top
          </button>
        )}
      </div>
    </>
  );
}
