import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function AllInclusive() {
  return (
    <>
      <Header />
      <main style={{maxWidth: 900, margin: "0 auto", padding: "2.5rem 1rem"}}>
        <div style={{display: "flex", gap: 32, flexWrap: "wrap"}}>
          <div style={{flex: "1 1 340px", minWidth: 280}}>
            <img src="/images/Auto.png" alt="All-Inclusive Service" style={{borderRadius: "1rem", width: "100%", maxHeight: 200, objectFit: "cover"}} />
          </div>
          <div style={{flex: "2 1 350px", minWidth: 280}}>
            <h1 style={{fontSize: "2rem", fontWeight: "bold", marginBottom: 16}}>All-Inclusive Parking</h1>
            <p>
              Parken mit allem Komfort: Fahrzeugpflege, Ladestationen und mehr. Ideal für Langzeitparker oder maximale Flexibilität.
            </p>
            <ul style={{margin: "16px 0 16px 24px", listStyle: "disc"}}>
              <li>Valet-Service inklusive</li>
              <li>Reinigungsservice optional</li>
              <li>E-Ladestation nach Wunsch</li>
              <li>Bestpreis-Garantie</li>
            </ul>
            <Link href="/buchen" style={{
              background: "#1e3a8a", color: "#fff", padding: "0.8rem 2rem",
              borderRadius: "1rem", fontWeight: "bold", fontSize: "1.1rem"
            }}>Jetzt All-Inclusive buchen</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
