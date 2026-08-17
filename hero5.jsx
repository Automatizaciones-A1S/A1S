/* ============================================================================
   A1S — HERO v4. Figura grande superpuesta al titular (profundidad), respiración,
   luces del carro al pasar el cursor, brasas y parallax 2.5D.
   ========================================================================== */
const { Reveal, Btn, Stat, Icons, useReduce } = window;

function Embers() {
  const ref = React.useRef(null);
  const reduce = useReduce();
  React.useEffect(() => {
    if (reduce) return;
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d');
    let W, H, parts = [], raf;
    const resize = () => { const r = cv.parentElement.getBoundingClientRect(); W = cv.width = r.width; H = cv.height = r.height; };
    resize();
    const spawn = () => ({ x: Math.random() * W, y: H + 10, r: 1 + Math.random() * 2.6, v: 0.3 + Math.random() * 0.9, a: 0, life: 0, max: 120 + Math.random() * 140, drift: (Math.random() - 0.5) * 0.4 });
    for (let i = 0; i < 46; i++) { const p = spawn(); p.y = Math.random() * H; p.life = Math.random() * p.max; parts.push(p); }
    const loop = () => {
      raf = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        p.y -= p.v; p.x += p.drift; p.life++;
        const t = p.life / p.max; p.a = t < 0.15 ? t / 0.15 : (1 - (t - 0.15) / 0.85);
        if (p.life >= p.max || p.y < -10) Object.assign(p, spawn());
        ctx.beginPath(); ctx.fillStyle = `rgba(255,${90 + Math.random() * 40 | 0},60,${Math.max(0, p.a) * 0.7})`;
        ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
      }
    };
    loop();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, [reduce]);
  return React.createElement('canvas', { ref, 'aria-hidden': true, style: { position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 } });
}

