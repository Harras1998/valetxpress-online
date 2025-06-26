import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
// Falls noch nicht installiert: npm install @paypal/react-paypal-js
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// Hilfsfunktion für deutsches Datumsformat
function toDE(dateStr) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return `${d}.${m}.${y}`;
}

const paymentOptions = [
  {
    key: "paypal",
    label: "PayPal, Kreditkarte oder Lastschrift",
    desc: "Zahlen Sie einfach per PayPal-Konto, Kreditkarte oder SEPA-Lastschrift.",
    icon: "/images/paypal.svg",
  },
  {
    key: "bank",
    label: "Überweisung",
    desc: "Sie erhalten unsere Bankdaten nach Abschluss der Buchung.",
    icon: "/images/bank.svg",
  },
  {
    key: "cash",
    label: "Barzahlung",
    desc: "Sie zahlen bequem bei der Fahrzeugübergabe.",
    icon: "/images/cash.svg",
  }
];

// --- HIER: Funktion für API-Request ---
async function sendBookingToAPI(booking) {
  try {
    // ===>> HIER ggf. deine API-URL anpassen! 
    // Bei lokalem Testen: http://localhost:4000/api/buchung
    // Im Livebetrieb: https://deinedomain.de/api/buchung
    const response = await fetch("http://217.154.220.163:4000/api/buchung", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    });
    if (!response.ok) {
      // Fehlerbehandlung (optional)
      console.error("Fehler beim Senden der Buchung!", await response.text());
    }
  } catch (err) {
    console.error("Netzwerkfehler:", err);
  }
}

