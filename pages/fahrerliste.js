import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
  hideControls = false,
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
        <div style={{ minWidth: 50, textAlign: "right", paddingRight: 28, display: onLogout ? "block" : "none" }}>
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
        display: hideControls ? "none" : "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1.5px solid #dedede"
      }}>
        <div style={{ display: "flex", alignItems: "center", marginLeft: 14, gap: 0 }}>
          <button
            onClick={() => setTab && setTab("heute")}
            style={{
              background: tab === "heute" ? "#6DB6E2" : "#fff",
              color: tab === "heute" ? "#fff" : "#222",
              fontWeight: "bold",
              fontSize: 24,
              padding: "7px 36px",
              border: "1px solid #ccc",
              borderRight: "none",
              borderRadius: "16px 0 0 16px",
              cursor: setTab ? "pointer" : "default"
            }}>Heute</button>
          <button
            onClick={() => setTab && setTab("2tage")}
            style={{
              background: tab === "2tage" ? "#6DB6E2" : "#fff",
              color: tab === "2tage" ? "#fff" : "#222",
              fontWeight: "bold",
              fontSize: 24,
              padding: "7px 36px",
              border: "1px solid #ccc",
              borderRight: "none",
              borderLeft: "none",
              borderRadius: 0,
              cursor: setTab ? "pointer" : "default"
            }}>2-Tage</button>
          <button
            onClick={() => setTab && setTab("alle")}
            style={{
              background: tab === "alle" ? "#6DB6E2" : "#fff",
              color: tab === "alle" ? "#fff" : "#222",
              fontWeight: "bold",
              fontSize: 24,
              padding: "7px 36px",
              border: "1px solid #ccc",
              borderLeft: "none",
              borderRadius: "0 16px 16px 0",
              cursor: setTab ? "pointer" : "default"
            }}>Alle</button>
        </div>
        <div style={{ flex: 1, display: tab === "alle" ? "none" : "flex", alignItems: "center", margin: "0 26px", maxWidth: 620 }}>
          <input
            type="text"
            value={suchtext || ""}
            onChange={e => setSuchtext && setSuchtext(e.target.value)}
            placeholder="Suche nach Kennzeichen"
            style={{
              width: "100%",
              fontSize: 18,
              padding: "7px 15px",
              borderRadius: 8,
              border: "1px solid #bbb",
              marginLeft: 16,
              marginRight: 16
            }}
            disabled={!setSuchtext}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 32, marginRight: 38 }}>
          <select
            value={sort || "abflugdatum"}
            onChange={e => setSort && setSort(e.target.value)}
            style={{
              color: "#1689ca",
              fontSize: 22,
              fontWeight: "bold",
              border: "none",
              background: "none",
              textDecoration: "underline",
              cursor: setSort ? "pointer" : "default",
              marginRight: 20
            }}
            disabled={!setSort}
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
}function dateOnlyISO(dt) {
  return (dt || "").slice(0, 10);
}
function isRueckHeuteOder2(b) {
  const today = new Date(); today.setHours(0,0,0,0);
  const rStr = dateOnlyISO(b.rueckflugdatum);
  if (!rStr) return false;
  const r = new Date(rStr);
  if (isNaN(r)) return false;
  r.setHours(0,0,0,0);
  const diffDays = Math.floor((r - today) / (1000*60*60*24));
  return diffDays >= 0 && diffDays <= 2;
}





function PXFooter() {
  return (
    <div
      style={{
        width: "100%",
        background: "linear-gradient(#000,#111)",
        borderTop: "1.5px solid #444",
        marginTop: 0
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          minWidth: 1440,
          margin: "0 auto",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 28,
          fontWeight: "bold",
          letterSpacing: 0.5,
          fontFamily: "Arial, Helvetica, sans-serif"
        }}
      >
        ValetXpress Fahrerliste
      </div>
    </div>
  );
}


function PXEditFooter({ name }) {
  const label = (`Buchung ${name || ""}`).trim();
  return (
    <div
      style={{
        width: "100%",
        background: "linear-gradient(#000,#111)",
        borderTop: "1.5px solid #444",
        marginTop: 0
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          minWidth: 1440,
          margin: "0 auto",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 28,
          fontWeight: "bold",
          letterSpacing: 0.5,
          fontFamily: "Arial, Helvetica, sans-serif"
        }}
      >
        {label}
      </div>
    </div>
  );
}


