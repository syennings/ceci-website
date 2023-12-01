import Link from "next/link.js";
import { useRouter } from "next/router";
import WormForm from "@/components/WormForm/index.js";
import WormPicture from "@/components/Worms";

export default function CreateWorm() {
  const router = useRouter();

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
    </>
  );
}
