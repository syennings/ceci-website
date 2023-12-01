import WormForm from "../WormForm";

export default function ContactPage() {
  async function addWorm(worm) {
    const response = await fetch("/api/places", {
      method: "POST",
      body: JSON.stringify(worm),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      await response.json();
      router.push("/");
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  return (
    <>
      <div className="contact-container">
        <h1>Contact Ana Breña Cecilia</h1>
        <p>
          Email: <a href="mailto:brena.ana@gmail.com">brena.ana@gmail.com</a>
        </p>
        <p>Phone: +49 177 4577 689</p>
        <WormForm onSubmit={addWorm} />
      </div>
    </>
  );
}
