import Link from "next/link.js";
import { useRouter } from "next/router";
import WormForm from "@/components/WormForm/index.js";
import WormPicture from "@/components/Worms";
import useSWR from "swr";
import ContactPage from "@/components/ContactPage";
import styles from "./contact.module.css";

export default function CreateWorm() {
  const router = useRouter();
  const { data, isLoading } = useSWR(`/api/worms/`);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return <p>Data not found</p>;
  }

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

  return (
    <>
      <div className={styles.container}>
        <ContactPage />
        <Link href="./impressum" target="_blank">
          Impressum | Datenschutz{" "}
        </Link>

        <WormForm onSubmit={addWorm} />
      </div>

      <ul className={styles.imageGrid}>
        {data.map((worm) => (
          <li key={worm._id}>
            <WormPicture selectedWorm={worm} />
            <button onClick={() => handleDelete(worm._id)}>
              <span role="img" aria-label="A cross indicating deletion">
                ❌
              </span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
