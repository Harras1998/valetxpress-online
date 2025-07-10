import { useState, useEffect } from "react";

const TABS = [
  { key: "heute", label: "Heute" },
  { key: "2tage", label: "2 Tage" },
  { key: "alle", label: "Alle" },
];

function toISO(d) {
  return new Date(d).toISOString().slice(0, 10);
}
function addDays(d, n) {
  const dt = new Date(d);
  dt.setDate(dt.getDate() + n);
  return toISO(dt);
}

export default function FahrerListe() {
  const [tab, setTab] = useState("heute");
  const [list, setList] = useState([]);
  const [auth, setAuth] = useState("");
  const [login, setLogin] = useState({ user: "", pass: "" });
  const [suchtext, setSuchtext] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);

  // Login
  function handleLogin(e) {
    e.preventDefault();
    const encoded = btoa(`${login.user}:${login.pass}`);
    setAuth(encoded);
  }

  // Buchungen laden
  useEffect(() => {
    if (!auth) return;
    setLoading(true);
    // Date-Filter bauen
    const today = toISO(new Date());
    let von = today, bis = today;
    if (tab === "2tage") bis = addDays(today, 1);
    if (tab === "alle") { von = ""; bis = ""; }
    let url = `/api/proxy?path=api/admin/buchungen&sort=abflugdatum&dir=asc`;
    if (suchtext) url += `&suchtext=${encodeURIComponent(suchtext)}`;
    if (von) url += `&von=${von}`;
    if (bis) url += `&bis=${bis}`;
    fetch(url, {
      headers: { Authorization: `Basic ${auth}` }
    })
      .then(r => r.json())
      .then(data => { setList(data.buchungen || []); setLoading(false); })
      .catch(() => { setError("Fehler beim Laden"); setLoading(false); });
  }, [tab, auth, suchtext]);

  // --- Bearbeiten (Inline Modal) ---
  const [editData, setEditData] = useState({});
  function openEdit(b) {
    setEditId(b.id);
    setEditData(b);
  }
  async function saveEdit() {
    await fetch("/api/proxy?path=api/admin/buchungen/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify(editData),
    });
    setEditId(null);
    setEditData({});
    // Reload List
    setTimeout(() => window.location.reload(), 700);
  }

  if (!auth) return (
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
    <div style={{ maxWidth: 1280, margin: "2rem auto", fontFamily: "Arial" }}>
      <h1 style={{ marginBottom: 20 }}>Fahrerliste</h1>
      <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
        {TABS.map(t => (
          <button
            key={t.key}
            style={{
              background: tab === t.key ? "#1db954" : "#eee",
              color: tab === t.key ? "#fff" : "#222",
              fontWeight: "bold",
              padding: "9px 24px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setTab(t.key)}
          >{t.label}</button>
        ))}
        <input
          style={{ flex: 1, minWidth: 220, fontSize: 16, padding: "8px 10px", borderRadius: 8, border: "1px solid #ccc" }}
          placeholder="Suche nach Name, Kennzeichen, Flugnummer…"
          value={suchtext}
          onChange={e => setSuchtext(e.target.value)}
        />
      </div>
      <div style={{ overflowX: "auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #0001", padding: 10 }}>
        <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", minWidth: 1200, fontSize: 15 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Auto</th>
              <th>Kennzeichen</th>
              <th>Flugnummer (Hin)</th>
              <th>Abflugdatum</th>
              <th>Abflugzeit</th>
              <th>Rückflugdatum</th>
              <th>Rückflugzeit</th>
              <th>Flugstatus</th>
              <th>Terminal</th>
              <th>Telefon</th>
              <th>Aktion</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={12}>Lade…</td></tr>
              : list.map(row => (
              <tr key={row.id} style={editId === row.id ? { background: "#eef" } : {}}>
                <td>
                  {editId === row.id
                    ? <input value={editData.vorname} onChange={e => setEditData(d => ({ ...d, vorname: e.target.value }))} />
                    : `${row.vorname} ${row.nachname}`}
                </td>
                <td>
                  {editId === row.id
                    ? <input value={editData.auto} onChange={e => setEditData(d => ({ ...d, auto: e.target.value }))} />
                    : row.auto}
                </td>
                <td>
                  {editId === row.id
                    ? <input value={editData.kennzeichen} onChange={e => setEditData(d => ({ ...d, kennzeichen: e.target.value }))} />
                    : row.kennzeichen}
                </td>
                <td>{row.flugnummerHin}</td>
                <td>{row.abflugdatum?.slice(0, 10)}</td>
                <td>{row.abflugUhrzeit}</td>
                <td>{row.rueckflugdatum?.slice(0, 10)}</td>
                <td>{row.rueckflugUhrzeit}</td>
                <td>
                  <FlugStatus flugnr={row.flugnummerHin} datum={row.abflugdatum} />
                </td>
                <td>{row.terminal}</td>
                <td>
                  <a href={`tel:${row.telefon}`}>{row.telefon}</a>
                </td>
                <td>
                  {editId === row.id ? (
                    <>
                      <button style={{ marginRight: 8 }} onClick={saveEdit}>💾</button>
                      <button onClick={() => setEditId(null)}>❌</button>
                    </>
                  ) : (
                    <>
                      <button style={{ marginRight: 8 }} onClick={() => openEdit(row)}>✏️</button>
                      <button onClick={() => alert("Status ändern kommt hier…")}>✔️</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Flugstatus-Komponente (Demo-Status, echte API später!) ---
function FlugStatus({ flugnr, datum }) {
  const [status, setStatus] = useState("");
  useEffect(() => {
    if (!flugnr || !datum) return;
    fetch(`/api/flightstatus?flugnr=${flugnr}&datum=${datum}`)
      .then(r => r.json())
      .then(data => setStatus(data.status || "n/a"));
  }, [flugnr, datum]);
  return (
    <span>{status}</span>
  );
}
