import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DatePicker, { registerLocale } from "react-datepicker";
import de from "date-fns/locale/de";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("de", de);

// Hilfsfunktion für deutsches Datumsformat
function toDE(dateObj) {
  if (!dateObj) return "";
  // Date zu dd.mm.yyyy
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, "0");
  const d = String(dateObj.getDate()).padStart(2, "0");
  return `${d}.${m}.${y}`;
}

function parseISODateOnly(dateStr) {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split("-");
  return new Date(Number(year), Number(month) - 1, Number(day));
}

const valetPrices = [95,97,99,110,116,117,119,120,126,128,131,136,139,143,148,149,150,154,157,161,166];
const extra = { außen:19, innen:95, tank:15, lade:19 };

function getValet(priceList, days) {
  if (days <= priceList.length) return priceList[days - 1];
  return priceList[priceList.length - 1] + (days - priceList.length) * 7;
}

function todayDateObj() {
  const t = new Date();
  t.setHours(12, 0, 0, 0);
  return t;
}

// ----------- Stunden:Minuten Picker -----------
function HourMinuteSelect({ value, onChange, name, required = false }) {
  let [h, m] = value ? value.split(":") : ["", ""];
  h = h || "";
  m = m || "";

  function handleHourChange(e) {
    const newH = e.target.value;
    const newVal = newH && m ? `${newH}:${m}` : newH ? `${newH}:00` : "";
    onChange({ target: { name, value: newVal } });
  }
  function handleMinuteChange(e) {
    const newM = e.target.value;
    const newVal = h && newM ? `${h}:${newM}` : "";
    onChange({ target: { name, value: newVal } });
  }

  return (
    <div style={{ display: "flex", gap: 6 }}>
      <select value={h} onChange={handleHourChange} required={required} style={{ flex: 1 }}>
        <option value="">--</option>
        {Array.from({ length: 24 }, (_, i) => (
          <option key={i} value={String(i).padStart(2, "0")}>
            {String(i).padStart(2, "0")}
          </option>
        ))}
      </select>
      <span>:</span>
      <select value={m} onChange={handleMinuteChange} required={required} style={{ flex: 1 }}>
        <option value="">--</option>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={String(i * 5).padStart(2, "0")}>
            {String(i * 5).padStart(2, "0")}
          </option>
        ))}
      </select>
    </div>
  );
}
// ----------- ENDE Stunden:Minuten Picker -----------

// --------- AUSGEBUCHT LOGIK ---------
const soldOutDates = [
  { from: "2025-07-25", to: "2025-07-28" },
  // beliebig ergänzen!
];

function isSoldOut(from, to) {
  if (!from || !to) return false;
  const fromStr = from.toISOString().split("T")[0];
  const toStr = to.toISOString().split("T")[0];
  return soldOutDates.some(
    period => (fromStr <= period.to && toStr >= period.from)
  );
}
// ------------------------------------

