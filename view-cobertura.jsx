/* ============================================================================
   A1S — Vistas Cobertura (mapa interactivo) + Certificaciones
   ========================================================================== */
const { Reveal, Eyebrow, Btn, Badge, Stat, SectionHead, Icons, RED, WRAP, SECTION, useReduce } = window;

/* ════════════════ COBERTURA ════════════════ */
const SEDE_META = {
  principal: { label: 'Sede principal', plural: 'Sede principal', cls: 'is-principal' },
  sucursal:  { label: 'Sucursal',       plural: 'Sucursales',     cls: 'is-sucursal' },
  agencia:   { label: 'Agencia',        plural: 'Agencias',       cls: 'is-agencia' },
};
function mapsUrl(s) { return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(s.addr + ', ' + s.city + ', Colombia'); }

function CoberturaView({ go }) {
  const C = window.A1SColombia;
  const sedes = C ? C.sedes : [];
  const reduce = useReduce();
  const [filter, setFilter] = React.useState('todas');
  const [active, setActive] = React.useState('Bogotá');
  const cur = sedes.find((s) => s.city === active) || sedes[0];

  const count = (t) => sedes.filter((s) => s.type === t).length;
  const shown = filter === 'todas' ? sedes : sedes.filter((s) => s.type === filter);
  const groups = filter === 'todas'
    ? ['principal', 'sucursal', 'agencia'].map((t) => [t, sedes.filter((s) => s.type === t)])
    : [[filter, shown]];

  const filters = [['todas', 'Todas', sedes.length], ['principal', 'Principal', count('principal')], ['sucursal', 'Sucursales', count('sucursal')], ['agencia', 'Agencias', count('agencia')]];

  const listItem = (s) => React.createElement('button', {
    key: s.city, className: 'a1s-int a1s-sede' + (active === s.city ? ' is-active' : ''),
    onMouseEnter: () => setActive(s.city), onClick: () => setActive(s.city),
  },
    React.createElement('span', { className: 'a1s-sede-dot ' + SEDE_META[s.type].cls, 'aria-hidden': true }),
    React.createElement('span', { className: 'a1s-sede-txt' },
      React.createElement('span', { className: 'a1s-sede-city' }, s.city,
        React.createElement('span', { className: 'a1s-sede-dpto' }, s.dpto)),
      React.createElement('span', { className: 'a1s-sede-addr' }, s.addr)));

  return React.createElement('section', { className: 'a1s-dark', style: { background: '#0A0A0C', minHeight: '100vh', paddingTop: 'calc(78px + var(--section-y) * .5)', paddingBottom: 'var(--section-y)', position: 'relative', overflow: 'hidden' } },
    React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'radial-gradient(60% 70% at 75% 12%, rgba(192,35,27,.16), transparent 60%)' } }),
    React.createElement('div', { style: { ...WRAP, position: 'relative' } },
      React.createElement(Reveal, null, React.createElement(SectionHead, { dark: true, eyebrow: 'Cobertura nacional, presencia local', title: 'Operamos donde nos necesitas.', lead: 'Una red física de 21 sedes a nivel nacional — 1 sede principal, 10 sucursales y 10 agencias — con operación y monitoreo 24/7. Explora cada punto en el mapa.' })),
      React.createElement('div', { className: 'a1s-cob-split', style: { display: 'grid', gridTemplateColumns: '1.02fr .98fr', gap: 'clamp(2rem,4vw,3.5rem)', marginTop: 44, alignItems: 'start' } },
        /* ── Mapa ── */
        React.createElement(Reveal, null,
          React.createElement('div', { className: 'a1s-map-wrap', style: { borderRadius: 'var(--radius-lg)', border: '1px solid var(--dark-line)', background: 'radial-gradient(70% 60% at 50% 44%, rgba(192,35,27,.13), transparent 62%), #0B0606' } },
            !reduce && React.createElement('div', { className: 'a1s-map-radar', 'aria-hidden': true }),
            React.createElement('img', { src: C ? C.img : '', alt: 'Mapa de cobertura A1S en Colombia', className: 'a1s-map-img', loading: 'lazy' }),
            sedes.map((s) => {
              const on = active === s.city;
              const dim = filter !== 'todas' && s.type !== filter;
              const showLabel = on || s.type === 'principal';
              return React.createElement('div', { key: s.city, className: 'a1s-mappin is-int ' + SEDE_META[s.type].cls + (on ? ' is-active' : '') + (dim ? ' is-dim' : ''),
                style: { left: s.px + '%', top: s.py + '%' }, onMouseEnter: () => setActive(s.city), onClick: () => setActive(s.city), title: s.city },
                on && !reduce && React.createElement('span', { className: 'a1s-mappin-ping', 'aria-hidden': true }),
                React.createElement('span', { className: 'a1s-mappin-dot', 'aria-hidden': true }),
                showLabel && React.createElement('span', { className: 'a1s-mappin-label' },
                  React.createElement('b', null, s.city),
                  React.createElement('span', null, SEDE_META[s.type].label)));
            })),
          /* Leyenda + stats */
          React.createElement('div', { className: 'a1s-cob-legend' },
            [['principal', 'Sede principal'], ['sucursal', 'Sucursales'], ['agencia', 'Agencias']].map(([t, l]) =>
              React.createElement('span', { key: t, className: 'a1s-cob-legend-i' },
                React.createElement('span', { className: 'a1s-sede-dot ' + SEDE_META[t].cls, 'aria-hidden': true }), l))),
          React.createElement('div', { className: 'a1s-cob-stats', style: { display: 'flex', gap: 26, marginTop: 22, flexWrap: 'wrap' } },
            React.createElement(Stat, { value: 21, prefix: '', label: 'Sedes a nivel nacional', dark: true }),
            React.createElement(Stat, { value: 20, prefix: '+', label: 'Ciudades', dark: true }),
            React.createElement(Stat, { value: 24, prefix: '', suffix: '/7', label: 'Monitoreo', dark: true }))),
        /* ── Directorio ── */
        React.createElement(Reveal, { delay: 120 },
          /* filtros */
          React.createElement('div', { className: 'a1s-cob-filters' },
            filters.map(([id, label, n]) => React.createElement('button', { key: id, className: 'a1s-int a1s-cob-filter' + (filter === id ? ' on' : ''),
              onClick: () => { setFilter(id); const first = (id === 'todas' ? sedes : sedes.filter((s) => s.type === id))[0]; if (first) setActive(first.city); } },
              label, React.createElement('span', { className: 'a1s-cob-filter-n' }, n)))),
          /* detalle activo */
          cur && React.createElement('div', { className: 'a1s-cob-detail', style: { boxShadow: 'var(--shadow-glow)' } },
            React.createElement('div', { style: { display: 'flex', alignItems: 'flex-start', gap: 13 } },
              React.createElement('span', { style: { color: 'var(--a1s-red-400)', marginTop: 2 } }, React.createElement(Icons.pin, { size: 24 })),
              React.createElement('div', { style: { flex: 1 } },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' } },
                  React.createElement('span', { style: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-.02em' } }, cur.city),
                  React.createElement(Badge, { variant: cur.type === 'principal' ? 'solid' : 'on-dark' }, SEDE_META[cur.type].label)),
                React.createElement('div', { style: { color: 'var(--dark-muted)', fontSize: '.875rem', marginTop: 2 } }, cur.dpto))),
            React.createElement('div', { className: 'a1s-cob-addr' },
              React.createElement('span', { style: { color: 'var(--a1s-red-400)', flex: 'none', marginTop: 1 } }, React.createElement(Icons.building, { size: 17 })),
              React.createElement('span', null, cur.addr)),
            React.createElement('div', { style: { display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' } },
              React.createElement(Btn, { variant: 'on-dark', size: 'sm', href: mapsUrl(cur), target: '_blank', rel: 'noopener', iconRight: React.createElement(Icons.arrowUR, { size: 15 }) }, 'Cómo llegar'),
              React.createElement(Btn, { variant: 'primary', size: 'sm', onClick: () => go('contacto'), iconRight: React.createElement(Icons.arrow, { size: 15 }) }, 'Solicitar cobertura'))),
          /* lista / directorio */
          React.createElement('div', { className: 'a1s-cob-list' },
            groups.map(([t, arr]) => React.createElement('div', { key: t },
              filter === 'todas' && React.createElement('div', { className: 'a1s-cob-group' }, SEDE_META[t].plural, React.createElement('span', null, arr.length)),
              arr.map(listItem)))))))
  );
}

/* ════════════════ CERTIFICACIONES ════════════════ */
const CERT_DETAIL = [
  {
    sigla: 'ISO 9001', img: 'assets/certs/iso-9001.png', name: 'Gestión de la Calidad',
    tagline: 'Calidad gestionada, medida y verificada en cada servicio.',
    desc: 'Norma internacional de sistemas de gestión de la calidad. Certifica que A1S planifica, controla y mejora continuamente sus procesos para entregar un servicio consistente, trazable y enfocado en el cliente.',
    bullets: ['Procesos estandarizados y auditados bajo norma internacional', 'Mejora continua basada en indicadores y auditorías', 'Enfoque en la satisfacción del cliente y la gestión del riesgo'],
  },
  {
    sigla: 'ISO 14001', img: 'assets/certs/iso-14001.png', name: 'Gestión Ambiental',
    tagline: 'Operación responsable con el medio ambiente.',
    desc: 'Norma internacional de sistemas de gestión ambiental. Acredita que A1S identifica, controla y reduce el impacto ambiental de su operación, en cumplimiento de la normatividad vigente.',
    bullets: ['Gestión y reducción del impacto ambiental de la operación', 'Cumplimiento verificado de la legislación ambiental', 'Cultura de sostenibilidad en toda la organización'],
  },
  {
    sigla: 'ISO 28000', img: 'assets/certs/iso-28000.png', name: 'Seguridad de la Cadena de Suministro',
    tagline: 'Cadena de suministro protegida de extremo a extremo.',
    desc: 'Norma internacional de gestión de la seguridad para la cadena de suministro. Certifica la capacidad de A1S para evaluar riesgos y proteger personas, bienes e información a lo largo de toda la cadena logística.',
    bullets: ['Evaluación y control de riesgos en la cadena logística', 'Protección de personas, carga, medios e información', 'Continuidad de la operación ante eventos de seguridad'],
  },
  {
    sigla: 'BASC V6', img: 'assets/certs/basc.png', name: 'Business Alliance for Secure Commerce',
    tagline: 'Comercio seguro, libre de contaminación con sustancias ilícitas.',
    desc: 'Alianza empresarial internacional que promueve el comercio seguro a lo largo de toda la cadena logística, mediante estándares auditados y mejora continua de los procesos de seguridad. A1S está certificada en la versión 6 del estándar.',
    bullets: ['Certificación vigente en la versión 6 del estándar BASC', 'Cadena logística protegida contra contaminación con sustancias ilícitas', 'Auditorías periódicas y mejora continua de procesos', 'Cultura de seguridad en cada eslabón de la operación'],
  },
  {
    sigla: 'OPR', img: 'assets/certs/opr.png', name: 'Organización de Protección Reconocida',
    tagline: 'Protección reconocida para el comercio exterior.',
    desc: 'Reconocimiento que acredita a A1S como Organización de Protección Reconocida: estándares de seguridad verificados para custodiar y proteger operaciones logísticas y de comercio exterior.',
    bullets: ['Estándares de protección verificados por auditoría', 'Respaldo confiable para operaciones de comercio exterior', 'Personal y procedimientos acreditados para la protección de la cadena'],
  },
];

function CertificacionesView({ go }) {
  const steps = [['Diagnóstico', 'Evaluamos el estado de tu programa de seguridad frente al estándar.'], ['Implementación', 'Auditoría e implementación de controles y documentación.'], ['Acompañamiento', 'Hasta la obtención y el mantenimiento del certificado.']];
  return React.createElement('div', null,
    React.createElement('section', { className: 'a1s-dark a1s-noise', style: { background: '#0A0A0C', paddingTop: 'calc(78px + var(--section-y) * .5)', paddingBottom: 'var(--section-y)', position: 'relative', overflow: 'hidden' } },
      React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'radial-gradient(60% 80% at 50% 0%, rgba(192,35,27,.18), transparent 60%)' } }),
      React.createElement('div', { style: { ...WRAP, position: 'relative' } },
        React.createElement(Reveal, null, React.createElement(SectionHead, { dark: true, center: true, eyebrow: 'Comercio seguro', title: 'Respaldados por los estándares más exigentes.', lead: 'Cada certificación es una auditoría superada y una promesa verificable. Esto es lo que cada una garantiza para tu operación.' })),
        /* Detalle por certificación */
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 'clamp(1.4rem,3vw,2.2rem)', marginTop: 54 } },
          CERT_DETAIL.map((c, i) => React.createElement(Reveal, { key: c.sigla, delay: i * 110 },
            React.createElement('div', { className: 'a1s-split', style: { display: 'grid', gridTemplateColumns: '.42fr 1fr', gap: 'clamp(1.6rem,3.5vw,3.5rem)', alignItems: 'center', background: 'var(--dark-surface)', border: '1px solid var(--dark-line)', borderRadius: 'var(--radius-lg)', padding: 'clamp(1.6rem,3.4vw,2.8rem)', position: 'relative', overflow: 'hidden' } },
              React.createElement('div', { 'aria-hidden': true, style: { position: 'absolute', inset: 0, background: 'radial-gradient(46% 90% at ' + (i % 2 ? '92%' : '8%') + ' 50%, rgba(192,35,27,.14), transparent 60%)' } }),
              /* sello */
              React.createElement('div', { style: { position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' } },
                React.createElement('div', { style: { width: 148, height: 148, borderRadius: '50%', display: 'grid', placeItems: 'center', border: '2.5px solid var(--a1s-red)', background: '#fff', boxShadow: '0 0 40px rgba(192,35,27,.4)', overflow: 'hidden' } },
                  React.createElement('img', { src: c.img, alt: c.sigla + ' · ' + c.name, loading: 'lazy', style: { width: '68%', height: '68%', objectFit: 'contain' } })),
                React.createElement('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', color: '#fff', letterSpacing: '.01em' } }, c.sigla),
                React.createElement('div', { style: { fontSize: '.78rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--dark-muted)', maxWidth: '22ch' } }, c.name)),
              /* contenido */
              React.createElement('div', { style: { position: 'relative' } },
                React.createElement('h3', { style: { margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.3rem,2.2vw,1.7rem)', letterSpacing: '-.015em', color: '#fff' } }, c.tagline),
                React.createElement('p', { style: { margin: '12px 0 0', color: 'var(--dark-muted)', fontSize: '.9688rem', lineHeight: 1.65, maxWidth: '64ch' } }, c.desc),
                React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 9, marginTop: 18 } },
                  c.bullets.map((b, j) => React.createElement('div', { key: j, style: { display: 'flex', gap: 11, alignItems: 'flex-start' } },
                    React.createElement('span', { style: { flex: 'none', color: 'var(--a1s-red-400)', marginTop: 1 } }, React.createElement(Icons.check, { size: 18 })),
                    React.createElement('span', { style: { fontSize: '.9375rem', lineHeight: 1.5, color: 'var(--dark-text)' } }, b)))))))))),
    ),
    React.createElement('section', { style: SECTION },
      React.createElement('div', { style: WRAP },
        React.createElement(Reveal, null, React.createElement(SectionHead, { center: true, eyebrow: 'Acompañamiento A1S', title: 'Te llevamos hasta la certificación.', lead: 'Si tu empresa necesita certificarse en BASC o en normas ISO de seguridad, te acompañamos de principio a fin.' })),
        React.createElement('div', { className: 'a1s-steps', style: { position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28, marginTop: 48, maxWidth: 920, marginInline: 'auto' } },
          React.createElement('div', { 'aria-hidden': true, className: 'a1s-steps-line' }),
          steps.map(([t, d], i) => React.createElement(Reveal, { key: t, delay: i * 100, style: { position: 'relative', textAlign: 'center' } },
            React.createElement('div', { style: { width: 56, height: 56, margin: '0 auto', borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'var(--bg)', border: '2px solid var(--a1s-red)', color: RED, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', position: 'relative', zIndex: 1 } }, String(i + 1).padStart(2, '0')),
            React.createElement('h3', { style: { margin: '18px 0 8px', fontSize: '1.2rem', fontWeight: 700 } }, t),
            React.createElement('p', { style: { margin: '0 auto', color: 'var(--text-muted)', fontSize: '.9375rem', lineHeight: 1.55, maxWidth: '28ch' } }, d)))),
        React.createElement(Reveal, { delay: 200, style: { textAlign: 'center', marginTop: 44 } }, React.createElement(Btn, { variant: 'primary', onClick: () => go('contacto'), iconRight: React.createElement(Icons.arrow, { size: 16 }) }, 'Inicia tu certificación')))));
}

Object.assign(window, { CoberturaView, CertificacionesView });
