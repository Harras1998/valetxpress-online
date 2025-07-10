import { useState, useEffect } from "react";

function parseDate(dt, time) {
  // Hilfsfunktion: kombiniere Datum+Uhrzeit (z.B. 2025-07-10 + 17:00)
  return new Date(`${dt}T${(time || "00:00")}:00`);
}

export default function FahrerListe() {
  const [tab, setTab] = useState("heute");
  const [list, setList] = useState([]);
  const [auth, setAuth] = useState("");
  const [login, setLogin] = useState({ user: "", pass: "" });
  const [suchtext, setSuchtext] = useState("");

  // Login wie vorher

  // --- Buchungen laden, filtern, sortieren ---
  useEffect(() => {
    if (!auth) return;
    let url = `/api/proxy?path=api/admin/buchungen&sort=abflugdatum&dir=asc`;
    if (suchtext) url += `&suchtext=${encodeURIComponent(suchtext)}`;
    fetch(url, { headers: { Authorization: `Basic ${auth}` } })
      .then(r => r.json())
      .then(data => setList(data.buchungen || []));
  }, [tab, auth, suchtext]);

  // ---- Daten sortieren: Zuerst nach Abflug, dann Rückflugzeit ----
  const sorted = [...list].sort((a, b) => {
    const dta = parseDate(a.abflugdatum, a.abflugUhrzeit);
    const dtb = parseDate(b.abflugdatum, b.abflugUhrzeit);
    if (dta < dtb) return -1;
    if (dta > dtb) return 1;
    // Falls gleiche Abflugzeit: Nach Rückflug
    const dtra = parseDate(a.rueckflugdatum, a.rueckflugUhrzeit);
    const dtrb = parseDate(b.rueckflugdatum, b.rueckflugUhrzeit);
    return dtra - dtrb;
  });

  return (
    <div style={{ maxWidth: 900, margin: "1rem auto", fontFamily: "Arial" }}>
      {/* Tabs/Filter */}
      <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
        {["heute", "2tage", "alle"].map(t => (
          <button
            key={t}
            style={{
              background: tab === t ? "#1db954" : "#ddd",
              color: tab === t ? "#fff" : "#333",
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
      {/* Fahrerliste im Card-Design */}
      <div>
        {sorted.map(row => {
          // --- Farblogik: Weiß (Abflug offen), Grau (ab Rückflug oder Landung) ---
          // Du kannst auch einen Status wie "gelandet", "gestartet", "beendet" verwenden
          const now = new Date();
          const abflug = parseDate(row.abflugdatum, row.abflugUhrzeit);
          const rueck = parseDate(row.rueckflugdatum, row.rueckflugUhrzeit);
          let bg = "#fff"; // Standard weiß
          if (now > abflug) bg = "#eee"; // Nach Abflug = grau
          if (now > rueck) bg = "#e0e0e0"; // Nach Rückflug = dunkler grau

          return (
            <div
              key={row.id}
              style={{
                marginBottom: 16,
                borderRadius: 8,
                background: bg,
                padding: "16px 22px",
                boxShadow: "0 2px 8px #0001",
                border: "1px solid #ccc",
                display: "flex",
                alignItems: "flex-start",
                gap: 12
              }}
            >
              {/* Infos, wie auf dem Screenshot */}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 2 }}>
                  {row.abflugUhrzeit} | {row.terminal} | {row.status || "geplant"} | {row.auto} | {row.vorname} {row.nachname} | {row.reiseziel} | <a href={`tel:${row.telefon}`} style={{ color: "#0277FF" }}>{row.telefon}</a>
                </div>
                <div style={{ fontSize: 15, margin: "3px 0" }}>
                  <b>{row.abflugdatum}</b> {row.abflugUhrzeit} {row.flugnummerHin} | <b>Notizen:</b> {row.bemerkung}
                </div>
                <div style={{ fontSize: 15, margin: "3px 0", color: "#008000" }}>
                  {row.rueckflugdatum} {row.rueckflugUhrzeit} {row.flugnummerRueck} | <span style={{ color: "red", fontWeight: "bold" }}>{row.betrag ? row.betrag + " €" : row.preis ? row.preis + " €" : ""}</span>
                </div>
                <div style={{ fontSize: 16, marginTop: 2 }}>
                  {row.kennzeichen && <b>{row.kennzeichen}</b>}
                </div>
              </div>
              {/* Aktionen */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button style={{ background: "none", border: "none", fontSize: 23, cursor: "pointer" }} title="Bearbeiten">✏️</button>
                <button style={{ background: "none", border: "none", fontSize: 23, cursor: "pointer" }} title="Status">✔️</button>
                <a href={`tel:${row.telefon}`}>
                  <button style={{ background: "none", border: "none", fontSize: 23, cursor: "pointer" }} title="Anrufen">📞</button>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
