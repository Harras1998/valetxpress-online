import { useState, useEffect, useRef } from "react";

// --- Hilfsfunktionen wie im Original ---
function pad(n) { return String(n).padStart(2, "0"); }
function timeStr(secs) {
  let m = Math.floor(secs / 60), s = secs % 60;
  return pad(m) + ":" + pad(s);
}

const ANSICHTEN = [
  { id: "Ansicht_0", label: "Heute", value: "heute" },
  { id: "Ansicht_1", label: "2-Tage", value: "zwei" },
  { id: "Ansicht_2", label: "Alle", value: "alle" },
];

export default function Fahrerliste() {
  const [tab, setTab] = useState("heute");
  const [buchungen, setBuchungen] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [tick, setTick] = useState(0);

  // --- DATA LOADING ---
  async function fetchList() {
    setLoading(true);
    let url = `/api/admin/fahrerliste?ansicht=${tab}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    const res = await fetch(url);
    const data = await res.json();
    setBuchungen(Array.isArray(data.buchungen) ? data.buchungen : []);
    setLoading(false);
  }

  // --- On tab/search change ---
  useEffect(() => { fetchList(); }, [tab, search]);

  // --- Auto-reload alle 60s ---
  useEffect(() => {
    const interval = setInterval(fetchList, 60000);
    return () => clearInterval(interval);
  }, []);

  // --- Timer "tickt" jede Sekunde für Animationen/Farben ---
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // --- Logo Reload ---
  function reloadAll() { fetchList(); }

  // --- Timer Start (Anruf bekommen) ---
  async function startTimer(id) {
    await fetch("/api/admin/fahrerliste/anruf", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    fetchList();
  }

  // --- Buchung abschließen ---
  async function finish(id) {
    await fetch("/api/admin/fahrerliste/abgeschlossen", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    fetchList();
  }

  // --- Reaktivieren ---
  async function reactivate(id) {
    await fetch("/api/admin/fahrerliste/reaktivieren", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    fetchList();
  }

  // --- Sortieren nach Uhrzeit/Order (wie im Original) ---
  function sortieren() {
    setBuchungen(arr =>
      [...arr].sort((a, b) => {
        // Nutze "ankunftUhrzeit" oder order (passe Feldnamen ggf. an)
        if (a.abflugUhrzeit && b.abflugUhrzeit) {
          return a.abflugUhrzeit.localeCompare(b.abflugUhrzeit);
        }
        return (a.order || 0) - (b.order || 0);
      })
    );
  }

  // --- Timer Farbe/Animation wie im Original ---
  function timerStyle(start) {
    if (!start) return {};
    const diff = Math.floor((Date.now() - new Date(start)) / 1000);
    let color = "#333";
    let blink = false;
    if (diff >= 10 * 60) { color = "#f50"; blink = true; }
    else if (diff >= 5 * 60) { color = "#e6b800"; }
    return {
      color,
      textDecoration: blink ? "blink" : undefined,
      fontWeight: "bold",
      fontVariantNumeric: "tabular-nums",
      fontSize: "1.18em"
    };
  }

  return (
    <div id="page" style={{
      background: "#f8f8f8", minHeight: "100vh", fontFamily: "system-ui, Arial, sans-serif"
    }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "#0a8", padding: "14px 10px 16px 22px", borderBottom: "2px solid #cfc"
      }}>
        <h1 style={{
          fontSize: "2.1rem", fontWeight: "bold", textAlign: "center", margin: 0, color: "#fff", flex: 1
        }}>
          ParkXpress iPAD-Liste 
        </h1>
        <button
          title="Logout"
          onClick={() => { /* Hier Logout-Logik! */ }}
          style={{
            background: "none", border: "none", cursor: "pointer", marginLeft: 16
          }}>
          <img src="/images/logout.png" alt="Ausloggen" width={34} height={34} />
        </button>
      </div>

      {/* Tabs, Sort, Logo */}
      <div id="radiolist" style={{
        background: "#e8f9f0", padding: "18px 0 12px 0", boxShadow: "0 2px 7px #0001"
      }}>
        <fieldset style={{
          display: "flex", flexDirection: "row", gap: 12, justifyContent: "center", alignItems: "center", border: "none"
        }}>
          {ANSICHTEN.map(tabItem => (
            <label key={tabItem.id} htmlFor={tabItem.id}
              style={{
                display: "flex", alignItems: "center", fontWeight: 600, color: "#0a5", fontSize: "1.11rem", cursor: "pointer"
              }}>
              <input type="radio" name="Ansicht" id={tabItem.id}
                checked={tab === tabItem.value}
                onChange={() => setTab(tabItem.value)}
                style={{ marginRight: 5, accentColor: "#0a8" }}
              />
              {tabItem.label}
            </label>
          ))}
        </fieldset>
        <div style={{
          display: "flex", justifyContent: "center", gap: 30, alignItems: "center", marginTop: 14
        }}>
          <a href="#" onClick={e => { e.preventDefault(); sortieren(); }}
            style={{
              fontSize: "1rem", color: "#099", textDecoration: "underline", cursor: "pointer", fontWeight: "bold"
            }}
            id="sort"
          >Sortieren</a>
          <span className="pxplogo" style={{ display: "inline-block", cursor: "pointer" }}
            onClick={reloadAll}
          >
            <img src="/images/pxp-logo300x81.png" alt="Parkxpress Logo"
              style={{ height: 44, width: "auto", verticalAlign: "middle" }}
            />
          </span>
        </div>
        {/* Suche */}
        <form
          onSubmit={e => { e.preventDefault(); fetchList(); }}
          style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Kennzeichen suchen"
            style={{
              border: "1px solid #bbb", borderRadius: 6, padding: "4px 10px", minWidth: 180
            }}
          />
          <button type="submit" style={{
            marginLeft: 10, background: "#0a8", color: "#fff", border: "none", borderRadius: 7, fontWeight: "bold", padding: "5px 17px"
          }}>Suchen</button>
        </form>
      </div>

      {/* Listeninhalt */}
      <div id="role-content" style={{ margin: "0 auto", maxWidth: 900 }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: 28 }}>Lade Buchungen...</div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: "22px 0 65px 0" }}>
            {buchungen.length === 0 ? (
              <li style={{ textAlign: "center", color: "#666" }}>Keine Buchungen gefunden.</li>
            ) : (
              buchungen.map(b => {
                // Timer-Berechnung wie im Original
                let timerSec = 0;
                if (b.timer_start) {
                  timerSec = Math.floor((Date.now() - new Date(b.timer_start)) / 1000);
                }

                // Zeilenfarbe
                let rowBg = "#fff";
                if (b.status === "done" || b.abgeschlossen) rowBg = "#ddd";
                else if (b.status === "active" && timerSec >= 10 * 60) rowBg = "#ffeaea";
                else if (b.status === "active") rowBg = "#e5ffe7";

                return (
                  <li key={b.id}
                    className={
                      (b.status === "done" ? "grey" : "") +
                      (b.status === "active" && timerSec >= 10 * 60 ? " blink" : "")
                    }
                    style={{
                      background: rowBg,
                      margin: "8px 0", borderRadius: 14, padding: 18,
                      display: "flex", alignItems: "center", gap: 18, boxShadow: "0 2px 7px #0001"
                    }}>
                    <div style={{ flex: 2 }}>
                      <b>{b.vorname} {b.nachname}</b> – {b.kennzeichen}
                      <div>
                        Ankunft: <b>{b.ankunftUhrzeit || "-"}</b>
                        {b.timer_start && b.status === "active" && (
                          <span style={{ marginLeft: 12, ...timerStyle(b.timer_start) }}>
                            ⏰ {timeStr(timerSec)}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 15, color: "#222" }}>
                        Terminal: {b.terminal || "-"} | Tel: {b.telefon || "-"}
                      </div>
                    </div>
                    <div style={{
                      flex: 1, display: "flex", gap: 10, justifyContent: "flex-end"
                    }}>
                      {(!b.timer_start && !b.abgeschlossen) && (
                        <button onClick={() => startTimer(b.id)}
                          style={btnStyle("#ffd600", "#1a1a1a")}>
                          <img src="/images/phone.png" alt="Anruf" style={{ height: 19, marginRight: 8 }} />Anruf bekommen
                        </button>
                      )}
                      {(b.timer_start && !b.abgeschlossen) && (
                        <button onClick={() => finish(b.id)}
                          style={btnStyle("#1db954", "#fff")}>
                          Abgeschlossen
                        </button>
                      )}
                      {(b.abgeschlossen) && (
                        <button onClick={() => reactivate(b.id)}
                          style={btnStyle("#aaa", "#222")}>
                          Reaktivieren
                        </button>
                      )}
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div style={{
        background: "#e8f9f0", textAlign: "center", padding: "10px 0",
        position: "fixed", bottom: 0, width: "100vw"
      }}>
        <h4 style={{
          color: "#0a8", fontWeight: "bold", margin: 0
        }}>PXP Fahrerliste</h4>
      </div>
      <style jsx>{`
        .blink {
          animation: blink 1s steps(2, start) infinite;
        }
        @keyframes blink {
          to { visibility: hidden; }
        }
        .grey { background: #ddd !important; }
      `}</style>
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
    cursor: "pointer",
    fontSize: "1em"
  };
}
