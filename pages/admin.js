import { useEffect, useState } from "react";

function formatDate(d) {
  if (!d) return "";
  return d.slice(0, 10);
}

const FIELDS = [
  "id","vorname","nachname","strasse","plz","ort","email","telefon",
  "auto","kennzeichen","abflugdatum","abflugUhrzeit","ankunftUhrzeit","rueckflugdatum","rueckflugUhrzeit","reiseziel",
  "fluggesellschaft","flugnummerHin","flugnummerRueck","terminal","handgepaeck","bemerkung",
  "typ","start","end","tage","preis","addOut","addIn","addTank","addLade","bezahlt","erstellt"
];

export default function Admin() {
  const [buchungen, setBuchungen] = useState([]);
  const [loading, setLoading] = useState(true);
  const [suchtext, setSuchtext] = useState("");
  const [sort, setSort] = useState("id");
  const [dir, setDir] = useState("desc");
  const [auth, setAuth] = useState("");
  const [login, setLogin] = useState({user:"",pass:""});
  const [error, setError] = useState("");

  // Fetch Buchungen
  function fetchBuchungen(benutzerAuth = auth) {
    setLoading(true);
    fetch(`/api/proxy?path=api/admin/buchungen&suchtext=${encodeURIComponent(suchtext)}&sort=${sort}&dir=${dir}`, {
      headers: { Authorization: `Basic ${benutzerAuth}` }
    })
      .then(async res => {
        if (res.status === 401) throw new Error("Login erforderlich!");
        return res.json();
      })
      .then(data => {
        console.log("Daten vom Proxy:", data); // <--- HIER!
        console.log("Daten aus Backend:", data.buchungen);
        setBuchungen(data.buchungen);
        setLoading(false);
      })
      .catch(e => { setError(e.message); setLoading(false); });
  }

  // Login (HTTP Basic Auth)
  function handleLogin(e) {
    e.preventDefault();
    const encoded = btoa(`${login.user}:${login.pass}`);
    setAuth(encoded);
    setError("");
    setTimeout(() => fetchBuchungen(encoded), 100);
  }

  useEffect(() => {
    if (auth) fetchBuchungen();
    // eslint-disable-next-line
  }, [suchtext, sort, dir]);

  // Delete
  async function handleDelete(id) {
    if (!window.confirm("Wirklich löschen?")) return;
    await fetch(`/api/proxy?path=api/admin/buchungen`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
      body: JSON.stringify({ id }),
    });
    fetchBuchungen();
  }

  // Sortieren
  function sortBy(f) {
    if (sort === f) setDir(dir === "asc" ? "desc" : "asc");
    else { setSort(f); setDir("asc"); }
  }

  if (!auth) {
    return (
      <div style={{ maxWidth: 400, margin: "5rem auto", background: "#fff", borderRadius: 12, padding: 32, boxShadow: "0 2px 12px #0002", fontFamily: "Arial" }}>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            style={{ width: "100%", margin: "8px 0", padding: 7 }}
            type="text" placeholder="Benutzername"
            value={login.user}
            onChange={e => setLogin({ ...login, user: e.target.value })}
            required />
          <input
            style={{ width: "100%", margin: "8px 0", padding: 7 }}
            type="password" placeholder="Passwort"
            value={login.pass}
            onChange={e => setLogin({ ...login, pass: e.target.value })}
            required />
          <button style={{ width: "100%", padding: "10px 0", background: "#1db954", color: "#fff", fontWeight: "bold", fontSize: "1rem", border: "none", borderRadius: 8, marginTop: 8 }}>Login</button>
        </form>
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1280, margin: "2rem auto", fontFamily: "Arial" }}>
      <h1>Admin-Bereich: Buchungen verwalten</h1>
      <div style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 16 }}>
        <input
          type="text"
          placeholder="Nach Kennzeichen suchen..."
          value={suchtext}
          onChange={e => setSuchtext(e.target.value)}
          style={{ fontSize: 18, padding: 7, minWidth: 260 }}
        />
        <button onClick={() => fetchBuchungen()} style={{ fontSize: 18 }}>🔍</button>
        <button onClick={() => { setAuth(""); setLogin({ user: "", pass: "" }); }}>Logout</button>
      </div>
      <div style={{ overflowX: "auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #0001" }}>
        <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", minWidth: 1200, fontSize: 15 }}>
          <thead>
            <tr>
              {FIELDS.map(f => (
                <th
                  key={f}
                  style={{ background: "#eee", cursor: "pointer", minWidth: 70, position: "sticky", top: 0, zIndex: 1 }}
                  onClick={() => sortBy(f)}
                >
                  {f} {sort === f && (dir === "asc" ? "▲" : "▼")}
                </th>
              ))}
              <th>Aktion</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={FIELDS.length + 1}>Lade...</td></tr>
            ) : buchungen.length === 0 ? (
              <tr><td colSpan={FIELDS.length + 1}>Keine Buchungen gefunden.</td></tr>
            ) : (
              buchungen.map(b => (
                <tr key={b.id}>
                  {FIELDS.map(f => (
                    <td key={f}>
                      {typeof b[f] === "boolean"
                        ? (b[f] ? "✅" : "")
                        : typeof b[f] === "string" && b[f]?.match(/^\d{4}-\d{2}-\d{2}/)
                          ? formatDate(b[f])
                          : b[f] ?? ""}
                    </td>
                  ))}
                  <td>
                    <button onClick={() => handleDelete(b.id)} style={{ color: "red" }}>Löschen</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
