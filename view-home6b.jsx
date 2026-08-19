/* ============================================================================
   A1S — HOME v6 · Parte B: Cobertura, Certificaciones, Clientes,
   Portales Clientes|Talento (cierre elevado), CTA final y ensamblaje.
   ========================================================================== */
const { Reveal, Eyebrow, Btn, Stat, SectionHead, Icons, RED, WRAP, SECTION, useReduce } = window;

/* ── COBERTURA — mapa nacional sobre oscuro ─────────────────────────── */
function MiniMap6({ go }) {
  const C = window.A1SColombia;
  const regs = C ? C.regionales : [];
  return React.createElement('div', { className: 'a1s-map-wrap', style: { borderRadius: 20, border: '1px solid var(--dark-line)', background: 'radial-gradient(70% 60% at 50% 44%, rgba(192,35,27,.14), transparent 62%), #0B0606' } },
    React.createElement('div', { className: 'a1s-map-radar', 'aria-hidden': true }),
    C && React.createElement('img', { src: C.img, alt: 'Mapa de cobertura A1S en Colombia', className: 'a1s-map-img', loading: 'lazy' }),
    regs.map((r) => React.createElement('div', { key: r.reg, className: 'a1s-mappin', style: { left: r.px + '%', top: r.py + '%' } },
      React.createElement('span', { className: 'a1s-mappin-ping', 'aria-hidden': true }),
      React.createElement('span', { className: 'a1s-mappin-dot', 'aria-hidden': true }),
      React.createElement('span', { className: 'a1s-mappin-label' },
        React.createElement('b', null, r.reg),
        React.createElement('span', null, r.city)))));
}

