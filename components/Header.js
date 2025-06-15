import Link from "next/link";
export default function Header() {
  return (
    <header style={{ background: "#0000FF", color: "#fff", padding: "1rem 0" }}>
      <nav className="container mx-auto flex justify-between items-center px-6">
        <Link href="/" style={{ fontSize: "2rem", fontWeight: "bold", color: "#fff" }}>ValetXpress</Link>
        <ul className="flex gap-6 text-lg">
          <li><Link href="/" style={{ color: "#fff" }}>Start</Link></li>
          <li><Link href="/valet-parking" style={{ color: "#fff" }}>Valet Parking</Link></li>
          <li><Link href="/all-inclusive-parking" style={{ color: "#fff" }}>All-Inclusive Parking</Link></li>
          <li><Link href="/buchen" style={{ color: "#fff" }}>Buchen</Link></li>
          <li><Link href="/kontakt" style={{ color: "#fff" }}>Kontakt</Link></li>
        </ul>
      </nav>
    </header>
  );
}