export default function FahrerListe() {
  const [tab, setTab] = useState("heute");
  const [list, setList] = useState([]);
  const [auth, setAuth] = useState("");
  // Beim Einloggen immer zuerst den "heute"-Tab zeigen
  useEffect(() => {
    if (auth) setTab("heute");
  }, [auth]);

  const [login, setLogin] = useState({ user: "", pass: "" });
  const [suchtext, setSuchtext] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sort, setSort] = useState("abflugdatum");
  const [username, setUsername] = useState("");
  // Pro-Benutzer "abgehakt"-Status (nur lokal sichtbar)
  const [doneByUser, setDoneByUser] = useState({});
  useEffect(() => {
    try {
      if (!username) return;
      const key = `vx_done_${username}`;
      const raw = localStorage.getItem(key);
      setDoneByUser(raw ? JSON.parse(raw) : {});
    } catch {}
  }, [username]);
  useEffect(() => {
    try {
      if (!username) return;
      const key = `vx_done_${username}`;
      localStorage.setItem(key, JSON.stringify(doneByUser || {}));
    } catch {}
  }, [username, doneByUser]);

  
  
  
  // Dynamische Viewport-Auto-Fit (robust für alle Breakpoints inkl. 320px & 1024px)
  useEffect(() => {
    try {
      const meta = document.querySelector('meta[name="viewport"]');
      const root = () => document.getElementById('vx-root');
      // iPad pinch-zoom guard: remember the base width when not zooming
      let __vx_baseW = window.innerWidth || document.documentElement.clientWidth || 0;
      const apply = () => {
        let w = window.innerWidth || document.documentElement.clientWidth || 0;
        // iPad: während eines aktiven Pinch‑Zooms (visualViewport.scale != 1)
        // nutzen wir die zuletzt bekannte Basisbreite, damit das Layout
        // nicht neu berechnet/jittert. Außerhalb von Zoom-Phasen aktualisieren
        // wir die Basis automatisch.
        const vv = (typeof window !== 'undefined' && window.visualViewport) ? window.visualViewport : null;
        if (vv && typeof vv.scale === 'number') {
          if (Math.abs(vv.scale - 1) > 0.001) {
            w = __vx_baseW; // fixiere Breite während des Zooms
          } else {
            __vx_baseW = w; // Basisbreite aktualisieren, wenn kein Zoom aktiv ist
          }
        }
        const design = 1440; // feste Layoutbreite

        const el = root && root();
        if (!el) return;

        // Basis: immer klare Root-Breite setzen
        el.style.maxWidth = design + "px";
        el.style.minWidth = design + "px";

        if (w < design) {
          // 1) Viewport-Skalierung
          const scale = Math.max(0.2, Math.min(1, w / design));
          if (meta) {
            meta.setAttribute(
              'content',
              `width=${design}, initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no, viewport-fit=cover`
            );
          }

          // 2) Fallback/Ergänzung: CSS-Transform (hilft, wenn Browser die Meta-Änderung
          //    erst spät oder gar nicht übernimmt – z.B. in DevTools/Emulation).
          el.style.transformOrigin = "top left";
          el.style.transform = `scale(${scale})`;
          el.style.position = "relative";
          // horizontal mittig darstellen (ohne Überlauf):
          const left = Math.max(0, Math.floor((w - design * scale) / 2));
          el.style.left = left + "px";

          // Scrollbalken vermeiden:
          document.body && (document.body.style.overflowX = "hidden");
        } else if (w > design) {
          // NEW: scale UP to fill wide viewports (no white bars), keep <=1440px unchanged
          const scale = w / design;
          if (meta) {
            meta.setAttribute('content', 'width=device-width, initial-scale=1, viewport-fit=cover');
          }
          el.style.transformOrigin = "top left";
          el.style.transform = `scale(${scale})`;
          el.style.position = "relative";
          // Compensate the default centering (margin: auto) so the scaled root starts at x=0
          const left = -Math.floor((w - design) / 2);
          el.style.left = left + "px";
          document.body && (document.body.style.overflowX = "hidden");
        } else {
          // Exactly 1440px: native (unscaled) layout
          if (meta) {
            meta.setAttribute('content', 'width=device-width, initial-scale=1, viewport-fit=cover');
          }
          el.style.transform = "none";
          el.style.left = "0";
          el.style.position = "static";
          document.body && (document.body.style.overflowX = "hidden");
        }
      };
      const t = setTimeout(apply, 0);
      window.addEventListener('resize', apply);
      window.addEventListener('orientationchange', apply);
      document.fonts && document.fonts.ready && document.fonts.ready.then(apply).catch(()=>{});
      window.addEventListener('load', apply);
      return () => {
        clearTimeout(t);
        window.removeEventListener('resize', apply);
        window.removeEventListener('orientationchange', apply);
        window.removeEventListener('load', apply);
      };
    } catch {}
  }, []);
// Login aus localStorage wiederherstellen
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem("vx_auth");
      const savedUser = localStorage.getItem("vx_user") || "";
      if (savedAuth) { setAuth(savedAuth); setUsername(savedUser); }
    } catch {}
  }, []);
