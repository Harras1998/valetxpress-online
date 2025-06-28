import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";

function FadeIn({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay }}
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
}

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
          <FadeIn>
            <section style={{
              background: "#fff",
              borderRadius: 24,
              boxShadow: "0 1px 16px #0002",
              padding: "2rem",
              marginBottom: "2.5rem",
              marginTop: "2rem",
            }}>
              <h1 style={{
                fontSize: "2rem",
                fontWeight: 600,
                color: "#194d33",
                marginBottom: 10,
              }}>Datenschutz</h1>
              <p>
                Wir nehmen den Schutz Ihrer Daten ernst.<br />
                Sobald Sie unseren Service in Anspruch nehmen, werden Daten erhoben, die wir für unsere Dienstleistung an Sie benötigen, Ihren Namen, Adresse etc. Die personenbezogenen Daten (Beispiel Name, Anschrift, E-Mail, IP-Adresse) haben Sie freiwillig bzw. automatisch zur Verfügung gestellt. Der Nutzer hat bei der persönlichen Datenabfrage die Angaben wahrheitsgemäß einzutragen. Wir weisen ausdrücklich darauf hin, dass wegen der Impressumspflicht veröffentlichte Daten nicht zur Übersendung durch Dritte für z. B. Informationsmaterialien bzw. Werbung oder Spam-Mails verwendet werden dürfen. Wir als Betreiber nehmen Ihre persönlichen Daten nur zur Bearbeitung des Vorganges und halten uns an die Datenschutzgesetze.
              </p>
            </section>
          </FadeIn>
        </div>
      </main>
      <Footer />
      <style jsx global>{`
        html, body {
          font-family: 'Segoe UI', 'Roboto', Arial, sans-serif;
          background: #f5f7fa;
        }
        @media (max-width: 700px) {
          h1 { font-size: 2rem !important; }
          h2 { font-size: 1.2rem !important; }
          main > div { padding: 1.5rem 4vw; }
          section { padding: 1.1rem !important; }
        }
      `}</style>
    </>
  );
}
