// fahrerliste.js
import { useState, useEffect } from "react";

// Header-Komponente (wie vorher)
function PXHeader({
  username,
  tab,
  setTab,
  suchtext,
  setSuchtext,
  sort,
  setSort,
  onLogout,
}) {
  return (
    <div style={{ width: "100%", background: "linear-gradient(#222 85%,#eee 100%)", margin: 0, padding: 0 }}>
      {/* Top bar */}
      <div style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "0 0 0 24px",
        height: 56,
        background: "linear-gradient(#222,#222 85%,#222a 100%)",
        borderBottom: "1.5px solid #666",
        color: "#fff",
        fontSize: 28,
        fontWeight: "bold",
        letterSpacing: 0.5,
        fontFamily: "Arial, Helvetica, sans-serif"
      }}>
        <div style={{ fontSize: 28, fontWeight: "bold" }}>{username || ""}</div>
        <div style={{ flex: 1, textAlign: "center", fontWeight: "bold", fontSize: 28 }}>
          <span style={{ color: "#fff" }}>Valet</span>
          <span style={{ color: "#a2ff44" }}>X</span>
          <span style={{ color: "#fff" }}>press-</span>
          <span style={{ color: "#fff", fontWeight: 400, fontSize: 24 }}>Fahrerliste</span>
        </div>
        <div style={{ minWidth: 50, textAlign: "right", paddingRight: 28 }}>
          <span
            style={{
              fontSize: 36,
              fontWeight: 200,
              color: "#fff",
              cursor: "pointer",
              userSelect: "none",
              transition: "color 0.2s"
            }}
            title="Abmelden"
            onClick={onLogout}
          >&#x23FB;</span>
        </div>
      </div>
      {/* Tabs + Suche + Sortieren + Logo */}
      <div style={{
        background: "#ededed",
        width: "100%",
        minHeight: 68,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1.5px solid #dedede"
      }}>
        {/* Tabs */}
        <div style={{ display: "flex", alignItems: "center", marginLeft: 14, gap: 0 }}>
          <button
            onClick={() => setTab("heute")}
            style={{
              background: tab === "heute" ? "#6DB6E2" : "#fff",
              color: tab === "heute" ? "#fff" : "#222",
              fontWeight: "bold",
              fontSize: 24,
              padding: "7px 36px",
              border: "1px solid #ccc",
              borderRight: "none",
              borderRadius: "16px 0 0 16px"
            }}>Heute</button>
          <button
            onClick={() => setTab("2tage")}
            style={{
              background: tab === "2tage" ? "#6DB6E2" : "#fff",
              color: tab === "2tage" ? "#fff" : "#222",
              fontWeight: "bold",
              fontSize: 24,
              padding: "7px 36px",
              border: "1px solid #ccc",
              borderRight: "none",
              borderLeft: "none",
              borderRadius: 0
            }}>2-Tage</button>
          <button
            onClick={() => setTab("alle")}
            style={{
              background: tab === "alle" ? "#6DB6E2" : "#fff",
              color: tab === "alle" ? "#fff" : "#222",
              fontWeight: "bold",
              fontSize: 24,
              padding: "7px 36px",
              border: "1px solid #ccc",
              borderLeft: "none",
              borderRadius: "0 16px 16px 0"
            }}>Alle</button>
        </div>
        {/* Suchfeld */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", margin: "0 26px", maxWidth: 620 }}>
          <input
            type="text"
            value={suchtext}
            onChange={e => setSuchtext(e.target.value)}
            placeholder="Suche nach Kennzeichen, Name, Flug…"
            style={{
              width: "100%",
              fontSize: 18,
              padding: "7px 15px",
              borderRadius: 8,
              border: "1px solid #bbb",
              marginLeft: 16,
              marginRight: 16
            }}
          />
        </div>
        {/* Sortieren + Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 32, marginRight: 38 }}>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            style={{
              color: "#1689ca",
              fontSize: 22,
              fontWeight: "bold",
              border: "none",
              background: "none",
              textDecoration: "underline",
              cursor: "pointer",
              marginRight: 20
            }}
          >
            <option value="abflugdatum">Sortieren: Abflugdatum</option>
            <option value="rueckflugdatum">Sortieren: Rückflugdatum</option>
            <option value="name">Sortieren: Name</option>
          </select>
          <img src="/parkxpress-logo.png" alt="PARKXPRESS" height={58} style={{ marginLeft: 18, marginRight: 10 }} />
        </div>
      </div>
    </div>
  );
}

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
  const [sort, setSort] = useState("abflugdatum");
  const [username, setUsername] = useState("");

  // Login
  function handleLogin(e) {
    e.preventDefault();
    const encoded = btoa(`${login.user}:${login.pass}`);
    setAuth(encoded);
    setUsername(login.user);
  }
  function handleLogout() {
    setAuth("");
    setUsername("");
    setLogin({ user: "", pass: "" });
  }

  // Daten laden
  useEffect(() => {
    if (!auth) return;
    setLoading(true);
    let url = `/api/proxy?path=api/admin/buchungen&sort=${sort}&dir=asc`;
    if (suchtext) url += `&suchtext=${encodeURIComponent(suchtext)}`;
    fetch(url, { headers: { Authorization: `Basic ${auth}` } })
      .then(r => r.json())
      .then(data => { setList(data.buchungen || []); setLoading(false); })
      .catch(() => { setError("Fehler beim Laden"); setLoading(false); });
  }, [auth, suchtext, sort]);

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
  filtered = [...filtered].sort((a, b) => {
    // Sortierung über das Dropdown
    if (sort === "name") {
      const an = (a.nachname + a.vorname).toLowerCase();
      const bn = (b.nachname + b.vorname).toLowerCase();
      if (an < bn) return -1;
      if (an > bn) return 1;
    }
    // Default: Abflugdatum dann Rückflugdatum
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
    <div style={{
      width: "100%",
      minHeight: "100vh",
      background: "#e2e2e2",
      fontFamily: "Arial",
      overflowX: "hidden"
    }}>
      <PXHeader
        username={username}
        tab={tab}
        setTab={setTab}
        suchtext={suchtext}
        setSuchtext={setSuchtext}
        sort={sort}
        setSort={setSort}
        onLogout={handleLogout}
      />

      {/* Buchungs-Liste - KEIN maxWidth, sondern volle Breite! */}
      <div style={{ width: "100%", margin: "0", padding: 0 }}>
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
                marginBottom: 0,
                borderRadius: 0,
                background: cardColor(row),
                padding: "16px 22px",
                boxShadow: "none",
                border: "none",
                borderBottom: "1.5px solid #c8c8c8",
                display: "flex",
                alignItems: "flex-start",
                fontSize: "28px",
                fontFamily: "Arial, Helvetica, sans-serif",
                width: "100%"
              }}
            >
              <div style={{ flex: 1 }}>
                {/* Überschrift */}
                <div style={{ fontWeight: "bold", fontSize: 32, marginBottom: 2 }}>
                  {row.abflugUhrzeit} | {row.terminal} | {row.status || "geplant"} | {row.typ === "AllInclusive" ? "All" : row.typ.charAt(0).toUpperCase() + row.typ.slice(1)} | {row.vorname} {row.nachname} | {row.reiseziel} |{" "}
                  <a href={`tel:${row.telefon}`} style={{ color: "#001cff", textDecoration: "underline", fontWeight: 600 }}>{row.telefon}</a>
                </div>
                {/* Abflugdatum & Notizen */}
                <div style={{ fontSize: 23, margin: "17px 0 0 0", color: "#444", display: "flex", alignItems: "center" }}>
                  <span style={{ fontWeight: "bold" }}>{formatDE(row.abflugdatum)}</span>
                  <span style={{ fontWeight: "bold", marginLeft: 9 }}>{row.abflugUhrzeit} {row.flugnummerHin}</span>
                  <span style={{ margin: "0 12px", color: "#444", fontWeight: "normal" }}>|</span>
                  <span><b>Notizen:</b> {row.bemerkung}</span>
                </div>
                {/* Rückflug-Info | Kennzeichen | Betrag */}
                <div style={{ display: "flex", alignItems: "center", gap: 0, fontSize: 23, marginTop: 4 }}>
                  <span style={{ color: "#16b000", fontWeight: 600 }}>
                    {formatDE(row.rueckflugdatum)} {row.rueckflugUhrzeit} {row.flugnummerRueck}
                  </span>
                  <span style={{ color: "#888", fontWeight: "bold", margin: "0 14px" }}>|</span>
                  <span style={{ fontWeight: "bold", color: "#111" }}>{row.kennzeichen}</span>
                  <span style={{ color: "#888", fontWeight: "bold", margin: "0 14px" }}>|</span>
                  <span style={{ color: "red", fontWeight: "bold" }}>{priceDisplay(row)}</span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 28, alignItems: "flex-end", marginLeft: 26 }}>
                <button style={{ background: "none", border: "none", fontSize: 37, cursor: "pointer", color: "#444" }} title="Bearbeiten">✏️</button>
                <button style={{ background: "none", border: "none", fontSize: 37, cursor: "pointer", color: "#444" }} title="Status">✔️</button>
                <a href={`tel:${row.telefon}`}>
                  <button style={{ background: "none", border: "none", fontSize: 37, cursor: "pointer", color: "#444" }} title="Anrufen">📞</button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
