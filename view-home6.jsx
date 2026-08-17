/* ============================================================================
   A1S — HOME v6 · Parte A: datos, SlotPanel (media premium con drop-zone),
   Quiénes somos, Servicios (rojo profundo) y Cómo operamos.
   ========================================================================== */
const { Reveal, Eyebrow, Btn, Stat, SectionHead, Icons, RED, WRAP, SECTION, useReduce } = window;

/* Cada servicio tiene su PROPIA media: foto única (sin repetir) o ilustración
   line-art de marca como respaldo + drop-zone para la foto 4K definitiva. */
const HOME6_SERVICES = [
  { id: 'fisica', label: 'Seguridad Física', Icon: Icons.shield, scene: 'canino', slot: 'svc-fisica', photo: 'assets/services/fisica.png', eyebrow: 'Personas', title: 'Vigilancia, escoltas y caninos', desc: 'Vigilancia con o sin armas, supervisión permanente, escoltas VIP / carga crítica y unidades caninas certificadas en detección y defensa controlada.', sub: ['Vigilancia armada', 'Escoltas VIP', 'Carga crítica', 'Caninos K9'] },
  { id: 'electronica', label: 'Seguridad Electrónica', Icon: Icons.cctv, scene: 'electronica', slot: 'svc-electronica', photo: 'assets/services/electronica.png', eyebrow: 'Tecnología', title: 'CCTV, acceso y Atlas IoT', desc: 'CCTV HD con analítica, control de acceso, protección perimetral y detección temprana de incendios, integrados en una sola plataforma con Atlas IoT.', sub: ['CCTV con analítica', 'Control de acceso', 'Perimetral', 'Atlas IoT'] },
  { id: 'movil', label: 'Móvil & GPS', Icon: Icons.truck, scene: 'movil', slot: 'svc-movil', photo: 'assets/services/movil.png', eyebrow: 'Trazabilidad', title: 'Monitoreo de flotas y cargas', desc: 'Control de flotas y cargamentos de valor en tiempo real, con escoltaje y rastreo GPS para máxima eficiencia y trazabilidad de la operación.', sub: ['Monitoreo de flotas', 'Cargas de valor', 'Rastreo GPS', 'Escoltaje'] },
  { id: 'drones', label: 'Drones', Icon: Icons.drone, scene: 'drones', slot: 'svc-drones', photo: 'assets/services/drones.png', eyebrow: 'Vista aérea', title: 'Inspección y ortomosaicos', desc: 'Sobrevuelos programados, ortomosaicos georreferenciados y modelos 3D con datos topográficos para medir distancias, áreas y volúmenes.', sub: ['Inspección aérea', 'Ortomosaicos', 'Modelos 3D', 'Topografía'] },
  { id: 'ciber', label: 'Ciberseguridad', Icon: Icons.lock, scene: 'ciber', slot: 'svc-ciber-2', photo: 'assets/services/ciber.png?v=2', eyebrow: 'Información', title: 'IAM, pentesting y políticas', desc: 'Protegemos también tu información: identificación y autorización (IAM), desarrollo de políticas, formación y pruebas de penetración.', sub: ['IAM', 'Pentesting', 'Políticas', 'Formación'] },
  { id: 'riesgo', label: 'Gestión del Riesgo', Icon: Icons.gauge, scene: 'riesgo', slot: 'svc-riesgo', photo: 'assets/services/riesgo.png', eyebrow: 'Metodología', title: 'Análisis de riesgo medible', desc: 'Metodología estructurada en 5 pasos para identificar, valorar y tratar los riesgos de cada cliente, con planes de acción concretos y medibles.', sub: ['Diagnóstico', 'Valoración', 'Tratamiento', 'KPIs'] },
];

const HOME6_STEPS = [
  ['01', 'Evaluación', 'Analizamos riesgos y operación para identificar prioridades y diseñar el esquema más óptimo.'],
  ['02', 'Planeación', 'Diseñamos el esquema —física, electrónica o ambas— con monitoreo permanente 24/7.'],
  ['03', 'Implementación', 'Instalamos el servicio, asignamos el personal y capacitamos al equipo desde el día 1.'],
  ['04', 'Optimización', 'Monitoreamos la operación y la mejoramos de forma continua, con indicadores medibles.'],
];

