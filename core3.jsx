/* ============================================================================
   A1S — Núcleo de UI (primitivas, iconos, logo, helpers)
   Forkeado y elevado desde el UI kit oficial del design system. Usa tokens var(--*).
   ========================================================================== */
const RED = 'var(--a1s-red)';

/* ── Hooks / utilidades ─────────────────────────────────────────────── */
function useReduce() {
  const [r, setR] = React.useState(() => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  React.useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    const h = () => setR(m.matches); m.addEventListener && m.addEventListener('change', h);
    return () => m.removeEventListener && m.removeEventListener('change', h);
  }, []);
  return r;
}

/* Reveal — entrada al entrar en viewport (scroll-triggered) para dar profundidad.
   Solo anima TRANSFORM (la opacidad siempre queda en 1) para que el contenido
   nunca quede oculto si la animación no corre. */
function Reveal({ children, delay = 0, y = 22, as = 'div', style = {}, ...rest }) {
  const reduce = useReduce();
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    if (reduce) { setSeen(true); return; }
    const el = ref.current; if (!el) { setSeen(true); return; }
    // Si ya está (casi) en pantalla al montar, revelar de inmediato (hero / above-the-fold).
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) { setSeen(true); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);
  const El = as;
  let dyn = {};
  if (!reduce) dyn = seen ? { animation: `a1s-rise .7s var(--ease-out) ${delay}ms both` } : { transform: `translateY(${y}px)`, willChange: 'transform' };
  return React.createElement(El, { ref, style: { ...style, ...dyn }, ...rest }, children);
}

