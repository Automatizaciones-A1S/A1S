/* ============================================================================
   A1S — Vista Servicios (portafolio, sectores, tecnología, gestión del riesgo)
   ========================================================================== */
const { Reveal, Eyebrow, Btn, Badge, SectionHead, MediaPanel, SpotlightCard, Icons, RED, WRAP, SECTION } = window;

const SERVICIOS_FULL = window.HOME_SERVICES;

const SECTORES = [
  { Icon: Icons.building, name: 'Industrial & Manufactura', desc: 'Control perimetral, gestión de acceso, vigilancia de activos y protocolos de emergencia industrial.' },
  { Icon: Icons.bank, name: 'Financiero & Bancario', desc: 'Escoltas de valores, protocolos anticorrupción, SIPLAFT y gestión de riesgos financieros.' },
  { Icon: Icons.cart, name: 'Retail & Comercio', desc: 'Prevención de pérdidas, control de merma, vigilancia de cajas y protección del equipo humano.' },
  { Icon: Icons.health, name: 'Salud & Hospitales', desc: 'Control de acceso, manejo de crisis y protocolos especializados para entornos sensibles.' },
  { Icon: Icons.cap, name: 'Educación', desc: 'Ambientes seguros para campus, colegios y centros de formación.' },
  { Icon: Icons.ship, name: 'Comercio Exterior & Puertos', desc: 'OEA, BASC, seguridad portuaria y protección de cadenas logísticas.' },
];

const TECNOLOGIA = [
  ['Plataforma de Análisis de Riesgos', 'Diagnóstico, valoración y seguimiento con reportes en tiempo real.', Icons.gauge],
  ['Gestión de Movilidad GPS', 'Monitoreo y control de flotas, activos y unidades móviles.', Icons.truck],
  ['CCTV & Vigilancia Electrónica', 'Circuito cerrado HD con analítica, reconocimiento y acceso remoto.', Icons.cctv],
  ['Control de Acceso & Perimetral', 'Biometría y barreras para perímetros e instalaciones críticas.', Icons.fingerprint],
  ['Atlas IoT', 'Plataforma integradora que conecta todos los sistemas de seguridad.', Icons.cpu],
  ['Detección de Incendios', 'Detección temprana conectada al centro de monitoreo.', Icons.flame],
];

const RIESGO = [
  ['Diagnóstico', 'Levantamiento de información, visita técnica y entrevistas para conocer tu entorno.', Icons.search],
  ['Identificación', 'Mapeo de amenazas físicas, tecnológicas y humanas que te exponen.', Icons.radar],
  ['Valoración', 'Matriz de probabilidad e impacto y priorización de escenarios críticos.', Icons.gauge],
  ['Tratamiento', 'Controles preventivos, correctivos y de contingencia con responsables y plazos.', Icons.shield],
  ['KPIs', 'Indicadores, revisiones periódicas y ajustes continuos para una mejora medible.', Icons.growth],
];

