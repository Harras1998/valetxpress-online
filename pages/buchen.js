import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Hilfsfunktion für deutsches Datumsformat
function toDE(dateStr) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return `${d}.${m}.${y}`;
}

const valetPrices = [95,97,99,110,116,117,119,120,126,128,131,136,139,143,148,149,150,154,157,161,166];
const extra = { außen:19, innen:95, tank:15, lade:19 };

function getValet(priceList, days) {
  if (days <= priceList.length) return priceList[days - 1];
  return priceList[priceList.length - 1] + (days - priceList.length) * 7;
}

function todayStr() {
  const t = new Date();
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}

// Helper für 2-stellige Anzeige
function pad2(n) {
  return String(n).padStart(2, "0");
}

// --- NEU: Uhrzeit Select Komponente
function UhrzeitSelect({ value, onChange, name, required = false }) {
  // value ist "HH:MM" oder leer
  let [h, m] = value ? value.split(":") : ["08", "00"];
  if (!h) h = "08";
  if (!m) m = "00";
  return (
    <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <select
        value={h}
        onChange={e => {
          onChange({ target: { name, value: `${e.target.value}:${m}` } });
        }}
        required={required}
        style={{ fontSize: "1rem", padding: "3px 4px", borderRadius: 4 }}
      >
        {[...Array(24).keys()].map(hh => (
          <option key={hh} value={pad2(hh)}>
            {pad2(hh)}
          </option>
        ))}
      </select>
      :
      <select
        value={m}
        onChange={e => {
          onChange({ target: { name, value: `${h}:${e.target.value}` } });
        }}
        required={required}
        style={{ fontSize: "1rem", padding: "3px 4px", borderRadius: 4 }}
      >
        {[0,5,10,15,20,25,30,35,40,45,50,55].map(mm => (
          <option key={mm} value={pad2(mm)}>
            {pad2(mm)}
          </option>
        ))}
      </select>
    </span>
  );
}