const [editBuchung, setEditBuchung] = useState(null);
  const [editSaving, setEditSaving] = useState(false);
  // --- Edit-Overlay: responsive Skalierung + Scroll-Lock (verhindert doppelte Scrollbalken) ---
  const designW = 1440;
  const [editScale, setEditScale] = useState(1);
  const [editLeft, setEditLeft] = useState(0);

  useEffect(() => {
    if (!editBuchung) return;
    const calc = () => {
      try {
        const w = window.innerWidth || document.documentElement.clientWidth || 0;
        const scale = Math.max(0.2, Math.min(1, w / designW));
        setEditScale(scale);
        const left = Math.max(0, Math.floor((w - designW * scale) / 2));
        setEditLeft(left);
      } catch {}
    };
    calc();
    window.addEventListener('resize', calc);
    window.addEventListener('orientationchange', calc);
    return () => {
      window.removeEventListener('resize', calc);
      window.removeEventListener('orientationchange', calc);
    };
  }, [editBuchung]);

  useEffect(() => {
    if (!editBuchung) return;
    const body = document.body;
    if (!body) return;
    const prevOverflow = body.style.overflow;
    const prevOverflowX = body.style.overflowX;
    const prevOverflowY = body.style.overflowY;
    try {
      body.style.overflow = 'hidden';
    } catch {}
    return () => {
      try {
        body.style.overflow = prevOverflow || '';
        body.style.overflowX = prevOverflowX || '';
        body.style.overflowY = prevOverflowY || '';
      } catch {}
    };
  }, [editBuchung]);

  const [alleShowAll, setAlleShowAll] = useState(false);
  // Sichtfeld für Notizen ohne Steuer‑Tags (CT/DX)
  const [editBemerkungPlain, setEditBemerkungPlain] = useState("");

  // Wenn eine Buchung zum Bearbeiten geöffnet wird, Notiz-Text ohne [CT:...] und [DX:...] anzeigen
  useEffect(() => {
    try {
      setEditBemerkungPlain(editBuchung ? stripAllTags(editBuchung.bemerkung || "") : "");
    } catch {}
  }, [editBuchung]);


  const rueckModus = tab === "heute" || tab === "2tage";
  // --- Timer/Call state for "Heute"-Tab ---
  const [callTimers, setCallTimers] = useState({});
  // Persistenz der Anruf-Timer über Reloads (global)
  useEffect(() => {
    try {
      const keyUser = "vx_callTimers";
      const raw = localStorage.getItem(keyUser);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          setCallTimers(parsed);
        }
      }
    } catch {}
    // Nur laden, wenn sich der Benutzer ändert / bekannt wird
  }, []);

  useEffect(() => {
    try {
      const keyUser = "vx_callTimers";
      localStorage.setItem(keyUser, JSON.stringify(callTimers));
    } catch {}
  }, [callTimers]);
 // { [buchungId]: startTimestampMs }
  const [timerTick, setTimerTick] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => {
      setTimerTick(t => (t + 1) % 3600); // trigger re-render each second
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  function timerElapsedSec(id) {
    const start = callTimers[id];
    if (!start) return 0;
    const diff = Math.floor((Date.now() - start) / 1000);
    return diff % 3600; // loop every hour
  }
  function formatMMSS(totalSec) {
    const mm = Math.floor(totalSec / 60);
    const ss = totalSec % 60;
    return String(mm).padStart(1, "0") + ":" + String(ss).padStart(2, "0");
  }
  // ---- Universal Timer via [CT:timestamp] Tag in bemerkung ----
  function parseCallTimerFromBem(bem) {
    const m = (bem || "").match(/\[CT:(\d{10,})\]/);
    return m ? parseInt(m[1], 10) : null;
  }
  function stripCallTimer(bem) {
    return (bem || "").replace(/\s*\[CT:\d{10,}\]\s*/g, "").trim();
  }
  function withCallTimer(bem, ts) {
    const base = stripCallTimer(bem);
    return `${base}${base ? " " : ""}[CT:${ts}]`;
  }



  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const encoded = btoa(`${login.user}:${login.pass}`);
      const testUrl = `/api/proxy?path=api/admin/buchungen&sort=abflugdatum&dir=asc&limit=1`;
      const res = await fetch(testUrl, { headers: { Authorization: `Basic ${encoded}` } });
      if (!res.ok) {
        setLoading(false);
        setError(res.status === 401 ? "Benutzername oder Passwort ist falsch." : `Login fehlgeschlagen (HTTP ${res.status}).`);
        return;
      }
      setAuth(encoded);
      setUsername(login.user);
      
      try { localStorage.setItem("vx_auth", encoded); localStorage.setItem("vx_user", login.user); } catch {}
setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Netzwerkfehler beim Login.");
    }
  }
  function handleLogout() {
    setAuth("");
    setUsername("");
    setLogin({ user: "", pass: "" });
  
  try { localStorage.removeItem("vx_auth"); localStorage.removeItem("vx_user"); } catch {}
}

// ---- Universal "Done" via [DX:username] Tag in bemerkung ----
function parseDXOwnerFromBem(bem) {
  const m = (bem || "").match(/\[DX:([^\]]+)\]/);
  return m ? m[1] : null;
}
function stripDXTag(bem) {
  return (bem || "").replace(/\s*\[DX:[^\]]+\]\s*/g, "").trim();
}
function withDXTag(bem, user) {
  const base = stripDXTag(bem);
  return `${base}${base ? " " : ""}[DX:${user}]`;
}
// Helper: alle Steuer-Tags (CT + DX) für die Anzeige ausblenden
function stripAllTags(bem) {
  return stripDXTag(stripCallTimer(bem));
}

