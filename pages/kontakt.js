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

export default function Kontakt() {
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
              }}>Kontakt</h1>
              <p>Sie haben Fragen? Schreiben Sie uns oder rufen Sie an:</p>
              <ul style={{ margin: "18px 0", fontSize: "1.07rem" }}>
                <li>
                  Telefon:{" "}
                  <a href="tel:+4917661839836" style={{ color: "#1e3a8a", textDecoration: "underline" }}>
                    +49 176 61839836
                  </a>
                </li>
                <li>
                  E-Mail:{" "}
                  <a href="mailto:info@valetxpress.de" style={{ color: "#1e3a8a", textDecoration: "underline" }}>
                    info@valetxpress.de
                  </a>
                </li>
              </ul>
              <form style={{ marginTop: 20 }}>
                <input
                  placeholder="Ihr Name"
                  style={{
                    width: "100%",
                    marginBottom: 12,
                    padding: "0.7rem 1rem",
                    borderRadius: "0.7rem",
                    border: "1px solid #d1d5db",
                    fontSize: "1rem",
                  }}
                />
                <input
                  placeholder="Ihre E-Mail"
                  type="email"
                  style={{
                    width: "100%",
                    marginBottom: 12,
                    padding: "0.7rem 1rem",
                    borderRadius: "0.7rem",
                    border: "1px solid #d1d5db",
                    fontSize: "1rem",
                  }}
                />
                <textarea
                  placeholder="Ihre Nachricht"
                  rows={4}
                  style={{
                    width: "100%",
                    marginBottom: 12,
                    padding: "0.7rem 1rem",
                    borderRadius: "0.7rem",
                    border: "1px solid #d1d5db",
                    fontSize: "1rem",
                    resize: "vertical",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: "#1db954",
                    color: "#fff",
                    padding: "0.8rem 2.2rem",
                    borderRadius: "0.9rem",
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    border: "none",
                    boxShadow: "0 2px 12px #1db95433",
                    cursor: "pointer",
                  }}
                >
                  Absenden
                </button>
              </form>
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