export default function Buchen() {
  const router = useRouter();
  // *** ACHTUNG: start und end sind Date-Objekte ***
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const [type, setType] = useState("valet");
  const [days, setDays] = useState(0);
  const [price, setPrice] = useState(0);
  const [addOut, setAddOut] = useState(false);
  const [addIn, setAddIn] = useState(false);
  const [addTank, setAddTank] = useState(false);
  const [addLade, setAddLade] = useState(false);
  const [step, setStep] = useState(1);

// <-- HIER EINBAUEN (anstelle des alten Blocks)
useEffect(() => {
  if (router.isReady) {
    const s = router.query.step;
    if (s === "2") {
      setStep(2);

      // Daten aus localStorage wiederherstellen
      if (typeof window !== "undefined") {
        const bookingString = localStorage.getItem("valet_booking");
        if (bookingString) {
          try {
            const booking = JSON.parse(bookingString);

            // Form-Felder und weitere States übernehmen
            if (booking.form) setForm(booking.form);
            if (booking.start) setStart(parseISODateOnly(booking.start));
if (booking.end) setEnd(parseISODateOnly(booking.end));
            if (booking.type) setType(booking.type);
            if (booking.days) setDays(booking.days);
            if (booking.price) setPrice(booking.price);
            if (typeof booking.addOut !== "undefined") setAddOut(booking.addOut);
            if (typeof booking.addIn !== "undefined") setAddIn(booking.addIn);
            if (typeof booking.addTank !== "undefined") setAddTank(booking.addTank);
            if (typeof booking.addLade !== "undefined") setAddLade(booking.addLade);
          } catch (e) {
            // Ignoriere Fehler beim Parsen
          }
        }
      }
    }
  }
}, [router.isReady, router.query.step]);

  const [dateError, setDateError] = useState("");
  const [returnDateError, setReturnDateError] = useState("");
  const [soldOutStatus, setSoldOutStatus] = useState("");
  const [lastAvailable, setLastAvailable] = useState({ start: null, end: null });

  const [form, setForm] = useState({
    firma: "",    
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
    anzahl_personen: "",    
    handgepaeck: false,
    bemerkung: "",
    agb: false,
    datenschutz: false,
  });

  // Vorbelegung mit localStorage, falls vorhanden
useEffect(() => {
  if (typeof window !== "undefined") {
    let bookingInit = {};
    try {
      bookingInit = JSON.parse(localStorage.getItem("valet_booking_init")) || {};
    } catch { bookingInit = {}; }
    const startParsed = parseISODateOnly(bookingInit.from);
    const endParsed = parseISODateOnly(bookingInit.to);
    setStart(startParsed);
    setEnd(endParsed);
    setForm(f => ({
      ...f,
      abflugdatum: bookingInit.from || "",
      rueckflugdatum: bookingInit.to || ""
    }));
    setLastAvailable({
      start: startParsed,
      end: endParsed
    });
  }
}, []);

  useEffect(() => {
    if (
      start &&
      end &&
      !isSoldOut(start, end)
    ) {
      setLastAvailable({
        start,
        end
      });
    }
  }, [start, end]);

  useEffect(() => {
    if (!end || (start && end <= start)) {
      if (start) {
        const d = new Date(start);
        d.setDate(d.getDate() + 1);
        d.setHours(12, 0, 0, 0);
        setEnd(d);
      }
    }
  }, [start]);

  useEffect(() => {
    if (!start || !end || (start && end <= start)) {
      setDays(0); setPrice(0); return;
    }
    const d = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
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

  function handleForm(e) {
    const { name, value, type, checked } = e.target;
    setForm({ 
      ...form, 
      [name]: type === "checkbox" ? checked : value 
    });
  }

  function handleBookingSubmit(e) {
    e.preventDefault();
    const fromString = start ? start.toISOString().split("T")[0] : "";
    const toString = end ? end.toISOString().split("T")[0] : "";
    const bookingData = {
      form: {
        ...form,
        abflugdatum: fromString,
        rueckflugdatum: toString,
      },
      type,
      start: fromString,
      end: toString,
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

    router.push("/zahlung");
  }

  function handleStartChange(date) {
    if (!date) return;
    let rueck = end;
    if (!rueck || (date && rueck <= date)) {
      rueck = new Date(date);
      rueck.setDate(rueck.getDate() + 1);
      rueck.setHours(12, 0, 0, 0);
    }
    if (isSoldOut(date, rueck)) {
      setSoldOutStatus("Für den gewählten Zeitraum ist leider kein Parkplatz verfügbar! Zeitraum wurde zurückgesetzt.");
      setStart(lastAvailable.start || date);
      setEnd(lastAvailable.end || rueck);
      setTimeout(() => setSoldOutStatus(""), 3500);
      return;
    }
    if (date < todayDateObj()) {
      const todayObj = todayDateObj();
      setStart(todayObj);
      setDateError("Das Abflugdatum darf nicht in der Vergangenheit liegen.");
      setTimeout(() => setDateError(""), 3500);
    } else {
      setStart(date);
      setEnd(rueck);
      setDateError("");
      setSoldOutStatus("");
    }
  }
  function handleEndChange(date) {
    if (!date) return;
    if (start && date <= start) {
      const next = new Date(start);
      next.setDate(next.getDate() + 1);
      next.setHours(12, 0, 0, 0);
      setEnd(next);
      setReturnDateError("Das Rückflugdatum muss nach dem Abflugdatum liegen.");
      setTimeout(() => setReturnDateError(""), 3500);
      return;
    }
    if (isSoldOut(start, date)) {
      setSoldOutStatus("Für den gewählten Zeitraum ist leider kein Parkplatz verfügbar! Zeitraum wurde zurückgesetzt.");
      setStart(lastAvailable.start || start);
      setEnd(lastAvailable.end || date);
      setTimeout(() => setSoldOutStatus(""), 3500);
      return;
    }
    setEnd(date);
    setReturnDateError("");
    setSoldOutStatus("");
  }

  const minDate = todayDateObj();

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
                {/* Abflugdatum DatePicker */}
                <div style={{marginBottom: 8}}>
                  <label>Abflugdatum:<br />
                    <DatePicker
                      locale="de"
                      dateFormat="dd.MM.yyyy"
                      selected={start}
                      onChange={handleStartChange}
                      minDate={minDate}
                      placeholderText="Abflugdatum"
                      selectsStart
                      startDate={start}
                      endDate={end}
                      showPopperArrow={false}
                      required
                    />
                  </label>
                  {dateError && (
                    <div style={{color: "#e53935", fontSize: "0.97rem", marginTop: 4}}>
                      {dateError}
                    </div>
                  )}
                </div>
                {/* Rückflugdatum DatePicker */}
                <div>
                  <label>Rückflugdatum:<br />
                    <DatePicker
                      locale="de"
                      dateFormat="dd.MM.yyyy"
                      selected={end}
                      onChange={handleEndChange}
                      minDate={start ? new Date(start.getTime() + 86400000) : minDate}
                      placeholderText="Rückflugdatum"
                      selectsEnd
                      startDate={start}
                      endDate={end}
                      showPopperArrow={false}
                      required
                    />
                  </label>
                  {returnDateError && (
                    <div style={{color: "#e53935", fontSize: "0.97rem", marginTop: 4}}>
                      {returnDateError}
                    </div>
                  )}
                </div>
                {/* AUSGEBUCHT Status-Hinweis */}
                {soldOutStatus && (
                  <div style={{color: "#e53935", fontWeight: "bold", marginTop: 10}}>
                    {soldOutStatus}
                  </div>
                )}
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
                  const fromString = start ? start.toISOString().split("T")[0] : "";
                  const toString = end ? end.toISOString().split("T")[0] : "";
                  setForm(f => ({
                    ...f,
                    abflugdatum: fromString,
                    rueckflugdatum: toString,
                  }));
                  const bookingData = {
                    form: {
                      ...form,
                      abflugdatum: fromString,
                      rueckflugdatum: toString,
                    },
                    type,
                    start: fromString,
                    end: toString,
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
                <label>Firma (optional):<br />
  <input name="firma" value={form.firma} onChange={handleForm} style={{width:"100%"}} />
</label>
<br />
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
</div>
<br />
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
                <label>Mobilfunk Nr./Telefon Nr.*: <br />
                  <input name="telefon" type="tel" value={form.telefon} onChange={handleForm} required style={{width:"100%"}} />
                </label><br /><br />
                <label>Fahrzeugtyp/Modell: <br />
                  <input name="auto" value={form.auto} onChange={handleForm} style={{width:"100%"}} />
                </label><br /><br />
                <label>KFZ-Kennzeichen*: <br />
                  <input name="kennzeichen" value={form.kennzeichen} onChange={handleForm} required style={{width:"100%"}} />
                </label><br /><br />
                <label>Geplante Ankunftszeit am Treffpunkt (Flughafen) vor Abflug*:<br />
                  <HourMinuteSelect name="ankunftUhrzeit" value={form.ankunftUhrzeit} onChange={handleForm} required style={{width:"100%"}} />
                </label><br /><br />
                <label>Abflugdatum*: <br />
                  <DatePicker
                    locale="de"
                    dateFormat="dd.MM.yyyy"
                    selected={start}
                    onChange={handleStartChange}
                    minDate={minDate}
                    placeholderText="Abflugdatum"
                    selectsStart
                    startDate={start}
                    endDate={end}
                    showPopperArrow={false}
                    required
                    disabled
                    style={{width:"100%"}}
                  />
                </label><br /><br />
                <label>Abflug-Uhrzeit*: <br />
                  <HourMinuteSelect name="abflugUhrzeit" value={form.abflugUhrzeit} onChange={handleForm} required  style={{width:"100%"}} />
                </label><br /><br />
                <label>Rückflugdatum*: <br />
                  <DatePicker
                    locale="de"
                    dateFormat="dd.MM.yyyy"
                    selected={end}
                    onChange={handleEndChange}
                    minDate={start ? new Date(start.getTime() + 86400000) : minDate}
                    placeholderText="Rückflugdatum"
                    selectsEnd
                    startDate={start}
                    endDate={end}
                    showPopperArrow={false}
                    required
                    disabled
                    style={{width:"100%"}}
                  />
                </label><br /><br />
                <label>Rückflug-Uhrzeit (planmäßige Landung)*: <br />
                  <HourMinuteSelect name="rueckflugUhrzeit" value={form.rueckflugUhrzeit} onChange={handleForm} required style={{width:"100%"}} />
                </label><br /><br />
                <label>Reiseziel*:<br />
                  <input name="reiseziel" value={form.reiseziel} onChange={handleForm} required style={{width:"100%"}} />
                </label><br /><br />
                <label>Fluggesellschaft: <br />
                  <input name="fluggesellschaft" value={form.fluggesellschaft} onChange={handleForm} style={{width:"100%"}} />
                </label><br /><br />
                <label>Flugnummer Hinflug*:<br />
                  <input name="flugnummerHin" value={form.flugnummerHin} onChange={handleForm} required style={{width:"100%"}} />
                </label><br /><br />
                <label>Flugnummer Rückflug*:<br />
                  <input name="flugnummerRueck" value={form.flugnummerRueck} onChange={handleForm} required style={{width:"100%"}} />
                </label><br /><br />
                <label>Terminal (z.B. T1, T2): <br />
                  <input name="terminal" value={form.terminal} onChange={handleForm} style={{width:"100%"}} />
                </label><br /><br />
<label>Anzahl der Personen*:<br />
  <input
    name="anzahl_personen"
    type="number"
    min="1"
    max="10"
    required
    value={form.anzahl_personen}
    onChange={handleForm}
    style={{width:"100%"}}
  />
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
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginBottom: 14,
                  marginTop: -8
                }}>
                  <span style={{ color: "#888", fontSize: "0.97rem", lineHeight: 1 }}>
                    *Pflichtfelder
                  </span>
                </div>
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
                    const fromString = start ? start.toISOString().split("T")[0] : "";
                    const toString = end ? end.toISOString().split("T")[0] : "";
                    const bookingData = {
                      form: {
                        ...form,
                        abflugdatum: fromString,
                        rueckflugdatum: toString,
                      },
                      type,
                      start: fromString,
                      end: toString,
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
