import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import Link from "next/link";

// Scroll-FadeIn wie auf Index
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

export default function AllInclusive() {
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
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              background: "#fff",
              borderRadius: 24,
              boxShadow: "0 1px 16px #0002",
              padding: "2rem",
              marginBottom: "2.5rem",
              gap: 40,
              marginTop: "2rem",
            }}>
              <div style={{ flex: 1, minWidth: 220 }}>
                <Image
                  src="/images/Auto.png"
                  alt="All-Inclusive Service"
                  width={320}
                  height={210}
                  style={{
                    borderRadius: "1.3rem",
                    objectFit: "cover",
                    width: "100%",
                    height: "auto",
                  }}
                  priority
                />
              </div>
              <div style={{ flex: 2, minWidth: 250 }}>
                <h1 style={{
                  fontSize: "2rem",
                  fontWeight: 600,
                  color: "#194d33",
                  marginBottom: 10,
                }}>All-Inclusive Parking</h1>
                <p style={{ color: "#20313a", fontSize: "1.08rem", marginBottom: 16 }}>
                  Parken mit allem Komfort: Fahrzeugpflege, Ladestationen und mehr. Ideal für Langzeitparker oder maximale Flexibilität.
                </p>
                <ul style={{margin: "16px 0 16px 24px", listStyle: "disc", color: "#20313a", fontSize: "1.04rem" }}>
                  <li>Valet-Service inklusive</li>
                  <li>Reinigungsservice optional</li>
                  <li>E-Ladestation nach Wunsch</li>
                  <li>Bestpreis-Garantie</li>
                </ul>
                <Link href="/buchen" style={{
                  background: "#1db954",
                  color: "#fff",
                  padding: "0.9rem 2.2rem",
                  borderRadius: "0.9rem",
                  fontWeight: "bold",
                  fontSize: "1.13rem",
                  textDecoration: "none",
                  boxShadow: "0 2px 12px #1db95433",
                  display: "inline-block",
                  marginTop: 8,
                }}>Jetzt All-Inclusive buchen</Link>
              </div>
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