function HomeHero({ go }) {
  const secRef = React.useRef(null);
  const [lit, setLit] = React.useState(false);
  const reduce = useReduce();
  const onMove = (e) => {
    const r = secRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
    if (!reduce) secRef.current.querySelectorAll('[data-px]').forEach((l) => {
      const d = parseFloat(l.getAttribute('data-px'));
      l.style.transform = `translate3d(${px * d * 26}px, ${py * d * 18}px, 0)`;
    });
    // luces del carro: zona inferior-derecha (donde está la patrulla)
    setLit(px > 0.12 && py > 0.04);
  };
  const reset = () => { setLit(false); secRef.current && secRef.current.querySelectorAll('[data-px]').forEach((l) => l.style.transform = ''); };

  return React.createElement('section', { ref: secRef, onMouseMove: onMove, onMouseLeave: reset, 'data-screen-label': 'Hero',
    style: { position: 'relative', minHeight: '100svh', overflow: 'hidden', display: 'flex', alignItems: 'center', padding: 'clamp(96px,14vh,150px) 0 clamp(32px,5vh,56px)', background: 'linear-gradient(155deg, #D6271D 0%, #B11C14 34%, #6E1009 66%, #200604 100%)' } },
    React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'radial-gradient(70% 60% at 80% 32%, rgba(255,90,70,.34), transparent 60%), repeating-linear-gradient(0deg, rgba(0,0,0,.05) 0 1px, transparent 1px 46px), repeating-linear-gradient(90deg, rgba(0,0,0,.05) 0 1px, transparent 1px 46px)' } }),
    // monograma gigante de fondo
    React.createElement('div', { 'data-px': 0.25, style: { position: 'absolute', right: '-6%', top: '50%', transform: 'translateY(-50%)', width: '64%', opacity: 0.06, color: '#fff', pointerEvents: 'none', zIndex: 1 } },
      React.createElement(window.Logo, { variant: 'mark', height: '64vh', color: '#fff' })),
    // glow detrás de la figura
    React.createElement('div', { 'data-px': 0.4, style: { position: 'absolute', right: '6%', bottom: 0, width: 680, height: '92%', background: 'radial-gradient(50% 60% at 50% 60%, rgba(255,70,55,.5), transparent 70%)', filter: 'blur(22px)', pointerEvents: 'none', zIndex: 1 } }),
    React.createElement(Embers, null),
    // FIGURA grande (sobre el titular) + luces del carro
    React.createElement('div', { 'data-px': 0.6, className: reduce ? '' : 'a1s-breathe', style: { position: 'absolute', right: 'clamp(-90px, -2vw, 30px)', bottom: 0, height: 'min(112%, 1040px)', zIndex: 5, pointerEvents: 'none', filter: 'drop-shadow(-34px 26px 54px rgba(0,0,0,.55))' } },
      React.createElement('div', { style: { position: 'relative', height: '100%' } },
        React.createElement('img', { src: 'assets/people/hero-escolta.png?v=2', alt: 'Escolta A1S junto a patrulla', style: { height: '100%', width: 'auto', display: 'block' } }),
        // faros del carro (encienden al pasar el cursor)
        React.createElement('div', { style: { position: 'absolute', left: '14%', bottom: '17%', width: 130, height: 90, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,240,200,.95), rgba(255,210,120,.35) 45%, transparent 72%)', mixBlendMode: 'screen', opacity: lit ? 1 : 0, transition: 'opacity .35s ease', filter: 'blur(3px)' } }),
        React.createElement('div', { style: { position: 'absolute', right: '6%', bottom: '20%', width: 120, height: 84, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,240,200,.9), rgba(255,210,120,.3) 45%, transparent 72%)', mixBlendMode: 'screen', opacity: lit ? 1 : 0, transition: 'opacity .35s ease', filter: 'blur(3px)' } }),
        // haces de luz
        React.createElement('div', { style: { position: 'absolute', left: '2%', bottom: '6%', width: '46%', height: 70, background: 'linear-gradient(100deg, rgba(255,235,180,.5), transparent 70%)', filter: 'blur(8px)', mixBlendMode: 'screen', opacity: lit ? 0.9 : 0, transition: 'opacity .35s ease', transform: 'skewY(-8deg)' } }))),
    // viñeta inferior
    React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 58%, rgba(20,4,3,.5) 88%, #200604 100%)', pointerEvents: 'none', zIndex: 6 } }),
    // CONTENIDO
    React.createElement('div', { style: { position: 'relative', zIndex: 4, maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--gutter)', width: '100%' } },
      React.createElement(Reveal, { className: 'a1s-hero-copy', style: { maxWidth: '60%' } },
        React.createElement('p', { style: { margin: 0, display: 'inline-flex', alignItems: 'center', gap: 10, fontStyle: 'italic', fontWeight: 600, fontSize: '.8125rem', textTransform: 'uppercase', letterSpacing: '.22em', color: 'rgba(255,255,255,.85)' } },
          React.createElement(Icons.shield, { size: 16 }), 'Seguridad privada para Colombia'),
        React.createElement('h1', { className: 'a1s-hero-title', style: { margin: '18px 0 0', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.6rem, 6.4vw, 5.6rem)', lineHeight: 0.93, letterSpacing: '-.035em', textTransform: 'uppercase', color: '#fff', textShadow: '0 6px 40px rgba(0,0,0,.35)' } },
          'Protegemos', React.createElement('br', null), 'lo que más', React.createElement('br', null), 'importa.'),
        React.createElement('p', { style: { margin: '24px 0 0', maxWidth: '38ch', fontSize: 'clamp(1.02rem,1.5vw,1.18rem)', lineHeight: 1.6, color: 'rgba(255,255,255,.9)' } },
          'Más de ', React.createElement('strong', { style: { fontWeight: 700 } }, '55 años'), ' integrando seguridad humana y tecnología avanzada, con monitoreo permanente ',
          React.createElement('strong', { style: { fontWeight: 700 } }, '24/7'), '.'),
        React.createElement('div', { style: { display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap' } },
          React.createElement(Btn, { variant: 'solid', size: 'lg', onClick: () => go('contacto'), iconRight: React.createElement(Icons.arrowUR, { size: 18 }), style: { background: 'var(--a1s-ink)', color: '#fff' } }, 'Cotización gratuita'),
          React.createElement(Btn, { variant: 'on-dark', size: 'lg', onClick: () => go('servicios') }, 'Conoce nuestros servicios'))),
      React.createElement(Reveal, { delay: 200, className: 'a1s-hero-stats', style: { display: 'flex', gap: 'clamp(1.4rem,3.4vw,3rem)', marginTop: 'clamp(2.2rem,5vw,3.6rem)', flexWrap: 'wrap', maxWidth: '54%' } },
        [[55, 'Años de experiencia', '+', ''], [3500, 'Colaboradores', '+', ''], [1000, 'Clientes activos', '+', ''], [24, 'Monitoreo', '', '/7']].map(([v, l, p, s], i) =>
          React.createElement('div', { key: i }, React.createElement(Stat, { value: v, prefix: p, suffix: s, label: l, dark: true }))))));
}

window.HomeHero = HomeHero;