export default function Zahlung() {
  const [booking, setBooking] = useState(null);
  const [payment, setPayment] = useState("paypal");
  const [done, setDone] = useState(false);
  const [showPayPal, setShowPayPal] = useState(false);

  // Lade Buchungsdaten beim Start aus localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const b = localStorage.getItem("valet_booking");
      if (b) setBooking(JSON.parse(b));
    }
  }, []);

  if (!booking) {
    return (
      <>
        <Header />
        <main style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 40, boxShadow: "0 2px 16px #0002" }}>
            <h2>Buchung nicht gefunden.</h2>
            <a href="/buchen" style={{ color: "#1db954", fontWeight: "bold" }}>Zurück zur Buchung</a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const {
    form, type, start, end, days, price, addOut, addIn, addTank, addLade
  } = booking;

  // Handle Bezahlung
  async function handlePay(e) {
    e.preventDefault();
    if (payment === "paypal") {
      setShowPayPal(true);
      return;
    }
    setDone(true);
    // API-Call bei Bank/Bar
    await sendBookingToAPI(booking);
  }

  // PayPal Erfolg
  async function handlePayPalSuccess() {
    setDone(true);
    setShowPayPal(false);
    // API-Call bei PayPal
    await sendBookingToAPI(booking);
  }

  return (
    <>
      <Header />
      <main style={{ minHeight: "80vh", background: "#e5e7eb", padding: "2rem 0" }}>
        <div style={{
          maxWidth: 700,
          margin: "2rem auto",
          padding: 24,
          background: "#fff",
          borderRadius: 24,
          boxShadow: "0 2px 12px #0002",
          fontFamily: "system-ui, Arial, sans-serif"
        }}>
          <h2 style={{
            textAlign: "center",
            color: "#1db954",
            fontWeight: "bold",
            marginBottom: 18,
            fontSize: "2rem"
          }}>Zahlung</h2>
          <div style={{
            marginBottom: 26,
            background: "#e1fbe9",
            border: "1px solid #1db95444",
            borderRadius: 12,
            padding: 18,
            fontSize: "1.15rem"
          }}>
            <b>Buchungsübersicht</b>
            <div style={{ margin: "8px 0" }}>
              <b>Park-Modell:</b> {type === "valet" ? "Valet-Parking" : "All-Inclusive‑Parking"}<br />
              <b>Name:</b> {form.vorname} {form.nachname}<br />
              <b>Anreise:</b> {toDE(start)}, <b>Abreise:</b> {toDE(end)}<br />
              <b>Aufenthaltsdauer:</b> {days} {days === 1 ? "Tag" : "Tage"}<br />
              {form.auto && (<><b>Fahrzeug:</b> {form.auto}, Kennzeichen: {form.kennzeichen}<br /></>)}
              <b>Gesamtpreis:</b> <span style={{ color: "#1db954", fontWeight: "bold", fontSize: 22 }}>{price} €</span><br />
              {(addOut || addIn || addTank || addLade) && (
                <>
                  <b>Gebuchte Zusatzleistungen:</b>
                  <ul style={{ margin: "6px 0 0 18px", fontSize: 17, listStyle: "disc" }}>
                    {addOut && <li>Außenreinigung</li>}
                    {addIn && <li>Innenreinigung</li>}
                    {addTank && <li>Tankservice</li>}
                    {addLade && <li>Ladeservice für Elektrofahrzeuge exkl. Stromkosten</li>}
                  </ul>
                </>
              )}
            </div>
            <div style={{ marginTop: 10, color: "#1db954", fontWeight: "bold" }}>
              Buchungen können kostenfrei geändert oder storniert werden.
            </div>
          </div>

          {/* NICHT abgeschlossen (Button & Zahlungsarten) */}
          {!done && !showPayPal && (
            <>
              <form onSubmit={handlePay} style={{ marginBottom: 8 }}>
                <div style={{ marginBottom: 18 }}>
                  <b style={{ fontSize: "1.08rem" }}>Zahlungsart wählen:</b>
                  <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px 22px",
                    marginTop: 9
                  }}>
                    {paymentOptions.map(opt => (
                      <label key={opt.key} style={{
                        display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
                        padding: "8px 16px", borderRadius: 8,
                        background: payment === opt.key ? "#e1fbe9" : "#f5f5f5",
                        border: payment === opt.key ? "2px solid #1db954" : "1px solid #ddd",
                        minWidth: 180
                      }}>
                        <input
                          type="radio"
                          name="payment"
                          value={opt.key}
                          checked={payment === opt.key}
                          onChange={() => setPayment(opt.key)}
                          style={{ marginRight: 7, accentColor: "#1db954" }}
                        />
                        {/* Icon */}
                        {opt.icon && (
                          <img src={opt.icon} alt="" width={32} height={32} style={{ borderRadius: 6 }} />
                        )}
                        <div>
                          <span style={{ fontWeight: "bold" }}>{opt.label}</span><br />
                          <span style={{ fontSize: ".96rem", color: "#273" }}>{opt.desc}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "15px 0",
                    background: "#1db954",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "1.17rem",
                    border: "none",
                    borderRadius: 12,
                    cursor: "pointer"
                  }}
                >
                  Zahlung abschließen
                </button>
              </form>
              <div style={{ textAlign: "center", margin: "14px 0" }}>
                <a href="/buchen?step=2" style={{ color: "#1db954" }}>&larr; Zurück zur Buchung</a>
              </div>
            </>
          )}

          {/* --- PAYPAL --- */}
          {showPayPal && !done && (
            <div style={{ margin: "28px 0 0 0", textAlign: "center" }}>
              <PayPalScriptProvider options={{ "client-id": "AUchvowm3yesxcTsIASz8B1SObtXXskWRKpX-iRkjDpwO1C2Mur1Q4MCXdabm_KJYq8YoQZQ0vZOfgb0", currency: "EUR" }}>
                <PayPalButtons
                  style={{ layout: "vertical", color: "blue", shape: "pill" }}
                  createOrder={(data, actions) =>
                    actions.order.create({
                      purchase_units: [{ amount: { value: price.toString() } }]
                    })
                  }
                  onApprove={(data, actions) =>
                    actions.order.capture().then(() => handlePayPalSuccess())
                  }
                  onCancel={() => setShowPayPal(false)}
                />
              </PayPalScriptProvider>
              <div style={{ fontSize: 16, marginTop: 16, color: "#444" }}>
                Sie können per PayPal, Kreditkarte oder Lastschrift zahlen – auch ohne PayPal-Konto.
              </div>
              <button onClick={() => setShowPayPal(false)} style={{
                marginTop: 26,
                background: "#ccc",
                border: "none",
                borderRadius: 8,
                padding: "10px 26px",
                cursor: "pointer"
              }}>Zurück zur Auswahl</button>
            </div>
          )}

          {/* --- FERTIG --- */}
          {done && (
            <div style={{
              background: "#e1fbe9",
              border: "1px solid #1db95444",
              borderRadius: 12,
              padding: 28,
              textAlign: "center"
            }}>
              <img src="/images/green-check.png" alt="" width={54} height={54} style={{ marginBottom: 18 }} />
              <h3 style={{ color: "#1db954" }}>Vielen Dank für Ihre Buchung!</h3>
              <div style={{ marginTop: 10, fontSize: 18 }}>Sie erhalten in Kürze eine Buchungsbestätigung per E-Mail.</div>
              <div style={{ marginTop: 18 }}><a href="/" style={{ color: "#1db954", fontWeight: 600 }}>Zurück zur Startseite</a></div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
