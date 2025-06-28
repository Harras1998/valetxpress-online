import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Impressum() {
  return (
    <>
      <Header />
      <main style={{maxWidth: 600, margin: "0 auto", padding: "2rem 1rem"}}>
        <h1 style={{fontSize: "2rem", fontWeight: "bold", marginBottom: 16}}>Impressum</h1>
        <p>
          ValetXpress<br />
          Aref Mostafai<br />
          Fred-Hartmann-Weg 30<br />
          85435 Erding<br />
          Tel: 017661839836<br />
          E-Mail: info@valetxpress.de
        </p>
        <h2 style={{fontSize: "1.1rem", marginTop: 30, marginBottom: 12}}>Haftungsausschluss</h2>
        <p></p>
      </main>
      <Footer />
    </>
  );
}
