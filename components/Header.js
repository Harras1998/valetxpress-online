import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const isAllIn = router.pathname.includes("all-inclusive");
  const isValet = router.pathname.includes("valet");
  let buchenUrl = "/buchen";
  if (isAllIn) buchenUrl = "/buchen?type=allinclusive";
  else if (isValet) buchenUrl = "/buchen?type=valet";

  return (
    <header style={{
      background: "#1db954",
      color: "#fff",
      boxShadow: "0 2px 8px #0002",
      width: "100vw",
      minWidth: "100%",
      zIndex: 999
    }}>
      <nav style={{
        maxWidth: "1300px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 2vw",
        height: "75px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div className="header-logo-wrapper">
            <Link href="/"
              style={{ display: "flex", alignItems: "center" }}>
              <Image
                src="/images/Logo.png"
                alt="ValetXpress Logo"
                width={315}
                height={215}
                style={{ width: "100%", height: "auto" }}
                priority
              />
            </Link>
          </div>
        </div>
        <div className="desktop-menu" style={{
          display: "flex", gap: 26, alignItems: "center"
        }}>
          <Link href="/" style={navStyle(router.pathname === "/")}>Start</Link>
          <Link href="/valet-parking" style={navStyle(isValet)}>Valet Parking</Link>
          <Link href="/all-inclusive-parking" style={navStyle(isAllIn)}>All-Inclusive Parking</Link>
          <Link href={buchenUrl} style={{
            ...navStyle(router.pathname === "/buchen"),
            background: "#fff",
            color: "#1db954",
            borderRadius: 7,
            fontWeight: "bold",
            padding: "9px 22px",
            fontSize: "1.07rem",
            marginLeft: 6,
            boxShadow: "0 2px 8px #088c1a15"
          }}>Buchen</Link>
          <Link href="/kontakt" style={navStyle(router.pathname === "/kontakt")}>Kontakt</Link>
        </div>
        <button
          className="mobile-menu-btn"
          aria-label="Menü öffnen"
          onClick={() => setOpen(o => !o)}
          style={{
            display: "none",
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "2rem",
            cursor: "pointer"
          }}>
          ☰
        </button>
      </nav>
      {/* Mobile Menu */}
      <div className="mobile-menu" style={{
        display: open ? "block" : "none",
        background: "#1db954",
        padding: "1rem 6vw",
        fontSize: "1.13rem"
      }}>
        <Link href="/" style={{...mobileNavStyle(router.pathname === "/"), display: "block", margin: "18px 0"}}>Start</Link><br />
        <Link href="/valet-parking" style={{...mobileNavStyle(isValet), display: "block", margin: "18px 0"}}>Valet Parking</Link><br />
        <Link href="/all-inclusive-parking" style={{...mobileNavStyle(isAllIn), display: "block", margin: "18px 0"}}>All-Inclusive Parking</Link><br />
        <Link href={buchenUrl} style={{
          ...mobileNavStyle(router.pathname === "/buchen"),
          background: "#fff",
          color: "#1db954",
          borderRadius: 7,
          fontWeight: "bold",
          padding: "9px 22px",
          display: "block",
          fontSize: "1.1rem",
          margin: "18px 0"
        }}>Buchen</Link><br />
        <Link href="/kontakt" style={{...mobileNavStyle(router.pathname === "/kontakt"), display: "block", margin: "18px 0"}}>Kontakt</Link>
      </div>
      {/* Responsive CSS */}
      <style jsx>{`
        .header-logo-wrapper {
          width: 210px;
          max-height: 52px;
          display: flex;
          align-items: center;
        }
        @media (max-width: 900px) {
          .desktop-menu { display: none !important; }
          .mobile-menu-btn { display: block !important; }
          nav { height: 60px !important; }
          .header-logo-wrapper {
            width: 150px;
            max-height: 40px;
          }
        }
        @media (min-width: 901px) {
          .mobile-menu { display: none !important; }
        }
      `}</style>
    </header>
  );
}

function navStyle(active) {
  return {
    color: active ? "#fff" : "#e9ffe9",
    textDecoration: "none",
    fontWeight: active ? "bold" : "normal",
    fontSize: "1.12rem",
    padding: "8px 10px",
    borderBottom: active ? "2px solid #fff" : "none",
    transition: "color 0.15s",
    letterSpacing: ".5px"
  };
}

function mobileNavStyle(active) {
  return {
    color: active ? "#fff" : "#e9ffe9",
    textDecoration: "none",
    fontWeight: active ? "bold" : "normal",
    fontSize: "1.12rem",
    padding: "8px 10px",
    transition: "color 0.15s",
    letterSpacing: ".5px"
  };
}
