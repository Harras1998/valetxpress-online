import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Datenschutz() {
  return (
    <>
      <Header />

      <main style={{
        background: "#f5f7fa",
        minHeight: "85vh",
        padding: 0,
      }}>
        <div style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "2.5rem 1rem",
        }}>
        <h1 style={{fontSize: "2rem", fontWeight: "bold", marginBottom: 16}}>Datenschutz</h1>
        <p>
          Wir nehmen den Schutz Ihrer Daten ernst.<br />
          Sobald Sie unseren Service in Anspruch nehmen, werden Daten erhoben, die wir für unsere Dienstleistung an Sie benötigen, Ihren Namen Adresse etc. Die personenbezogenen Daten (Beispiel Name Anschrift e-Mail IP-Adresse) haben Sie freiwillig bzw. automatisch zur Verfügung gestellt. Der Nutzer hat bei der persönlichen Datenabfrage die Angaben wahrheitsgemäß einzutragen. Wir weisen ausdrücklich darauf hin, dass wegen der Impressumspflicht veröffentlichte Daten nicht zur Übersendung durch Dritte für z. B. Informationsmaterialien bzw. Werbung oder Spam-Mails verwendet werden dürfen. Wir als Betreiber nehmen Ihre persönlichen Daten nur als Bearbeitung des Vorganges und halten uns an die Datenschutzgesetze.
        </p>
      </main>
      <Footer />
    </>
  );
}
