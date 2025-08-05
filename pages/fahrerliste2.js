import { useState, useEffect } from "react";

// Tabs, Labels, IDs wie im Original
const TABS = [
  { id: "Ansicht_0", label: "Heute" },
  { id: "Ansicht_1", label: "2-Tage" },
  { id: "Ansicht_2", label: "Alle" },
];

export default function Fahrerliste() {
  // State für alle Popups und Formulare
  const [view, setView] = useState("Ansicht_0");
  const [buchungen, setBuchungen] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortTick, setSortTick] = useState(0); // Für manuelles Sortieren

  // Detail/Overlay-States (wie Masken im Original)
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  const [showHourPopup, setShowHourPopup] = useState(false);
  const [hourPopup, setHourPopup] = useState({ bid: null, hr: "", min: "", rue: false });

  const [showTerminalPopup, setShowTerminalPopup] = useState(false);
  const [terminalPopup, setTerminalPopup] = useState({ bid: null, term: "" });

  const [showReport, setShowReport] = useState(false);
  const [reportPopup, setReportPopup] = useState({ bid: null, n: "", note: "" });

  const [msg, setMsg] = useState("");

  // === BUCHUNGEN LADEN ===
  useEffect(() => { loadBuchungen(); }, [view, sortTick, search]);

  async function loadBuchungen() {
    setLoading(true);
    let url = `/api/fahrerliste?view=${view}`;
    if (search) url += `&kennzeichen=${encodeURIComponent(search)}`;
    const res = await fetch(url);
    const data = await res.json();
    setBuchungen(Array.isArray(data.buchungen) ? data.buchungen : []);
    setLoading(false);
  }

  // === TIMER/REFRESH ===
  useEffect(() => {
    const interval = setInterval(() => setSortTick(t => t + 1), 1000);
    const refresh = setInterval(() => loadBuchungen(), 60000);
    return () => { clearInterval(interval); clearInterval(refresh); };
  }, []);

  // === LOGOUT ===
  function logout() { window.location.reload(); }

  // === TABS/SORT/LOGO ===
  function handleTabChange(id) { setView(id); }
  function sortList() { setSortTick(t => t + 1); }
  function logoReload() { loadBuchungen(); }

  // === BUTTON-AKTIONEN wie original ===
  async function startTimer(id) {
    await fetch("/api/fahrerliste/anruf", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    loadBuchungen();
  }
  async function finish(id) {
    await fetch("/api/fahrerliste/abgeschlossen", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    loadBuchungen();
  }
  async function reactivate(id) {
    await fetch("/api/fahrerliste/reaktivieren", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    loadBuchungen();
  }

  // === DETAIL-OVERLAY (Bearbeiten wie original) ===
  async function openEditMask(bid, n, typ) {
    setLoading(true);
    // Im Original: getdetails.php/getfahrerdetails.php je nach Typ
    const url = typ === "bu" ? `/api/getdetails?bid=${bid}&a=m&n=${n}` : `/api/getfahrerdetails?bid=${bid}&a=m&n=${n}`;
    const res = await fetch(url);
    const data = await res.json();
    setEditData(data);
    setShowEdit(true);
    setLoading(false);
  }
  async function submitEditForm(e) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);
    const res = await fetch("/api/moddetail", { method: "POST", body: form });
    const data = await res.json();
    setMsg(data.msg);
    setTimeout(() => setShowEdit(false), 800);
    setTimeout(() => loadBuchungen(), 1200);
    setLoading(false);
  }

  // === QUITTUNG ===
  async function sendQuittung(senddata) {
    const res = await fetch("/api/rechnung", { method: "POST", body: JSON.stringify({ id: senddata }) });
    const data = await res.text();
    setMsg(data + " verschickt und von Server gelöscht");
  }

  // === UHRZEIT POPUP ===
  function openHourPopup(bid, rue, hr, min) {
    setHourPopup({ bid, hr, min, rue });
    setShowHourPopup(true);
  }
  async function submitHourChange() {
    await fetch("/api/modhour", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bid: hourPopup.bid, d: hourPopup.rue ? "rue" : "ak",
        hr: hourPopup.hr, min: hourPopup.min
      })
    });
    setShowHourPopup(false);
    setTimeout(() => loadBuchungen(), 300);
  }

  // === TERMINAL POPUP ===
  function openTerminalPopup(bid, term) {
    setTerminalPopup({ bid, term });
    setShowTerminalPopup(true);
  }
  async function submitTerminalChange() {
    await fetch("/api/modterm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bid: terminalPopup.bid, tr: terminalPopup.term })
    });
    setShowTerminalPopup(false);
    setTimeout(() => loadBuchungen(), 300);
  }

  // === REPORT POPUP ===
  function openReportPopup(bid, n) {
    setReportPopup({ bid, n, note: "" });
    setShowReport(true);
  }
  async function submitReport() {
    await fetch("/api/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bid: reportPopup.bid, n: reportPopup.n,
        a: "rep", notiz: reportPopup.note
      })
    });
    setShowReport(false);
    setMsg("Report gesendet!");
  }

  // === TIMER-Logik ===
  function timerDisplay(start) {
    if (!start) return "";
    const secs = Math.floor((Date.now() - new Date(start)) / 1000);
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  // === UI START ===
  return (
    <div id="page" data-role="page" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div data-role="header" className="ui-bar-a" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between", padding: 10
      }}>
        <h1 style={{
          fontSize: "1.5em", fontWeight: "bold", textAlign: "center", margin: 0, flex: 1
        }}>ParkXpress iPAD-Liste </h1>
        <div className="logout" style={{ cursor: "pointer" }} onClick={logout}>
          <img src="/images/logout.png" alt="Ausloggen" style={{ width: 34 }} />
        </div>
      </div>

      {/* Tabs */}
      <div id="radiolist" data-role="fieldcontain" style={{
        background: "#eee", padding: "15px 0 7px 0", borderBottom: "1px solid #ccc"
      }}>
        <fieldset data-role="controlgroup" data-type="horizontal" style={{
          display: "flex", gap: 18, justifyContent: "center", alignItems: "center", border: 0
        }}>
          {TABS.map(tab => (
            <span key={tab.id}>
              <input
                name="Ansicht"
                type="radio"
                id={tab.id}
                value={tab.label}
                checked={view === tab.id}
                onChange={() => handleTabChange(tab.id)}
                style={{ accentColor: "#0a8", marginRight: 5 }}
              />
              <label htmlFor={tab.id}>{tab.label}</label>
            </span>
          ))}
        </fieldset>
        <a href="#" title="Buchungen neu sortieren" id="sort"
          style={{
            marginLeft: 12, color: "#07b", textDecoration: "underline",
            cursor: "pointer", fontWeight: "bold"
          }}
          onClick={e => { e.preventDefault(); sortList(); }}
        >
          Sortieren
        </a>
        <span className="pxplogo" style={{ marginLeft: 20, cursor: "pointer" }} onClick={logoReload}>
          <img src="/images/pxp-logo300x81.png" alt="Parkxpress Logo" style={{ height: 40, verticalAlign: "middle" }} />
        </span>
      </div>

      {/* Suchfeld */}
      <div style={{ textAlign: "center", margin: "13px 0" }}>
        <input
          type="text"
          id="kennz"
          placeholder="Kennzeichen suchen"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: "6px 14px", border: "1px solid #bbb", borderRadius: 6 }}
        />
      </div>

      {/* Buchungsliste */}
      <div id="role-content">
        {loading ? (
          <div style={{ textAlign: "center", padding: 30 }}>Lade Buchungen…</div>
        ) : (
          <ul data-role="listview" className="ui-listview" style={{
            listStyle: "none", padding: 0, margin: "18px 0 62px 0"
          }}>
            {buchungen.length === 0 && (
              <li style={{ textAlign: "center", color: "#999", padding: 30 }}>Keine Buchungen gefunden.</li>
            )}
            {buchungen.map(b => {
              let timer = "";
              let blink = false;
              let bg = "";
              if (b.timer_start && !b.abgeschlossen) {
                const sec = Math.floor((Date.now() - new Date(b.timer_start)) / 1000);
                timer = timerDisplay(b.timer_start);
                if (sec >= 600) { blink = true; bg = "#fee"; }
                else if (sec >= 300) { bg = "#ffe"; }
              }
              if (b.abgeschlossen) bg = "#ccc";
              return (
                <li key={b.id}
                  data-order={b.data_order}
                  className={
                    (b.abgeschlossen ? "grey" : "") + (blink ? " blink" : "")
                  }
                  style={{
                    background: bg || "#fff",
                    margin: "7px 0", borderRadius: 13, padding: 15,
                    border: "1px solid #eee", display: "flex", alignItems: "center", gap: 16
                  }}>
                  <div style={{ flex: 3 }}>
                    <b>{b.vorname} {b.nachname}</b> ({b.kennzeichen})<br />
                    Ankunft: <b onClick={() => openHourPopup(b.id, false, b.ankunftUhrzeit.split(":")[0], b.ankunftUhrzeit.split(":")[1])}
                      className="ankft" style={{ cursor: "pointer", textDecoration: "underline" }}>{b.ankunftUhrzeit}</b>
                    {b.timer_start && !b.abgeschlossen && (
                      <span className={"clock" + (blink ? " blink" : "")}
                        style={{
                          marginLeft: 12, color: blink ? "#f50" : "#090",
                          fontWeight: "bold", fontVariantNumeric: "tabular-nums"
                        }}
                      >⏰ {timer}</span>
                    )}
                    <div style={{ fontSize: 15, color: "#222" }}>
                      Terminal: <span className="terminal" style={{ textDecoration: "underline", cursor: "pointer" }}
                        onClick={() => openTerminalPopup(b.id, b.terminal)}>{b.terminal || "-"}</span> | Tel: {b.telefon || "-"}
                    </div>
                  </div>
                  <div style={{
                    flex: 1, display: "flex", gap: 7, justifyContent: "flex-end"
                  }}>
                    {(!b.timer_start && !b.abgeschlossen) && (
                      <button className="phone"
                        style={{
                          background: "#ffd600", color: "#000", border: 0, borderRadius: 7,
                          padding: "6px 11px", fontWeight: "bold", cursor: "pointer"
                        }}
                        onClick={() => startTimer(b.id)}
                      >Anruf bekommen</button>
                    )}
                    {(b.timer_start && !b.abgeschlossen) && (
                      <button
                        style={{
                          background: "#07b", color: "#fff", border: 0, borderRadius: 7,
                          padding: "6px 11px", fontWeight: "bold", cursor: "pointer"
                        }}
                        onClick={() => finish(b.id)}
                      >Abgeschlossen</button>
                    )}
                    {b.abgeschlossen && (
                      <button
                        style={{
                          background: "#bbb", color: "#222", border: 0, borderRadius: 7,
                          padding: "6px 11px", fontWeight: "bold", cursor: "pointer"
                        }}
                        onClick={() => reactivate(b.id)}
                      >Reaktivieren</button>
                    )}
                    {/* Edit-Button */}
                    <button className="editbtn"
                      onClick={() => openEditMask(b.id, b.n, "bu")}
                      style={{
                        background: "#eee", color: "#222", border: "1px solid #bbb", borderRadius: 6,
                        marginLeft: 5, fontWeight: 500, cursor: "pointer"
                      }}>
                      Bearbeiten
                    </button>
                    {/* Quittung */}
                    <button className="quittung"
                      onClick={() => sendQuittung(b.id)}
                      style={{
                        background: "#fafafa", color: "#07b", border: "1px solid #07b", borderRadius: 6,
                        marginLeft: 5, fontWeight: 500, cursor: "pointer"
                      }}>
                      Quittung
                    </button>
                    {/* Report */}
                    <button className="rep"
                      onClick={() => openReportPopup(b.id, b.n)}
                      style={{
                        background: "#fafafa", color: "#b33", border: "1px solid #b33", borderRadius: 6,
                        marginLeft: 5, fontWeight: 500, cursor: "pointer"
                      }}>
                      Report
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div data-role="footer" className="ui-bar-a" style={{
        background: "#222", color: "#fff", textAlign: "center", padding: "11px 0",
        position: "fixed", width: "100vw", left: 0, bottom: 0, zIndex: 99
      }}>
        <h4 style={{ margin: 0, fontWeight: "bold", letterSpacing: 1 }}>PXP Fahrerliste</h4>
      </div>

      {/* Popups und Overlays */}
      {showEdit && (
        <div className="detform" style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999,
          background: "#fff", boxShadow: "0 0 22px #0005", padding: 22, overflowY: "auto"
        }}>
          <h2>Buchung bearbeiten</h2>
          <form id="detailmod" onSubmit={submitEditForm}>
            {/* Felder: Passe je nach Datenstruktur an */}
            <input type="text" name="vorname" value={editData?.vorname || ""} onChange={...} />
            {/* ... alle weiteren Felder */}
            <button id="formsub" type="submit">Speichern</button>
            <button id="zur" type="button" onClick={() => setShowEdit(false)}>Zurück</button>
          </form>
        </div>
      )}
      {showHourPopup && (
        <div className="hour-popup" style={{
          position: "fixed", top: "18%", left: "50%", transform: "translate(-50%, 0)",
          background: "#fff", padding: 16, borderRadius: 10, boxShadow: "0 6px 33px #0003"
        }}>
          <label>Stunde: <input type="number" id="hr" value={hourPopup.hr} onChange={e => setHourPopup(p => ({ ...p, hr: e.target.value }))} /></label>
          <label>Minute: <input type="number" id="min" value={hourPopup.min} onChange={e => setHourPopup(p => ({ ...p, min: e.target.value }))} /></label>
          <button id="modhr" onClick={submitHourChange}>Uhrzeit ändern</button>
          <button id="closehr" onClick={() => setShowHourPopup(false)}>Schließen</button>
        </div>
      )}
      {showTerminalPopup && (
        <div className="terminal-popup" style={{
          position: "fixed", top: "18%", left: "50%", transform: "translate(-50%, 0)",
          background: "#fff", padding: 16, borderRadius: 10, boxShadow: "0 6px 33px #0003"
        }}>
          <label>Terminal: <input type="text" id="termt" value={terminalPopup.term} onChange={e => setTerminalPopup(p => ({ ...p, term: e.target.value }))} /></label>
          <button id="modtr" onClick={submitTerminalChange}>Terminal ändern</button>
          <button id="closetr" onClick={() => setShowTerminalPopup(false)}>Schließen</button>
        </div>
      )}
      {showReport && (
        <div className="report-popup" style={{
          position: "fixed", top: "18%", left: "50%", transform: "translate(-50%, 0)",
          background: "#fff", padding: 16, borderRadius: 10, boxShadow: "0 6px 33px #0003"
        }}>
          <h3>Report senden</h3>
          <textarea id="rep_not" value={reportPopup.note} onChange={e => setReportPopup(p => ({ ...p, note: e.target.value }))} style={{ width: "100%", minHeight: 60 }} />
          <button id="sendrep" onClick={submitReport}>Senden</button>
          <button id="closerep" onClick={() => setShowReport(false)}>Schließen</button>
        </div>
      )}

      {/* Blinken via CSS */}
      <style jsx>{`
        .blink { animation: blink 1s linear infinite; }
        @keyframes blink { 50% { opacity: 0.4; } }
        .grey { background: #666 !important; }
      `}</style>
    </div>
  );
}
