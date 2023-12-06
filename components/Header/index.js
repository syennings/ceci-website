import HomeButton from "./HomeButton.js";
import LoginBadge from "./LoginBaddge.js/index.js";
import { Navigation } from "./Navigation";
export default function Header() {
  return (
    <>
      <HomeButton />
      <LoginBadge />
      <Navigation />
    </>
  );
}
