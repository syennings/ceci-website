import { useRouter } from "next/router";
import WormForm from "@/components/WormForm/index.js";
import WormPicture from "@/components/Worms";
import useSWR from "swr";
import styles from "./worms.module.css";
import useLocalStorageState from "use-local-storage-state";
import { useState } from "react";

export default function CreateWorm() {
  const [wormData, setWormData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  const { data, isLoading, mutate } = useSWR(`/api/worms/`);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const [favoriteStatus, setFavoriteStatus] = useLocalStorageState(
    "favoritesInfo",
    {
      defaultValue: [],
    }
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return <p>Data not found</p>;
  }

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
      router.push("/contact");
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

    router.push("/contact");
    window.location.reload();
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

  return (
    <>
      <div className={styles.main}>
        <h1 className={styles.WormCrawl}> WormCrawl©</h1>
        <p> You Have </p>
        <p className={styles.wormCount}>{wormCount} </p>
        <p> Worms</p>

        <h3>
          {hasFavorites
            ? "Your Favorite Worms"
            : "Hmm, you haven't like any worms yet..."}
        </h3>

        <div className={styles.containerForm}>
          <button
            onClick={toggleFormVisibility}
            className={styles.toggleFormButton}
          >
            ➕
          </button>
          {isFormVisible && <WormForm addWorm={addWorm} />}
        </div>

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
            </li>
          ))}
        </ul>

        {unlikedWorms.length > 0 && (
          <>
            <h3>Your Unliked Worms</h3>
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
      </div>
    </>
  );
}
