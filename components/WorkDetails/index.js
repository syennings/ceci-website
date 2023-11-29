import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

export default function WorkDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useSWR(`/api/works/${id}`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return <p>Data not found</p>;
  }

  console.log("data for id", data);
  return (
    <>
      <small>ID: {id}</small>
      <h1>{data.title} </h1>
      <h1>{data.publisher} </h1>
      <Image
        src={data.image}
        alt={data.title}
        width={300}
        height={200}
        layout="responsive"
      />
      <Link href="/works">Back to all</Link>
    </>
  );
}
