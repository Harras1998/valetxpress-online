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

function PXHeader({ user, onLogout, tab, setTab, suchtext, setSuchtext, sort, setSort }) {
  const sortOptions = [
    { value: "abflugdatum", label: "Abflugdatum" },
    { value: "rueckflugdatum", label: "Rückflugdatum" },
    { value: "name", label: "Name" },
    { value: "kennzeichen", label: "Kennzeichen" },
    { value: "preis", label: "Preis" },
  ];
  return (
    <header style={{
      width: "100%",
      background: "linear-gradient(to bottom, #242424 90%, #eee 100%)",
      color: "#fff",
      padding: 0,
      margin: 0,
      boxShadow: "0 2px 8px #0002",
      display: "block",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: 65,
        padding: "0 24px 0 0",
        width: "100%",
      }}>
        <div style={{ display: "flex", alignItems: "center", height: 65 }}>
          <span style={{ fontSize: 32, fontWeight: 700, marginRight: 16, marginLeft: 4 }}>{user || ""}</span>
          <span style={{
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: 0,
            color: "#fff",
            textShadow: "0 2px 4px #0006",
            marginRight: 18,
          }}>
            <span style={{ color: "#fff" }}>Valet</span>
            <span style={{ color: "#8fd400" }}>X</span>
            <span style={{ color: "#fff" }}>press</span>
            <span style={{ color: "#fff" }}>-Fahrerliste</span>
          </span>
        </div>
        <img src="/logo-vxp.png" style={{ height: 60, marginLeft: 18 }} alt="ValetXpress Logo" />
        <button
          title="Logout"
          onClick={onLogout}
          style={{
            marginLeft: 32,
            fontSize: 34,
            color: "#fff",
            background: "none",
            border: "none",
            cursor: "pointer"
          }}
        >⏻</button>
      </div>
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "0 0 18px 0",
        background: "#ededed",
        borderBottom: "2px solid #ccc"
      }}>
        <div style={{ display: "flex", gap: 0, margin: "0 0 0 20px" }}>
          {["heute", "2tage", "alle"].map(t => (
            <button
              key={t}
              style={{
                background: tab === t ? "#53b2ec" : "#fff",
                color: "#222",
                fontWeight: tab === t ? "bold" : "normal",
                padding: "14px 38px",
                borderRadius: t === "heute" ? "16px 0 0 0" : t === "alle" ? "0 16px 0 0" : 0,
                border: "1px solid #e2e2e2",
                fontSize: 32,
                marginRight: 0,
                marginLeft: 0,
                borderRight: t === "alle" ? "1px solid #e2e2e2" : 0,
                borderLeft: t === "heute" ? "1px solid #e2e2e2" : 0,
                cursor: "pointer"
              }}
              onClick={() => setTab(t)}
            >
              {t === "heute" ? "Heute" : t === "2tage" ? "2-Tage" : "Alle"}
            </button>
          ))}
        </div>
        <input
          style={{
            flex: 1,
            margin: "0 20px",
            minWidth: 220,
            fontSize: 20,
            padding: "10px 16px",
            borderRadius: 12,
            border: "1px solid #ccc"
          }}
          placeholder="Suche nach Kennzeichen, Name, Flug…"
          value={suchtext}
          onChange={e => setSuchtext(e.target.value)}
        />
        <div style={{ fontSize: 27, color: "#2171b8", fontWeight: 700, marginRight: 16 }}>
          <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => setSort("abflugdatum")}>
            Sortieren: {sortOptions.find(o => o.value === sort)?.label || "Abflugdatum"}
          </span>
          <select
            style={{
              fontSize: 23,
              marginLeft: 10,
              border: "none",
              background: "#ededed",
              color: "#444",
              cursor: "pointer"
            }}
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            {sortOptions.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
}