/* ── Iconos lineales (stroke uniforme, estilo Lucide) ───────────────── */
const ico = (path, extra = {}) => (p) =>
  React.createElement('svg', { width: p.size || 22, height: p.size || 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: p.sw || 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', style: p.style, 'aria-hidden': true, ...extra },
    ...(Array.isArray(path) ? path : [path]).map((d, i) => React.createElement('path', { key: i, d })));

const Icons = {
  shield: ico('M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z'),
  cctv: ico(['M3 7l15-4 1.5 4.5L4.5 11.5 3 7Z', 'M4.5 11.5 6 16M9 14v4a2 2 0 0 1-2 2H5', 'M18 6.5l3-1']),
  truck: ico(['M3 6h11v9H3zM14 9h4l3 3v3h-7', 'M7 18a2 2 0 1 0 0 .01M18 18a2 2 0 1 0 0 .01']),
  drone: ico(['M9 9h6v6H9z', 'M9 9 5 5M15 9l4-4M9 15l-4 4M15 15l4 4', 'M3 5h4M17 5h4M3 19h4M17 19h4']),
  lock: ico(['M5 11h14v9H5z', 'M8 11V7a4 4 0 0 1 8 0v4']),
  gauge: ico(['M12 14 16 9', 'M4 18a8 8 0 1 1 16 0']),
  pin: ico(['M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z', 'M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0']),
  clock: ico(['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 7v5l3 2']),
  cal: ico(['M3 5h18v17H3zM3 9h18M8 2v4M16 2v4']),
  arrow: ico(['M5 12h14', 'M13 6l6 6-6 6']),
  arrowUR: ico(['M7 17 17 7', 'M8 7h9v9']),
  check: ico('M5 12l5 5L20 7'),
  wa: ico(['M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Z', 'M8.5 8.5c0 4 3 7 6.5 7.2.7 0 1.3-.6 1.4-1.2.1-.5-.2-.8-.6-1l-1.4-.7c-.3-.1-.6 0-.8.2l-.5.6c-1.2-.5-2.1-1.5-2.6-2.7l.6-.5c.2-.2.3-.5.2-.8L10.3 7c-.2-.4-.5-.7-1-.6-.5.1-1 .6-1.1 1.3']),
  menu: ico(['M4 7h16M4 12h16M4 17h16']),
  close: ico(['M6 6l12 12M18 6 6 18']),
  phone: ico('M3 5c0 9 7 16 16 16l0-3.5-4-1.5-2 2c-2.5-1.2-4.8-3.5-6-6l2-2L7.5 5 4 5'),
  users: ico(['M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1', 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7', 'M22 19v-1a4 4 0 0 0-3-3.8M16 4.2A4 4 0 0 1 16 11.5']),
  growth: ico(['M3 17l5-5 4 4 8-8', 'M16 8h5v5']),
  heart: ico('M12 20s-7-4.5-9.5-9C1 8 2.5 4.5 6 4.5c2 0 3.2 1.3 4 2.3.8-1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 6.5C19 15.5 12 20 12 20Z'),
  search: ico(['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z', 'M21 21l-4.3-4.3']),
  dog: ico(['M10 5.5 8 4 6 6v3l-2 2v6h5l1-3h4l1 3h4v-6l-2-2', 'M10 9h6']),
  radar: ico(['M12 12 19 5', 'M12 3a9 9 0 1 0 9 9', 'M12 8a4 4 0 1 0 4 4']),
  cpu: ico(['M6 6h12v12H6z', 'M9 9h6v6H9z', 'M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2']),
  cert: ico(['M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z', 'M9 14l-1.5 7L12 19l4.5 2L15 14']),
  layers: ico(['M12 3 3 8l9 5 9-5-9-5Z', 'M3 13l9 5 9-5', 'M3 18l9 5 9-5']),
  building: ico(['M4 21h16M6 21V5l8-2v18M14 9h4v12', 'M9 8h0M9 12h0M9 16h0']),
  bank: ico(['M3 9 12 4l9 5', 'M4 9h16v2H4z', 'M5 11v7M9 11v7M15 11v7M19 11v7M3 21h18']),
  cart: ico(['M3 4h2l2 12h11l2-8H7', 'M9 20a1 1 0 1 0 .01 0M18 20a1 1 0 1 0 .01 0']),
  health: ico(['M12 21s-7-4.5-9.5-9C1 9 2.5 5.5 6 5.5c2 0 3.2 1.3 4 2.3.8-1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 6.5', 'M9 11h2v-2h2v2h2v2h-2v2h-2v-2H9z']),
  cap: ico(['M3 8l9-4 9 4-9 4-9-4Z', 'M7 10v4c0 1.5 2.5 3 5 3s5-1.5 5-3v-4', 'M21 8v5']),
  ship: ico(['M3 16l1.5 4h15L21 16M12 3v13M5 11l7-3 7 3M5 11l-2 5M19 11l2 5', 'M8 7h8']),
  flame: ico(['M12 3c3 4 5 6 5 9a5 5 0 0 1-10 0c0-1.5.8-3 2-4 0 2 1 3 2 3 .5-2-.5-5 1-8Z']),
  fingerprint: ico(['M12 11a2 2 0 0 1 2 2c0 3-1 5-1 5', 'M8 7a6 6 0 0 1 9 4c0 4-1 7-1 7', 'M5 11a7 7 0 0 1 2-5', 'M9 19c.5-1 1-2.5 1-6a2 2 0 0 1 4 0']),
  target: ico(['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M12 12h.01']),
  doc: ico(['M6 2h8l4 4v16H6z', 'M14 2v4h4', 'M9 13h6M9 17h6M9 9h2']),
  play: ico(['M7 4v16l13-8z']),
  star: ico(['M12 3l2.6 5.5 6 .8-4.4 4.2 1.1 6L12 16.8 6.7 19.5l1.1-6L3.4 9.3l6-.8z']),
};

/* ── Logo A1S inline (recolorable) ──────────────────────────────────── */
const LOGO_PATHS = [
  'M0,664v-1c.66-.65,1.59-1.74,2.29-3.16l167.57-339.64c3.23-6.54,7.51-12.23,11.74-17.72,11.6-15.05,31.93-28.04,50.41-32.18,37.89-8.49,74.51,4.39,98.21,35.25,4.68,6.09,7.6,12.77,11.69,19.61l143.88,339.02-99.15.02-118.65-307.63c-3.76-5.55-7.46-8.76-13.65-8.72-4.93.03-10.82,2.39-13.5,8.38l-137.96,308.04L0,664Z',
  'M962.6,632.58c-20.2,19.25-46.34,30.11-74.8,31.54h-209.87s-.02-66.13-.02-66.13l204.93.02c6.95-1.6,13.78-1.64,19.93-4.44,5.25-2.39,11.35-6.26,15.28-10.39,18.77-19.69,18.32-50.64-.1-69.19-4.03-4.06-10.06-8.24-15.44-10.35-5.73-2.25-13.17-4.35-19.54-4.38l-112.94-.46c-21.55-.09-43.98-6.67-61.73-18.15-9.22-5.97-25.34-20.33-30.71-29.15-5.97-9.81-11.3-19.72-15.58-30.27-3.08-7.58-4.03-16.2-5.74-24.34-2.04-9.74-.05-30.14,2.18-39.82,1.92-8.36,4.88-16.71,8.4-24.46,8.23-18.14,24.86-36.28,41.64-46.9,16.51-10.44,38.46-18.15,58.7-17.85h210.35s-.03,65.89-.03,65.89h-206.4c-6.81,1.53-13.34,1.66-19.45,4.25-5.21,2.21-11.18,6.19-15.34,10.24-19.35,18.84-19.4,50.54-.16,69.6,4.07,4.03,10.05,8.2,15.4,10.27,5.68,2.2,13.07,4.09,19.43,4.11l112.49.46c29.19.12,57.99,11.66,79.11,31.72,9.49,9.02,19.67,22.73,24.98,34.66,7.81,17.56,9.06,27.67,11,46.32,1.63,15.63-4.4,38.11-10.98,52.55-5.51,12.12-15.34,25.42-25,34.63Z',
  'M586.76,302.14c5.01,8.6,9.46,22.67,9.46,33.1l.06,330.82h-69.05s-.03-305.65-.03-305.65c-2.1-13.26-10.3-23.68-23.8-23.91l-39.76-.7.04-68.87,64.35.16c5.56.01,11.3,1.59,16.85,2.13,18.25,6.71,32,15.98,41.88,32.93Z',
  'M248.62,588.23c-4.35,1.5-8.26,1.77-12.05.13-21.05-1.97-36.83-23.82-32.81-44.66,2.26-21.58,25.26-37.55,45.89-32.38,8.3.53,19.12,7.72,23.79,14.12,13.99,19.2,9.84,44.31-9.01,56.92-4.78,3.19-9.53,5.72-15.81,5.86Z',
];
function Logo({ color = 'currentColor', height = 38, style = {} }) {
  return React.createElement('svg', { viewBox: '0 285 970 388', role: 'img', 'aria-label': 'A1S Security Group', style: { height, width: 'auto', display: 'block', color, ...style } },
    LOGO_PATHS.map((d, i) => React.createElement('path', { key: i, d, fill: 'currentColor' })));
}

/* ── Botón magnético ─────────────────────────────────────────────────── */
function Btn({ children, variant = 'primary', size = 'md', icon, iconRight, onClick, href, style = {}, ...rest }) {
  const ref = React.useRef(null);
  const reduce = useReduce();
  const sizes = { sm: '9px 18px', md: '13px 26px', lg: '17px 34px' };
  const fs = { sm: '.8125rem', md: '.9375rem', lg: '1.0625rem' };
  const pal = {
    primary: { background: RED, color: '#fff', border: '1px solid transparent' },
    outline: { background: 'transparent', color: 'var(--text)', border: '1px solid ' + RED },
    ghost: { background: 'transparent', color: 'var(--text)', border: '1px solid transparent' },
    'on-dark': { background: 'rgba(255,255,255,.06)', color: '#fff', border: '1px solid rgba(255,255,255,.22)' },
    solid: { background: '#fff', color: 'var(--a1s-ink)', border: '1px solid transparent' },
  }[variant];
  const move = (e) => { if (reduce) return; const el = ref.current, r = el.getBoundingClientRect(); el.style.transform = `translate(${((e.clientX - r.left - r.width / 2) / r.width) * 6}px,${((e.clientY - r.top - r.height / 2) / r.height) * 6}px) scale(1.02)`; };
  const El = href ? 'a' : 'button';
  return React.createElement(El, {
    ref, onClick, href, className: 'a1s-int',
    onMouseMove: move, onMouseLeave: (e) => e.currentTarget.style.transform = '',
    onMouseDown: (e) => e.currentTarget.style.transform = 'scale(.97)',
    onMouseEnter: (e) => { if (variant === 'primary') e.currentTarget.style.background = 'var(--a1s-red-600)'; if (variant === 'outline') { e.currentTarget.style.background = RED; e.currentTarget.style.color = '#fff'; } if (variant === 'on-dark') e.currentTarget.style.background = 'rgba(255,255,255,.14)'; },
    onMouseUp: (e) => { e.currentTarget.style.background = pal.background; e.currentTarget.style.color = pal.color; },
    style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, padding: sizes[size], fontSize: fs[size], fontFamily: 'var(--font-sans)', fontWeight: 600, lineHeight: 1, borderRadius: 'var(--radius-pill)', cursor: 'pointer', textDecoration: 'none', transition: 'transform .22s var(--ease-magnetic), background .22s, color .22s', whiteSpace: 'nowrap', ...pal, ...style }, ...rest,
  }, icon, children && React.createElement('span', null, children), iconRight);
}

function Eyebrow({ children, dark, center, style = {} }) {
  return React.createElement('p', { style: { margin: 0, display: 'inline-flex', alignItems: 'center', gap: 9, fontStyle: 'italic', fontWeight: 600, fontSize: '.8125rem', textTransform: 'uppercase', letterSpacing: '.14em', color: dark ? 'var(--a1s-red-400)' : RED, justifyContent: center ? 'center' : undefined, ...style } },
    React.createElement('span', { style: { width: 7, height: 7, borderRadius: '50%', background: 'currentColor', boxShadow: dark ? '0 0 10px currentColor' : 'none' } }), children);
}

function Badge({ children, variant = 'neutral', icon }) {
  const pal = {
    neutral: { background: 'var(--gray-100)', color: 'var(--text)', border: '1px solid var(--border)' },
    red: { background: 'color-mix(in srgb, var(--a1s-red) 12%, transparent)', color: RED, border: '1px solid color-mix(in srgb, var(--a1s-red) 30%, transparent)' },
    solid: { background: RED, color: '#fff', border: '1px solid transparent' },
    'on-dark': { background: 'rgba(255,255,255,.05)', color: 'var(--dark-text)', border: '1px solid var(--dark-line)' },
  }[variant];
  return React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 13px', fontSize: '.75rem', fontWeight: 600, lineHeight: 1, borderRadius: 'var(--radius-pill)', ...pal } }, icon, children);
}

/* ── Contador animado ─────────────────────────────────────────────────── */
function Stat({ value, prefix = '+', suffix = '', label, dark, big }) {
  const ref = React.useRef(null);
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setN(value); return; }
    let timer, done = false;
    const run = () => { if (done) return; done = true; const t0 = Date.now();
      timer = setInterval(() => { const p = Math.min((Date.now() - t0) / 1500, 1); setN(Math.round(value * (1 - Math.pow(1 - p, 3)))); if (p >= 1) clearInterval(timer); }, 32); };
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) run(); }), { threshold: .4 });
    io.observe(el); return () => { io.disconnect(); clearInterval(timer); };
  }, [value]);
  return React.createElement('div', { ref },
    React.createElement('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: big ? 'clamp(2.8rem,5.5vw,4.4rem)' : 'clamp(2.1rem,4vw,3.1rem)', lineHeight: 1, letterSpacing: '-.03em', color: dark ? 'var(--dark-text)' : 'var(--text)', fontVariantNumeric: 'tabular-nums' } },
      React.createElement('span', { style: { color: RED } }, prefix), n.toLocaleString('es-CO'),
      suffix && React.createElement('span', { style: { fontSize: '.5em', marginLeft: '.08em', fontWeight: 600 } }, suffix)),
    React.createElement('div', { style: { marginTop: 10, fontSize: '.9375rem', fontWeight: 500, color: dark ? 'var(--dark-muted)' : 'var(--text-muted)' } }, label));
}

