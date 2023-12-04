import WormPicture from "@/components/Worms";
import useSWR from "swr";
import styles from "./homepage.module.css";
import Link from "next/link";

export default function HomePage() {
  const { data, isLoading } = useSWR(`/api/worms/`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return <p>Data not found</p>;
  }

  const desiredWorm = "worm1";
  const selectedWorm = data.find((worm) => worm.label === desiredWorm);
  if (!selectedWorm) {
    return <p>Invalid Worm</p>;
  }

  return (
    <>
      <div className={styles.homePage}>
        <h2 className={styles.title}>
          Welcome to <Link href="/info">my</Link> website
        </h2>
        <div className={styles.contentWrapper}>
          <WormPicture selectedWorm={selectedWorm}> </WormPicture>
          <h3 className={styles.text}>
            Ana Breña Cecilia is a Mexican designer currently working with{" "}
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
      </div>
    </>
  );
}
