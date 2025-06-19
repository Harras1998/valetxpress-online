import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import HeroSection from "../components/HeroSection";

// Hilfsfunktion für Scroll-FadeIn Animation
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

export default function Home() {
  return (
    <>
      <Header />

      <main style={{
        background: "#f5f7fa",
        minHeight: "85vh",
        padding: 0,
      }}>
        <HeroSection />

        <div style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "2.5rem 1rem",
        }}>
          {/* Vorteil 1 */}
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
                  src="/images/Schlüssel.png"
                  alt="Valet Parking"
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
                <h2 style={{
                  fontSize: "2rem",
                  fontWeight: 600,
                  color: "#194d33",
                  marginBottom: 10,
                }}>Valet-Parking direkt am Terminal</h2>
                <p style={{ color: "#20313a", fontSize: "1.08rem" }}>
                  Keine Parkplatzsuche – übergeben Sie Ihr Fahrzeug bequem am Abflug-Terminal und genießen Sie Ihren Flug. Ihr Auto wird sicher geparkt und steht zur Rückkehr bereit – inkl. Übergabe am Terminal.
                </p>
              </div>
            </section>
          </FadeIn>

          {/* Vorteil 2 */}
          <FadeIn delay={0.18}>
            <section style={{
              display: "flex",
              flexWrap: "wrap-reverse",
              alignItems: "center",
              background: "#fff",
              borderRadius: 24,
              boxShadow: "0 1px 16px #0002",
              padding: "2rem",
              marginBottom: "2.5rem",
              gap: 40,
            }}>
              <div style={{ flex: 2, minWidth: 250 }}>
                <h2 style={{
                  fontSize: "2rem",
                  fontWeight: 600,
                  color: "#194d33",
                  marginBottom: 10,
                }}>Professionelle Reinigung & Zusatzservices</h2>
                <p style={{ color: "#20313a", fontSize: "1.08rem" }}>
                  Wählen Sie auf Wunsch unsere professionelle Innen- und Außenreinigung, Tankservice oder Ladeservice für Elektrofahrzeuge. Ihr Auto wartet bei Rückgabe im Bestzustand auf Sie.
                </p>
              </div>
              <div style={{ flex: 1, minWidth: 220 }}>
                <Image
                  src="/images/Auto.png"
                  alt="Autopflege"
                  width={320}
                  height={210}
                  style={{
                    borderRadius: "1.3rem",
                    objectFit: "cover",
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
            </section>
          </FadeIn>

          {/* Vorteil 3 */}
          <FadeIn delay={0.34}>
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
            }}>
              <div style={{ flex: 1, minWidth: 220 }}>
                <Image
                  src="/images/flughafen.jpg"
                  alt="Sicher parken"
                  width={320}
                  height={210}
                  style={{
                    borderRadius: "1.3rem",
                    objectFit: "cover",
                    width: "100%",
                    height: "auto",
                  }}
                />
              </div>
              <div style={{ flex: 2, minWidth: 250 }}>
                <h2 style={{
                  fontSize: "2rem",
                  fontWeight: 600,
                  color: "#194d33",
                  marginBottom: 10,
                }}>Sicher & transparent – kostenfreie Stornierung</h2>
                <p style={{ color: "#20313a", fontSize: "1.08rem" }}>
                  Sie profitieren von transparenter Preisgestaltung und können Ihre Buchung jederzeit kostenfrei ändern oder stornieren. Ihr Auto steht auf videoüberwachten, sicheren Parkflächen.
                </p>
              </div>
            </section>
          </FadeIn>

          {/* FAQ */}
          <FadeIn delay={0.45}>
            <section style={{
              background: "#fff",
              borderRadius: 24,
              boxShadow: "0 1px 16px #0002",
              padding: "2.2rem 1.5rem",
              marginBottom: "2.5rem",
            }}>
              <h2 style={{
                color: "#194d33",
                fontSize: "1.8rem",
                fontWeight: 600,
                marginBottom: 14,
                textAlign: "center",
              }}>
                Häufige Fragen
              </h2>
              <div style={{ maxWidth: 640, margin: "0 auto" }}>
                <details style={{ marginBottom: 12 }}>
                  <summary style={{ fontWeight: 500, cursor: "pointer" }}>
                    Wie läuft der Valet-Service genau ab?
                  </summary>
                  <div style={{ color: "#374151", marginTop: 5 }}>
                    Sie fahren direkt zum Flughafen-Terminal München. Ein Valet-Mitarbeiter nimmt Ihr Auto entgegen, prüft es und parkt es auf dem gesicherten Parkplatz. Bei Rückkehr steht Ihr Auto für Sie bereit.
                  </div>
                </details>
                <details style={{ marginBottom: 12 }}>
                  <summary style={{ fontWeight: 500, cursor: "pointer" }}>
                    Kann ich meine Buchung kostenfrei stornieren?
                  </summary>
                  <div style={{ color: "#374151", marginTop: 5 }}>
                    Ja! Änderungen und Stornierungen sind bei ValetXpress immer kostenfrei möglich.
                  </div>
                </details>
                <details>
                  <summary style={{ fontWeight: 500, cursor: "pointer" }}>
                    Welche Fahrzeuge kann ich abgeben?
                  </summary>
                  <div style={{ color: "#374151", marginTop: 5 }}>
                    Grundsätzlich alle PKW bis 5,30m Länge. Bei Sonderfahrzeugen kontaktieren Sie uns gerne vorab.
                  </div>
                </details>
              </div>
            </section>
          </FadeIn>

          {/* Abschluss */}
          <FadeIn delay={0.6}>
            <section style={{ textAlign: "center", marginTop: 36 }}>
              <a href="/buchen">
                <button style={{
                  background: "#1db954",
                  color: "#fff",
                  padding: "18px 36px",
                  borderRadius: 8,
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  border: "none",
                  boxShadow: "0 2px 12px #1db95444",
                  cursor: "pointer",
                }}>
                  Jetzt Parkplatz reservieren
                </button>
              </a>
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
