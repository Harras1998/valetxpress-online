/**
 * vx-edit-activate.js — Add-on ohne bestehende Stellen zu verändern.
 * Erkennt Edit-Overlays heuristisch und setzt:
 *   body[data-vx-force-edit="1"] und data-vx-edit-page="1" am Overlay-Knoten.
 * So greifen die Styles aus vx-edit-override.css nur im Edit-Zustand.
 */
(function () {
  const SELECTORS = [
    '[data-vx-edit-page]',
    '.edit-overlay',
    '#edit-root',
    '[role="dialog"][aria-modal="true"]',
    '[class*="edit"]',
    '[id*="edit"]'
  ];

  function setOn(el) {
    if (!el) return;
    document.body.setAttribute('data-vx-force-edit', '1');
    el.setAttribute('data-vx-edit-page', '1');
  }

  function setOff() {
    document.body.removeAttribute('data-vx-force-edit');
  }

  function findOverlay() {
    for (const s of SELECTORS) {
      const node = document.querySelector(s);
      if (node && isVisible(node)) return node;
    }
    return null;
  }

  function isVisible(el) {
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function tick() {
    const overlay = findOverlay();
    if (overlay) setOn(overlay);
    else setOff();
  }

  const mo = new MutationObserver(() => tick());
  mo.observe(document.documentElement, { childList: true, subtree: true, attributes: true });

  window.addEventListener('resize', tick);
  window.addEventListener('hashchange', tick);
  document.addEventListener('readystatechange', tick);
  document.addEventListener('visibilitychange', tick);

  tick();
})();