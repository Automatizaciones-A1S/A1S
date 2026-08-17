/* ============================================================================
   A1S — Vista HOME ("Centro de Control")
   ========================================================================== */
const { Reveal, Eyebrow, Btn, Stat, SectionHead, MediaPanel, Icons, RED, WRAP, SECTION, useReduce } = window;

const HOME_SERVICES = [
  { id: 'fisica', label: 'Seguridad Física', Icon: Icons.shield, scene: 'guard', photo: 'assets/services/fisica.png', eyebrow: 'Personas', title: 'Vigilancia, escoltas y caninos', desc: 'Vigilancia con o sin armas, supervisión permanente, escoltas VIP / carga crítica y unidades caninas certificadas en detección y defensa controlada.', sub: ['Vigilancia armada', 'Escoltas VIP', 'Carga crítica', 'Caninos K9'] },
  { id: 'electronica', label: 'Seguridad Electrónica', Icon: Icons.cctv, scene: 'electronica', photo: 'assets/services/electronica.png', eyebrow: 'Tecnología', title: 'CCTV, acceso y Atlas IoT', desc: 'CCTV HD con analítica, control de acceso, protección perimetral y detección temprana de incendios, integrados en una sola plataforma con Atlas IoT.', sub: ['CCTV con analítica', 'Control de acceso', 'Perimetral', 'Atlas IoT'] },
  { id: 'movil', label: 'Móvil & GPS', Icon: Icons.truck, scene: 'movil', photo: 'assets/services/movil.png', eyebrow: 'Trazabilidad', title: 'Monitoreo de flotas y cargas', desc: 'Control de flotas y cargamentos de valor en tiempo real, con escoltaje y rastreo GPS para máxima eficiencia y trazabilidad de la operación.', sub: ['Monitoreo de flotas', 'Cargas de valor', 'Rastreo GPS', 'Escoltaje'] },
  { id: 'drones', label: 'Drones', Icon: Icons.drone, scene: 'drones', photo: 'assets/services/drones.png', eyebrow: 'Vista aérea', title: 'Inspección y ortomosaicos', desc: 'Sobrevuelos programados, ortomosaicos georreferenciados y modelos 3D con datos topográficos para medir distancias, áreas y volúmenes.', sub: ['Inspección aérea', 'Ortomosaicos', 'Modelos 3D', 'Topografía'] },
  { id: 'ciber', label: 'Ciberseguridad', Icon: Icons.lock, scene: 'ciber', photo: 'assets/services/ciber.png', eyebrow: 'Información', title: 'IAM, pentesting y políticas', desc: 'Protegemos también tu información: identificación y autorización (IAM), desarrollo de políticas, formación y pruebas de penetración.', sub: ['IAM', 'Pentesting', 'Políticas', 'Formación'] },
  { id: 'riesgo', label: 'Gestión del Riesgo', Icon: Icons.gauge, scene: 'riesgo', photo: 'assets/services/riesgo.png', eyebrow: 'Metodología', title: 'Análisis de riesgo medible', desc: 'Metodología estructurada en 5 pasos para identificar, valorar y tratar los riesgos de cada cliente, con planes de acción concretos y medibles.', sub: ['Diagnóstico', 'Valoración', 'Tratamiento', 'KPIs'] },
];

const STEPS = [
  ['01', 'Evaluación', 'Análisis de riesgos y de la operación para identificar prioridades y diseñar el esquema más óptimo.'],
  ['02', 'Planeación', 'Diseñamos el esquema —física, electrónica o ambas— con monitoreo permanente 24/7.'],
  ['03', 'Implementación', 'Instalamos el servicio, asignamos el personal y capacitamos al equipo desde el día 1.'],
  ['04', 'Optimización', 'Monitoreo constante y mejora continua para garantizar adaptabilidad y resultados.'],
];

const CLIENTS = ['OFFCORSS', 'SIMONIZ', 'TRANSMILENIO', 'SAMSUNG', 'SOMNI', 'A1S GROUP'];

