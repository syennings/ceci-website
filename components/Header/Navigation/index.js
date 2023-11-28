import Link from "next/link";

export function Navigation() {
  return (
    <nav className="navbar">
      <Link href="/works" passHref>
        <div className="works">Link To All Works</div>
      </Link>
      <Link href="/contact" passHref>
        <div className="contact">Contact Page</div>
      </Link>
      <Link href="/info" passHref>
        <div className="info">About me</div>
      </Link>
    </nav>
  );
}
