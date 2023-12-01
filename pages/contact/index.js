import Link from "next/link.js";
import { useRouter } from "next/router";
import WormForm from "@/components/WormForm/index.js";
import WormPicture from "@/components/Worms";
import useSWR from "swr";

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
      <WormForm onSubmit={addPlace} />
      <ul>
        {data.map((worm) => (
          <li key={worm._id}>
            <WormPicture selectedWorm={worm} />
          </li>
        ))}
      </ul>
    </>
  );
}