// Hilfsfunktionen: vorhandene CT/DX-Tags beibehalten, wenn der sichtbare Notiztext geändert wird
function __extractBemerkungTags(bem) {
  const tags = [];
  const dx = (bem || "").match(/\[DX:[^\]]+\]/);
  if (dx) tags.push(dx[0]);
  const ct = (bem || "").match(/\[CT:\d{10,}\]/);
  if (ct) tags.push(ct[0]);
  return tags.join(" ").trim();
}
function __mergeBemerkungWithTags(plain, originalBem) {
  const tags = __extractBemerkungTags(originalBem);
  const base = (plain || "").trim();
  return tags ? (base ? (base + " " + tags) : tags) : base;
}


  useEffect(() => {
    if (!auth) return;
    setLoading(true);
    let url = `/api/proxy?path=api/admin/buchungen&sort=${sort}&dir=asc`;
    if (suchtext) url += `&suchtext=${encodeURIComponent(suchtext)}`;
    fetch(url, { headers: { Authorization: `Basic ${auth}` } })
      .then(r => r.json())
      .then(data => {
        const rows = data.buchungen || [];
        setList(rows);
        // Universal-CallTimer: aus Bemerkung [CT:...] in lokalen Zustand übernehmen
        const timers = {};
        for (const r of rows) {
          const ts = parseCallTimerFromBem(r.bemerkung);
          if (ts) timers[r.id] = ts;
        }
        setCallTimers(timers);
        setLoading(false);
      })
      .catch(() => { setError("Fehler beim Laden"); setLoading(false); });
  }, [auth, suchtext, sort]);

  useEffect(() => { if (tab !== "alle") setAlleShowAll(false); }, [tab]);
  // Ensure only ONE vertical scrollbar in "Alle Buchungen":
  // We make the window (body) the single scroll container when the "alle" tab is active.
  useEffect(() => {
    try {
      const html = document.documentElement;
      const body = document.body;
      if (!html || !body) return;

      const root = document.getElementById("vx-root");
      const prevHtmlY = html.style.overflowY;
      const prevBodyY = body.style.overflowY;
      const prevRootY = root ? root.style.overflowY : undefined;

      if (tab === "alle") {
        // Hide html scroll, use body scroll, keep inner containers visible
        html.style.overflowY = "auto";
        body.style.overflowY = "hidden";
        if (root) root.style.overflowY = "visible";
      }} else {
        // Reset when leaving the tab
        html.style.overflowY = prevHtmlY || "";
        body.style.overflowY = prevBodyY || "";
        if (root && prevRootY !== undefined) root.style.overflowY = prevRootY || "";
      }

      return () => {
        // Cleanup on unmount or tab switch
        try {
          html.style.overflowY = prevHtmlY || "";
          body.style.overflowY = prevBodyY || "";
          if (root && prevRootY !== undefined) root.style.overflowY = prevRootY || "";
        } catch {}
      };
    } catch {}
  }, [tab, alleShowAll]);


  let filtered = list;
  const today = new Date();
  if (tab === "heute") {
  const isoToday = today.toISOString().slice(0, 10);
  filtered = filtered.filter(b => {
    const abflug = b.abflugdatum?.slice(0, 10);
    const rueck = b.rueckflugdatum?.slice(0, 10);
    return abflug === isoToday || rueck === isoToday;
  });

  filtered = filtered.filter(b => !(doneByUser && doneByUser[b.id]));

  
filtered = filtered.filter(b => {
  const owner = parseDXOwnerFromBem(b.bemerkung);
  return !owner || owner === username;
});

} else if (tab === "2tage") {
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(today.getDate() + 2);
  const isoTomorrow = tomorrow.toISOString().slice(0, 10);
  const isoDayAfter = dayAfter.toISOString().slice(0, 10);
  filtered = filtered.filter(b => {
    const abflug = b.abflugdatum?.slice(0, 10);
    const rueck = b.rueckflugdatum?.slice(0, 10);
    return (
      abflug === isoTomorrow || abflug === isoDayAfter ||
      rueck === isoTomorrow || rueck === isoDayAfter
    );
  });
}
  if (tab === "alle" && !alleShowAll) {
    const isoToday = today.toISOString().slice(0, 10);
    filtered = filtered.filter(b => {
      const abflug = (b.abflugdatum || "").slice(0, 10);
      const rueck = (b.rueckflugdatum || "").slice(0, 10);
      return abflug === isoToday || rueck === isoToday;
    });
  }

