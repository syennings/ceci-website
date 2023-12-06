import Link from "next/link.js";
import { useRouter } from "next/router";
import WormForm from "@/components/WormForm/index.js";
import WormPicture from "@/components/Worms";
import useSWR from "swr";
import ContactPage from "@/components/ContactPage";
import styles from "./contact.module.css";
import useLocalStorageState from "use-local-storage-state";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function CreateWorm() {
  const [wormData, setWormData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  const { data, isLoading, mutate } = useSWR(`/api/worms/`);
  const { data: session } = useSession();
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

  const favoriteWorms = data.filter((worm) => favoriteStatus[worm._id]);
  const unlikedWorms = data.filter((worm) => !favoriteStatus[worm._id]);

  const wormCount = data ? data.length : 0;

  return (
    <>
      <p>Worm Count: {wormCount}</p>

      <div className={styles.containerContact}>
        <ContactPage />
        <Link href="./impressum" target="_blank">
          Impressum | Datenschutz{" "}
        </Link>
      </div>
      <h3>
        {hasFavorites
          ? "Your Favorite Worms"
          : "Hmm, you haven't like any worms yet..."}
      </h3>
      <ul className={styles.imageGrid}>
        {favoriteWorms.map((worm) => (
          <li key={worm._id}>
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
      <div className={styles.containerForm}>
        {session ? <WormForm addWorm={addWorm} /> : null}
      </div>

      {unlikedWorms.length > 0 && (
        <>
          <h3>Your Unliked Worms</h3>
          <ul className={styles.imageGrid}>
            {unlikedWorms.map((worm) => (
              <li key={worm._id}>
                <WormPicture selectedWorm={worm} />
                <button
                  onClick={() => handleDelete(worm._id)}
                  className={styles.deleteButton}
                >
                  <span role="img" aria-label="A cross indicating deletion">
                    ❌
                  </span>
                </button>

                {session ? (
                  <button
                    className={styles.editButton}
                    onClick={() => {
                      setIsEditMode(true);
                      setWormData(worm);
                    }}
                  >
                    ✏️
                  </button>
                ) : null}

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
    </>
  );
}
