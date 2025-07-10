import { useState, useEffect } from "react";

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
function parkModellStr(str) {
  if (!str) return "";
  str = str.toLowerCase();
  if (str.startsWith("valet")) return "Valet";
  return "All";
}

export default function FahrerListe() {
  const [tab, setTab] = useState("alle");
  const [list, setList] = useState([]);
  const [auth, setAuth] = useState("");
  const [login, setLogin] = useState({ user: "", pass: "" });
  const [suchtext, setSuchtext] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    const encoded = btoa(`${login.user}:${login.pass}`);
    setAuth(encoded);
  }

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
  filtered = [...filtered].sort((a, b) => {
    const a1 = parseDate(a.abflugdatum, a.abflugUhrzeit);
    const b1 = parseDate(b.abflugdatum, b.abflugUhrzeit);
    if (a1 < b1) return -1;
    if (a1 > b1) return 1;
    const a2 = parseDate(a.rueckflugdatum, a.rueckflugUhrzeit);
    const b2 = parseDate(b.rueckflugdatum, b.rueckflugUhrzeit);
    return a2 - b2;
  });

  function cardColor(b) {
    const now = new Date();
    const abflug = parseDate(b.abflugdatum, b.abflugUhrzeit);
    const rueck = parseDate(b.rueckflugdatum, b.rueckflugUhrzeit);
    if (now < abflug) return "#fff";
    if (now >= abflug && now < rueck) return "#eee";
    return "#e0e0e0";
  }

  function priceDisplay(row) {
    let val = row.betrag || row.preis;
    if (!val) return "";
    if (typeof val === "string") val = val.replace(",", ".");
    return `${parseFloat(val).toFixed(0)} €`;
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

      <div style={{padding:12, color:"#777", fontSize:14}}>
        {loading ? "Lade Daten..." : ""}
        <b> Anzahl Fahrten: {filtered.length}</b>
      </div>

      <div>
        {filtered.length === 0 && (
          <div style={{margin:30, color:'#888', fontSize:20}}>Keine Fahrten gefunden.</div>
        )}
        {filtered.map(row => (
          <div
            key={row.id}
            style={{
              marginBottom: 16,
              borderRadius: 12,
              background: cardColor(row),
              padding: "16px 22px",
              boxShadow: "0 2px 8px #0001",
              border: "1px solid #ccc",
              display: "flex",
              alignItems: "flex-start",
              gap: 15,
              fontSize: "17px"
            }}
          >
            <div style={{ flex: 1 }}>
              {/* Überschrift */}
              <div style={{ fontWeight: "bold", fontSize: 22, marginBottom: 2 }}>
                {row.abflugUhrzeit} | {row.terminal} | {row.status || "geplant"} | {parkModellStr(row.typ)} | {row.vorname} {row.nachname} | {row.reiseziel} |{" "}
                <a href={`tel:${row.telefon}`} style={{ color: "#001cff", textDecoration: "underline", fontWeight: 600 }}>{row.telefon}</a>
              </div>
              {/* Abflugdatum, Abfluguhrzeit und FlugnummerHin: alles fett und in #444 */}
              <div style={{ fontSize: 17, margin: "3px 0", color: "#444", display: "flex", alignItems: "center" }}>
                <b>{formatDE(row.abflugdatum)}</b>
                <span style={{ marginLeft: 8, fontWeight: 600, color: "#444" }}>
                  {row.abflugUhrzeit} {row.flugnummerHin}
                </span>
                <span style={{ marginLeft: 12 }}>| <b>Notizen:</b> {row.bemerkung}</span>
              </div>
              {/* Rückflug-Info | Kennzeichen | Preis */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 17, marginTop: 2 }}>
                <span style={{ color: "#16b000", fontWeight: 600 }}>
                  {formatDE(row.rueckflugdatum)} {row.rueckflugUhrzeit} {row.flugnummerRueck}
                </span>
                <span style={{ fontWeight: "bold", color: "#111", marginLeft: 12 }}>{row.kennzeichen}</span>
                <span style={{ color: "red", fontWeight: "bold", marginLeft: 12 }}>{priceDisplay(row)}</span>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "flex-end" }}>
              <button style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer" }} title="Bearbeiten">✏️</button>
              <button style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "purple" }} title="Status">✔️</button>
              <a href={`tel:${row.telefon}`}>
                <button style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "crimson" }} title="Anrufen">📞</button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
