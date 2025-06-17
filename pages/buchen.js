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

  // Vorauswahl nach Query-Parameter beim ersten Laden
  useEffect(() => {
    if (!router.isReady) return;
    const qType = router.query.type;
    if (qType === "allinclusive" || qType === "valet") setType(qType);
  }, [router.isReady, router.query]);

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
    abflug: "",
    abflugUhrzeit: "",
    ankunftUhrzeit: "",
    rueckflug: "",
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
    // All-Inclusive enthält immer Innen + Außen
    if (type === "allinclusive") {
      base += extra.außen + extra.innen;
      setAddOut(true); setAddIn(true);
    } else {
      base += (addOut ? extra.außen : 0) + (addIn ? extra.innen : 0);
    }
    // Zusatzleistungen
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

  function handleForm(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  function handleBookingSubmit(e) {
    e.preventDefault();
    alert("Buchung abgesendet! (E-Mail-Integration kann hier ergänzt werden)");
  }

  const minDate = todayStr();

  return (
    <>
      <Header />
      <main style={{ minHeight: "80vh", background: "#e5e7eb", padding: "2rem 0" }}>
        <div style={{ maxWidth: 520, margin: "2rem auto", padding: 20, background: "#f4f4f4", borderRadius: 16 }}>
          {step === 1 && (
            <>
              <h2 style={{ textAlign: "center", color: "#1db954" }}>Parkplatz buchen</h2>
              <label>Park-Modell:<br />
                <select value={type} onChange={e => setType(e.target.value)}>
                  <option value="valet">Valet-Parking</option>
                  <option value="allinclusive">All-Inclusive‑Parking</option>
                </select>
              </label><br /><br />

              <label>Anreise:<br />
                <input
                  type="date"
                  min={minDate}
                  value={start}
                  onChange={e => setStart(e.target.value)}
                />
              </label><br /><br />

              <label>Abreise:<br />
                <input
                  type="date"
                  min={start ? (() => {
                    const next = new Date(start);
                    next.setDate(next.getDate() + 1);
                    return next.toISOString().split("T")[0];
                  })() : minDate}
                  value={end}
                  onChange={e => setEnd(e.target.value)}
                />
              </label><br /><br />

              {(type === "valet" && days > 0) &&
                <div style={{ marginBottom: 16 }}>
                  <label>
                    <input type="checkbox" checked={addOut} onChange={e => setAddOut(e.target.checked)} />
                    Außenreinigung (+{extra.außen} €)
                  </label><br />
                  <label>
                    <input type="checkbox" checked={addIn} onChange={e => setAddIn(e.target.checked)} />
                    Innenreinigung (+{extra.innen} €)
                  </label><br />
                  <label>
                    <input type="checkbox" checked={addTank} onChange={e => setAddTank(e.target.checked)} />
                    Tankservice (+{extra.tank} €)
                  </label><br />
                  <label>
                    <input type="checkbox" checked={addLade} onChange={e => setAddLade(e.target.checked)} />
                    Ladeservice für Elektrofahrzeuge exkl. Stromkosten (+{extra.lade} €)
                  </label>
                </div>
              }
              {(type === "allinclusive" && days > 0) &&
                <div style={{ marginBottom: 16 }}>
                  <label>
                    <input type="checkbox" checked={true} disabled />
                    Außenreinigung (inkl.)
                  </label><br />
                  <label>
                    <input type="checkbox" checked={true} disabled />
                    Innenreinigung (inkl.)
                  </label><br />
                  <label>
                    <input type="checkbox" checked={addTank} onChange={e => setAddTank(e.target.checked)} />
                    Tankservice (+{extra.tank} €)
                  </label><br />
                  <label>
                    <input type="checkbox" checked={addLade} onChange={e => setAddLade(e.target.checked)} />
                    Ladeservice für Elektrofahrzeuge exkl. Stromkosten (+{extra.lade} €)
                  </label>
                </div>
              }

              {days > 0 &&
                <div style={{ background: "#1db954", color: "#fff", padding: 16, borderRadius: 8, fontWeight: "bold" }}>
                  Aufenthalt: {days} Tag(e) • Gesamtpreis: {price} €
                </div>
              }

              <div style={{
                marginTop: 12,
                background: "#e1fbe9",
                border: "1px solid #1db95444",
                color: "#1db954",
                borderRadius: 8,
                padding: 10,
                fontWeight: "bold",
                fontSize: "1.08rem"
              }}>
                Buchungen können kostenfrei geändert oder storniert werden.
              </div>
              <br />

              <button
                disabled={days < 1}
                style={{
                  width: "100%",
                  padding: 12,
                  background: "#1db954",
                  color: "#fff",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: 8,
                  cursor: days < 1 ? "not-allowed" : "pointer",
                  opacity: days < 1 ? 0.6 : 1
                }}
                onClick={() => setStep(2)}
              >
                Jetzt buchen
              </button>
            </>
          )}

          {step === 2 && (
            <form onSubmit={handleBookingSubmit} autoComplete="off">
              <h2 style={{ textAlign: "center", color: "#1db954" }}>Persönliche Daten & Fluginformation</h2>
              
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#e1fbe9",
                  border: "1px solid #1db95444",
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 16,
                  flexWrap: "wrap"
                }}
              >
                <div style={{ fontSize: 17, minWidth: 180, flex: 1 }}>
                  <strong>Park-Modell:</strong> {type === "valet" ? "Valet-Parking" : "All-Inclusive‑Parking"}<br />
                  <strong>Anreise:</strong> {toDE(start)}<br />
                  <strong>Abreise:</strong> {toDE(end)}<br />
                  <strong>Aufenthaltsdauer:</strong> {days} Tage<br />
                  {(type === "valet" && (addOut || addIn || addTank || addLade)) && (
                    <>
                      <strong>Reinigung:</strong> 
                      {[addOut ? "Außen" : null, addIn ? "Innen" : null].filter(Boolean).join(" & ") || "-"}<br />
                      {addTank && <span>Tankservice<br /></span>}
                      {addLade && <span>Ladeservice<br /></span>}
                    </>
                  )}
                  {(type === "allinclusive" && (addTank || addLade)) && (
                    <>
                      <strong>Zusatzleistungen:</strong><br />
                      {addTank && <span>Tankservice<br /></span>}
                      {addLade && <span>Ladeservice<br /></span>}
                    </>
                  )}
                </div>
                <div style={{
                  minWidth: 120,
                  textAlign: "right",
                  fontSize: 28,
                  color: "#1db954",
                  fontWeight: "bold",
                  flex: 0.7
                }}>
                  {price} €
                </div>
              </div>

              <div style={{
                marginBottom: 16,
                background: "#e1fbe9",
                border: "1px solid #1db95444",
                color: "#1db954",
                borderRadius: 8,
                padding: 10,
                fontWeight: "bold",
                fontSize: "1.08rem"
              }}>
                Buchungen können kostenfrei geändert oder storniert werden.
              </div>

              {/* ... (Persönliche Daten Felder wie im vorherigen Code) ... */}
              {/* Gleicher Block wie vorher für die Felder, nur reinkopieren */}
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
                <input name="ankunftUhrzeit" type="time" value={form.ankunftUhrzeit} onChange={handleForm} required style={{width:"100%"}} />
              </label><br /><br />

              <label>Abflugdatum*: <br />
                <input
                  name="abflug"
                  type="date"
                  min={minDate}
                  value={form.abflug}
                  onChange={handleForm}
                  required
                  style={{width:"100%"}}
                />
              </label><br /><br />

              <label>Abflug-Uhrzeit*: <br />
                <input name="abflugUhrzeit" type="time" value={form.abflugUhrzeit} onChange={handleForm} required style={{width:"100%"}} />
              </label><br /><br />

              <label>Rückflugdatum*: <br />
                <input
                  name="rueckflug"
                  type="date"
                  min={minDate}
                  value={form.rueckflug}
                  onChange={handleForm}
                  required
                  style={{width:"100%"}}
                />
              </label><br /><br />

              <label>Rückflug-Uhrzeit*: <br />
                <input name="rueckflugUhrzeit" type="time" value={form.rueckflugUhrzeit} onChange={handleForm} required style={{width:"100%"}} />
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
                Buchung absenden
              </button>
              <br /><br />
              <button
                type="button"
                onClick={() => setStep(1)}
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
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
