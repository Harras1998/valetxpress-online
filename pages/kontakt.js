import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Kontakt() {
  return (
    <>
      <Header />
      <main style={{maxWidth: 600, margin: "0 auto", padding: "2rem 1rem"}}>
        <h1 style={{fontSize: "2rem", fontWeight: "bold", marginBottom: 16}}>Kontakt</h1>
        <p>Sie haben Fragen? Schreiben Sie uns oder rufen Sie an:</p>
        <ul style={{margin: "18px 0"}}>
          <li>Telefon: <a href="tel:+498912345678" style={{color: "#1e3a8a", textDecoration: "underline"}}>+49 89 12345678</a></li>
          <li>E-Mail: <a href="mailto:info@valetxpress.de" style={{color: "#1e3a8a", textDecoration: "underline"}}>info@valetxpress.de</a></li>
        </ul>
        <form style={{marginTop: 20}}>
          <input placeholder="Ihr Name" style={{width: "100%", marginBottom: 8}} />
          <input placeholder="Ihre E-Mail" type="email" style={{width: "100%", marginBottom: 8}} />
          <textarea placeholder="Ihre Nachricht" style={{width: "100%", marginBottom: 8}} />
          <button style={{background: "#1e3a8a", color: "#fff", padding: "0.6rem 2rem", borderRadius: "1rem"}}>Absenden</button>
        </form>
      </main>
      <Footer />
    </>
  );
}
