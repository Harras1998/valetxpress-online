// fahrerliste.js
import { useState, useEffect } from "react";

// Hilfsfunktionen
function parseDate(dt, time) {
  if (!dt) return new Date(0);
  return new Date(`${dt}T${(time || "00:00")}:00`);
}
function formatDE(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const tag = d.getDate().toString().padStart(2, '0');
  const monat = (d.getMonth() + 1).toString().padStart(2, '0');
  const jahr = d.getFullYear();
  return `${tag}.${monat}.${jahr}`;
}
function priceDisplay(row) {
  let val = row.betrag || row.preis;
  if (!val) return "";
  if (typeof val === "string") val = val.replace(",", ".");
  return `${parseFloat(val).toFixed(0)} €`;
}

export default function FahrerListe() {
  const [tab, setTab] = useState("alle");
  const [list, setList] = useState([]);
  const [auth, setAuth] = useState("");
  const [login, setLogin] = useState({ user: "", pass: "" });
  const [suchtext, setSuchtext] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Login
  function handleLogin(e) {
    e.preventDefault();
    const encoded = btoa(`${login.user}:${login.pass}`);
    setAuth(encoded);
  }

  // Daten laden
  useEffect(() => {
    if (!auth) return;
    setLoading(true);
    let url = `/api/proxy?path=api/admin/buchungen&sort=abflugdatum&dir=asc`;
    if (suchtext) url += `&suchtext=${encodeURIComponent(suchtext)}`;
    fetch(url, { headers: { Authorization: `Basic ${auth}` } })
      .then(r => r.json())
      .then(data => { setList(data.buchungen || []); setLoading(false); })
      .catch(() => { setError("Fehler beim Laden"); setLoading(false); });
  }, [auth, suchtext]);

  // Filtern & Sortieren
  let filtered = list;
  const today = new Date();
  if (tab === "heute") {
    const isoToday = today.toISOString().slice(0, 10);
    filtered = filtered.filter(b => b.abflugdatum?.slice(0, 10) === isoToday);
  } else if (tab === "2tage") {
    const isoToday = today.toISOString().slice(0, 10);
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const isoTomorrow = tomorrow.toISOString().slice(0, 10);
    filtered = filtered.filter(b =>
      b.abflugdatum?.slice(0, 10) === isoToday || b.abflugdatum?.slice(0, 10) === isoTomorrow
    );
  }
  if (suchtext) {
    const search = suchtext.toLowerCase();
    filtered = filtered.filter(b =>
      (b.vorname + " " + b.nachname).toLowerCase().includes(search) ||
      (b.kennzeichen || "").toLowerCase().includes(search) ||
      (b.flugnummerHin || "").toLowerCase().includes(search) ||
      (b.flugnummerRueck || "").toLowerCase().includes(search)
    );
  }

  if (!auth)
    return (
      <div style={{ maxWidth: 400, margin: "5rem auto", background: "#fff", borderRadius: 12, padding: 32, boxShadow: "0 2px 12px #0002", fontFamily: "Arial" }}>
        <h2>Fahrer-Login</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Benutzername" value={login.user} onChange={e => setLogin({ ...login, user: e.target.value })} required style={{ width: "100%", marginBottom: 8 }} />
          <input type="password" placeholder="Passwort" value={login.pass} onChange={e => setLogin({ ...login, pass: e.target.value })} required style={{ width: "100%", marginBottom: 16 }} />
          <button type="submit" style={{ width: "100%", padding: "10px 0", background: "#1db954", color: "#fff", border: "none", borderRadius: 8, fontWeight: "bold" }}>Login</button>
        </form>
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
      </div>
    );

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      background: "#e2e2e2",
      fontFamily: "Arial, Helvetica, sans-serif",
      overflowX: "hidden"
    }}>
      {/* Tabs & Suche */}
      <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 18, paddingTop: 8, paddingLeft: 0 }}>
        <button
          onClick={() => setTab("heute")}
          style={{
            background: tab === "heute" ? "#6DB6E2" : "#fff",
            color: tab === "heute" ? "#fff" : "#222",
            fontWeight: "bold",
            fontSize: 32,
            padding: "3px 18px",
            border: "none",
            borderRadius: "14px 0 0 14px"
          }}>Heute</button>
        <button
          onClick={() => setTab("2tage")}
          style={{
            background: tab === "2tage" ? "#6DB6E2" : "#fff",
            color: tab === "2tage" ? "#fff" : "#222",
            fontWeight: "bold",
            fontSize: 32,
            padding: "3px 18px",
            border: "none"
          }}>2-Tage</button>
        <button
          onClick={() => setTab("alle")}
          style={{
            background: tab === "alle" ? "#6DB6E2" : "#fff",
            color: tab === "alle" ? "#fff" : "#222",
            fontWeight: "bold",
            fontSize: 32,
            padding: "3px 18px",
            border: "none",
            borderRadius: "0 14px 14px 0"
          }}>Alle</button>
        <input
          style={{
            flex: 1,
            minWidth: 160,
            marginLeft: 28,
            fontSize: 26,
            padding: "7px 22px",
            borderRadius: 10,
            border: "1px solid #bbb",
            marginRight: 0,
            maxWidth: 420
          }}
          placeholder="Suche nach Kennzeichen, Name, Flug…"
          value={suchtext}
          onChange={e => setSuchtext(e.target.value)}
        />
      </div>
      {/* Cards-Liste */}
      <div style={{ maxWidth: "100vw", margin: "auto" }}>
        {filtered.map(row => (
          <div
            key={row.id}
            style={{
              marginBottom: 0,
              borderRadius: 0,
              background: row.status === "beendet" || row.status === "gelandet" ? "#d5d5d5" : "#eee",
              padding: "0 0 0 0",
              boxShadow: "none",
              borderBottom: "1.8px solid #c7c7c7",
              borderTop: "none",
              display: "flex",
              alignItems: "flex-start",
              fontSize: "19px",
              width: "100%"
            }}
          >
            {/* Linker Bereich (Text) */}
            <div style={{ flex: 1, minWidth: 0, padding: "10px 0 12px 14px" }}>
              {/* Header-Zeile */}
              <div style={{ fontWeight: "bold", fontSize: 32, color: "#434343", marginBottom: 5, wordBreak: "break-word" }}>
                {row.abflugUhrzeit} | {row.terminal} | {row.status || "geplant"} | {row.typ} | {row.vorname} {row.nachname} | {row.reiseziel} |{" "}
                <a href={`tel:${row.telefon}`} style={{ color: "#001cff", textDecoration: "underline", fontWeight: 600, fontSize: 28 }}>{row.telefon}</a>
                <span style={{ color: "#444", fontWeight: 400, fontSize: 32 }}>|</span>
              </div>
              {/* Info-Zeile 1 */}
              <div style={{ fontSize: 22, color: "#434343", fontWeight: 600, marginBottom: 0, marginTop: 0 }}>
                {formatDE(row.abflugdatum)} {row.abflugUhrzeit} {row.flugnummerHin} | <span style={{ fontWeight: "bold" }}>Notizen:</span> {row.bemerkung}
              </div>
              {/* Info-Zeile 2 */}
              <div style={{ fontSize: 22, color: "#11a328", marginTop: 4, display: "flex", alignItems: "center" }}>
                <span>
                  {formatDE(row.rueckflugdatum)} {row.rueckflugUhrzeit} {row.flugnummerRueck}
                </span>
                <span style={{ color: "#434343", fontWeight: 700, margin: "0 10px 0 15px" }}>|</span>
                <span style={{ color: "#434343", fontWeight: "bold" }}>{row.kennzeichen}</span>
                {priceDisplay(row) &&
                  <>
                    <span style={{ color: "#434343", fontWeight: 700, margin: "0 10px 0 15px" }}>|</span>
                    <span style={{ color: "red", fontWeight: "bold", fontSize: 22 }}>{priceDisplay(row)}</span>
                  </>
                }
              </div>
            </div>
            {/* Icons rechts */}
            <div style={{ display: "flex", flexDirection: "row", gap: 42, alignItems: "center", minWidth: 240, justifyContent: "flex-end", padding: "15px 36px 0 0" }}>
              <span title="Bearbeiten" style={{ fontSize: 34, color: "#636363", cursor: "pointer" }}>✏️</span>
              <span title="Status" style={{ fontSize: 36, color: "#636363", cursor: "pointer" }}>✔️</span>
              <a href={`tel:${row.telefon}`}>
                <span title="Anrufen" style={{ fontSize: 36, color: "#636363", cursor: "pointer" }}>📞</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
