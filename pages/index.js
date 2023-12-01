import WormPicture from "@/components/Worms";

export default function HomePage() {
  return (
    <>
      <h2> Welcome To Cecilias website</h2>
      <WormPicture desiredWorm={"worm1"} />
      <WormPicture desiredWorm={"worm2"} />
    </>
  );
}
