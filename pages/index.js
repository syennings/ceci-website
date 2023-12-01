import WormPicture from "@/components/Worms";
import useSWR from "swr";

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
      <h2> Welcome To Cecilias website</h2>

      <WormPicture selectedWorm={selectedWorm} />
    </>
  );
}
