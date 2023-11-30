import useSWR from "swr";
import Link from "next/link";

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
      <ul>
        {data.map((work) => (
          <li key={work.slug}>
            <Link href={`/works/${work.slug}`}> {work.title} </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
