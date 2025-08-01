import { useState, useEffect, useRef } from "react";

// Ansichtstypen analog zum Original
const ANSICHTEN = [
  { key: "heute", label: "Heute" },
  { key: "drei", label: "3 Tage" },
  { key: "alle", label: "Alle" }
];

// Zeitformatierung für Timer
function formatTimer(startTimestamp) {
  if (!startTimestamp) return "--:--";
  const diff = Math.floor((Date.now() - new Date(startTimestamp)) / 1000);
  const m = String(Math.floor(diff / 60)).padStart(2, "0");
  const s = String(diff % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export default function Fahrerliste() {
  const [ansicht, setAnsicht] = useState("heute");
  const [buchungen, setBuchungen] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);

  // --- Daten holen ---
  async function loadData() {
    setLoading(true);
    let url = `/api/admin/fahrerliste?ansicht=${ansicht}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    const res = await fetch(url);
    const data = await res.json();
    setBuchungen(data.buchungen || []);
    setLoading(false);
  }

  // Bei Ansicht/Suche wechseln oder Refresh neu laden
  useEffect(() => { loadData(); }, [ansicht, search, refresh]);

  // Auto-Refresh (alle 30s)
  useEffect(() => {
    const interval = setInterval(() => setRefresh(v => !v), 30000);
    return () => clearInterval(interval);
  }, []);

  // Für Timer-Anzeige: Force-Update jede Sekunde (damit der Timer live läuft)
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const intv = setInterval(() => forceUpdate(n => n + 1), 1000);
    return () => clearInterval(intv);
  }, []);

  // --- Actions ---
  async function anrufBekommen(id) {
    await fetch("/api/admin/fahrerliste/anruf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    loadData();
  }
  async function abgeschlossen(id) {
    await fetch("/api/admin/fahrerliste/abgeschlossen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    loadData();
  }
  async function reaktivieren(id) {
    await fetch("/api/admin/fahrerliste/reaktivieren", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    loadData();
  }

  return (
    <div style={{ maxWidth: 950, margin: "0 auto", padding: 18 }}>
      <h2 style={{ fontWeight: 700, marginBottom: 12 }}>Fahrerliste</h2>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 9, marginBottom: 12 }}>
        {ANSICHTEN.map(a => (
          <label key={a.key}>
            <input type="radio"
              name="ansicht"
              checked={ansicht === a.key}
              onChange={() => setAnsicht(a.key)}
              style={{ accentColor: "#1db954", marginRight: 4 }}
            />
            {a.label}
          </label>
        ))}
        <form onSubmit={e => { e.preventDefault(); loadData(); }} style={{ marginLeft: "auto" }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Kennzeichen suchen"
            style={{
              border: "1px solid #bbb",
              borderRadius: 6,
              padding: "4px 10px"
            }}
          />
        </form>
      </div>

      {/* Liste */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {loading ? (
          <li>Lade Daten…</li>
        ) : buchungen.length === 0 ? (
          <li>Keine Buchungen gefunden.</li>
        ) : (
          buchungen.map(b => (
            <li
              key={b.id}
              style={{
                background: b.status === "done" ? "#888" : "#fff",
                opacity: b.status === "done" ? 0.55 : 1,
                margin: "8px 0",
                borderRadius: 12,
                padding: 18,
                display: "flex",
                alignItems: "center",
                gap: 18,
                boxShadow: "0 2px 6px #0001"
              }}
            >
              <div style={{ flex: 2 }}>
                <b>{b.vorname} {b.nachname}</b> – {b.kennzeichen}
                <div>
                  Ankunft: <b>{b.ankunftUhrzeit || "-"}</b>
                  {b.timer_start && b.status === "active" && (
                    <span style={{
                      marginLeft: 12,
                      color: formatTimer(b.timer_start).split(":")[0] > 9 ? "#df1b1b" : "#1db954",
                      fontWeight: "bold"
                    }}>
                      ⏰ {formatTimer(b.timer_start)}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 15, color: "#222" }}>
                  Terminal: {b.terminal || "-"} | Tel: {b.telefon || "-"}
                </div>
              </div>
              <div style={{ flex: 1, display: "flex", gap: 10, justifyContent: "flex-end" }}>
                {b.status === "open" && (
                  <button onClick={() => anrufBekommen(b.id)} style={btnStyle("#ffd600", "#1a1a1a")}>
                    Anruf bekommen
                  </button>
                )}
                {b.status === "active" && (
                  <button onClick={() => abgeschlossen(b.id)} style={btnStyle("#1db954", "#fff")}>
                    Abgeschlossen
                  </button>
                )}
                {b.status === "done" && (
                  <button onClick={() => reaktivieren(b.id)} style={btnStyle("#aaa", "#222")}>
                    Reaktivieren
                  </button>
                )}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

function btnStyle(bg, color) {
  return {
    background: bg,
    color,
    border: "none",
    borderRadius: 8,
    padding: "7px 14px",
    fontWeight: 600,
    cursor: "pointer"
  };
}