/* ── SlotPanel — panel de media premium: HUD + ilustración de respaldo +
      drop-zone 4K. Al soltar la foto, la ilustración se desvanece. ────── */
function SlotPanel({ slotId, photo = null, scene = null, label, status = 'EN VIVO', ratio = '4 / 3', placeholder, fit = null, position = '50% 100%', style = {} }) {
  const reduce = useReduce();
  const Scene = scene && window.SCENES ? window.SCENES[scene] : null;
  return React.createElement('div', { className: 'a1s-svc-media', style: { position: 'relative', aspectRatio: ratio, overflow: 'hidden', borderRadius: 20, background: '#08080B', border: '1px solid rgba(255,255,255,.12)', boxShadow: '0 50px 110px -36px rgba(0,0,0,.75), inset 0 1px 0 rgba(255,255,255,.07)', ...style } },
    React.createElement('div', { 'aria-hidden': true, style: { position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 72% 12%, rgba(192,35,27,.30), transparent 56%), repeating-linear-gradient(0deg, rgba(255,255,255,.035) 0 1px, transparent 1px 26px), repeating-linear-gradient(90deg, rgba(255,255,255,.035) 0 1px, transparent 1px 26px)' } }),
    // ilustración line-art de respaldo (si no hay foto definitiva)
    !photo && Scene && React.createElement('div', { className: 'svc-illus', style: { position: 'absolute', inset: '14% 10%', display: 'grid', placeItems: 'center', color: 'rgba(255,255,255,.5)' } },
      React.createElement('svg', { viewBox: '0 0 200 200', style: { width: '88%', height: '88%', overflow: 'visible' } }, React.createElement(Scene))),
    // DROP-ZONE 4K (con fallback a la foto actual si existe)
    React.createElement('image-slot', Object.assign({ id: slotId, className: 'slot-ghost', fit: fit || (photo ? 'contain' : 'cover'), position: position, radius: '20', placeholder }, photo ? { src: photo } : {}, { style: { position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2 } })),
    !reduce && React.createElement('div', { className: 'a1s-scan', 'aria-hidden': true, style: { zIndex: 3 } }),
    // chrome HUD
    [['top', 'left'], ['top', 'right'], ['bottom', 'left'], ['bottom', 'right']].map((c, i) =>
      React.createElement('span', { key: i, 'aria-hidden': true, style: { position: 'absolute', [c[0]]: 14, [c[1]]: 14, width: 18, height: 18, zIndex: 4, [`border${c[0][0].toUpperCase() + c[0].slice(1)}`]: '2px solid rgba(255,255,255,.42)', [`border${c[1][0].toUpperCase() + c[1].slice(1)}`]: '2px solid rgba(255,255,255,.42)' } })),
    React.createElement('div', { 'aria-hidden': true, style: { position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.6), transparent 38%)', zIndex: 3, pointerEvents: 'none' } }),
    React.createElement('div', { style: { position: 'absolute', top: 16, left: 18, display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: '.7rem', fontWeight: 600, letterSpacing: '.1em', color: 'rgba(255,255,255,.8)', zIndex: 4, pointerEvents: 'none', whiteSpace: 'nowrap' } },
      React.createElement('span', { className: reduce ? '' : 'a1s-rec', style: { width: 8, height: 8, borderRadius: '50%', background: 'var(--a1s-red)', boxShadow: '0 0 8px var(--a1s-red-glow)' } }), status),
    label && React.createElement('span', { style: { position: 'absolute', left: 18, bottom: 14, fontSize: '.8125rem', fontWeight: 600, color: 'rgba(255,255,255,.92)', zIndex: 4, pointerEvents: 'none', whiteSpace: 'nowrap' } }, label),
    React.createElement('span', { style: { position: 'absolute', right: 18, bottom: 14, fontSize: '.7rem', fontVariantNumeric: 'tabular-nums', color: 'rgba(255,255,255,.5)', zIndex: 4, pointerEvents: 'none' } }, 'CAM · A1S'));
}

/* ── QUIÉNES SOMOS (editorial claro) ─────────────────────────────────── */
function About6({ go }) {
  return React.createElement('section', { style: SECTION, 'data-screen-label': 'Quiénes somos' },
    React.createElement('div', { className: 'a1s-about-grid', style: { ...WRAP, display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 'clamp(2rem,5vw,5rem)', alignItems: 'center' } },
      React.createElement(Reveal, null,
        React.createElement(SectionHead, { eyebrow: 'Quiénes somos', title: '55 años protegiendo a Colombia.', lead: 'Somos el aliado estratégico de quienes no toleran riesgos sin gestionar. Integramos seguridad humana con tecnología avanzada para entregar protección integral, proactiva y medible.' }),
        React.createElement('div', { style: { marginTop: 28, display: 'flex', flexDirection: 'column' } },
          [['Equipo dedicado', 'No asignamos un guarda: asignamos una estructura completa con supervisión y mejora continua.'],
           ['Informes en tiempo real', 'Reportes diarios, semanales y mensuales vía plataforma digital propia.'],
           ['Planes de contingencia', 'Protocolos de respuesta probados para cada cuenta.']].map(([t, d], i) =>
            React.createElement('div', { key: i, style: { display: 'flex', gap: 16, padding: '16px 0', borderTop: i ? '1px solid var(--border)' : 'none' } },
              React.createElement('span', { style: { flex: 'none', color: RED, marginTop: 2 } }, React.createElement(Icons.check, { size: 22 })),
              React.createElement('div', null,
                React.createElement('div', { style: { fontWeight: 700, fontSize: '1.0625rem' } }, t),
                React.createElement('p', { style: { margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '.9375rem', lineHeight: 1.55 } }, d)))),
        React.createElement('div', { style: { marginTop: 26 } },
          React.createElement(Btn, { variant: 'outline', onClick: () => go('servicios'), iconRight: React.createElement(Icons.arrow, { size: 16 }) }, 'Conoce la compañía')))),
      React.createElement(Reveal, { delay: 120 },
        React.createElement(SlotPanel, { slotId: 'about-equipo', photo: 'assets/people/centro-control.png', fit: 'cover', position: '50% 50%', ratio: '4 / 5', label: 'Centro de Control · 24/7', placeholder: 'Foto 4K · Centro de control con operador (3:4)' }))));
}

/* ── SERVICIOS — rojo profundo, tarjetas con glow y capas ───────────── */
function Services6({ go }) {
  const [tab, setTab] = React.useState('fisica');
  const svc = HOME6_SERVICES.find((s) => s.id === tab);
  const idx = HOME6_SERVICES.indexOf(svc);
  return React.createElement('section', { className: 'a1s-dark a1s-noise', 'data-screen-label': 'Servicios',
    style: { ...SECTION, position: 'relative', overflow: 'hidden', background: 'radial-gradient(90% 70% at 84% 0%, rgba(255,82,60,.30), transparent 55%), linear-gradient(168deg, #9E1810 0%, #75100A 42%, #3D0805 78%, #1C0403 100%)' } },
    React.createElement('div', { className: 'a1s-gridtex' }),
    React.createElement('div', { className: 'a1s-diag' }),
    // número gigante de fondo (profundidad)
    React.createElement('div', { 'aria-hidden': true, key: 'n' + idx, style: { position: 'absolute', right: '1.5%', bottom: '-4%', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(12rem,26vw,26rem)', lineHeight: 1, letterSpacing: '.12em', color: 'transparent', WebkitTextStroke: '1.5px rgba(255,255,255,.10)', pointerEvents: 'none', userSelect: 'none', display: 'flex', gap: '.06em' } },
      React.createElement('span', null, '0'), React.createElement('span', null, String(idx + 1))),
    React.createElement('div', { style: { ...WRAP, position: 'relative', zIndex: 2 } },
      React.createElement(Reveal, null,
        React.createElement(Eyebrow, { style: { color: '#FFD7D2' } }, 'Nuestras soluciones de seguridad'),
        React.createElement('h2', { style: { margin: '16px 0 0', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3.3rem)', lineHeight: 1.04, letterSpacing: '-.025em', color: '#fff', maxWidth: '22ch', textTransform: 'uppercase' } }, 'Un portafolio que cubre cada frente.'),
        React.createElement('p', { style: { margin: '18px 0 0', color: 'rgba(255,255,255,.82)', fontSize: '1.0625rem', lineHeight: 1.6, maxWidth: '56ch' } }, 'Talento humano altamente capacitado + tecnología de punta. Explora cada línea y descubre cómo protegemos lo que más importa.')),
      React.createElement(Reveal, { delay: 80, style: { display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 34 } },
        HOME6_SERVICES.map((s) => React.createElement('button', { key: s.id, className: 'a1s-int a1s-tab6' + (tab === s.id ? ' on' : ''), onClick: () => setTab(s.id) },
          React.createElement(s.Icon, { size: 17 }), s.label))),
      React.createElement('div', { key: tab, className: 'a1s-split a1s-fade', style: { display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 'clamp(2rem,4vw,3.5rem)', marginTop: 40, alignItems: 'center' } },
        React.createElement('div', { className: 'a1s-glowcard', style: { padding: 'clamp(.8rem,1.4vw,1.2rem)' } },
          React.createElement(SlotPanel, { slotId: svc.slot, photo: svc.photo, scene: svc.photo ? null : svc.scene, fit: svc.photo ? 'cover' : null, position: '50% 50%', ratio: '4 / 3', label: svc.label, placeholder: 'Foto 4K · ' + svc.label + ' (ver shot list)' })),
        React.createElement('div', null,
          React.createElement(Eyebrow, { style: { color: '#FFD7D2' } }, svc.eyebrow),
          React.createElement('h3', { style: { margin: '14px 0 0', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.6rem,2.7vw,2.2rem)', letterSpacing: '-.02em', color: '#fff' } }, svc.title),
          React.createElement('p', { style: { marginTop: 16, color: 'rgba(255,255,255,.85)', fontSize: '1.0625rem', lineHeight: 1.65, maxWidth: '46ch' } }, svc.desc),
          React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 22 } },
            svc.sub.map((s) => React.createElement('span', { key: s, style: { display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 15px', borderRadius: 999, background: 'rgba(0,0,0,.26)', border: '1px solid rgba(255,255,255,.2)', fontSize: '.8125rem', fontWeight: 600, color: '#fff', backdropFilter: 'blur(4px)' } },
              React.createElement('span', { style: { width: 6, height: 6, borderRadius: '50%', background: '#FFB3AB' } }), s))),
          React.createElement('div', { style: { marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' } },
            React.createElement(Btn, { variant: 'solid', onClick: () => go('servicios'), iconRight: React.createElement(Icons.arrow, { size: 16 }), style: { background: '#fff', color: 'var(--a1s-red-700)' } }, 'Ver portafolio completo'),
            React.createElement(Btn, { variant: 'on-dark', onClick: () => go('contacto'), style: { borderColor: 'rgba(255,255,255,.35)' } }, 'Cotizar este servicio'))))));
}

/* ── CÓMO OPERAMOS — oscuro, números gigantes ───────────────────────── */
function Steps6() {
  return React.createElement('section', { className: 'a1s-dark a1s-noise', 'data-screen-label': 'Cómo operamos',
    style: { ...SECTION, position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #1C0403 0%, #0C0A0B 18%, #0A0A0C 100%)' } },
    React.createElement('div', { 'aria-hidden': true, style: { position: 'absolute', inset: 0, background: 'radial-gradient(60% 50% at 12% 10%, rgba(192,35,27,.16), transparent 60%)' } }),
    React.createElement('div', { style: { ...WRAP, position: 'relative' } },
      React.createElement(Reveal, null, React.createElement(SectionHead, { dark: true, eyebrow: '¿Cómo operamos?', title: 'Método probado. Cero improvisación.', lead: 'Cada cuenta arranca con un proceso estructurado de 4 pasos que garantiza efectividad y optimización de recursos.' })),
      React.createElement('div', { className: 'a1s-steps', style: { position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 28, marginTop: 56 } },
        HOME6_STEPS.map(([n, t, d], i) => React.createElement(Reveal, { key: n, delay: i * 110, className: 'a1s-step6', style: { position: 'relative', padding: '26px 22px 24px', borderRadius: 18, background: 'rgba(255,255,255,.028)', border: '1px solid rgba(255,255,255,.08)' } },
          React.createElement('div', { className: 'stepnum', style: { fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.6rem', lineHeight: 1, color: 'var(--a1s-red-400)', letterSpacing: '-.03em' } }, n),
          React.createElement('h3', { style: { margin: '16px 0 8px', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-.01em', color: '#fff' } }, t),
          React.createElement('p', { style: { margin: 0, color: 'var(--dark-muted)', fontSize: '.9375rem', lineHeight: 1.6 } }, d))))));
}

Object.assign(window, { HOME6_SERVICES, SlotPanel, About6, Services6, Steps6 });