function HomeView({ go }) {
  const [tab, setTab] = React.useState('fisica');
  const svc = HOME_SERVICES.find((s) => s.id === tab);
  const reduce = useReduce();

  return React.createElement('div', null,
    React.createElement(window.HomeHero, { go }),

    /* ───────── QUIÉNES SOMOS ───────── */
    React.createElement('section', { style: SECTION },
      React.createElement('div', { style: { ...WRAP, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem,5vw,5rem)', alignItems: 'center' }, className: 'a1s-split' },
        React.createElement(Reveal, null,
          React.createElement(SectionHead, { eyebrow: 'Quiénes somos', title: '55 años protegiendo a Colombia.', lead: 'Somos el aliado estratégico de quienes no toleran riesgos no gestionados. Integramos seguridad humana con tecnología avanzada para una protección integral, proactiva y medible.' }),
          React.createElement('div', { style: { marginTop: 28, display: 'flex', flexDirection: 'column', gap: 2 } },
            [['Equipo dedicado', 'No asignamos un guarda: asignamos una estructura completa con supervisión y mejora continua.'],
             ['Informes en tiempo real', 'Reportes diarios, semanales y mensuales vía plataforma digital propia.'],
             ['Planes de contingencia', 'Protocolos de respuesta probados para cada cuenta.']].map(([t, d], i) =>
              React.createElement('div', { key: i, style: { display: 'flex', gap: 16, padding: '16px 0', borderTop: i ? '1px solid var(--border)' : 'none' } },
                React.createElement('span', { style: { flex: 'none', color: RED, marginTop: 2 } }, React.createElement(Icons.check, { size: 22 })),
                React.createElement('div', null,
                  React.createElement('div', { style: { fontWeight: 700, fontSize: '1.0625rem' } }, t),
                  React.createElement('p', { style: { margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '.9375rem', lineHeight: 1.55 } }, d))))),
          React.createElement('div', { style: { marginTop: 26 } }, React.createElement(Btn, { variant: 'outline', onClick: () => go('servicios'), iconRight: React.createElement(Icons.arrow, { size: 16 }) }, 'Conoce la compañía'))),
        React.createElement(Reveal, { delay: 120 }, React.createElement(MediaPanel, { scene: 'control', photo: 'assets/people/monitoreo.png?v=2', ratio: '4 / 5', label: 'Centro de Control · 24/7', status: 'EN VIVO' }))),
    ),

    /* ───────── PORTAFOLIO (tabs) ───────── */
    React.createElement('section', { style: { ...SECTION, background: 'var(--surface)' } },
      React.createElement('div', { style: WRAP },
        React.createElement(Reveal, null, React.createElement(SectionHead, { eyebrow: 'Nuestras soluciones de seguridad', title: 'Soluciones adaptadas a tu necesidad.' })),
        React.createElement(Reveal, { delay: 80, style: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 30, padding: 6, background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-pill)', width: 'fit-content', maxWidth: '100%' }, className: 'a1s-tabs' },
          HOME_SERVICES.map((s) => React.createElement('button', { key: s.id, className: 'a1s-int', onClick: () => setTab(s.id),
            style: { display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 18px', border: 'none', cursor: 'pointer', borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '.9rem', whiteSpace: 'nowrap', transition: 'all .2s', background: tab === s.id ? RED : 'transparent', color: tab === s.id ? '#fff' : 'var(--text-muted)' } },
            React.createElement(s.Icon, { size: 17 }), s.label))),
        React.createElement('div', { key: tab, className: 'a1s-split a1s-fade', style: { display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 'clamp(2rem,4vw,3.5rem)', marginTop: 36, alignItems: 'center' } },
          React.createElement(MediaPanel, { scene: svc.scene, photo: svc.photo, ratio: '4 / 3', label: svc.label }),
          React.createElement('div', null,
            React.createElement(Eyebrow, null, svc.eyebrow),
            React.createElement('h3', { style: { margin: '14px 0 0', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.5rem,2.6vw,2rem)', letterSpacing: '-.02em' } }, svc.title),
            React.createElement('p', { style: { marginTop: 16, color: 'var(--text-muted)', fontSize: '1.0625rem', lineHeight: 1.6, maxWidth: '46ch' } }, svc.desc),
            React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 22 } },
              svc.sub.map((s) => React.createElement('span', { key: s, style: { display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 14px', borderRadius: 'var(--radius-pill)', background: 'var(--surface-card)', border: '1px solid var(--border)', fontSize: '.8125rem', fontWeight: 600, color: 'var(--text)' } },
                React.createElement('span', { style: { width: 6, height: 6, borderRadius: '50%', background: RED } }), s))),
            React.createElement('div', { style: { marginTop: 26 } }, React.createElement(Btn, { variant: 'outline', onClick: () => go('servicios'), iconRight: React.createElement(Icons.arrow, { size: 16 }) }, 'Ver portafolio completo'))))),
    ),

    /* ───────── CÓMO OPERAMOS (timeline) ───────── */
    React.createElement('section', { style: SECTION },
      React.createElement('div', { style: WRAP },
        React.createElement(Reveal, null, React.createElement(SectionHead, { eyebrow: '¿Cómo operamos?', title: 'Un proceso probado en 4 pasos.' })),
        React.createElement('div', { className: 'a1s-steps', style: { position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 28, marginTop: 48 } },
          React.createElement('div', { 'aria-hidden': true, className: 'a1s-steps-line' }),
          STEPS.map(([n, t, d], i) => React.createElement(Reveal, { key: n, delay: i * 100, style: { position: 'relative' } },
            React.createElement('div', { style: { width: 56, height: 56, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'var(--bg)', border: '2px solid var(--a1s-red)', color: RED, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', position: 'relative', zIndex: 1 } }, n),
            React.createElement('h3', { style: { margin: '20px 0 8px', fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-.01em' } }, t),
            React.createElement('p', { style: { margin: 0, color: 'var(--text-muted)', fontSize: '.9375rem', lineHeight: 1.55, maxWidth: '26ch' } }, d))))),
    ),

    /* ───────── CTA ASESORÍA (dark) ───────── */
    React.createElement('section', { style: { padding: '0 0 var(--section-y)' } },
      React.createElement('div', { style: WRAP },
        React.createElement(Reveal, null,
          React.createElement('div', { className: 'a1s-dark a1s-ctaband', style: { position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-xl)', background: '#0E0E12', padding: 'clamp(2.5rem,5vw,4.5rem)' } },
            React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'radial-gradient(60% 120% at 12% 20%, rgba(192,35,27,.28), transparent 55%)' } }),
            React.createElement('div', { style: { position: 'relative', display: 'flex', alignItems: 'center', gap: 40, flexWrap: 'wrap' } },
              React.createElement('div', { style: { flex: '1 1 340px' } },
                React.createElement(Eyebrow, { dark: true }, 'Asesoría sin costo'),
                React.createElement('h2', { style: { margin: '14px 0 0', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.7rem,3.2vw,2.6rem)', letterSpacing: '-.02em', maxWidth: '20ch', color: '#fff' } }, '¿No sabes cuál servicio es el adecuado para tu empresa?'),
                React.createElement('p', { style: { marginTop: 16, color: 'var(--dark-muted)', fontSize: '1.0625rem', lineHeight: 1.6, maxWidth: '52ch' } }, 'Diseñamos un esquema de seguridad totalmente personalizado, optimizado con tecnología que garantiza agilidad y precisión.')),
              React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
                React.createElement(Btn, { variant: 'primary', size: 'lg', onClick: () => go('contacto'), iconRight: React.createElement(Icons.arrow, { size: 18 }) }, '¡Cotización gratuita!'),
                React.createElement(Btn, { variant: 'on-dark', size: 'lg', onClick: () => go('servicios') }, 'Quiero saber más')))))),
    ),

    /* ───────── COBERTURA TEASER ───────── */
    React.createElement('section', { className: 'a1s-dark', style: { background: '#0A0A0C', ...SECTION, position: 'relative', overflow: 'hidden' } },
      React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'radial-gradient(70% 80% at 80% 30%, rgba(192,35,27,.14), transparent 60%)' } }),
      React.createElement('div', { style: { ...WRAP, position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem,5vw,5rem)', alignItems: 'center' }, className: 'a1s-split' },
        React.createElement(Reveal, null,
          React.createElement(SectionHead, { dark: true, eyebrow: 'Cobertura nacional, presencia local', title: 'Operamos donde nos necesitas.', lead: '5 regionales y operación directa en +500 municipios, 24/7. Una sola compañía, cobertura total.' }),
          React.createElement('div', { style: { marginTop: 28 } }, React.createElement(Btn, { variant: 'primary', onClick: () => go('cobertura'), iconRight: React.createElement(Icons.arrow, { size: 16 }) }, 'Ver mapa de cobertura'))),
        React.createElement(Reveal, { delay: 120 }, React.createElement(MiniMap, { go }))),
    ),

    /* ───────── CASOS / CLIENTES ───────── */
    React.createElement('section', { style: SECTION },
      React.createElement('div', { style: WRAP },
        React.createElement(Reveal, null, React.createElement(SectionHead, { center: true, eyebrow: 'Casos de éxito', title: 'La confianza de quienes protegemos.' })),
        React.createElement(Reveal, { delay: 100, style: { marginTop: 40 } },
          React.createElement('div', { className: 'a1s-marquee' },
            React.createElement('div', { className: 'a1s-marquee-track' + (reduce ? ' still' : '') },
              [...CLIENTS, ...CLIENTS].map((c, i) => React.createElement('span', { key: i, className: 'a1s-logo' }, c))))),
        React.createElement('p', { style: { textAlign: 'center', marginTop: 18, fontSize: '.8125rem', color: 'var(--text-muted)' } }, 'Logos ilustrativos · sujeto a autorización de uso de cada cliente.'))),

    /* ───────── CIERRE: CLIENTES | TALENTO ───────── */
    React.createElement('section', { 'data-screen-label': 'Cierre' },
      React.createElement('div', { className: 'a1s-split-final', style: { display: 'grid', gridTemplateColumns: '1fr 1fr' } },
        [['Clientes', 'Protege lo que más importa', 'Empresas, conjuntos residenciales y personas: diseñamos tu esquema de seguridad a la medida.', 'Ver soluciones', 'servicios', 'assets/people/hero-escolta.png?v=2', 0],
         ['Talento', 'Únete al equipo A1S', 'Construye tu carrera en seguridad con estabilidad, formación constante y un equipo que te respalda.', 'Ver vacantes', 'talento', 'assets/people/vigilante.png?v=2', 1]].map((it, i) =>
          React.createElement('button', { key: i, className: 'a1s-int a1s-final-half', onClick: () => go(it[4]),
            style: { position: 'relative', overflow: 'hidden', border: 'none', cursor: 'pointer', minHeight: 'clamp(380px,42vw,560px)', padding: 'clamp(2rem,4vw,4.5rem)', textAlign: 'left', color: '#fff', background: it[6] ? '#0A0A0C' : '#B11C14', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' } },
            React.createElement('div', { className: 'a1s-final-img', 'aria-hidden': true, style: { position: 'absolute', inset: 0, backgroundImage: 'url(' + it[5] + ')', backgroundSize: 'auto 96%', backgroundPosition: 'right bottom', backgroundRepeat: 'no-repeat', opacity: 0.6, transition: 'transform .6s var(--ease-out), opacity .4s' } }),
            React.createElement('div', { style: { position: 'absolute', inset: 0, background: it[6] ? 'linear-gradient(75deg, #0A0A0C 22%, rgba(10,10,12,.55) 58%, transparent)' : 'linear-gradient(75deg, #A91D16 22%, rgba(169,29,22,.5) 58%, transparent)' } }),
            React.createElement('div', { style: { position: 'relative', maxWidth: '30ch' } },
              React.createElement('p', { style: { margin: 0, fontStyle: 'italic', fontWeight: 600, fontSize: '.8125rem', textTransform: 'uppercase', letterSpacing: '.16em', color: it[6] ? 'var(--a1s-red-400)' : 'rgba(255,255,255,.9)' } }, it[0]),
              React.createElement('h2', { style: { margin: '12px 0 0', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem,3.2vw,2.9rem)', letterSpacing: '-.025em', lineHeight: 1.04 } }, it[1]),
              React.createElement('p', { style: { margin: '16px 0 0', fontSize: '1.0625rem', lineHeight: 1.55, color: 'rgba(255,255,255,.88)', maxWidth: '32ch' } }, it[2]),
              React.createElement('span', { className: 'a1s-final-cta', style: { display: 'inline-flex', alignItems: 'center', gap: 9, marginTop: 24, fontWeight: 700, fontSize: '1.0625rem' } }, it[3], React.createElement(Icons.arrowUR, { size: 19 })))))))
  );
}

/* MiniMap — teaser del mapa para la home */
function MiniMap({ go }) {
  const C = window.A1SColombia;
  return React.createElement('div', { style: { position: 'relative', borderRadius: 'var(--radius-lg)', border: '1px solid var(--dark-line)', overflow: 'hidden', background: 'radial-gradient(70% 60% at 60% 30%, rgba(192,35,27,.12), transparent 60%), repeating-linear-gradient(0deg, rgba(255,255,255,.04) 0 1px, transparent 1px 30px), repeating-linear-gradient(90deg, rgba(255,255,255,.04) 0 1px, transparent 1px 30px)', padding: '8% 0' } },
    React.createElement('svg', { viewBox: C ? C.viewBox : '0 0 600 720', style: { width: '100%', maxHeight: 420, display: 'block' } },
      C && React.createElement('path', { d: C.path, fill: 'rgba(192,35,27,.10)', stroke: 'var(--a1s-red-400)', strokeWidth: 2.5 }),
      C && C.regionales.map((r) => React.createElement('g', { key: r.reg },
        React.createElement('circle', { cx: r.x, cy: r.y, r: 16, fill: 'none', stroke: 'var(--a1s-red)', strokeWidth: 1.5, opacity: 0.4, className: 'a1s-ping' }),
        React.createElement('circle', { cx: r.x, cy: r.y, r: 6, fill: 'var(--a1s-red)' })))));
}

Object.assign(window, { HomeView, MiniMap, HOME_SERVICES });
