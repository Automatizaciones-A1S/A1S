/* ============================================================================
   A1S — Media inmersiva ilustrada ("feed de Centro de Control")
   Paneles oscuros con cromo HUD (brackets, REC, scanline, grid, glow rojo),
   parallax al cursor e ilustraciones line-art de marca por servicio.
   Sustituyen a la fotografía real (reemplazables por un shoot más adelante).
   ========================================================================== */
const { Icons } = window;

/* ── Ilustraciones line-art por escena (viewBox 200x200) ───────────── */
const SCENES = {
  // Muro de monitores CCTV (sala de control)
  control: () => React.createElement('g', { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    [[40, 50], [104, 50], [40, 110], [104, 110]].map((m, i) => React.createElement('g', { key: i, 'data-depth': 0.6 },
      React.createElement('rect', { x: m[0], y: m[1], width: 56, height: 44, rx: 4, opacity: i === 1 ? 1 : 0.4, stroke: i === 1 ? 'var(--a1s-red-400)' : 'currentColor' }),
      React.createElement('path', { d: `M${m[0] + 8} ${m[1] + 30} l10 -10 8 7 12 -14 10 9`, opacity: 0.5 }))),
    React.createElement('g', { 'data-depth': 1.4 },
      React.createElement('circle', { cx: 132, cy: 60, r: 4, fill: 'var(--a1s-red)', stroke: 'none' }),
      React.createElement('path', { d: 'M40 168h120', opacity: 0.5 }),
      React.createElement('path', { d: 'M52 168v-12M72 168v-20M92 168v-8M112 168v-16M132 168v-24M152 168v-10', stroke: 'var(--a1s-red-400)', opacity: 0.8 }))),
  // Vigilante + radar (Seguridad Física)
  guard: () => React.createElement('g', { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('g', { 'data-depth': 0.5, opacity: 0.45 },
      React.createElement('circle', { cx: 100, cy: 100, r: 70 }), React.createElement('circle', { cx: 100, cy: 100, r: 46 }), React.createElement('circle', { cx: 100, cy: 100, r: 22 }),
      React.createElement('path', { d: 'M100 100 L168 70', stroke: 'var(--a1s-red-400)' })),
    React.createElement('g', { 'data-depth': 1.5 },
      React.createElement('circle', { cx: 100, cy: 74, r: 16 }),
      React.createElement('path', { d: 'M72 150c0-20 12-34 28-34s28 14 28 34' }),
      React.createElement('path', { d: 'M100 92v34', opacity: 0.5 }),
      React.createElement('circle', { cx: 138, cy: 62, r: 4, fill: 'var(--a1s-red)', stroke: 'none' }))),
  // Canino (manejador + perro)
  canino: () => React.createElement('g', { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('g', { 'data-depth': 1.4 },
      React.createElement('path', { d: 'M44 150l4-44 16-10 6 10 22 2-6 16 10 36' }),
      React.createElement('path', { d: 'M64 96l2-22 14-6' }),
      React.createElement('circle', { cx: 86, cy: 60, r: 4, fill: 'var(--a1s-red)', stroke: 'none' })),
    React.createElement('g', { 'data-depth': 0.7 },
      React.createElement('path', { d: 'M104 150v-30l30-6 8-16 6 2 2 14 18 6v36' }),
      React.createElement('path', { d: 'M148 102l8-10 6 4-4 12', stroke: 'var(--a1s-red-400)' }))),
  // CCTV / cámara perimetral (Seguridad Electrónica)
  electronica: () => React.createElement('g', { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('g', { 'data-depth': 1.4 },
      React.createElement('path', { d: 'M50 60l78 -16 8 26-78 18z' }),
      React.createElement('path', { d: 'M58 86l6 22M84 80v18a8 8 0 0 1-8 8h-8' }),
      React.createElement('path', { d: 'M130 54l20 -6', stroke: 'var(--a1s-red-400)' }),
      React.createElement('circle', { cx: 60, cy: 70, r: 4, fill: 'var(--a1s-red)', stroke: 'none' })),
    React.createElement('g', { 'data-depth': 0.5, opacity: 0.4 },
      React.createElement('path', { d: 'M84 96 L150 150 M84 96 L60 160', strokeDasharray: '4 6' }),
      React.createElement('path', { d: 'M40 168h120' }))),
  // GPS / flota (Móvil & GPS)
  movil: () => React.createElement('g', { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('g', { 'data-depth': 0.5, opacity: 0.4 },
      React.createElement('path', { d: 'M30 40h140M30 80h140M30 120h140M30 160h140M50 30v140M90 30v140M130 30v140' })),
    React.createElement('g', { 'data-depth': 1.5 },
      React.createElement('path', { d: 'M44 150c30 0 20 -50 56 -50s30 -50 56 -54', stroke: 'var(--a1s-red-400)', strokeWidth: 2.6 }),
      React.createElement('circle', { cx: 44, cy: 150, r: 6 }),
      React.createElement('path', { d: 'M156 46a7 7 0 1 0-14 0c0 7 7 14 7 14s7-7 7-14z' }),
      React.createElement('circle', { cx: 149, cy: 46, r: 3, fill: 'var(--a1s-red)', stroke: 'none' }))),
  // Dron / ortomosaico (Drones)
  drones: () => React.createElement('g', { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('g', { 'data-depth': 0.5, opacity: 0.4 },
      React.createElement('path', { d: 'M40 150l60 -20 60 20 -60 24z' }),
      React.createElement('path', { d: 'M70 160l60 -20M100 134l0 36', strokeDasharray: '3 6' })),
    React.createElement('g', { 'data-depth': 1.5 },
      React.createElement('rect', { x: 86, y: 70, width: 28, height: 20, rx: 3 }),
      React.createElement('path', { d: 'M86 74L64 58M114 74l22 -16M86 86L64 102M114 86l22 16' }),
      React.createElement('circle', { cx: 60, cy: 56, r: 9 }), React.createElement('circle', { cx: 140, cy: 56, r: 9 }),
      React.createElement('circle', { cx: 60, cy: 104, r: 9 }), React.createElement('circle', { cx: 140, cy: 104, r: 9 }),
      React.createElement('circle', { cx: 100, cy: 80, r: 3, fill: 'var(--a1s-red)', stroke: 'none' }))),
  // Ciberseguridad (escudo + huella + red)
  ciber: () => React.createElement('g', { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('g', { 'data-depth': 0.5, opacity: 0.4 },
      React.createElement('path', { d: 'M40 50l30 20M160 50l-30 20M40 150l30 -20M160 150l-30 -20' }),
      React.createElement('circle', { cx: 40, cy: 50, r: 4 }), React.createElement('circle', { cx: 160, cy: 50, r: 4 }),
      React.createElement('circle', { cx: 40, cy: 150, r: 4 }), React.createElement('circle', { cx: 160, cy: 150, r: 4 })),
    React.createElement('g', { 'data-depth': 1.5 },
      React.createElement('path', { d: 'M100 44l40 16v28c0 30-20 46-40 56-20-10-40-26-40-56V60z' }),
      React.createElement('path', { d: 'M100 84a8 8 0 0 1 8 8c0 10-4 18-4 18M92 88a14 14 0 0 1 22 4', stroke: 'var(--a1s-red-400)' }))),
  // Gestión del riesgo (matriz / medidor)
  riesgo: () => React.createElement('g', { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('g', { 'data-depth': 0.5, opacity: 0.4 },
      React.createElement('path', { d: 'M50 150h100M50 150V50' }),
      React.createElement('path', { d: 'M50 120h100M50 90h100M80 150V50M110 150V50M140 150V50' })),
    React.createElement('g', { 'data-depth': 1.5 },
      React.createElement('path', { d: 'M50 130l30 -20 30 6 40 -46', stroke: 'var(--a1s-red-400)', strokeWidth: 2.6 }),
      React.createElement('circle', { cx: 150, cy: 70, r: 5, fill: 'var(--a1s-red)', stroke: 'none' }),
      React.createElement('circle', { cx: 80, cy: 110, r: 4 }), React.createElement('circle', { cx: 110, cy: 116, r: 4 }))),
  // Equipo / talento (humano)
  talento: () => React.createElement('g', { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' },
    React.createElement('g', { 'data-depth': 1.4 },
      React.createElement('circle', { cx: 100, cy: 70, r: 16 }),
      React.createElement('path', { d: 'M72 142c0-18 12-30 28-30s28 12 28 30' })),
    React.createElement('g', { 'data-depth': 0.6, opacity: 0.5 },
      React.createElement('circle', { cx: 56, cy: 84, r: 12 }), React.createElement('path', { d: 'M36 150c0-14 9-24 20-24s20 10 20 24', opacity: 0.6 }),
      React.createElement('circle', { cx: 144, cy: 84, r: 12 }), React.createElement('path', { d: 'M124 150c0-14 9-24 20-24s20 10 20 24', opacity: 0.6 }),
      React.createElement('circle', { cx: 100, cy: 54, r: 3, fill: 'var(--a1s-red)', stroke: 'none' }))),
};

/* ── Panel de media inmersiva ─────────────────────────────────────────── */
function MediaPanel({ scene = 'control', ratio = '3 / 4', label, status = 'EN VIVO', style = {}, parallax = true, photo = null, fit = 'contain' }) {
  const ref = React.useRef(null);
  const reduce = useReduce();
  const Scene = SCENES[scene] || SCENES.control;
  const onMove = (e) => {
    if (!parallax || reduce) return;
    const el = ref.current; const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
    el.querySelectorAll('[data-depth]').forEach((l) => { const d = parseFloat(l.getAttribute('data-depth')) || 1; l.style.transform = `translate(${px * -12 * d}px, ${py * -12 * d}px)`; });
    const svg = el.querySelector('[data-svg]'); if (svg) svg.style.transform = `scale(1.04) translate(${px * -8}px, ${py * -8}px)`;
    const ph = el.querySelector('[data-photo]'); if (ph) ph.style.transform = `scale(1.06) translate(${px * -18}px, ${py * -12}px)`;
  };
  const reset = () => { if (!ref.current) return; ref.current.querySelectorAll('[data-depth]').forEach((l) => l.style.transform = ''); const s = ref.current.querySelector('[data-svg]'); if (s) s.style.transform = ''; const p = ref.current.querySelector('[data-photo]'); if (p) p.style.transform = ''; };
  return React.createElement('div', { ref, onMouseMove: onMove, onMouseLeave: reset,
    style: { position: 'relative', aspectRatio: ratio, overflow: 'hidden', borderRadius: 'var(--radius-lg)', background: '#08080B', border: '1px solid var(--dark-line)', ...style } },
    // grid + glow base
    React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 72% 16%, rgba(192,35,27,.26), transparent 56%), repeating-linear-gradient(0deg, rgba(255,255,255,.035) 0 1px, transparent 1px 26px), repeating-linear-gradient(90deg, rgba(255,255,255,.035) 0 1px, transparent 1px 26px)' } }),
    // foto real (2.5D) o ilustración
    photo
      ? React.createElement('div', { 'data-photo': true, style: { position: 'absolute', inset: 0, transition: 'transform .5s var(--ease-out)', willChange: 'transform' } },
          React.createElement('img', { src: photo, alt: label || 'A1S', loading: 'lazy', style: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: fit, objectPosition: fit === 'cover' ? 'center' : 'center bottom', filter: fit === 'cover' ? 'none' : 'drop-shadow(0 18px 30px rgba(0,0,0,.5))' } }))
      : React.createElement('div', { style: { position: 'absolute', inset: '12% 8%', display: 'grid', placeItems: 'center', color: 'rgba(255,255,255,.5)' } },
          React.createElement('svg', { 'data-svg': true, viewBox: '0 0 200 200', style: { width: '100%', height: '100%', transition: 'transform .5s var(--ease-out)', overflow: 'visible' } },
            React.createElement('g', { style: { transition: 'transform .4s var(--ease-out)' } }, React.createElement(Scene)))),
    // scanline animada
    !reduce && React.createElement('div', { className: 'a1s-scan', 'aria-hidden': true }),
    // brackets de esquina
    [['top', 'left'], ['top', 'right'], ['bottom', 'left'], ['bottom', 'right']].map((c, i) =>
      React.createElement('span', { key: i, style: { position: 'absolute', [c[0]]: 14, [c[1]]: 14, width: 18, height: 18, [`border${c[0][0].toUpperCase() + c[0].slice(1)}`]: '2px solid rgba(255,255,255,.4)', [`border${c[1][0].toUpperCase() + c[1].slice(1)}`]: '2px solid rgba(255,255,255,.4)' } })),
    // chrome inferior + REC
    React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.66), transparent 46%)' } }),
    React.createElement('div', { style: { position: 'absolute', top: 16, left: 18, display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: '.7rem', fontWeight: 600, letterSpacing: '.1em', color: 'rgba(255,255,255,.78)' } },
      React.createElement('span', { className: reduce ? '' : 'a1s-rec', style: { width: 8, height: 8, borderRadius: '50%', background: 'var(--a1s-red)', boxShadow: '0 0 8px var(--a1s-red-glow)' } }), status),
    label && React.createElement('span', { style: { position: 'absolute', left: 18, bottom: 16, fontSize: '.8125rem', fontWeight: 600, color: 'rgba(255,255,255,.92)' } }, label),
    React.createElement('span', { style: { position: 'absolute', right: 18, bottom: 16, fontSize: '.7rem', fontVariantNumeric: 'tabular-nums', color: 'rgba(255,255,255,.5)' } }, 'CAM · A1S'));
}

Object.assign(window, { MediaPanel, SCENES });
