import { useState, useEffect } from "react";
import Head from "next/head";

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
    <div style={{
      width: "100%",
      background: "linear-gradient(#222 85%,#eee 100%)",
      margin: 0,
      padding: 0,
      overflowX: "hidden"
    }}>
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
      <div style={{
        background: "#ededed",
        width: "100%",
        minHeight: 68,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1.5px solid #dedede"
      }}>
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
          <img src="/images/Logo.png" alt="ValetXpress" height={58} style={{ marginLeft: 18, marginRight: 10 }} />
        </div>
      </div>
    </div>
  );
}

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
  const [editBuchung, setEditBuchung] = useState(null);
  const [editSaving, setEditSaving] = useState(false);

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

  let filtered = list;
  const today = new Date();
  if (tab === "heute") {
    const isoToday = today.toISOString().slice(0, 10);
    filtered = filtered.filter(b => b.abflugdatum?.slice(0, 10) === isoToday);
  } else if (tab === "2tage") {
    // NEU: NUR morgen & übermorgen (heute NICHT)
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(today.getDate() + 2);
    const isoTomorrow = tomorrow.toISOString().slice(0, 10);
    const isoDayAfter = dayAfter.toISOString().slice(0, 10);
    filtered = filtered.filter(b => {
      const d = b.abflugdatum?.slice(0, 10);
      return d === isoTomorrow || d === isoDayAfter;
    });
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
    if (sort === "name") {
      const an = (a.nachname + a.vorname).toLowerCase();
      const bn = (b.nachname + b.vorname).toLowerCase();
      if (an < bn) return -1;
      if (an > bn) return 1;
    }
    const a1 = parseDate(a.abflugdatum, a.abflugUhrzeit);
    const b1 = parseDate(b.abflugdatum, b.abflugUhrzeit);
    if (a1 < b1) return -1;
    if (a1 > b1) return 1;
    const a2 = parseDate(a.rueckflugdatum, a.rueckflugUhrzeit);
    const b2 = parseDate(b.rueckflugdatum, b.rueckflugUhrzeit);
    return a2 - b2;
  });

  function cardColor(b) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const abflug = parseDate(b.abflugdatum, b.abflugUhrzeit);
  abflug.setHours(0, 0, 0, 0);

  // Differenz in Tagen
  const diffTage = Math.floor((abflug - today) / (1000 * 60 * 60 * 24));

  // Heute, morgen oder übermorgen → weiß
  if (diffTage >= 0 && diffTage <= 2) {
    return "#fff";
  }

  const rueck = parseDate(b.rueckflugdatum, b.rueckflugUhrzeit);

  if (new Date() < abflug) return "#fff";
  if (new Date() >= abflug && new Date() < rueck) return "#eee";
  return "#e0e0e0";
}

  // NEU: Gruppierung nach Abflug-Datum (YYYY-MM-DD)
  const groupsByDate = filtered.reduce((acc, b) => {
    const key = (b.abflugdatum || "").slice(0, 10);
    if (!key) return acc;
    (acc[key] ||= []).push(b);
    return acc;
  }, {});
  const dayKeys = Object.keys(groupsByDate).sort();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=1440, user-scalable=no" />
      </Head>
      {!auth ? (
        <div
          style={{
            maxWidth: 1440,
            minWidth: 1440,
            background: "#fff",
            borderRadius: 12,
            padding: 32,
            boxShadow: "0 2px 12px #0002",
            fontFamily: "Arial",
            overflowX: "hidden",
            margin: "0 auto"
          }}>
          <h2>Fahrer-Login</h2>
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="Benutzername" value={login.user} onChange={e => setLogin({ ...login, user: e.target.value })} required style={{ width: "100%", marginBottom: 8 }} />
            <input type="password" placeholder="Passwort" value={login.pass} onChange={e => setLogin({ ...login, pass: e.target.value })} required style={{ width: "100%", marginBottom: 16 }} />
            <button type="submit" style={{ width: "100%", padding: "10px 0", background: "#1db954", color: "#fff", border: "none", borderRadius: 8, fontWeight: "bold" }}>Login</button>
          </form>
          {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
        </div>
      ) : (
        <div
          style={{
            maxWidth: 1440,
            minWidth: 1440,
            background: "#fff",
            fontFamily: "Arial",
            margin: "0 auto",
            minHeight: "100vh",
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
          <div style={{
            maxWidth: "100%",
            margin: "auto",
            marginTop: "auto",
            overflowX: "hidden"
          }}>
            <div style={{ padding: 12, color: "#777", fontSize: 18, marginLeft: 10 }}>
              {loading ? "Lade Daten..." : ""}
              <b> Anzahl Kunden: {filtered.length}</b>
            </div>

            {/* NEU: gerenderte Liste mit Datumsbalken je Tag */}
            <div>
              {dayKeys.length === 0 && (
                <div style={{ margin: 30, color: '#888', fontSize: 28 }}>Keine Fahrten gefunden.</div>
              )}

              {dayKeys.map(day => (
                <div key={day}>
                  {/* Blauer Balken (kräftig/dunkel wie im 2. Screenshot) */}
                  <div
                    style={{
                      background: "linear-gradient(#6E97BF, #4F7FA9)",
                      color: "#ffffff",
                      fontWeight: "bold",
                      fontSize: 22,
                      padding: "8px 14px",
                      borderTop: "1px solid #4677A2",
                      borderBottom: "1px solid #4677A2",
                      marginTop: 0
                    }}
                  >
                    {formatDE(day)}
                  </div>

                  {groupsByDate[day].map(row => (
                    <div
                      key={row.id}
                      className="fahrer-card"
                      style={{
                        marginBottom: 0,
                        borderRadius: 0,
                        background: cardColor(row),
                        padding: "16px 0 8px 0",
                        boxShadow: "none",
                        border: "none",
                        borderBottom: "2px solid #ccc",
                        display: "flex",
                        alignItems: "flex-start",
                        fontSize: "32px",
                        fontFamily: "Arial, Helvetica, sans-serif"
                      }}
                    >
                      <div style={{ flex: 1, marginLeft: 18 }}>
                        <div className="fahrer-card-title" style={{ fontWeight: "bold", marginBottom: 0, fontSize: "20px" }}>
                          {row.ankunftUhrzeit} | {row.terminal} | {row.status || "geplant"} | {["allinclusive", "all-inclusive", "all_inclusive"].includes((row.typ || "").toLowerCase())
                            ? "All"
                            : row.typ.charAt(0).toUpperCase() + row.typ.slice(1)} | {row.vorname} {row.nachname} | {row.reiseziel} |{" "}
                          <a className="telefon-link" href={`tel:${row.telefon}`} style={{ color: "#001cff", textDecoration: "underline", fontWeight: 600 }}>{row.telefon}</a>
                        </div>
                        <div className="info-zeile" style={{
                          fontSize: 17, margin: "12px 0 0 0", color: "#444", display: "flex", alignItems: "center", fontWeight: 700
                        }}>
                          <span>{formatDE(row.abflugdatum)} {row.abflugUhrzeit} {row.flugnummerHin}</span>
                          <span style={{ margin: "0 5px", fontWeight: 500 }}>|</span>
                          <span className="notiz-label"><b>Notizen:</b> {row.bemerkung}</span>
                        </div>
                        <div className="info-zeile" style={{
                          display: "flex", alignItems: "center", gap: 0, fontSize: 17, marginTop: 0, fontWeight: 700
                        }}>
                          <span style={{ color: "#16b000" }}>
                            {formatDE(row.rueckflugdatum)} {row.rueckflugUhrzeit} {row.flugnummerRueck}
                          </span>
                          <span style={{ color: "#888", margin: "0 5px" }}>|</span>
                          <span style={{ color: "#111" }}>{row.kennzeichen}</span>
                          <span style={{ color: "#888", margin: "0 5px" }}>|</span>
                          <span style={{ color: "red" }}>{priceDisplay(row)}</span>
                        </div>
                      </div>
                      <div className="actions" style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 38,
                        alignItems: "center",
                        minWidth: 270,
                        justifyContent: "flex-end",
                        marginRight: 30
                      }}>
                        <span
                          style={{ fontSize: 20, color: "#444", cursor: "pointer" }}
                          title="Bearbeiten"
                          onClick={() => setEditBuchung({ ...row })}
                        >✏️</span>
                        <span style={{ fontSize: 20, color: "#444", cursor: "pointer" }} title="Status">✔️</span>
                        <a href={`tel:${row.telefon}`}>
                          <span style={{ fontSize: 20, color: "#444", cursor: "pointer" }} title="Anrufen">📞</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {editBuchung && (
            <div style={{
              position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
              background: "#fff", zIndex: 10000, overflowY: "auto"
            }}>
              <div style={{
                width: 1440, margin: "0 auto", minHeight: "100vh", fontFamily: "Arial"
              }}>
                {/* Header */}
                <div style={{
                  background: "#222", color: "#fff", padding: 10,
                  fontWeight: "bold", fontSize: 22, textAlign: "center",
                  borderRadius: "0 0 8px 8px", position: "relative"
                }}>
                  <button
                    onClick={() => setEditBuchung(null)}
                    style={{
                      position: "absolute", left: 12, top: 7, fontSize: 18,
                      background: "#222", color: "#fff", border: "none", borderRadius: 6,
                      padding: "4px 12px", cursor: "pointer"
                    }}
                  >▲ Zurück</button>
                  Buchung {editBuchung.nachname} bearbeiten
                </div>
                {/* Formular */}
                <form
  onSubmit={async e => {
    e.preventDefault();
    setEditSaving(true);

    // NEU: Datumsfelder ins richtige Format bringen!
    function toDateString(dateString) {
      if (!dateString) return "";
      return dateString.split("T")[0];
    }
    // Kopie von editBuchung bearbeiten:
    const dataToSend = { ...editBuchung };
    ["abflugdatum", "rueckflugdatum", "start", "end"].forEach(field => {
      if (dataToSend[field]) dataToSend[field] = toDateString(dataToSend[field]);
    });

    await fetch(`/api/proxy?path=api/admin/buchung/${editBuchung.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`
      },
      body: JSON.stringify(dataToSend)
    });
    setEditSaving(false);
    setEditBuchung(null);
    // Nach dem Speichern: Liste neu laden
    setLoading(true);
    let url = `/api/proxy?path=api/admin/buchungen&sort=${sort}&dir=asc`;
    if (suchtext) url += `&suchtext=${encodeURIComponent(suchtext)}`;
    fetch(url, { headers: { Authorization: `Basic ${auth}` } })
      .then(r => r.json())
      .then(data => { setList(data.buchungen || []); setLoading(false); });
  }}
                  style={{
                    margin: "0 auto", maxWidth: 1300, background: "#f8f8f8",
                    borderRadius: 14, padding: 18, marginTop: 12
                  }}
                >

                  {/* Alle Felder wie im Screenshot */}
                  <div style={{ marginBottom: 10 }}>
                    <label>Firma:</label><br />
                    <input value={editBuchung.firma || ""} onChange={e => setEditBuchung({ ...editBuchung, firma: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                    <div style={{ flex: 1 }}>
                      <label>Vorname:</label><br />
                      <input value={editBuchung.vorname || ""} onChange={e => setEditBuchung({ ...editBuchung, vorname: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label>Nachname:</label><br />
                      <input value={editBuchung.nachname || ""} onChange={e => setEditBuchung({ ...editBuchung, nachname: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Straße / Hausnr.:</label><br />
                    <input value={editBuchung.strasse || ""} onChange={e => setEditBuchung({ ...editBuchung, strasse: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                    <div style={{ flex: 1 }}>
                      <label>PLZ:</label><br />
                      <input value={editBuchung.plz || ""} onChange={e => setEditBuchung({ ...editBuchung, plz: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                    </div>
                    <div style={{ flex: 2 }}>
                      <label>Ort:</label><br />
                      <input value={editBuchung.ort || ""} onChange={e => setEditBuchung({ ...editBuchung, ort: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Email:</label><br />
                    <input value={editBuchung.email || ""} onChange={e => setEditBuchung({ ...editBuchung, email: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Telefon:</label><br />
                    <input value={editBuchung.telefon || ""} onChange={e => setEditBuchung({ ...editBuchung, telefon: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Fahrzeugtyp/Modell:</label><br />
                    <input value={editBuchung.auto || ""} onChange={e => setEditBuchung({ ...editBuchung, auto: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>KFZ-Kennzeichen:</label><br />
                    <input value={editBuchung.kennzeichen || ""} onChange={e => setEditBuchung({ ...editBuchung, kennzeichen: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Ankft Parkpl.:</label><br />
                    <input value={editBuchung.ankunftUhrzeit || ""} onChange={e => setEditBuchung({ ...editBuchung, ankunftUhrzeit: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  {/* Abflugdatum und Uhrzeit */}
                  <div style={{ marginBottom: 10 }}>
                    <label>Abflug:</label><br />
                    <input
                      type="date"
                      value={editBuchung.abflugdatum ? editBuchung.abflugdatum.slice(0, 10) : ""}
                      onChange={e => setEditBuchung({ ...editBuchung, abflugdatum: e.target.value })}
                      style={{ fontSize: 20 }}
                    />
                    <input
                      type="time"
                      value={editBuchung.abflugUhrzeit || ""}
                      onChange={e => setEditBuchung({ ...editBuchung, abflugUhrzeit: e.target.value })}
                      style={{ fontSize: 20, marginLeft: 8 }}
                    />
                  </div>
                  {/* Rückflugdatum und Uhrzeit */}
                  <div style={{ marginBottom: 10 }}>
                    <label>Rückflug:</label><br />
                    <input
                      type="date"
                      value={editBuchung.rueckflugdatum ? editBuchung.rueckflugdatum.slice(0, 10) : ""}
                      onChange={e => setEditBuchung({ ...editBuchung, rueckflugdatum: e.target.value })}
                      style={{ fontSize: 20 }}
                    />
                    <input
                      type="time"
                      value={editBuchung.rueckflugUhrzeit || ""}
                      onChange={e => setEditBuchung({ ...editBuchung, rueckflugUhrzeit: e.target.value })}
                      style={{ fontSize: 20, marginLeft: 8 }}
                    />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Reiseziel:</label><br />
                    <input value={editBuchung.reiseziel || ""} onChange={e => setEditBuchung({ ...editBuchung, reiseziel: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Fluggesellschaft:</label><br />
                    <input value={editBuchung.fluggesellschaft || ""} onChange={e => setEditBuchung({ ...editBuchung, fluggesellschaft: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Flugnr. Abflug:</label><br />
                    <input value={editBuchung.flugnummerHin || ""} onChange={e => setEditBuchung({ ...editBuchung, flugnummerHin: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Flugnr. Rückflug:</label><br />
                    <input value={editBuchung.flugnummerRueck || ""} onChange={e => setEditBuchung({ ...editBuchung, flugnummerRueck: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Terminal:</label><br />
                    <input value={editBuchung.terminal || ""} onChange={e => setEditBuchung({ ...editBuchung, terminal: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Anzahl Personen:</label><br />
                    <input type="number" min="1" max="10" value={editBuchung.anzahl_personen || ""} onChange={e => setEditBuchung({ ...editBuchung, anzahl_personen: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>
                      <input type="checkbox" checked={!!editBuchung.handgepaeck} onChange={e => setEditBuchung({ ...editBuchung, handgepaeck: e.target.checked ? 1 : 0 })} />
                      {" "}Handgepäck
                    </label>
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Sperrgepäck/Notizen:</label><br />
                    <textarea value={editBuchung.bemerkung || ""} onChange={e => setEditBuchung({ ...editBuchung, bemerkung: e.target.value })} style={{ width: "100%", fontSize: 18 }} />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Typ (valet/allinclusive):</label><br />
                    <input value={editBuchung.typ || ""} onChange={e => setEditBuchung({ ...editBuchung, typ: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label>Preis (€):</label><br />
                    <input value={editBuchung.preis || ""} onChange={e => setEditBuchung({ ...editBuchung, preis: e.target.value })} style={{ width: "100%", fontSize: 20 }} />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={editSaving}
                      style={{
                        width: "100%", background: "red", color: "#fff",
                        fontWeight: "bold", fontSize: 20, padding: 10,
                        border: "none", borderRadius: 14, marginTop: 22
                      }}
                    >
                      {editSaving ? "Speichere..." : "Änderung speichern"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}