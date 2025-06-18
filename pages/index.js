import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main style={{maxWidth: 900, margin: "0 auto", padding: "3rem 1rem"}}>
        <div style={{textAlign: "center", marginBottom: 40}}>
          <h1 style={{fontSize: "2.5rem", fontWeight: "bold", marginBottom: 20}}>ValetXpress – Parken am Flughafen München</h1>
          <p style={{fontSize: "1.2rem", marginBottom: 24}}>
            Ihr stressfreier Parkservice am Münchner Flughafen.<br/>
            Einfach buchen, direkt am Terminal abgeben, entspannt zurückkehren.
          </p>
          <Link href="/buchen" style={{
            background: "#1e3a8a", color: "#fff", padding: "1rem 2.5rem", borderRadius: "1rem",
            fontWeight: "bold", fontSize: "1.2rem"
          }}>Parkplatz buchen</Link>
        </div>
        <div style={{display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center"}}>
          <div style={{flex: "1 1 320px", minWidth: 280, background: "#f4f6fa", borderRadius: "1.5rem", boxShadow: "0 1px 8px #0001", padding: 24}}>
            <img src="/images/Schlüssel.png" alt="Valet Parking" style={{borderRadius: "1rem", width: "100%", maxHeight: 160, objectFit: "cover"}} />
            <h2 style={{marginTop: 18, fontSize: "1.3rem", fontWeight: "bold"}}>Valet Parking</h2>
            <p>Wir holen Ihr Fahrzeug direkt am Terminal ab und parken es sicher für Sie.</p>
          </div>
          <div style={{flex: "1 1 320px", minWidth: 280, background: "#f4f6fa", borderRadius: "1.5rem", boxShadow: "0 1px 8px #0001", padding: 24}}>
            <img src="/images/Flugzeug.jpg" alt="All-Inclusive Parking" style={{borderRadius: "1rem", width: "100%", maxHeight: 160, objectFit: "cover"}} />
            <h2 style={{marginTop: 18, fontSize: "1.3rem", fontWeight: "bold"}}>All-Inclusive Parking</h2>
            <p>Mit Rundum-Service und Top-Sicherheitsstandards – All-Inclusive für Ihre Reise.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