export default function FahrerListe() {
  const [tab, setTab] = useState("alle");
  const [list, setList] = useState([]);
  const [auth, setAuth] = useState("");
  const [login, setLogin] = useState({ user: "", pass: "" });
  const [suchtext, setSuchtext] = useState("");
  const [sort, setSort] = useState("abflugdatum");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Login
  function handleLogin(e) {
    e.preventDefault();
    const encoded = btoa(`${login.user}:${login.pass}`);
    setAuth(encoded);
    localStorage.setItem("fahrerliste-auth", encoded);
    localStorage.setItem("fahrerliste-user", login.user);
  }
  // Auto-login nach Refresh
  useEffect(() => {
    const token = localStorage.getItem("fahrerliste-auth");
    if (token) setAuth(token);
  }, []);
  // Logout
  function handleLogout() {
    setAuth("");
    localStorage.removeItem("fahrerliste-auth");
    localStorage.removeItem("fahrerliste-user");
  }
  const user = auth ? localStorage.getItem("fahrerliste-user") || "" : "";

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
  // Format Preis ohne Komma und immer mit €
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
    <>
      <style>{`
        html, body, #__next {
          width: 100% !important;
          max-width: 100vw !important;
          overflow-x: hidden !important;
        }
        .px-root {
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
        }
      `}</style>
      <div className="px-root" style={{ width: "100%", maxWidth: "100vw", overflowX: "hidden", background: "#ededed", minHeight: "100vh" }}>
        <PXHeader user={user} onLogout={handleLogout} tab={tab} setTab={setTab} suchtext={suchtext} setSuchtext={setSuchtext} sort={sort} setSort={setSort} />
        <div style={{padding: 38, paddingTop: 26, maxWidth: 1380, margin: "0 auto"}}>
          <div style={{ color:"#5b5b5b", fontSize:19, margin:"0 0 20px 10px" }}>
            Anzahl Fahrten: {filtered.length}
          </div>
          <div>
            {loading && <div style={{margin:30, color:'#888', fontSize:20}}>Lade Daten...</div>}
            {filtered.length === 0 && !loading && (
              <div style={{margin:30, color:'#888', fontSize:20}}>Keine Fahrten gefunden.</div>
            )}
            {filtered.map(row => (
              <div
                key={row.id}
                style={{
                  marginBottom: 30,
                  borderRadius: 22,
                  background: cardColor(row),
                  padding: "22px 32px",
                  boxShadow: "0 2px 12px #0001",
                  border: "1.8px solid #ccc",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 25,
                  fontSize: "22px",
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box"
                }}
              >
                <div style={{ flex: 1 }}>
                  {/* Überschrift */}
                  <div style={{ fontWeight: "bold", fontSize: 32, marginBottom: 8, letterSpacing: 1 }}>
                    {row.abflugUhrzeit} | {row.terminal} | {row.status || "geplant"} | {row.typ === "AllInclusive" ? "All" : row.typ.charAt(0).toUpperCase() + row.typ.slice(1)} | {row.vorname} {row.nachname} | {row.reiseziel} |{" "}
                    <a href={`tel:${row.telefon}`} style={{ color: "#001cff", textDecoration: "underline", fontWeight: 600 }}>{row.telefon}</a> |
                  </div>
                  {/* Abflugdatum, Uhrzeit, FlugnummerHin & Notizen */}
                  <div style={{ fontSize: 21, margin: "0 0 0 2px", color: "#444", display: "flex", alignItems: "center", gap: 9 }}>
                    <span style={{ fontWeight: 700 }}>{formatDE(row.abflugdatum)}</span>
                    <span style={{ fontWeight: 700 }}>{row.abflugUhrzeit} {row.flugnummerHin}</span>
                    <span style={{ color: "#444" }}>| Notizen:</span>
                    <span style={{ fontWeight: 700 }}>{row.bemerkung}</span>
                  </div>
                  {/* Rückflug-Info | Kennzeichen | Preis */}
                  <div style={{ display: "flex", alignItems: "center", gap: 19, fontSize: 22, marginTop: 13 }}>
                    <span style={{ color: "#16b000", fontWeight: 700 }}>
                      {formatDE(row.rueckflugdatum)} {row.rueckflugUhrzeit} {row.flugnummerRueck}
                    </span>
                    <span style={{ color: "#888", fontWeight: 600 }}>|</span>
                    <span style={{ fontWeight: 700, color: "#222" }}>{row.kennzeichen}</span>
                    <span style={{ color: "#888", fontWeight: 600 }}>|</span>
                    <span style={{ color: "red", fontWeight: "bold" }}>{priceDisplay(row)}</span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-end", minWidth: 60 }}>
                  <button style={{ background: "none", border: "none", fontSize: 32, cursor: "pointer" }} title="Bearbeiten">✏️</button>
                  <button style={{ background: "none", border: "none", fontSize: 32, cursor: "pointer", color: "purple" }} title="Status">✔️</button>
                  <a href={`tel:${row.telefon}`}>
                    <button style={{ background: "none", border: "none", fontSize: 32, cursor: "pointer", color: "crimson" }} title="Anrufen">📞</button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