function Coverage6({ go }) {
  return React.createElement('section', { className: 'a1s-dark', 'data-screen-label': 'Cobertura', style: { background: '#0A0A0C', ...SECTION, position: 'relative', overflow: 'hidden' } },
    React.createElement('div', { 'aria-hidden': true, style: { position: 'absolute', inset: 0, background: 'radial-gradient(70% 80% at 80% 30%, rgba(192,35,27,.14), transparent 60%)' } }),
    React.createElement('div', { className: 'a1s-about-grid', style: { ...WRAP, position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem,5vw,5rem)', alignItems: 'center' } },
      React.createElement(Reveal, null,
        React.createElement(SectionHead, { dark: true, eyebrow: 'Cobertura nacional, presencia local', title: 'Operamos donde nos necesitas.', lead: '5 regionales y operación directa en +500 municipios, 24/7. Una sola compañía, cobertura total.' }),
        React.createElement('div', { className: 'a1s-stats6', style: { marginTop: 34, gridTemplateColumns: 'repeat(3, auto)' } },
          [[5, 'Regionales', '', ''], [500, 'Municipios', '+', ''], [24, 'Operación', '', '/7']].map(([v, l, p, s], i) =>
            React.createElement(Stat, { key: i, value: v, prefix: p, suffix: s, label: l, dark: true }))),
        React.createElement('div', { style: { marginTop: 30 } },
          React.createElement(Btn, { variant: 'primary', onClick: () => go('cobertura'), iconRight: React.createElement(Icons.arrow, { size: 16 }) }, 'Ver mapa de cobertura'))),
      React.createElement(Reveal, { delay: 120 }, React.createElement(MiniMap6, { go })))); 
}

/* ── CERTIFICACIONES — sellos en carrusel infinito ──────────────────── */

const CERT_SEALS = [
  { img: 'assets/certs/iso-9001.png', name: 'ISO 9001', sub: 'Gestión de la Calidad' },
  { img: 'assets/certs/iso-14001.png', name: 'ISO 14001', sub: 'Gestión Ambiental' },
  { img: 'assets/certs/iso-28000.png', name: 'ISO 28000', sub: 'Seguridad de la Cadena de Suministro' },
  { img: 'assets/certs/basc.png', name: 'BASC V6', sub: 'Business Alliance for Secure Commerce' },
  { img: 'assets/certs/opr.png', name: 'OPR', sub: 'Organización de Protección Reconocida' },
];

function Certs6({ go }) {
  const reduce = useReduce();
  const seals = [...CERT_SEALS, ...CERT_SEALS];
  return React.createElement('section', { className: 'a1s-dark a1s-noise', 'data-screen-label': 'Certificaciones', style: { ...SECTION, position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #0A0A0C 0%, #100B0B 60%, #0A0A0C 100%)' } },
    React.createElement('div', { 'aria-hidden': true, style: { position: 'absolute', inset: 0, background: 'radial-gradient(50% 60% at 50% 0%, rgba(192,35,27,.13), transparent 60%)' } }),
    React.createElement('div', { style: { ...WRAP, position: 'relative' } },
      React.createElement(Reveal, null, React.createElement(SectionHead, { dark: true, center: true, eyebrow: 'Certificaciones', title: 'Respaldados por los estándares más exigentes.', lead: 'Certificados en ISO 9001, ISO 14001, ISO 28000, BASC V6 y OPR — y acompañamos a nuestros clientes a certificarse.' }))),
    React.createElement(Reveal, { delay: 100, style: { marginTop: 46, position: 'relative' } },
      React.createElement('div', { className: 'a1s-marquee a1s-cert-marquee' },
        React.createElement('div', { className: 'a1s-marquee-track' + (reduce ? ' still' : '') },
          [...seals, ...seals].map((s, i) => React.createElement('span', { key: i, className: 'a1s-certseal' },
            React.createElement('span', { className: 'seal-mark' }, React.createElement('img', { src: s.img, alt: s.name, loading: 'lazy' })),
            React.createElement('span', null,
              React.createElement('span', { className: 'seal-name', style: { display: 'block' } }, s.name),
              React.createElement('span', { className: 'seal-sub', style: { display: 'block' } }, s.sub))))))),
    React.createElement('div', { style: { ...WRAP, position: 'relative' } },
      React.createElement(Reveal, { delay: 150, style: { textAlign: 'center', marginTop: 42 } },
        React.createElement(Btn, { variant: 'outline', onClick: () => go('certificaciones'), iconRight: React.createElement(Icons.arrow, { size: 16 }), style: { color: '#fff' } }, 'Conoce nuestras certificaciones'))));
}

/* ── CLIENTES — marquee sobre claro ─────────────────────────────────── */
const CLIENTS6 = [
  { name: 'OFFCORSS', src: 'assets/brands/offcorss.png', mono: true },
  { name: 'SIMONIZ', src: 'assets/brands/simoniz.png', mono: true },
  { name: 'TransMilenio', src: 'assets/brands/transmilenio.png', mono: false, sq: true },
  { name: 'Hilton', src: 'assets/brands/hilton.svg', mono: true },
  { name: 'IDRD', src: 'assets/brands/idrd-pad.png', mono: true },
  { name: 'VÉLEZ', src: 'assets/brands/velez-n.png', mono: true },
  { name: 'Tennis', src: 'assets/brands/tennis-n.png', mono: true },
];
function Clients6() {
  const reduce = useReduce();
  return React.createElement('section', { style: SECTION, 'data-screen-label': 'Clientes' },
    React.createElement('div', { style: WRAP },
      React.createElement(Reveal, null, React.createElement(SectionHead, { center: true, eyebrow: 'Casos de éxito', title: 'La confianza de quienes protegemos.' })),
      React.createElement(Reveal, { delay: 100, style: { marginTop: 40 } },
        React.createElement('div', { className: 'a1s-marquee' },
          React.createElement('div', { className: 'a1s-marquee-track' + (reduce ? ' still' : '') },
            [...CLIENTS6, ...CLIENTS6].map((c, i) => React.createElement('span', { key: i, className: 'a1s-clientlogo-wrap' },
              React.createElement('img', { src: c.src, alt: c.name, loading: 'lazy', className: 'a1s-clientlogo ' + (c.mono ? 'mono' : 'nat') + (c.sq ? ' is-sq' : '') + (c.sm ? ' is-sm' : '') })))))),
      React.createElement('p', { style: { textAlign: 'center', marginTop: 18, fontSize: '.8125rem', color: 'var(--text-muted)' } }, 'Algunas de las marcas que han confiado en A1S · marcas propiedad de sus respectivos titulares.')));
}

/* ── PORTALES — Clientes | Talento (cierre elevado, ya no es el final) ── */
function Portals6({ go }) {
  const portals = [
    { kicker: 'Clientes', title: 'Protege lo que más importa', desc: 'Empresas, conjuntos residenciales y personas: diseñamos tu esquema de seguridad a la medida y lo medimos todos los días.', cta: 'Ver soluciones', route: 'servicios', slot: 'portal-cliente', src: 'assets/people/portal-cliente.png', fit: 'cover', position: '50% 32%', placeholder: 'Foto 4K · Escolta + SUV en acción (3:4)', dark: false },
    { kicker: 'Talento', title: 'Únete al equipo A1S', desc: 'Construye tu carrera en seguridad con estabilidad, formación constante y un equipo que te respalda.', cta: 'Ver vacantes', route: 'talento', slot: 'portal-talento', src: 'assets/CAMBIO PERSONA A1S 1.jpeg', fit: 'cover', position: '50% 30%', placeholder: 'Foto 4K · Colaborador A1S retrato (3:4)', dark: true },
  ];
  return React.createElement('section', { 'data-screen-label': 'Clientes y Talento' },
    React.createElement('div', { className: 'a1s-portal-grid a1s-split-final', style: { display: 'grid', gridTemplateColumns: '1fr 1fr' } },
      portals.map((p, i) => React.createElement('div', { key: i, className: 'a1s-portal a1s-int a1s-noise', role: 'link', tabIndex: 0, onClick: () => go(p.route), onKeyDown: (e) => { if (e.key === 'Enter') go(p.route); },
        style: { background: p.dark ? 'linear-gradient(160deg, #131316 0%, #0A0A0C 70%)' : 'radial-gradient(80% 80% at 80% 0%, #D2362A 0%, transparent 55%), linear-gradient(160deg, #B11C14 0%, #6E1009 90%)', cursor: 'pointer' } },
        React.createElement('div', { className: 'a1s-gridtex', 'aria-hidden': true, style: { opacity: .35, zIndex: 1 } }),
        // media del portal a sangre completa (drop-zone, con fallback si existe)
        React.createElement('div', { className: 'portal-img', 'aria-hidden': true, style: { position: 'absolute', inset: 0, opacity: 1 } },
          React.createElement('image-slot', Object.assign({ id: p.slot, className: 'slot-ghost', fit: p.fit || 'contain', position: p.position || '100% 100%', radius: '0', placeholder: p.placeholder }, p.src ? { src: p.src } : {}, { style: { position: 'absolute', inset: 0, width: '100%', height: '100%' } }))),
        // velo base para cohesión tonal sobre la foto
        React.createElement('div', { 'aria-hidden': true, style: { position: 'absolute', inset: 0, zIndex: 1, background: p.dark ? 'linear-gradient(180deg, rgba(10,10,12,.35), rgba(10,10,12,.78))' : 'linear-gradient(180deg, rgba(110,16,9,.32), rgba(60,8,5,.74))' } }),
        // gradiente protector del texto (lateral)
        React.createElement('div', { 'aria-hidden': true, style: { position: 'absolute', inset: 0, zIndex: 1, background: p.dark ? 'linear-gradient(78deg, #0A0A0C 28%, rgba(10,10,12,.55) 54%, transparent 84%)' : 'linear-gradient(78deg, #8E140D 24%, rgba(142,20,13,.5) 54%, transparent 84%)' } }),
        React.createElement('div', { style: { position: 'relative', maxWidth: '34ch', zIndex: 2 } },
          React.createElement('p', { className: 'portal-kicker', style: { margin: 0, fontStyle: 'italic', fontWeight: 600, fontSize: '.8125rem', textTransform: 'uppercase', letterSpacing: '.18em', color: p.dark ? 'var(--a1s-red-400)' : 'rgba(255,255,255,.92)' } },
            React.createElement('span', null, p.kicker)),
          React.createElement('h2', { style: { margin: '14px 0 0', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.9rem,3.4vw,3.1rem)', letterSpacing: '-.025em', lineHeight: 1.02, textTransform: 'uppercase', textShadow: '0 4px 22px rgba(0,0,0,.4)' } }, p.title),
          React.createElement('p', { style: { margin: '16px 0 0', fontSize: '1.0625rem', lineHeight: 1.6, color: 'rgba(255,255,255,.9)', maxWidth: '34ch' } }, p.desc),
          React.createElement('span', { className: 'portal-cta a1s-beacon', style: { background: p.dark ? 'var(--a1s-red)' : '#fff', color: p.dark ? '#fff' : 'var(--a1s-red-700)', boxShadow: '0 18px 40px -14px rgba(0,0,0,.55)' } },
            p.cta, React.createElement(Icons.arrowUR, { size: 19 })))))));
}

/* ── CTA FINAL — titular gigante delineado ──────────────────────────── */
function FinalCTA6({ go }) {
  return React.createElement('section', { className: 'a1s-dark a1s-noise a1s-cta-final', 'data-screen-label': 'CTA final',
    style: { position: 'relative', overflow: 'hidden', padding: 'clamp(5rem,11vw,9rem) 0', background: 'radial-gradient(70% 90% at 50% 110%, rgba(192,35,27,.34), transparent 62%), #0A0A0C' } },
    React.createElement('div', { className: 'a1s-gridtex', 'aria-hidden': true, style: { opacity: .5 } }),
    React.createElement('div', { style: { ...WRAP, position: 'relative', textAlign: 'center' } },
      React.createElement(Reveal, null,
        React.createElement(Eyebrow, { dark: true, center: true }, 'Tu seguridad no puede esperar'),
        React.createElement('h2', { style: { margin: '22px 0 0' } },
          React.createElement('span', { className: 'a1s-hablemos', 'data-text': 'HABLEMOS', style: { fontSize: 'clamp(3.2rem,10.5vw,9rem)' } }, 'Hablemos')),
        React.createElement('p', { style: { margin: '26px auto 0', maxWidth: '54ch', color: 'var(--dark-muted)', fontSize: '1.0625rem', lineHeight: 1.65 } },
          'Cuéntanos qué necesitas proteger. Un experto A1S diseña tu esquema de seguridad personalizado y te entrega una cotización sin costo.'),
        React.createElement('div', { style: { display: 'flex', gap: 14, justifyContent: 'center', marginTop: 36, flexWrap: 'wrap' } },
          React.createElement(Btn, { variant: 'primary', size: 'lg', className: 'a1s-beacon', onClick: () => go('contacto'), iconRight: React.createElement(Icons.arrowUR, { size: 18 }) }, '¡Cotización gratuita!')),
        React.createElement('p', { style: { marginTop: 22, fontSize: '.8125rem', color: 'var(--dark-muted)', letterSpacing: '.04em' } }, 'Respuesta en menos de 24 horas · Atención 24/7 en operación'))));
}

/* ── ENSAMBLAJE HOME v6 ─────────────────────────────────────────────── */
function HomeView6({ go }) {
  return React.createElement('div', null,
    React.createElement(window.HomeHero6, { go }),
    React.createElement(About6, { go }),
    React.createElement(Services6, { go }),
    React.createElement(Steps6, null),
    React.createElement(Coverage6, { go }),
    React.createElement(Certs6, { go }),
    React.createElement(Clients6, null),
    React.createElement(Portals6, { go }),
    React.createElement(FinalCTA6, { go }));
}

Object.assign(window, { HomeView6, MiniMap6, Portals6, FinalCTA6 });
