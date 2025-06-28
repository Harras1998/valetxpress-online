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

export default function Impressum() {
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
              }}>Impressum</h1>
              <p style={{ lineHeight: "2", marginBottom: 32 }}>
                ValetXpress<br />
                Aref Mostafai<br />
                Fred-Hartmann-Weg 30<br />
                85435 Erding<br />
                Tel: 017661839836<br />
                E-Mail: info@valetxpress.de
              </p>
              <h2 style={{
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "#194d33",
                marginBottom: 10,
                marginTop: 24,
              }}>Haftungsausschluss</h2>
              <p>
                Der Besuch auf der Website von ValetXpress unterliegt den Bestimmungen des Allgemeinen Haftungsausschlusses. Die bereitgestellten Onlineinformationen auf unserer Website wurden sorgfältig eingestellt, und werden in regelmäßigen Abständen aktualisiert. Trotzdem kann keine Garantie für Genauigkeit, Aktualität bzw. Richtigkeit übernommen werden.
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