export default function Buchen() {
  const router = useRouter();
  const [type, setType] = useState("valet");
  const [start, setStart] = useState(todayStr());
  const [end, setEnd] = useState("");
  const [days, setDays] = useState(0);
  const [price, setPrice] = useState(0);
  const [addOut, setAddOut] = useState(false);
  const [addIn, setAddIn] = useState(false);
  const [addTank, setAddTank] = useState(false);
  const [addLade, setAddLade] = useState(false);
  const [step, setStep] = useState(1);

  // Persönliche Daten
  const [form, setForm] = useState({
    vorname: "",
    nachname: "",
    strasse: "",
    plz: "",
    ort: "",
    email: "",
    telefon: "",
    auto: "",
    kennzeichen: "",
    abflugdatum: "",
    abflugUhrzeit: "",
    ankunftUhrzeit: "",
    rueckflugdatum: "",
    rueckflugUhrzeit: "",
    reiseziel: "",
    fluggesellschaft: "",
    flugnummerHin: "",
    flugnummerRueck: "",
    terminal: "",
    handgepaeck: false,
    bemerkung: "",
    agb: false,
    datenschutz: false,
  });

  function syncAllBookingState() {
    if (typeof window !== "undefined") {
      const booking = localStorage.getItem("valet_booking");
      if (booking) {
        const b = JSON.parse(booking);
        setForm(b.form || {
          vorname: "",
          nachname: "",
          strasse: "",
          plz: "",
          ort: "",
          email: "",
          telefon: "",
          auto: "",
          kennzeichen: "",
          abflugdatum: "",
          abflugUhrzeit: "",
          ankunftUhrzeit: "",
          rueckflugdatum: "",
          rueckflugUhrzeit: "",
          reiseziel: "",
          fluggesellschaft: "",
          flugnummerHin: "",
          flugnummerRueck: "",
          terminal: "",
          handgepaeck: false,
          bemerkung: "",
          agb: false,
          datenschutz: false,
        });
        setType(b.type || "valet");
        setStart(b.start || todayStr());
        setEnd(b.end || "");
        setDays(b.days || 0);
        setPrice(b.price || 0);  // <- neu!
        setAddOut(!!b.addOut);
        setAddIn(!!b.addIn);
        setAddTank(!!b.addTank);
        setAddLade(!!b.addLade);
      }
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const booking = localStorage.getItem("valet_booking");
      if (booking) {
        const b = JSON.parse(booking);
        setForm(b.form || {
          vorname: "",
          nachname: "",
          strasse: "",
          plz: "",
          ort: "",
          email: "",
          telefon: "",
          auto: "",
          kennzeichen: "",
          abflugdatum: "",
          abflugUhrzeit: "",
          ankunftUhrzeit: "",
          rueckflugdatum: "",
          rueckflugUhrzeit: "",
          reiseziel: "",
          fluggesellschaft: "",
          flugnummerHin: "",
          flugnummerRueck: "",
          terminal: "",
          handgepaeck: false,
          bemerkung: "",
          agb: false,
          datenschutz: false,
        });
        setType(b.type || "valet");
        setStart(b.start || todayStr());
        setEnd(b.end || "");
        setDays(b.days || 0);
        setAddOut(!!b.addOut);
        setAddIn(!!b.addIn);
        setAddTank(!!b.addTank);
        setAddLade(!!b.addLade);

        // Prüfe auf Schritt 2
        const url = new URL(window.location.href);
        if (url.searchParams.get("step") === "2") {
          setStep(2);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    const qType = router.query.type;
    if (qType === "allinclusive" || qType === "valet") setType(qType);
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (!end || new Date(end) <= new Date(start)) {
      const next = new Date(start);
      next.setDate(next.getDate() + 1);
      setEnd(next.toISOString().split("T")[0]);
    }
  }, [start]);

  useEffect(() => {
    if (!start || !end || new Date(end) <= new Date(start)) {
      setDays(0); setPrice(0); return;
    }
    const d = Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24));
    setDays(d);
  }, [start, end]);

  useEffect(() => {
    if (!days) return setPrice(0);
    let base = getValet(valetPrices, days);
    if (type === "allinclusive") {
      base += extra.außen + extra.innen;
      setAddOut(true); setAddIn(true);
    } else {
      base += (addOut ? extra.außen : 0) + (addIn ? extra.innen : 0);
    }
    base += (addTank ? extra.tank : 0) + (addLade ? extra.lade : 0);
    setPrice(base);
  }, [days, type, addOut, addIn, addTank, addLade]);

  useEffect(() => {
    if (type === "allinclusive") {
      setAddOut(true);
      setAddIn(true);
    } else {
      setAddOut(false);
      setAddIn(false);
    }
  }, [type]);

  useEffect(() => {
    if (step === 2) {
      syncAllBookingState();
    }
  }, [step]);

  function handleForm(e) {
    const { name, value, type, checked } = e.target;
    setForm({ 
      ...form, 
      [name]: type === "checkbox" ? checked : value 
    });
  }

  function handleBookingSubmit(e) {
    e.preventDefault();

    // Buchungsdaten in einer Variablen speichern
    const bookingData = {
      form: {
      ...form,
      abflugdatum: start,
      rueckflugdatum: end,
      },
      type,
      start,
      end,
      days,
      price,
      addOut,
      addIn,
      addTank,
      addLade,
    };

    // In localStorage speichern (damit wir sie auf der nächsten Seite abrufen können)
    if (typeof window !== "undefined") {
      localStorage.setItem("valet_booking", JSON.stringify(bookingData));
    }

    // Zur Zahlungsseite weiterleiten
    router.push("/zahlung");
  }

  const minDate = todayStr();

  return (
    <>
      <Header />
      <main style={{
        background: "#f5f7fa",
        minHeight: "85vh",
        padding: 0,
      }}>
        <div style={{
          maxWidth: 700,
          margin: "2rem auto",
          padding: 24,
          background: "#fff",
          borderRadius: 24,
          boxShadow: "0 2px 12px #0002",
          fontFamily: "system-ui, Arial, sans-serif"
        }}>
          {step === 1 && (
            <>
              <h2 style={{
                textAlign: "center",
                color: "#1db954",
                fontWeight: "bold",
                marginBottom: 28,
                fontSize: "2.1rem"
              }}>Parkplatz buchen</h2>

              <div style={{maxWidth: 350, margin: "0 auto 18px", fontSize: "1.18rem"}}>
                <div style={{marginBottom: 8}}>
                  <label style={{fontWeight: 500}}>Park-Modell:<br />
                    <select value={type} onChange={e => setType(e.target.value)} style={{
                      fontSize: "1rem",
                      borderRadius: 4,
                      padding: "2px 7px"
                    }}>
                      <option value="valet">Valet-Parking</option>
                      <option value="allinclusive">All-Inclusive‑Parking</option>
                    </select>
                  </label>
                </div>
                <div style={{marginBottom: 8}}>
                  <label>Abflugdatum:<br />
                    <input
                      type="date"
                      min={minDate}
                      value={start}
                      onChange={e => setStart(e.target.value)}
                      style={{
                        fontSize: "1rem",
                        borderRadius: 4,
                        border: "1px solid #bbb",
                        padding: "2px 7px"
                      }}
                    />
                  </label>
                </div>
                <div>
                  <label>Rückflugdatum:<br />
                    <input
                      type="date"
                      min={start ? (() => {
                        const next = new Date(start);
                        next.setDate(next.getDate() + 1);
                        return next.toISOString().split("T")[0];
                      })() : minDate}
                      value={end}
                      onChange={e => setEnd(e.target.value)}
                      style={{
                        fontSize: "1rem",
                        borderRadius: 4,
                        border: "1px solid #bbb",
                        padding: "2px 7px"
                      }}
                    />
                  </label>
                </div>
              </div>

              {(type === "valet" && days > 0) &&
                <div style={{ margin: "0 auto 16px", maxWidth: 430 }}>
                  <label>
                    <input type="checkbox" checked={addOut} onChange={e => setAddOut(e.target.checked)} />
                    {" "}Außenreinigung (+19 €)
                  </label><br />
                  <label>
                    <input type="checkbox" checked={addIn} onChange={e => setAddIn(e.target.checked)} />
                    {" "}Innenreinigung (+95 €)
                  </label><br />
                  <label>
                    <input type="checkbox" checked={addTank} onChange={e => setAddTank(e.target.checked)} />
                    {" "}Tankservice (+15 €)
                  </label><br />
                  <label>
                    <input type="checkbox" checked={addLade} onChange={e => setAddLade(e.target.checked)} />
                    {" "}Ladeservice für Elektrofahrzeuge exkl. Stromkosten (+19 €)
                  </label>
                </div>
              }
              {(type === "allinclusive" && days > 0) &&
                <div style={{ margin: "0 auto 16px", maxWidth: 430 }}>
                  <label>
                    <input type="checkbox" checked={true} disabled />
                    {" "}Außenreinigung (inkl.)
                  </label><br />
                  <label>
                    <input type="checkbox" checked={true} disabled />
                    {" "}Innenreinigung (inkl.)
                  </label><br />
                  <label>
                    <input type="checkbox" checked={addTank} onChange={e => setAddTank(e.target.checked)} />
                    {" "}Tankservice (+15 €)
                  </label><br />
                  <label>
                    <input type="checkbox" checked={addLade} onChange={e => setAddLade(e.target.checked)} />
                    {" "}Ladeservice für Elektrofahrzeuge exkl. Stromkosten (+19 €)
                  </label>
                </div>
              }

              {days > 0 &&
                <div style={{
                  background: "#1db954",
                  color: "#fff",
                  padding: "16px 20px",
                  borderRadius: 12,
                  fontWeight: "bold",
                  fontSize: "1.18rem",
                  margin: "0 0 18px 0"
                }}>
                  Aufenthalt: {days} Tag(e) • Gesamtpreis: {price} €
                </div>
              }

              {(type === "valet" || type === "allinclusive") && days > 0 && (
                <>
                  <div
                    style={{
                      background: "#e1fbe9",
                      border: "1px solid #1db95444",
                      borderRadius: 12,
                      padding: "18px 18px 10px 18px",
                      marginBottom: 20,
                      fontWeight: "bold",
                      fontSize: "1.25rem"
                    }}>
                    Fahrzeugübernahme bei Abflug am Flughafenterminal <br /><br />
                    Fahrzeugübergabe bei Rückflug am Flughafenterminal
                  </div>

                  <div style={{
                    background: "#e1fbe9",
                    border: "1px solid #1db95444",
                    color: "#1db954",
                    borderRadius: 12,
                    padding: 14,
                    fontWeight: "bold",
                    fontSize: "1.18rem",
                    marginBottom: 20
                  }}>
                    Buchungen können kostenfrei geändert oder storniert werden.
                  </div>
                </>
              )}

              <button
                disabled={days < 1}
                style={{
                  width: "100%",
                  padding: "15px 0",
                  background: "#1db954",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1.13rem",
                  border: "none",
                  borderRadius: 12,
                  cursor: days < 1 ? "not-allowed" : "pointer",
                  opacity: days < 1 ? 0.6 : 1,
                  marginTop: 0
                }}
                onClick={() => {
                  setStep(2);
                  setForm(f => ({
                    ...f,
                    abflugdatum: start,
                    rueckflugdatum: end,
                  }));
                  const bookingData = {
                    form: {
                    ...form,
                    abflugdatum: start,
                    rueckflugdatum: end,
                    },
                    type,
                    start,
                    end,
                    days,
                    price,
                    addOut,
                    addIn,
                    addTank,
                    addLade,
                  };
                  if (typeof window !== "undefined") {
                    localStorage.setItem("valet_booking", JSON.stringify(bookingData));
                  }
                }}
              >
                Jetzt buchen
              </button>
            </>
          )}

          {/* Schritt 2: Persönliche Daten & Fluginformation */}
          {step === 2 && (
            <>
              <h2 style={{
                textAlign: "center",
                color: "#1db954",
                fontWeight: "bold",
                marginBottom: 28,
                fontSize: "2.3rem"
              }}>
                Persönliche Daten & Fluginformation
              </h2>

              {/* Box 1: Zusammenfassung */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#e1fbe9",
                  border: "1px solid #1db95444",
                  borderRadius: 12,
                  padding: 18,
                  marginBottom: 20,
                  flexWrap: "wrap"
                }}
              >
                <div style={{ fontSize: 20, minWidth: 180, flex: 1 }}>
                  <strong>Park-Modell:</strong> {type === "valet" ? "Valet-Parking" : "All-Inclusive‑Parking"}<br />
                  <strong>Abflugdatum:</strong> {toDE(start)}<br />
                  <strong>Rückflugdatum:</strong> {toDE(end)}<br />
                  <strong>Aufenthaltsdauer:</strong> {days} {days === 1 ? "Tag" : "Tage"}<br />
                  {(type === "valet" || type === "allinclusive") && (addOut || addIn || addTank || addLade) && (
                    <>
                      <strong>Gebuchte Zusatzleistungen:</strong>
                      <ul style={{ margin: "6px 0 0 18px", fontSize: 18, listStyle: "disc" }}>
                        {addOut && <li>Außenreinigung</li>}
                        {addIn && <li>Innenreinigung</li>}
                        {addTank && <li>Tankservice</li>}
                        {addLade && <li>Ladeservice für Elektrofahrzeuge exkl. Stromkosten</li>}
                      </ul>
                    </>
                  )}
                </div>
                <div style={{
                  minWidth: 120,
                  textAlign: "right",
                  fontSize: 38,
                  color: "#1db954",
                  fontWeight: "bold",
                  flex: 0.7
                }}>
                  {price} €
                </div>
              </div>

              {/* Box 2: Terminal Hinweise */}
              <div
                style={{
                  background: "#e1fbe9",
                  border: "1px solid #1db95444",
                  borderRadius: 12,
                  padding: "18px 18px 10px 18px",
                  marginBottom: 20,
                  fontWeight: "bold",
                  fontSize: "1.25rem"
                }}>
                Fahrzeugübernahme bei Abflug am Flughafenterminal <br /><br />
                Fahrzeugübergabe bei Rückflug am Flughafenterminal
              </div>

              {/* Box 3: Stornierung */}
              <div
                style={{
                  background: "#e1fbe9",
                  border: "1px solid #1db95444",
                  borderRadius: 12,
                  padding: 18,
                  fontWeight: "bold",
                  color: "#1db954",
                  fontSize: "1.4rem",
                  marginBottom: 30
                }}>
                Buchungen können kostenfrei geändert oder storniert werden.
              </div>

              {/* Formular */}
              <form onSubmit={handleBookingSubmit} autoComplete="off">
                <div style={{display:"flex",gap:8}}>
                  <div style={{flex:1}}>
                    <label>Vorname*: <br />
                      <input name="vorname" value={form.vorname} onChange={handleForm} required style={{width:"100%"}} />
                    </label>
                  </div>
                  <div style={{flex:2}}>
                    <label>Nachname*: <br />
                      <input name="nachname" value={form.nachname} onChange={handleForm} required style={{width:"100%"}} />
                    </label>
                  </div>
                </div><br />

                <label>Straße / Hausnr.*:<br />
                  <input name="strasse" value={form.strasse} onChange={handleForm} required style={{width:"100%"}} />
                </label><br /><br />

                <div style={{display:"flex",gap:8}}>
                  <div style={{flex:1}}>
                    <label>PLZ*:<br />
                      <input name="plz" value={form.plz} onChange={handleForm} required style={{width:"100%"}} />
                    </label>
                  </div>
                  <div style={{flex:2}}>
                    <label>Ort*:<br />
                      <input name="ort" value={form.ort} onChange={handleForm} required style={{width:"100%"}} />
                    </label>
                  </div>
                </div><br />

                <label>E-Mail-Adresse*: <br />
                  <input name="email" type="email" value={form.email} onChange={handleForm} required style={{width:"100%"}} />
                </label><br /><br />

                <label>Mobilnummer*: <br />
                  <input name="telefon" type="tel" value={form.telefon} onChange={handleForm} required style={{width:"100%"}} />
                </label><br /><br />

                <label>Fahrzeugtyp/Modell*: <br />
                  <input name="auto" value={form.auto} onChange={handleForm} required style={{width:"100%"}} />
                </label><br /><br />

                <label>Kennzeichen*: <br />
                  <input name="kennzeichen" value={form.kennzeichen} onChange={handleForm} required style={{width:"100%"}} />
                </label><br /><br />

                <label>Ankunft Uhrzeit am Flughafen*:<br />
                  <UhrzeitSelect name="ankunftUhrzeit" value={form.ankunftUhrzeit} onChange={handleForm} required />
                </label><br /><br />

                <label>Abflugdatum*: <br />
                  <input
                    name="abflugdatum"
                    type="date"
                    value={start}
                    disabled
                    style={{width:"100%"}}
                  />
                </label><br /><br />

                <label>Abflug-Uhrzeit*: <br />
                  <UhrzeitSelect name="abflugUhrzeit" value={form.abflugUhrzeit} onChange={handleForm} required />
                </label><br /><br />

                <label>Rückflugdatum*: <br />
                  <input
                    name="rueckflugdatum"
                    type="date"
                    value={end}
                    disabled
                    style={{width:"100%"}}
                  />
                </label><br /><br />

                <label>Rückflug-Uhrzeit*: <br />
                  <UhrzeitSelect name="rueckflugUhrzeit" value={form.rueckflugUhrzeit} onChange={handleForm} required />
                </label><br /><br />

                <label>Reiseziel*:<br />
                  <input name="reiseziel" value={form.reiseziel} onChange={handleForm} required style={{width:"100%"}} />
                </label><br /><br />

                <label>Fluggesellschaft*: <br />
                  <input name="fluggesellschaft" value={form.fluggesellschaft} onChange={handleForm} required style={{width:"100%"}} />
                </label><br /><br />

                <label>Flugnummer Hinflug*:<br />
                  <input name="flugnummerHin" value={form.flugnummerHin} onChange={handleForm} required style={{width:"100%"}} />
                </label><br /><br />

                <label>Flugnummer Rückflug*:<br />
                  <input name="flugnummerRueck" value={form.flugnummerRueck} onChange={handleForm} required style={{width:"100%"}} />
                </label><br /><br />

                <label>Terminal* (z.B. T1, T2): <br />
                  <input name="terminal" value={form.terminal} onChange={handleForm} required style={{width:"100%"}} />
                </label><br /><br />

                <label>
                  <input
                    type="checkbox"
                    name="handgepaeck"
                    checked={form.handgepaeck}
                    onChange={handleForm}
                    style={{marginRight:4}}
                  />
                  Ich habe Handgepäck
                </label><br /><br />

                <label>Bemerkung (optional):<br />
                  <textarea name="bemerkung" value={form.bemerkung} onChange={handleForm} rows={2} style={{width:"100%"}} />
                </label><br /><br />

                <label>
                  <input
                    type="checkbox"
                    name="agb"
                    checked={form.agb}
                    onChange={handleForm}
                    required
                    style={{marginRight:4}}
                  />
                  Ich akzeptiere die <a href="/agb" target="_blank">AGB</a>*
                </label><br />
                <label>
                  <input
                    type="checkbox"
                    name="datenschutz"
                    checked={form.datenschutz}
                    onChange={handleForm}
                    required
                    style={{marginRight:4}}
                  />
                  Ich akzeptiere die <a href="/datenschutz" target="_blank">Datenschutzbestimmungen</a>*
                </label><br /><br />

                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: 12,
                    background: "#1db954",
                    color: "#fff",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer"
                  }}>
                  Zur Bezahlung
                </button>
                <br /><br />
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    const bookingData = {
                      form: {
                    ...form,
                    abflugdatum: start,
                    rueckflugdatum: end,
                    },
                      type,
                      start,
                      end,
                      days,
                      price,
                      addOut,
                      addIn,
                      addTank,
                      addLade,
                    };
                    if (typeof window !== "undefined") {
                      localStorage.setItem("valet_booking", JSON.stringify(bookingData));
                    }
                  }}
                  style={{
                    width: "100%",
                    padding: 8,
                    background: "#ccc",
                    color: "#222",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: 8,
                    cursor: "pointer"
                  }}>
                  &larr; Zurück zur Auswahl
                </button>
              </form>
            </>
          )}
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
