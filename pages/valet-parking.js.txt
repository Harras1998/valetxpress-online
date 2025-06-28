import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function ValetParking() {
  return (
    <>
      <Header />
      <main style={{maxWidth: 900, margin: "0 auto", padding: "2.5rem 1rem"}}>
        <div style={{display: "flex", gap: 32, flexWrap: "wrap"}}>
          <div style={{flex: "1 1 340px", minWidth: 280}}>
            <img src="images/Schlüssel.png" alt="Valet Service" style={{borderRadius: "1rem", width: "100%", maxHeight: 200, objectFit: "cover"}} />
          </div>
          <div style={{flex: "2 1 350px", minWidth: 280}}>
            <h1 style={{fontSize: "2rem", fontWeight: "bold", marginBottom: 16}}>Valet Parking</h1>
            <p className="mb-4">
              Sie fahren direkt zum Abflugterminal, wir erwarten Sie und übernehmen Ihr Auto persönlich. Ihr Fahrzeug wird sicher und bewacht geparkt. Bei Rückkehr bringen wir es Ihnen wieder direkt ans Terminal.
            </p>
            <ul style={{margin: "16px 0 16px 24px", listStyle: "disc"}}>
              <li>Direktannahme am Terminal</li>
              <li>Sicheres Parken auf überwachten Flächen</li>
              <li>Kein Shuttle, keine langen Wege</li>
              <li>24/7-Service</li>
              <li>Individuelle Zusatzleistungen buchbar</li>
            </ul>
            <Link href="/buchen" style={{
              background: "#1e3a8a", color: "#fff", padding: "0.8rem 2rem",
              borderRadius: "1rem", fontWeight: "bold", fontSize: "1.1rem"
            }}>Jetzt Valet Parking buchen</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
