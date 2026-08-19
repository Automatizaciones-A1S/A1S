/* ============================================================================
   A1S — HERO v6 "Cinematic Red" (dirección Vanguard)
   Rojo dominante con profundidad: viñetas oscuras, grano, monograma, brasas.
   Figura por capas: CARRO (quieto) + GUARDA (idle sutil: respiración + peso).
   Mientras no se suelten los PNG 4K separados, se muestra la foto combinada
   actual totalmente quieta. Las drop-zones aparecen al pasar el cursor.
   ========================================================================== */
const { Reveal, Btn, Stat, Icons, useReduce } = window;

function HeroFigure6() {
  const reduce = useReduce();
  return React.createElement('div', { className: 'a1s-hero-figure a1s-hero6-figure', style: { position: 'absolute', right: 'clamp(-180px, -7vw, -24px)', bottom: 0, height: 'min(102%, 940px)', aspectRatio: '0.86', zIndex: 5, pointerEvents: 'none', filter: 'drop-shadow(-30px 30px 60px rgba(0,0,0,.5))' } },
    // glow cálido detrás de la figura
    React.createElement('div', { 'aria-hidden': true, style: { position: 'absolute', inset: '-6% -12%', background: 'radial-gradient(46% 56% at 52% 62%, rgba(255,96,72,.42), transparent 70%)', filter: 'blur(26px)' } }),
    // sombra de piso (ancla la figura)
    React.createElement('div', { 'aria-hidden': true, style: { position: 'absolute', left: '8%', right: '8%', bottom: '-2.5%', height: '9%', background: 'radial-gradient(50% 50% at 50% 50%, rgba(12,2,1,.55), transparent 70%)', filter: 'blur(10px)' } }),
    // FALLBACK: foto combinada (solo si faltaran las capas)
    React.createElement('img', { className: 'hero-fallback', src: 'assets/people/hero-escolta.png?v=2', alt: '', 'aria-hidden': true, loading: 'eager', decoding: 'async', fetchPriority: 'high', style: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center bottom', display: 'none' } }),
    // CAPA 1 · CARRO (sin sirena, totalmente quieto) — desplazado a la derecha para no tapar los CTA
    React.createElement('img', { src: 'assets/CAMBIO PERSONA A1S 1.jpeg', alt: 'Patrulla A1S', loading: 'eager', decoding: 'async', fetchPriority: 'high', draggable: false, style: { position: 'absolute', left: '0.5%', width: '99%', bottom: '4.5%', height: '62%', objectFit: 'contain', objectPosition: '50% 100%' } }),
    // CAPA 2 · GUARDA (idle sutil: respiración + balanceo de peso)
    React.createElement('div', { className: reduce ? '' : 'a1s-idle-sway', style: { position: 'absolute', left: '22%', right: '22%', bottom: 0, height: '81%' } },
      React.createElement('div', { className: reduce ? '' : 'a1s-idle-breathe', style: { position: 'absolute', inset: 0 } },
        React.createElement('img', { src: 'assets/people/guarda-solo.png', alt: 'Escolta A1S', loading: 'eager', decoding: 'async', fetchPriority: 'high', draggable: false, style: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', objectPosition: '50% 100%' } }))));
}

function HomeHero6({ go }) {
  const secRef = React.useRef(null);
  const reduce = useReduce();
  const onMove = (e) => {
    if (reduce || !secRef.current) return;
    const r = secRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
    secRef.current.querySelectorAll('[data-px]').forEach((l) => {
      const d = parseFloat(l.getAttribute('data-px'));
      l.style.transform = `translate3d(${px * d * 24}px, ${py * d * 16}px, 0)`;
    });
  };
  const reset = () => secRef.current && secRef.current.querySelectorAll('[data-px]').forEach((l) => l.style.transform = '');

  return React.createElement('section', { ref: secRef, onMouseMove: onMove, onMouseLeave: reset, className: 'a1s-noise', 'data-screen-label': 'Hero',
    style: { position: 'relative', minHeight: '100svh', overflow: 'hidden', display: 'flex', alignItems: 'center', padding: 'clamp(96px,13vh,140px) 0 clamp(40px,6vh,72px)',
      background: 'radial-gradient(95% 110% at 82% 6%, #E13E2C 0%, transparent 52%), linear-gradient(152deg, #CE2A1F 0%, #B11C14 36%, #71100A 70%, #230503 100%)' } },
    // texturas de profundidad
    React.createElement('div', { className: 'a1s-gridtex', style: { opacity: .8 } }),
    React.createElement('div', { className: 'a1s-diag' }),
    // monograma gigante
    React.createElement('div', { 'data-px': 0.22, 'aria-hidden': true, style: { position: 'absolute', right: '-7%', top: '50%', transform: 'translateY(-50%)', opacity: 0.05, color: '#fff', pointerEvents: 'none', zIndex: 1 } },
      React.createElement(window.Logo, { height: '66vh', color: '#fff' })),
    // viñeta IZQUIERDA: legibilidad del titular (texto sobre zona oscurecida)
    React.createElement('div', { 'aria-hidden': true, style: { position: 'absolute', inset: 0, background: 'linear-gradient(97deg, rgba(22,3,2,.72) 0%, rgba(22,3,2,.34) 34%, transparent 58%)', zIndex: 2 } }),
    // viñeta inferior (ancla las stats y funde con la siguiente sección)
    React.createElement('div', { 'aria-hidden': true, style: { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,.18), transparent 22%, transparent 52%, rgba(16,3,2,.72) 86%, #160302 100%)', zIndex: 2 } }),
    !reduce && React.createElement(window.Embers6, null),
    React.createElement(HeroFigure6, null),
    // CONTENIDO
    React.createElement('div', { style: { position: 'relative', zIndex: 6, maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--gutter)', width: '100%' } },
      React.createElement(Reveal, { className: 'a1s-hero-copy', style: { maxWidth: '58%' } },
        React.createElement('p', { style: { margin: 0, display: 'inline-flex', alignItems: 'center', gap: 10, fontStyle: 'italic', fontWeight: 600, fontSize: '.8125rem', textTransform: 'uppercase', letterSpacing: '.24em', color: 'rgba(255,255,255,.92)' } },
          React.createElement(Icons.shield, { size: 16 }), 'Seguridad privada para Colombia · Desde 1971'),
        React.createElement('h1', { style: { margin: '20px 0 0', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.7rem,6.6vw,6rem)', lineHeight: 0.96, letterSpacing: '-.03em', textTransform: 'uppercase', color: '#fff', textShadow: '0 4px 16px rgba(20,3,2,.45), 0 18px 60px rgba(20,3,2,.5)' } },
          React.createElement('span', { className: 'a1s-word-hi', style: { textShadow: 'none' } }, 'Protegemos'), React.createElement('br', null), 'lo que más', React.createElement('br', null), 'importa.'),
        React.createElement('p', { style: { margin: '26px 0 0', maxWidth: '44ch', fontSize: 'clamp(1.05rem,1.5vw,1.2rem)', lineHeight: 1.6, color: 'rgba(255,255,255,.95)', textShadow: '0 2px 12px rgba(20,3,2,.4)' } },
          'Más de ', React.createElement('strong', null, '55 años'), ' integrando seguridad humana y tecnología avanzada, con monitoreo permanente ', React.createElement('strong', null, '24/7'), '.'),
        React.createElement('div', { className: 'a1s-hero-actions', style: { display: 'flex', gap: 14, marginTop: 34, flexWrap: 'wrap' } },
          React.createElement(Btn, { variant: 'solid', size: 'lg', className: 'a1s-beacon', onClick: () => go('contacto'), iconRight: React.createElement(Icons.arrowUR, { size: 18 }), style: { background: '#16090A', color: '#fff' } }, 'Cotización gratuita'),
          React.createElement(Btn, { variant: 'on-dark', size: 'lg', onClick: () => go('servicios'), style: { borderColor: 'rgba(255,255,255,.4)' } }, 'Conoce nuestros servicios'))),
      React.createElement(Reveal, { delay: 200, className: 'a1s-stats6 a1s-hero-stats', style: { marginTop: 'clamp(2.4rem,5.5vw,4rem)' } },
        [[55, 'Años de experiencia', '+', ''], [3500, 'Colaboradores', '+', ''], [1000, 'Clientes activos', '+', ''], [24, 'Monitoreo permanente', '', '/7']].map(([v, l, p, s], i) =>
          React.createElement('div', { key: i }, React.createElement(Stat, { value: v, prefix: p, suffix: s, label: l, dark: true })))),
      // scroll cue
      React.createElement('div', { 'aria-hidden': true, style: { position: 'absolute', left: '50%', bottom: '-3vh', transform: 'translateX(-50%)', display: 'none' } })));
}

/* Brasas — partículas cálidas que suben (reutilizado, densidad ajustada) */
function Embers6() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d');
    let W, H, parts = [], raf;
    const resize = () => { const r = cv.parentElement.getBoundingClientRect(); W = cv.width = r.width; H = cv.height = r.height; };
    resize();
    const spawn = () => ({ x: Math.random() * W, y: H + 10, r: 0.8 + Math.random() * 2.4, v: 0.25 + Math.random() * 0.8, a: 0, life: 0, max: 140 + Math.random() * 160, drift: (Math.random() - 0.5) * 0.35 });
    for (let i = 0; i < 40; i++) { const p = spawn(); p.y = Math.random() * H; p.life = Math.random() * p.max; parts.push(p); }
    const loop = () => {
      raf = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        p.y -= p.v; p.x += p.drift; p.life++;
        const t = p.life / p.max; p.a = t < 0.15 ? t / 0.15 : (1 - (t - 0.15) / 0.85);
        if (p.life >= p.max || p.y < -10) Object.assign(p, spawn());
        ctx.beginPath(); ctx.fillStyle = `rgba(255,${96 + Math.random() * 40 | 0},62,${Math.max(0, p.a) * 0.6})`;
        ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
      }
    };
    loop();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return React.createElement('canvas', { ref, 'aria-hidden': true, style: { position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 3 } });
}

Object.assign(window, { HomeHero6, Embers6 });
