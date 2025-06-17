import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header style={{
      background: "#1db954",
      color: "#fff",
      boxShadow: "0 2px 8px #0002"
    }}>
      <nav className="container" style={{
        maxWidth: 1100,
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem"
      }}>
        <Link href="/" style={{
          fontWeight: "bold",
          fontSize: "2rem",
          color: "#fff",
          textDecoration: "none",
        }}>
          ValetXpress
        </Link>

        {/* Burger-Icon für mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none",
            border: "none",
            display: "none",
            flexDirection: "column",
            cursor: "pointer"
          }}
          className="burger"
        >
          <span style={{
            display: "block", width: 28, height: 3, background: "#fff", margin: "5px 0"
          }} />
          <span style={{
            display: "block", width: 28, height: 3, background: "#fff", margin: "5px 0"
          }} />
          <span style={{
            display: "block", width: 28, height: 3, background: "#fff", margin: "5px 0"
          }} />
        </button>

        <ul
          className={menuOpen ? "nav-open" : ""}
          style={{
            display: "flex",
            gap: "2rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
            alignItems: "center"
          }}
        >
          <li><Link href="/" style={{ color: "#fff", textDecoration: "none", fontSize: "1.1rem" }}>Start</Link></li>
          <li><Link href="/valet-parking" style={{ color: "#fff", textDecoration: "none", fontSize: "1.1rem" }}>Valet Parking</Link></li>
          <li><Link href="/all-inclusive-parking" style={{ color: "#fff", textDecoration: "none", fontSize: "1.1rem" }}>All-Inclusive Parking</Link></li>
          <li><Link href="/buchen" style={{ color: "#fff", textDecoration: "none", fontSize: "1.1rem" }}>Buchen</Link></li>
          <li><Link href="/kontakt" style={{ color: "#fff", textDecoration: "none", fontSize: "1.1rem" }}>Kontakt</Link></li>
        </ul>
      </nav>

      {/* Simple CSS für Responsivität */}
      <style jsx>{`
        @media (max-width: 800px) {
          nav.container {
            flex-direction: column;
            align-items: flex-start;
          }
          .burger {
            display: flex !important;
            margin-left: auto;
          }
          ul {
            display: ${menuOpen ? "flex" : "none"};
            flex-direction: column;
            gap: 1rem;
            width: 100%;
            background: #1db954;
            padding: 1rem 0;
            margin-top: 1rem;
            border-radius: 0 0 1rem 1rem;
          }
        }
      `}</style>
    </header>
  );
}
