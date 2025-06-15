import Header from "../components/Header";
import Footer from "../components/Footer";

export default function UeberUns() {
  return (
    <>
      <Header />
      <main style={{maxWidth: 700, margin: "0 auto", padding: "2rem 1rem"}}>
        <h1 style={{fontSize: "2rem", fontWeight: "bold", marginBottom: 16}}>Über uns</h1>
        <p>
          ValetXpress ist Ihr persönlicher Parkservice am Flughafen München – gegründet von Experten aus der Park- und Servicebranche. Unser Ziel: Stressfreies Reisen mit bestem Service, Zuverlässigkeit und Sicherheit für Ihr Fahrzeug.
        </p>
        <ul style={{margin: "18px 0 0 20px", listStyle: "disc"}}>
          <li>Langjährige Erfahrung</li>
          <li>Persönliche Betreuung</li>
          <li>Transparente Preise</li>
          <li>Qualitätsversprechen: Ihr Auto in besten Händen</li>
        </ul>
      </main>
      <Footer />
    </>
  );
}