function ServiciosView({ go }) {
  return React.createElement('div', null,
    /* Hero de página */
    React.createElement('section', { className: 'a1s-dark', style: { background: '#0A0A0C', paddingTop: 'calc(78px + var(--section-y) * .5)', paddingBottom: 'calc(var(--section-y) * .7)', position: 'relative', overflow: 'hidden' } },
      React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'radial-gradient(60% 70% at 78% 16%, rgba(192,35,27,.18), transparent 60%)' } }),
      React.createElement('div', { style: { ...WRAP, position: 'relative' } },
        React.createElement(Reveal, null, React.createElement(SectionHead, { dark: true, eyebrow: 'Nuestras soluciones de seguridad', title: 'Un portafolio integral, una sola compañía.', lead: 'Combinamos talento humano altamente capacitado con tecnología de punta. Explora cada línea y descubre cómo protegemos lo que más importa.' })),
        React.createElement(Reveal, { delay: 120, style: { display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' } },
          React.createElement(Btn, { variant: 'primary', onClick: () => go('contacto'), iconRight: React.createElement(Icons.arrow, { size: 16 }) }, 'Cotización gratuita'),
          React.createElement(Btn, { variant: 'on-dark', onClick: () => go('cobertura') }, 'Ver cobertura')))),

    /* Portafolio — filas alternadas */
    React.createElement('section', { style: SECTION },
      React.createElement('div', { style: { ...WRAP, display: 'flex', flexDirection: 'column', gap: 'clamp(3rem,7vw,6rem)' } },
        SERVICIOS_FULL.map((s, i) => React.createElement(Reveal, { key: s.id },
          React.createElement('div', { className: 'a1s-split', style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem,4vw,4rem)', alignItems: 'center', direction: i % 2 ? 'rtl' : 'ltr' } },
            React.createElement('div', { style: { direction: 'ltr' } }, React.createElement(MediaPanel, { scene: s.scene, photo: s.photo, ratio: '4 / 3', label: s.label })),
            React.createElement('div', { style: { direction: 'ltr' } },
              React.createElement('div', { style: { display: 'inline-flex', alignItems: 'center', gap: 10, color: RED, marginBottom: 8 } },
                React.createElement('span', { style: { width: 38, height: 38, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'color-mix(in srgb, var(--a1s-red) 12%, transparent)' } }, React.createElement(s.Icon, { size: 20 })),
                React.createElement(Eyebrow, null, s.eyebrow)),
              React.createElement('h3', { style: { margin: '6px 0 0', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.5rem,2.6vw,2rem)', letterSpacing: '-.02em' } }, s.label),
              React.createElement('p', { style: { marginTop: 14, color: 'var(--text-muted)', fontSize: '1.0625rem', lineHeight: 1.6, maxWidth: '46ch' } }, s.desc),
              React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 18px', marginTop: 22, maxWidth: 420 } },
                s.sub.map((x) => React.createElement('div', { key: x, style: { display: 'flex', alignItems: 'center', gap: 9, fontSize: '.9375rem', fontWeight: 500 } },
                  React.createElement('span', { style: { color: RED, flex: 'none' } }, React.createElement(Icons.check, { size: 17 })), x))),
              React.createElement('div', { style: { marginTop: 24 } }, React.createElement(Btn, { variant: 'ghost', onClick: () => go('contacto'), iconRight: React.createElement(Icons.arrow, { size: 16 }), style: { paddingLeft: 0, color: RED } }, 'Solicitar este servicio'))))))),
    ),

    /* Soluciones por sector */
    React.createElement('section', { style: { ...SECTION, background: 'var(--surface)' } },
      React.createElement('div', { style: WRAP },
        React.createElement(Reveal, null, React.createElement(SectionHead, { eyebrow: 'Soluciones por sector', title: 'Cada industria, su esquema.', lead: 'Adaptamos el portafolio a los riesgos y la normativa de tu sector.' })),
        React.createElement('div', { className: 'a1s-grid3', style: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, marginTop: 40, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' } },
          SECTORES.map((sec, i) => React.createElement(Reveal, { key: sec.name, delay: (i % 3) * 80,
            style: { background: 'var(--surface-card)', padding: 'clamp(1.5rem,2.5vw,2rem)' } },
            React.createElement('div', { className: 'a1s-int', style: { height: '100%', transition: 'background .2s' },
              onMouseEnter: (e) => e.currentTarget.parentElement.style.background = 'color-mix(in srgb, var(--a1s-red) 4%, var(--surface-card))',
              onMouseLeave: (e) => e.currentTarget.parentElement.style.background = 'var(--surface-card)' },
              React.createElement('span', { style: { color: RED } }, React.createElement(sec.Icon, { size: 30, sw: 1.6 })),
              React.createElement('h3', { style: { margin: '16px 0 8px', fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-.01em' } }, sec.name),
              React.createElement('p', { style: { margin: 0, color: 'var(--text-muted)', fontSize: '.9375rem', lineHeight: 1.55 } }, sec.desc)))))),
    ),

    /* Tecnología */
    React.createElement('section', { style: SECTION },
      React.createElement('div', { style: { ...WRAP, display: 'grid', gridTemplateColumns: '.85fr 1.15fr', gap: 'clamp(2rem,4vw,4rem)', alignItems: 'start' }, className: 'a1s-split' },
        React.createElement(Reveal, { style: { position: 'sticky', top: 100 } },
          React.createElement(SectionHead, { eyebrow: 'Tecnología', title: 'Tecnología que hace la seguridad medible.', lead: 'Plataformas digitales propias e integradas para gestionar, supervisar y reportar el servicio en tiempo real.' }),
          React.createElement('div', { style: { marginTop: 24 } }, React.createElement(Btn, { variant: 'outline', onClick: () => go('contacto'), iconRight: React.createElement(Icons.arrow, { size: 16 }) }, 'Hablemos de tecnología'))),
        React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 14 } },
          TECNOLOGIA.map(([t, d, Ic], i) => React.createElement(Reveal, { key: t, delay: i * 60 },
            React.createElement(SpotlightCard, { style: { display: 'flex', gap: 18, alignItems: 'flex-start', padding: '20px 22px', background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' } },
              React.createElement('span', { className: 'a1s-spot-ic', style: { flex: 'none', width: 48, height: 48, borderRadius: 'var(--radius-md)', display: 'grid', placeItems: 'center', background: 'var(--surface)', border: '1px solid var(--border)', color: RED } }, React.createElement(Ic, { size: 22 })),
              React.createElement('div', { className: 'a1s-spot-lift' },
                React.createElement('h3', { style: { margin: 0, fontSize: '1.0625rem', fontWeight: 700 } }, t),
                React.createElement('p', { style: { margin: '5px 0 0', color: 'var(--text-muted)', fontSize: '.9375rem', lineHeight: 1.5 } }, d))))))),
    ),

    /* Gestión del riesgo */
    React.createElement('section', { className: 'a1s-dark', style: { background: '#0A0A0C', ...SECTION, position: 'relative', overflow: 'hidden' } },
      React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'radial-gradient(70% 80% at 20% 10%, rgba(192,35,27,.14), transparent 60%)' } }),
      React.createElement('div', { style: { ...WRAP, position: 'relative' } },
        React.createElement(Reveal, null, React.createElement(SectionHead, { dark: true, center: true, eyebrow: 'Nuestra metodología', title: 'Un enfoque integral para tu seguridad.', lead: 'Identificamos, valoramos y tratamos los riesgos de cada cliente, con planes de acción concretos y medibles — en cinco pasos.' })),
        React.createElement('div', { className: 'a1s-method' },
          RIESGO.map(([t, d, Ic], i) => React.createElement(Reveal, { key: t, delay: i * 90, className: 'a1s-method-step' },
            React.createElement('span', { className: 'a1s-method-ic' }, React.createElement(Ic, { size: 30, sw: 1.7 })),
            React.createElement('span', { className: 'a1s-method-num' }, 'Paso ' + String(i + 1).padStart(2, '0')),
            React.createElement('h3', { className: 'a1s-method-t' }, t),
            React.createElement('p', { className: 'a1s-method-d' }, d)))))),
  );
}

Object.assign(window, { ServiciosView, SECTORES });