/* ── Encabezado de sección ────────────────────────────────────────────── */
function SectionHead({ eyebrow, title, lead, dark, center, max = '22ch', style = {} }) {
  return React.createElement('div', { style: { textAlign: center ? 'center' : 'left', ...style } },
    eyebrow && React.createElement(Eyebrow, { dark, center }, eyebrow),
    React.createElement('h2', { style: { margin: '16px 0 0', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.9rem,3.6vw,2.9rem)', lineHeight: 1.08, letterSpacing: '-.025em', maxWidth: center ? undefined : max, marginInline: center ? 'auto' : undefined } }, title),
    lead && React.createElement('p', { style: { margin: '18px 0 0', color: dark ? 'var(--dark-muted)' : 'var(--text-muted)', fontSize: '1.0625rem', lineHeight: 1.6, maxWidth: '54ch', marginInline: center ? 'auto' : undefined } }, lead));
}

const WRAP = { maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--gutter)' };
const SECTION = { padding: 'var(--section-y) 0' };

/* ── SpotlightCard — glow que sigue el cursor + leve tilt 3D ───────────── */
/* Sutil y respetuoso de reduced-motion / animaciones off. Aplica la clase
   .a1s-spot (ver styles/additions.css) y maneja el seguimiento del cursor. */
function SpotlightCard({ children, as = 'div', className = '', tilt = 6, style = {}, ...rest }) {
  const ref = React.useRef(null);
  const reduce = useReduce();
  const El = as;
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    if (reduce || document.documentElement.classList.contains('a1s-static')) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', (px * 100) + '%');
    el.style.setProperty('--my', (py * 100) + '%');
    el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * tilt}deg) rotateY(${(px - 0.5) * tilt}deg)`;
  };
  const onLeave = () => { const el = ref.current; if (el) el.style.transform = ''; };
  return React.createElement(El, { ref, className: ('a1s-spot ' + className).trim(), onMouseMove: onMove, onMouseLeave: onLeave, style, ...rest }, children);
}

Object.assign(window, { RED, useReduce, Reveal, Icons, ico, Logo, LOGO_PATHS, Btn, Eyebrow, Badge, Stat, SectionHead, SpotlightCard, WRAP, SECTION });
