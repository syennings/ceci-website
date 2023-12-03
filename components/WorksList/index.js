import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import styles from "./worklist.module.css";

export default function WorkList() {
  const { data, isLoading } = useSWR("/api/works");

  if (isLoading) {
    return <h1> is LOADING BITCH </h1>;
  }
  if (!data) {
    return <p>Data not found</p>;
  }

  console.log("dataaaaa", data);

  return (
    <>
      <ul className={styles.workList}>
        {data.map((work) => {
          console.log("Image URL:", work.images && work.images[0]);

          return (
            <li key={work.slug} className={styles.workItem}>
              <Link href={`/works/${work.slug}`}>
                {work.title}
                {work.images && work.images.length > 0 && (
                  <div className={styles.preview}>
                    <Image
                      src={work.images[0]}
                      alt={`${work.title} Preview`}
                      width={100}
                      height={100}
                    />
                  </div>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
