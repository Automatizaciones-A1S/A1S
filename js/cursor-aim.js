/* ============================================================================
   A1S — Cursor "Mira de precisión" (target-lock)
   Punto rojo + anillo fino que sigue con easing. Sobre elementos interactivos
   el anillo se "engancha" magnéticamente al elemento (lock de objetivo) y
   muestra brackets de esquina, como una retícula de CCTV adquiriendo blanco.
   Fallbacks: puntero grueso / reduced-motion → cursor nativo.
   API: window.A1SAim.setConfig({ enabled })
   ========================================================================== */
(function () {
  'use strict';

  var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  var prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!fine || prefersReduce) {
    window.A1SAim = { setConfig: function () {}, unsupported: true };
    return;
  }

  var CFG = { enabled: false };

  // ── DOM ──────────────────────────────────────────────────────────────
  var dot = document.createElement('div');
  dot.id = 'a1s-aim-dot';
  var ring = document.createElement('div');
  ring.id = 'a1s-aim-ring';
  ring.innerHTML = '<span class="tick tl"></span><span class="tick tr"></span><span class="tick bl"></span><span class="tick br"></span>';
  document.documentElement.appendChild(dot);
  document.documentElement.appendChild(ring);

  // ── Estado ───────────────────────────────────────────────────────────
  var mx = -100, my = -100;          // mouse real
  var dx = -100, dy = -100;          // punto (rápido)
  var r = { x: -100, y: -100, w: 36, h: 36, br: 18 }; // anillo actual
  var visible = false;
  var lockEl = null;                 // elemento "enganchado"
  var raf = null;

  function apply(on) { document.documentElement.classList.toggle('a1s-aim-on', on); }

  var INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, .a1s-int, [data-cursor="link"], image-slot';

  function onMove(e) {
    mx = e.clientX; my = e.clientY;
    if (!visible) { visible = true; if (CFG.enabled) { apply(true); dot.style.opacity = '1'; ring.style.opacity = '1'; } }
    var t = e.target;
    var el = t && t.closest ? t.closest(INTERACTIVE) : null;
    // No lock en blancos enormes (secciones clicables grandes)
    if (el) {
      var rc = el.getBoundingClientRect();
      if (rc.width > 560 || rc.height > 420) el = null;
    }
    if (el !== lockEl) { lockEl = el; ring.classList.toggle('lock', !!lockEl); }
  }

  window.addEventListener('mousemove', onMove, { passive: true });
  window.addEventListener('mouseout', function (e) {
    if (!e.relatedTarget) { visible = false; apply(false); dot.style.opacity = '0'; ring.style.opacity = '0'; }
  });
  window.addEventListener('mousedown', function () {
    if (!CFG.enabled) return;
    ring.classList.remove('pulse'); void ring.offsetWidth; ring.classList.add('pulse');
  });
  // El lock guarda un rect que puede quedar viejo al hacer scroll
  window.addEventListener('scroll', function () { lockEl = lockEl; }, { passive: true });

  function tick() {
    raf = requestAnimationFrame(tick);
    if (!CFG.enabled || !visible) return;

    // Punto: sigue casi directo
    dx += (mx - dx) * 0.5;
    dy += (my - dy) * 0.5;
    dot.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';

    // Anillo: círculo libre o lock magnético al elemento
    var tx, ty, tw, th, tbr;
    if (lockEl && document.contains(lockEl)) {
      var rc = lockEl.getBoundingClientRect();
      var pad = 7;
      tx = rc.left + rc.width / 2; ty = rc.top + rc.height / 2;
      tw = rc.width + pad * 2; th = rc.height + pad * 2;
      var cbr = parseFloat(getComputedStyle(lockEl).borderRadius) || 10;
      tbr = Math.min(cbr + pad, Math.min(tw, th) / 2);
    } else {
      tx = mx; ty = my; tw = 36; th = 36; tbr = 18;
    }
    var e1 = 0.16, e2 = 0.22;
    r.x += (tx - r.x) * e1; r.y += (ty - r.y) * e1;
    r.w += (tw - r.w) * e2; r.h += (th - r.h) * e2; r.br += (tbr - r.br) * e2;

    ring.style.width = r.w + 'px';
    ring.style.height = r.h + 'px';
    ring.style.borderRadius = r.br + 'px';
    ring.style.transform = 'translate(' + (r.x - r.w / 2) + 'px,' + (r.y - r.h / 2) + 'px)';
  }

  function start() { if (!raf) tick(); }
  function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

  // ── API ──────────────────────────────────────────────────────────────
  window.A1SAim = {
    setConfig: function (next) {
      Object.assign(CFG, next || {});
      if (CFG.enabled) { start(); if (visible) { apply(true); dot.style.opacity = '1'; ring.style.opacity = '1'; } }
      else { apply(false); dot.style.opacity = '0'; ring.style.opacity = '0'; }
    },
    config: CFG,
  };
})();