// Universal: Abgehakte Buchungen [DX:*] nur für den Ersteller sichtbar
if (tab === "alle") {
  filtered = filtered.filter(b => {
    const owner = parseDXOwnerFromBem(b.bemerkung);
    return !owner || owner === username;
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
  if (tab === "alle") return (doneByUser && doneByUser[b.id]) ? "#666666" : "#e0e0e0";
  // Immer nur mit reinen Datumsanteilen rechnen (Zeitzonen-sicherer)
  const today = new Date(); today.setHours(0,0,0,0);
  const abflug = new Date((b.abflugdatum || "").slice(0,10)); abflug.setHours(0,0,0,0);
  const rueck  = new Date((b.rueckflugdatum || "").slice(0,10)); rueck.setHours(0,0,0,0);

  // Wie bisher: "heute/morgen/übermorgen" relativ zum Abflug -> weiß
  const diffTage = Math.floor((abflug - today) / (1000*60*60*24));
  if (diffTage >= 0 && diffTage <= 2) return "#fff";

  // In Heute- und 2-Tage-Tab nach dem Abflug immer dunkleres Grau,
  // damit die Karte dort konsistent so aussieht wie gewünscht.
  if (tab === "heute" || tab === "2tage") {
    if (today >= abflug) return "#e0e0e0";
  }

  // Fallback (z.B. Tab "Alle"): alte Logik beibehalten
  if (today < abflug) return "#fff";
  if (today >= abflug && today < rueck) return "#eee";
  return "#e0e0e0";
}

  // Gruppierung pro Tab: 
// - Heute: nach dem Datum gruppieren, das HEUTE ist (Rückflug ODER Abflug)
// - 2-Tage: nach dem Datum gruppieren, das in den beiden Tagen liegt (Rückflug bevorzugt, sonst Abflug)
// - Alle: immer nach Abflugdatum
const isoToday = new Date().toISOString().slice(0, 10);
const tomorrow = new Date(); tomorrow.setDate(new Date().getDate() + 1);
const dayAfter = new Date(); dayAfter.setDate(new Date().getDate() + 2);
const isoTomorrow = tomorrow.toISOString().slice(0, 10);
const isoDayAfter = dayAfter.toISOString().slice(0, 10);

function keyForTab(b) {
  const abf = dateOnlyISO(b.abflugdatum);
  const rue = dateOnlyISO(b.rueckflugdatum);
  if (tab === "heute") {
    if (rue === isoToday) return rue;
    return abf;
  } else if (tab === "2tage") {
    if (rue === isoTomorrow || rue === isoDayAfter) return rue;
    return abf;
  } else { // tab === "alle"
    // Gleiche Logik wie im Tab "Heute" (nur in der Standardansicht ohne "Alle Buchungen")
    if (!alleShowAll) {
      if (rue === isoToday) return rue;
      return abf;
    }
    // Bei "Alle Buchungen" weiterhin nach Abflugdatum gruppieren
    return abf;
  }
}

const groupsByDate = filtered.reduce((acc, b) => {
  const key = keyForTab(b);
  if (!key) return acc;
  (acc[key] ||= []).push(b);
  return acc;
}, {});
const dayKeys = Object.keys(groupsByDate).sort();


// --- Helper: Zeit für die jeweilige Tagesgruppe bestimmen (entspricht der Anzeige links) ---
function displayTimeForDay(row, dayKey) {
  // Wenn der Tagesheader dem Rückflugdatum entspricht -> Rückflug-Uhrzeit,
  // sonst (Abflug-Tag) -> Ankunftszeit am Parkplatz
  if (dateOnlyISO(row.rueckflugdatum) === dayKey) {
    return row.rueckflugUhrzeit || "";
  }
  return row.ankunftUhrzeit || "";
}
function timeToMinutes(t) {
  if (!t || typeof t !== "string") return 24*60+1; // fehlende Zeit -> ganz ans Ende
  const m = t.match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return 24*60+1;
  const hh = parseInt(m[1], 10);
  const mm = parseInt(m[2], 10);
  return hh*60 + mm;
}
// Alle Gruppen nach der oben definierten Anzeige-Zeit sortieren (00:00 -> 23:59)
for (const k of Object.keys(groupsByDate)) {
  groupsByDate[k].sort((a, b) => timeToMinutes(displayTimeForDay(a, k)) - timeToMinutes(displayTimeForDay(b, k)));
}


  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
              <style>{`
          html, body, #__next { margin: 0; padding: 0; width: 100%; }
          * { box-sizing: border-box; }
          html, body { overflow-x: hidden; }
          #__next { height: auto !important; overflow-y: visible !important; }
          #vx-root { overflow-y: visible !important; } html { overflow-y: auto; scrollbar-gutter: stable; } body { overflow-y: hidden; }
        `}</style>
      </Head>
      {!auth ? (
        <div id="vx-root"
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
            username=""
            tab={tab}
            setTab={setTab}
            suchtext={suchtext}
            setSuchtext={setSuchtext}
            sort={sort}
            setSort={setSort}
            onLogout={() => setLogin({ user: "", pass: "" })} 
            hideControls={false}
          />

          {/* Login-Bereich im grauen Streifen wie im Screenshot */}
          <div style={{ background: "#ededed", borderBottom: "1.5px solid #dedede" }}>
            <div style={{ padding: "24px 28px 30px 28px" }}>
              <div style={{ fontSize: 36, fontWeight: "bold", color: "#333", marginBottom: 16 }}>
                Fahrerliste Login
              </div>
              <form onSubmit={handleLogin} style={{ maxWidth: 420 }}>
                <div style={{ marginBottom: 12 }}>
                  <input
                    type="text"
                    placeholder="Username"
                    value={login.user}
                    onChange={e => setLogin({ ...login, user: e.target.value })}
                    required
                    style={{
                      width: 260,
                      fontSize: 18,
                      padding: "8px 10px",
                      borderRadius: 4,
                      border: "1px solid #999",
                      boxShadow: "inset 0 1px 2px #0001",
                      background: "#fff"
                    }}
                  />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <input
                    type="password"
                    placeholder="Password"
                    value={login.pass}
                    onChange={e => setLogin({ ...login, pass: e.target.value })}
                    required
                    style={{
                      width: 260,
                      fontSize: 18,
                      padding: "8px 10px",
                      borderRadius: 4,
                      border: "1px solid #999",
                      boxShadow: "inset 0 1px 2px #0001",
                      background: "#fff"
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px 32px",
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#fff",
                    background: "linear-gradient(#444,#222)",
                    border: "1px solid #333",
                    borderRadius: 24,
                    boxShadow: "inset 0 1px 0 #777, 0 2px 6px #0002",
                    boxSizing: "border-box",
                    cursor: "pointer"
                  }}
                >
                  Login
                </button>
              </form>
              {error && <div style={{ color: "red", marginTop: 12 }}>{error}</div>}
            </div>
          </div>

          <PXFooter />
        </div>
      ) : (
        <div id="vx-root"
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

{tab === "alle" && (
  <div style={{ background: "#A6F4A5", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", margin: 0, position: "relative"}}>
    <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
      <input
        type="text"
        value={suchtext || ""}
        onChange={e => setSuchtext(e.target.value)}
        placeholder="Suche nach Kennzeichen"
        style={{ width: 250, fontSize: 18, padding: "7px 15px", borderRadius: 8, border: "1px solid #7cc67c" }}
      />
      <button
        onClick={() => setAlleShowAll(true)}
        style={{ fontSize: 18, padding: "7px 15px", fontWeight: "bold", borderRadius: 8, border: "1px solid #5ea35e", background: "#69d169", cursor: "pointer", width: "fit-content" }}
      >
        Alle Buchungen
      </button>
    </div>
    <span style={{ position: "absolute", right: 180, top: "50%", transform: "translateY(-50%)", fontSize: 20, cursor: "pointer" }} title="Bearbeiten">✏️</span>
  </div>
)}

            <div style={{ padding: 12, color: "#777", fontSize: 18, marginLeft: 10, display: "flex", alignItems: "center", height: 38, lineHeight: "22px" }}>
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
                  {/* Blauer Balken */}
                  <div
                    style={{
                      background: "linear-gradient(#6E97BF, #4F7FA9)",
                      color: "#ffffff",
                      fontWeight: "bold",
                      fontSize: 22,
                      padding: "8px 14px",
                      borderTop: "1px solid #4677A2",
                      borderBottom: "1px solid #4677A2",
                      marginTop: 0,
                      lineHeight: "22px",
                      height: 38,
                      alignItems: "center",
                      display: "flex",
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
                        background: (tab === "heute" && callTimers[row.id] ? (cardColor(row) === "#fff" ? "linear-gradient(#79D25D,#2F8B0F)" : "linear-gradient(#6DB6E2,#3C87C8)") : cardColor(row)),
                        padding: "16px 0 8px 0",
                        boxShadow: "none",
                        border: "none",
                        borderBottom: "2px solid #ccc",
                        display: "flex",
                        alignItems: "flex-start",
                        fontSize: "32px",
                        fontFamily: "Arial, Helvetica, sans-serif", color: (tab === "heute" && callTimers[row.id]) ? "#fff" : ((tab === "alle" && doneByUser && doneByUser[row.id]) ? "#fff" : undefined)
                      }}
                    >
                      <div style={{ flex: 1, marginLeft: 18 }}>
                        <div className="fahrer-card-title" style={{ fontWeight: "bold", marginBottom: 0, fontSize: "20px" }}>{tab === "2tage" ? (
  <>
    {(dateOnlyISO(row.rueckflugdatum) === day ? row.rueckflugUhrzeit : row.ankunftUhrzeit) || ""} | <span style={{ color: (tab === "heute" && callTimers[row.id]) ? "#222" : "inherit" }}>{row.vorname} {row.nachname}</span> | {row.anzahl_personen ? (row.anzahl_personen + "/ ") : ""} | {row.reiseziel} |{" "}
    <a className="telefon-link" href={`tel:${row.telefon}`} style={{ color: (tab === "alle" && ((doneByUser && doneByUser[row.id]) || parseDXOwnerFromBem(row.bemerkung))) ? "#fff" : "#001cff", textDecoration: "underline", fontWeight: 600 }}>{row.telefon}</a> |{" "}
    {["allinclusive", "all-inclusive", "all_inclusive"].includes((row.typ || "").toLowerCase())
      ? "All"
      : (row.typ && row.typ.charAt ? (row.typ.charAt(0).toUpperCase() + row.typ.slice(1)) : row.typ)
    }
  </>
) : (
  <>
    
                          {(dateOnlyISO(row.rueckflugdatum) === day ? row.rueckflugUhrzeit : row.ankunftUhrzeit) || ""} | {row.terminal} | {row.status || "geplant"} | {["allinclusive", "all-inclusive", "all_inclusive"].includes((row.typ || "").toLowerCase())
                            ? "All"
                            : row.typ.charAt(0).toUpperCase() + row.typ.slice(1)} | <span style={{ color: (tab === "heute" && callTimers[row.id]) ? "#222" : "inherit" }}>{row.vorname} {row.nachname}</span> | {row.anzahl_personen ? (row.anzahl_personen + "/ ") : ""} | {row.reiseziel} |{" "}
                          <a className="telefon-link" href={`tel:${row.telefon}`} style={{ color: (tab === "alle" && ((doneByUser && doneByUser[row.id]) || parseDXOwnerFromBem(row.bemerkung))) ? "#fff" : "#001cff", textDecoration: "underline", fontWeight: 600 }}>{row.telefon}</a> | 
                        
  </>
)}</div>
                        <div className="info-zeile" style={{
                          fontSize: 17, margin: "12px 0 0 0", color: (tab === "heute" && callTimers[row.id]) ? "#fff" : ((tab === "alle" && doneByUser && doneByUser[row.id]) ? "#fff" : "#444"), display: "flex", alignItems: "center", fontWeight: 700
                        }}>
                          <span style={{ color: (tab === "alle" && ((doneByUser && doneByUser[row.id]) || parseDXOwnerFromBem(row.bemerkung))) ? "#000" : (tab === "heute" && callTimers[row.id]) ? "#000" : "inherit" }}>{formatDE(row.abflugdatum)} {row.abflugUhrzeit} {row.flugnummerHin}</span>
                          <span style={{ margin: "0 5px", fontWeight: 500 }}>|</span>
                          <span className="notiz-label"><b>Notizen:</b> {stripAllTags(row.bemerkung)}</span>
                        </div>
                        <div className="info-zeile" style={{
                          display: "flex", alignItems: "center", gap: 0, fontSize: 17, marginTop: 0, fontWeight: 700
                        }}>
                          <span style={{ color: (tab === "heute" && callTimers[row.id]) ? "#0a5a00" : "#16b000" }}>
                            {formatDE(row.rueckflugdatum)} {row.rueckflugUhrzeit} {row.flugnummerRueck}
                          </span>
                          <span style={{ color: (tab === "heute" && callTimers[row.id]) ? "#fff" : "#888", margin: "0 5px" }}>|</span>
                          <span style={{ color: (tab === "heute" && callTimers[row.id]) ? "#fff" : ((tab === "alle" && ((doneByUser && doneByUser[row.id]) || parseDXOwnerFromBem(row.bemerkung))) ? "#fff" : "#111") }}>{row.kennzeichen}</span>
                          <span style={{ color: (tab === "heute" && callTimers[row.id]) ? "#fff" : "#888", margin: "0 5px" }}>|</span>
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
                        {tab === "2tage" ? (<>
<span style={{ fontSize: 20, color: "#444", cursor: "default", visibility: "hidden" }}>✔️</span>
<span style={{ fontSize: 20, color: "#444", cursor: "default", visibility: "hidden" }}>📞</span>
</>) : tab === "alle" ? (<>
<span style={{ fontSize: 20, color: "#444", cursor: "default", visibility: "hidden" }}>📞</span>
{(doneByUser && doneByUser[row.id]) || parseDXOwnerFromBem(row.bemerkung) === username ? (
  <span
    style={{ fontSize: 20, color: "#fff", cursor: "pointer" }}
    title="Zurücksetzen"
    
onClick={() => { 
  setDoneByUser(prev => { const p = { ...prev }; delete p[row.id]; return p; });
  // Timer lokal entfernen
  try { setCallTimers(prev => { const next = { ...prev }; if (next[row.id]) delete next[row.id]; return next; }); } catch {}
  (async () => { try {
    const cleanedBem = stripDXTag(stripCallTimer(row.bemerkung));
    const payload = { ...row, bemerkung: cleanedBem };
    ["abflugdatum","rueckflugdatum","start","end"].forEach(f => {
      if (payload[f]) payload[f] = (typeof payload[f] === "string" ? payload[f].split("T")[0] : payload[f]);
    });
    await fetch(`/api/proxy?path=api/admin/buchung/${row.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
      body: JSON.stringify(payload)
    });
    // Liste neu laden & Timer-Stände aus Backend neu aufbauen
    setLoading(true);
    let url = `/api/proxy?path=api/admin/buchungen&sort=${sort}&dir=asc`;
    if (suchtext) url += `&suchtext=${encodeURIComponent(suchtext)}`;
    const r = await fetch(url, { headers: { Authorization: `Basic ${auth}` } });
    const data = await r.json();
    setList(data.buchungen || []);
    const timers = {};
    for (const r2 of (data.buchungen || [])) {
      const ts = parseCallTimerFromBem(r2.bemerkung);
      if (ts) timers[r2.id] = ts;
    }
    setCallTimers(timers);
    setLoading(false);
    // Nach Reset in den Tab "heute" springen
    setTab("heute");
  } catch {} })();
}}

  >↻</span>
) : (
  <span
    style={{ fontSize: 20, color: "#444", cursor: "pointer" }}
    title="Status"
    onClick={() => { 
  setDoneByUser(prev => ({ ...prev, [row.id]: true }));
  (async () => { try {
    const newBem = withDXTag(row.bemerkung, username);
    const payload = { ...row, bemerkung: newBem };
    ["abflugdatum","rueckflugdatum","start","end"].forEach(f => {
      if (payload[f]) payload[f] = (typeof payload[f] === "string" ? payload[f].split("T")[0] : payload[f]);
    });
    await fetch(`/api/proxy?path=api/admin/buchung/${row.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
      body: JSON.stringify(payload)
    });
    setLoading(true);
    let url = `/api/proxy?path=api/admin/buchungen&sort=${sort}&dir=asc`;
    if (suchtext) url += `&suchtext=${encodeURIComponent(suchtext)}`;
    const r = await fetch(url, { headers: { Authorization: `Basic ${auth}` } });
    const data = await r.json();
    setList(data.buchungen || []);
    const timers = {};
    for (const r2 of (data.buchungen || [])) {
      const ts = parseCallTimerFromBem(r2.bemerkung);
      if (ts) timers[r2.id] = ts;
    }
    setCallTimers(timers);
    setLoading(false);
  } catch {} })();
}}
  >✔️</span>
)}
</>) : (<>
<span style={{ fontSize: 20, color: "#444", cursor: "pointer" }} title="Status" onClick={() => { 
  setDoneByUser(prev => ({ ...prev, [row.id]: true }));
  (async () => { try {
    const newBem = withDXTag(row.bemerkung, username);
    const payload = { ...row, bemerkung: newBem };
    ["abflugdatum","rueckflugdatum","start","end"].forEach(f => {
      if (payload[f]) payload[f] = (typeof payload[f] === "string" ? payload[f].split("T")[0] : payload[f]);
    });
    await fetch(`/api/proxy?path=api/admin/buchung/${row.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
      body: JSON.stringify(payload)
    });
    setLoading(true);
    let url = `/api/proxy?path=api/admin/buchungen&sort=${sort}&dir=asc`;
    if (suchtext) url += `&suchtext=${encodeURIComponent(suchtext)}`;
    const r = await fetch(url, { headers: { Authorization: `Basic ${auth}` } });
    const data = await r.json();
    setList(data.buchungen || []);
    const timers = {};
    for (const r2 of (data.buchungen || [])) {
      const ts = parseCallTimerFromBem(r2.bemerkung);
      if (ts) timers[r2.id] = ts;
    }
    setCallTimers(timers);
    setLoading(false);
  } catch {} })();
}}>✔️</span>
                        {callTimers[row.id] ? (
                          <span
                            style={{
                              fontSize: 36,
                              fontWeight: 900,
                              color: (timerElapsedSec(row.id) >= 600) ? "red" : "#fff",
                              minWidth: 96,
                              textAlign: "right",
                              letterSpacing: 1,
                              userSelect: "none",
                              textShadow: "0 1px 3px #000a",
                              cursor: "default" }}
                            title="Timer läuft"
                          >
                            {formatMMSS(timerElapsedSec(row.id))}
                          </span>
                        ) : (
                          <span onClick={() => { setCallTimers(prev => { const next = { ...prev }; if (next[row.id]) delete next[row.id]; else next[row.id] = Date.now(); return next; }); (async () => { try {
              const ts = Date.now();
              const newBem = withCallTimer(row.bemerkung, ts);
              const payload = { ...row, bemerkung: newBem };
                              ["abflugdatum","rueckflugdatum","start","end"].forEach(f => {
                                if (payload[f]) payload[f] = (typeof payload[f] === "string" ? payload[f].split("T")[0] : payload[f]);
                              });

              await fetch(`/api/proxy?path=api/admin/buchung/${row.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
                body: JSON.stringify(payload)
              });
            } catch {} })(); }} style={{ fontSize: 20, color: "#444", cursor: "pointer" }} title="Anrufen">📞</span>
                        )}
</>)}

                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          

<PXFooter />

{editBuchung && createPortal((
            <div style={{
              position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
              background: "#fff", zIndex: 10000, overflowY: "auto", overscrollBehavior: "contain", WebkitOverflowScrolling: "touch"
            }}>
              <div style={{
                width: 1440, minHeight: "100vh", fontFamily: "Arial", transformOrigin: "top left", transform: `scale(${editScale})`, position: "relative", left: `${editLeft}px`
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
      .then(data => {
        const rows = data.buchungen || [];
        setList(rows);
        const timers = {};
        for (const r of rows) {
          const ts = parseCallTimerFromBem(r.bemerkung);
          if (ts) timers[r.id] = ts;
        }
        setCallTimers(timers);
        setLoading(false);
      });
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
                    <textarea value={editBemerkungPlain} onChange={e => {
                    const plain = e.target.value;
                    setEditBemerkungPlain(plain);
                    setEditBuchung(prev => ({ ...prev, bemerkung: __mergeBemerkungWithTags(plain, (prev && prev.bemerkung) || "") }));
                  }} style={{ width: "100%", fontSize: 18 }} />
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
              <PXEditFooter name={`${(editBuchung.vorname || "").trim()} ${(editBuchung.nachname || "").trim()}`.trim()} />
            </div>
            
            </div>
          ), (typeof document !== 'undefined' ? document.body : null))}
        </div>
      )}
    </>
  );
}
