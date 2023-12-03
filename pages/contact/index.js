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

  async function addPlace(place) {
    const response = await fetch("/api/worms", {
      method: "POST",
      body: JSON.stringify(place),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      await response.json();
      router.push("/contact");
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <ContactPage /> <WormForm onSubmit={addPlace} />
      </div>

      <ul className={styles.imageGrid}>
        {data.map((worm) => (
          <li key={worm._id}>
            <WormPicture selectedWorm={worm} />
          </li>
        ))}
      </ul>
    </>
  );
}
