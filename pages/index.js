import WormPicture from "@/components/Worms";
import useSWR from "swr";
import styles from "./homepage.module.css";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const { data, isLoading } = useSWR(`/api/worms/`);
  const { data: workData, isLoading: worksAreLoading } = useSWR("/api/works");

  if (isLoading || worksAreLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data || !workData) {
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
        <div className={styles.contentWrapper}>
          <WormPicture selectedWorm={selectedWorm}> </WormPicture>
          <h3 className={styles.text}>
            <Link href="/info">Ana Breña Cecilia</Link> is a Mexican designer
            currently working with{" "}
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
      <div className={styles.images}>
        {workData.map((work) => (
          <div key={work.id}>
            <Link href={`/works/${work.slug}`}>
              <Image
                src={work.images[0]}
                alt={`Image of ${work.title}`}
                width={300}
                height={320}
                layout="responsive"
                objectFit="contain"
              />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
