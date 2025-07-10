import { useState, useEffect } from "react";

function parseDate(dt, time) {
  // Hilfsfunktion: kombiniere Datum+Uhrzeit (z.B. 2025-07-10 + 17:00)
  if (!dt) return new Date(0);
  return new Date(`${dt}T${(time || "00:00")}:00`);
}

function euro(val) {
  if (!val) return "";
  if (typeof val === "number") return val.toFixed(2) + " €";
  if (typeof val === "string") return val.replace('.', ',') + " €";
  return val + " €";
}

export default function FahrerListe() {
  const [tab, setTab] = useState("alle");
  const [list, setList] = useState([]);
  const [auth, setAuth] = useState("");
  const [login, setLogin] = useState({ user: "", pass: "" });
  const [suchtext, setSuchtext] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

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
  // Sortieren nach Abflug- und Rückflugdatum/-zeit
  filtered = [...filtered].sort((a, b) => {
    const a1 = parseDate(a.abflugdatum, a.abflugUhrzeit);
    const b1 = parseDate(b.abflugdatum, b.abflugUhrzeit);
    if (a1 < b1) return -1;
    if (a1 > b1) return 1;
    const a2 = parseDate(a.rueckflugdatum, a.rueckflugUhrzeit);
    const b2 = parseDate(b.rueckflugdatum, b.rueckflugUhrzeit);
    return a2 - b2;
  });

  // Card-Color: Weiß für Abflug steht an, grau nach Landung/Rückflug
  function cardColor(b) {
    const now = new Date();
    const abflug = parseDate(b.abflugdatum, b.abflugUhrzeit);
    const rueck = parseDate(b.rueckflugdatum, b.rueckflugUhrzeit);
    if (now < abflug) return "#fff";
    if (now >= abflug && now < rueck) return "#eee";
    return "#e0e0e0";
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
    <div style={{ maxWidth: 900, margin: "1rem auto", fontFamily: "Arial" }}>
      {/* Tabs/Filter */}
      <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
        {["heute", "2tage", "alle"].map(t => (
          <button
            key={t}
            style={{
              background: tab === t ? "#24b45b" : "#bbb",
              color: "#fff",
              fontWeight: "bold",
              padding: "8px 24px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setTab(t)}
          >
            {t === "heute" ? "Heute" : t === "2tage" ? "2-Tage" : "Alle"}
          </button>
        ))}
        <input
          style={{ flex: 1, minWidth: 220, fontSize: 16, padding: "8px 10px", borderRadius: 8, border: "1px solid #ccc" }}
          placeholder="Suche nach Kennzeichen, Name, Flug…"
          value={suchtext}
          onChange={e => setSuchtext(e.target.value)}
        />
      </div>

      {/* Debug-Bereich */}
      <div style={{padding:12, color:"#777", fontSize:14}}>
        {loading ? "Lade Daten..." : ""}
        <b> Anzahl Fahrten: {filtered.length}</b>
      </div>

      {/* Fahrerliste */}
      <div>
        {filtered.length === 0 && (
          <div style={{margin:30, color:'#888', fontSize:20}}>Keine Fahrten gefunden.</div>
        )}
        {filtered.map(row => (
          <div
            key={row.id}
            style={{
              marginBottom: 16,
              borderRadius: 8,
              background: cardColor(row),
              padding: "16px 22px",
              boxShadow: "0 2px 8px #0001",
              border: "1px solid #ccc",
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              fontSize: "16px"
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 2 }}>
                {row.abflugUhrzeit} | {row.terminal} | {row.status || "geplant"} | {row.auto} | {row.vorname} {row.nachname} | {row.reiseziel} | <a href={`tel:${row.telefon}`} style={{ color: "#0277FF" }}>{row.telefon}</a>
              </div>
              <div style={{ fontSize: 15, margin: "3px 0" }}>
                <b>{row.abflugdatum}</b> {row.abflugUhrzeit} {row.flugnummerHin} | <b>Notizen:</b> {row.bemerkung}
              </div>
              <div style={{ fontSize: 15, margin: "3px 0", color: "#008000" }}>
                {row.rueckflugdatum} {row.rueckflugUhrzeit} {row.flugnummerRueck} | <span style={{ color: "red", fontWeight: "bold" }}>{row.betrag ? euro(row.betrag) : row.preis ? euro(row.preis) : ""}</span>
              </div>
              <div style={{ fontSize: 16, marginTop: 2 }}>
                {row.kennzeichen && <b>{row.kennzeichen}</b>}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button style={{ background: "none", border: "none", fontSize: 23, cursor: "pointer" }} title="Bearbeiten">✏️</button>
              <button style={{ background: "none", border: "none", fontSize: 23, cursor: "pointer" }} title="Status">✔️</button>
              <a href={`tel:${row.telefon}`}>
                <button style={{ background: "none", border: "none", fontSize: 23, cursor: "pointer" }} title="Anrufen">📞</button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
