import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Datenschutz() {
  return (
    <>
      <Header />
      <main style={{maxWidth: 600, margin: "0 auto", padding: "2rem 1rem"}}>
        <h1 style={{fontSize: "2rem", fontWeight: "bold", marginBottom: 16}}>Datenschutz</h1>
        <p>
          Wir nehmen den Schutz Ihrer Daten ernst.<br />
          Die Details zu unserem Umgang mit personenbezogenen Daten finden Sie hier … (bitte nach DSGVO-Vorgaben ergänzen)
        </p>
      </main>
      <Footer />
    </>
  );
}
