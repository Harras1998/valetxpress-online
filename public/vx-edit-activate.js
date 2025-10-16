/**
 * vx-edit-activate.js (lite, throttled)
 * - Läuft NUR, wenn die URL einen ?edit= Parameter enthält.
 * - Stark gedrosselt (min. 400ms zwischen Scans), kleine Selektorliste.
 * - Keine Full-DOM-Scans, kein teures area()-Ranking.
 * - Rein additiv: setzt nur body[data-vx-force-edit="1"] + data-vx-edit-page="1".
 */
(function () {
  if (window.__vx && window.__vx.installed) return;
  window.__vx = { installed: true, active: false, overlay: null };

  // Nur reagieren, wenn ?edit in der URL ist
  function hasEditQuery() {
    try {
      const u = new URL(location.href);
      return u.searchParams.has("edit");
    } catch { return false; }
  }

  // Minimaler Selektorsatz (kein "body *" o.ä.)
  const SELECTORS = [
    '[data-vx-edit-page]',
    '#edit-root',
    '.edit-overlay',
    '[role="dialog"][aria-modal="true"]',
    '[class*="edit"]',
    '[id*="edit"]'
  ];
  const SELECTOR = SELECTORS.join(",");

  function isWide() {
    return (window.innerWidth || document.documentElement.clientWidth || 0) >= 1441;
  }

  function findOverlay() {
    // Einmalige, kleine querySelectorAll
    const list = document.querySelectorAll(SELECTOR);
    for (const el of list) {
      // Sichtbar einfache Prüfung
      const r = el.getBoundingClientRect();
      if (r.width > 300 && r.height > 200) return el;
    }
    return null;
  }

  function mark(el) {
    if (!el) return;
    document.body.setAttribute("data-vx-force-edit", "1");
    el.setAttribute("data-vx-edit-page", "1");
    window.__vx.active = true;
    window.__vx.overlay = el;
  }

  function unmark() {
    document.body.removeAttribute("data-vx-force-edit");
    if (window.__vx.overlay) window.__vx.overlay.removeAttribute("data-vx-edit-page");
    window.__vx.active = false;
    window.__vx.overlay = null;
  }

  // Throttle: max. alle 400ms
  let scheduled = false;
  let lastRun = 0;
  const MIN_GAP = 400;
  function schedule() {
    if (scheduled) return;
    const now = Date.now();
    const delay = Math.max(0, MIN_GAP - (now - lastRun));
    scheduled = true;
    setTimeout(run, delay);
  }

  function run() {
    scheduled = false;
    lastRun = Date.now();

    if (!isWide() || !hasEditQuery()) { unmark(); return; }

    const el = findOverlay();
    if (el) mark(el);
    else unmark();
  }

  // Observer stark eingeschränkt
  const mo = new MutationObserver(() => schedule());
  mo.observe(document.body || document.documentElement, { childList: true, subtree: true });

  window.addEventListener("resize", schedule);
  window.addEventListener("hashchange", schedule);
  ["pushState", "replaceState"].forEach(fn => {
    const orig = history[fn];
    history[fn] = function() { const r = orig.apply(this, arguments); try { schedule(); } catch {} return r; };
  });

  // Initial
  schedule();
})();