import { Navigation } from "../Header/Navigation";
import HomeButton from "../Header/HomeButton.js";

export default function ContactPage() {
  return (
    <>
      <div className="contact-container">
        <h1>Contact Ana Breña Cecilia</h1>
        <p>
          Email: <a href="mailto:brena.ana@gmail.com">brena.ana@gmail.com</a>
        </p>
        <p>Phone: +49 177 4577 689</p>
        {/* Add additional contact information or form as needed */}
      </div>
    </>
  );
}
