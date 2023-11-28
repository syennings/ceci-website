import useSWR from "swr";
import Link from "next/link";

export default function Works() {
  const { data, isLoading } = useSWR("/api/works");

  if (isLoading) {
    return <h1> is LOADING BITCH </h1>;
  }
  if (!data) {
    return;
  }
  console.log("dataaaaa", data);

  return (
    <>
      <ul>
        {data.map((work) => (
          <li key={work.id}>
            <Link href={`/${work.id}`}> {work.title} </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
