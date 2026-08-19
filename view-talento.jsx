/* ============================================================================
   A1S — Vistas Talento (EVP + vacantes) y Contacto
   ========================================================================== */
const { Reveal, Eyebrow, Btn, Badge, Stat, SectionHead, MediaPanel, SpotlightCard, Icons, RED, WRAP, SECTION } = window;

const PILARES = [
  ['Estabilidad', 'Contratación formal y respaldo de una empresa con +55 años.', Icons.shield],
  ['Formación continua', 'Capacitación y certificación permanente para crecer profesionalmente.', Icons.cap],
  ['Crecimiento', 'Planes de carrera y promoción interna en 5 regionales.', Icons.growth],
  ['Bienestar', 'Programas de bienestar para ti y para tu familia.', Icons.heart],
  ['Respaldo y equipo', 'Supervisión cercana, herramientas y tecnología para hacer bien tu trabajo.', Icons.users],
  ['Propósito', 'Tu trabajo protege a personas, familias y empresas reales.', Icons.target],
];

const PROCESO = [
  ['Postulación', 'Aplica a una vacante o déjanos tu hoja de vida.', Icons.doc],
  ['Revisión de perfil', 'Validamos requisitos y experiencia.', Icons.search],
  ['Entrevista y pruebas', 'Competencias, seguridad y estudio de antecedentes.', Icons.users],
  ['Exámenes y documentación', 'Médicos y vinculación formal.', Icons.cert],
  ['Inducción y formación', 'Capacitación inicial antes de tu primer día.', Icons.cap],
];

const VACANTES = [
  { t: 'Guarda de seguridad', reg: 'Antioquia', city: 'Medellín', type: 'Tiempo completo', date: 'Publicada hoy', isNew: true },
  { t: 'Manejador canino (K9)', reg: 'Centro', city: 'Bogotá', type: 'Tiempo completo', date: 'Hace 3 días' },
  { t: 'Operador de monitoreo CCTV', reg: 'Caribe', city: 'Cartagena', type: 'Turnos rotativos', date: 'Hace 5 días', isNew: true },
  { t: 'Escolta de protección', reg: 'Centro', city: 'Bogotá', type: 'Tiempo completo', date: 'Hace 1 semana' },
  { t: 'Supervisor de operaciones', reg: 'Suroccidente', city: 'Cali', type: 'Tiempo completo', date: 'Hace 1 semana' },
  { t: 'Analista de ciberseguridad', reg: 'Santander', city: 'Bucaramanga', type: 'Híbrido', date: 'Hace 2 semanas' },
];

function TalentoView({ go }) {
  const [reg, setReg] = React.useState('Todas');
  const regs = ['Todas', 'Caribe', 'Santander', 'Antioquia', 'Centro', 'Suroccidente'];
  const filtered = reg === 'Todas' ? VACANTES : VACANTES.filter((v) => v.reg === reg);

  return React.createElement('div', null,
    /* Hero EVP */
    React.createElement('section', { className: 'a1s-dark', style: { background: '#0A0A0C', paddingTop: 'calc(78px + var(--section-y) * .5)', paddingBottom: 'calc(var(--section-y) * .7)', position: 'relative', overflow: 'hidden' } },
      React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'radial-gradient(70% 80% at 82% 12%, rgba(192,35,27,.20), transparent 60%)' } }),
      React.createElement('div', { style: { ...WRAP, position: 'relative', display: 'grid', gridTemplateColumns: '1.15fr .85fr', gap: 'clamp(2rem,4vw,4rem)', alignItems: 'center' }, className: 'a1s-split' },
        React.createElement(Reveal, null,
          React.createElement(SectionHead, { dark: true, eyebrow: 'Únete a A1S', title: 'Tu seguridad también importa. Construye tu carrera con nosotros.', lead: 'Somos +3.500 personas protegiendo a Colombia. Aquí encontrarás estabilidad, formación constante y un equipo que te respalda. Crecemos cuando crece nuestra gente.' }),
          React.createElement('div', { style: { display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' } },
            React.createElement(Btn, { variant: 'primary', size: 'lg', onClick: () => { document.getElementById('vacantes-sec') && window.scrollTo({ top: document.getElementById('vacantes-sec').offsetTop - 70, behavior: 'smooth' }); }, iconRight: React.createElement(Icons.arrow, { size: 18 }) }, 'Ver vacantes'),
            React.createElement(Btn, { variant: 'on-dark', size: 'lg', onClick: () => go('postulacion') }, 'Postulación espontánea')),
          React.createElement('div', { style: { display: 'flex', gap: 32, marginTop: 36 } },
            React.createElement(Stat, { value: 3500, label: 'Colaboradores', dark: true }),
            React.createElement(Stat, { value: 5, prefix: '', label: 'Regionales', dark: true }))),
        React.createElement(Reveal, { delay: 120 }, React.createElement(MediaPanel, { scene: 'talento', ratio: '4 / 5', label: 'El equipo A1S', status: 'EQUIPO', photo: 'assets/CAMBIO PERSONA A1S 1.jpeg', fit: 'cover' })))), 

    /* Pilares EVP */
    React.createElement('section', { style: SECTION },
      React.createElement('div', { style: WRAP },
        React.createElement(Reveal, null, React.createElement(SectionHead, { eyebrow: 'Por qué A1S', title: 'Lo que hacemos por nuestra gente.' })),
        React.createElement('div', { className: 'a1s-grid3', style: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22, marginTop: 40 } },
          PILARES.map(([t, d, Ic], i) => React.createElement(Reveal, { key: t, delay: (i % 3) * 80 },
            React.createElement(SpotlightCard, { style: { display: 'flex', gap: 16, padding: '24px 26px', background: 'var(--surface-card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', height: '100%' } },
              React.createElement('span', { className: 'a1s-spot-ic', style: { flex: 'none', width: 46, height: 46, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'color-mix(in srgb, var(--a1s-red) 12%, transparent)', color: RED } }, React.createElement(Ic, { size: 22 })),
              React.createElement('div', { className: 'a1s-spot-lift' },
                React.createElement('h3', { style: { margin: 0, fontSize: '1.125rem', fontWeight: 700 } }, t),
                React.createElement('p', { style: { margin: '6px 0 0', color: 'var(--text-muted)', fontSize: '.9375rem', lineHeight: 1.55 } }, d)))))))),

    /* Proceso */
    React.createElement('section', { style: { ...SECTION, background: 'var(--surface)' } },
      React.createElement('div', { style: WRAP },
        React.createElement(Reveal, null, React.createElement(SectionHead, { eyebrow: 'Proceso de selección', title: 'Así es unirte a A1S.', lead: 'Un proceso claro y transparente, paso a paso.' })),
        React.createElement('div', { className: 'a1s-tl' },
          React.createElement('div', { 'aria-hidden': true, className: 'a1s-tl-rail' }),
          PROCESO.map(([t, d, Ic], i) => React.createElement(Reveal, { key: t, delay: i * 90, className: 'a1s-tl-step' },
            React.createElement('div', { className: 'a1s-tl-node' },
              React.createElement('span', { className: 'a1s-tl-num' }, String(i + 1).padStart(2, '0')),
              React.createElement('span', { className: 'a1s-tl-ic' }, React.createElement(Ic, { size: 26 }))),
            React.createElement('span', { className: 'a1s-tl-badge' }, 'Paso ' + String(i + 1).padStart(2, '0')),
            React.createElement('h3', { className: 'a1s-tl-t' }, t),
            React.createElement('p', { className: 'a1s-tl-d' }, d)))))),

    /* Vacantes */
    React.createElement('section', { id: 'vacantes-sec', style: SECTION },
      React.createElement('div', { style: WRAP },
        React.createElement(Reveal, { style: { display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap', marginBottom: 30 } },
          React.createElement('div', null,
            React.createElement(Eyebrow, null, 'Vacantes disponibles'),
            React.createElement('h2', { style: { margin: '12px 0 0', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.7rem,3vw,2.4rem)', letterSpacing: '-.02em' } }, 'Encuentra tu oportunidad.')),
          React.createElement('div', { style: { marginLeft: 'auto', display: 'flex', gap: 7, flexWrap: 'wrap' } },
            regs.map((r) => React.createElement('button', { key: r, className: 'a1s-int', onClick: () => setReg(r),
              style: { padding: '8px 15px', border: '1px solid ' + (reg === r ? RED : 'var(--border)'), cursor: 'pointer', borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '.8125rem', background: reg === r ? RED : 'transparent', color: reg === r ? '#fff' : 'var(--text-muted)', transition: 'all .2s' } }, r)))),
        React.createElement('div', { className: 'a1s-vac-grid', style: { display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 } },
          filtered.map((v, i) => React.createElement(Reveal, { key: v.t, delay: (i % 2) * 70 },
            React.createElement('a', { className: 'a1s-int', onClick: () => go('postulacion', v),
              style: { display: 'flex', flexDirection: 'column', gap: 14, cursor: 'pointer', height: '100%', background: 'var(--surface-card)', border: '1px solid var(--border)', borderLeft: '3px solid var(--a1s-red)', borderRadius: 'var(--radius-md)', padding: '24px 26px', boxShadow: 'var(--shadow-sm)', transition: 'transform .22s, box-shadow .22s' },
              onMouseEnter: (e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; },
              onMouseLeave: (e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; } },
              React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' } },
                React.createElement('h3', { style: { margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1875rem', lineHeight: 1.2 } }, v.t),
                v.isNew && React.createElement(Badge, { variant: 'solid' }, 'Nueva')),
              React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '8px 18px', color: 'var(--text-muted)', fontSize: '.8125rem' } },
                React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 6 } }, React.createElement(Icons.pin, { size: 15 }), v.reg + ' · ' + v.city),
                React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 6 } }, React.createElement(Icons.clock, { size: 15 }), v.type),
                React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 6 } }, React.createElement(Icons.cal, { size: 15 }), v.date)),
              React.createElement('span', { style: { marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, color: RED, fontWeight: 600, fontSize: '.9375rem' } }, 'Ver y postularme', React.createElement(Icons.arrow, { size: 16 }))))),
        filtered.length === 0 && React.createElement('div', { style: { gridColumn: '1/-1', textAlign: 'center', padding: '48px', color: 'var(--text-muted)' } }, 'Por ahora no hay vacantes en esa regional.')),
        React.createElement(Reveal, { style: { marginTop: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', background: 'var(--surface)', border: '1px dashed var(--border-strong)', borderRadius: 'var(--radius-lg)', padding: '24px 28px' } },
          React.createElement('div', null,
            React.createElement('h3', { style: { margin: 0, fontSize: '1.125rem', fontWeight: 700 } }, '¿No encuentras tu vacante ideal?'),
            React.createElement('p', { style: { margin: '4px 0 0', color: 'var(--text-muted)', fontSize: '.9375rem' } }, 'Déjanos tu hoja de vida y te contactamos cuando abra una oportunidad acorde.')),
          React.createElement('div', { style: { marginLeft: 'auto' } }, React.createElement(Btn, { variant: 'outline', onClick: () => go('postulacion'), iconRight: React.createElement(Icons.arrow, { size: 16 }) }, 'Postulación espontánea')))))
  );
}

/* ════════════════ CONTACTO ════════════════ */
function ContactoView() {
  const [sent, setSent] = React.useState(false);
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const field = (label, props = {}) => React.createElement('label', { style: { display: 'flex', flexDirection: 'column', gap: 8, gridColumn: props.full ? '1 / -1' : undefined } },
    React.createElement('span', { style: { fontSize: '.875rem', fontWeight: 600 } }, label),
    React.createElement(props.multiline ? 'textarea' : 'input', { rows: props.multiline ? 4 : undefined, placeholder: props.ph || '', className: 'a1s-int a1s-input',
      style: { width: '100%', boxSizing: 'border-box', padding: '14px 16px', minHeight: props.multiline ? undefined : 50, fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--text)', background: 'var(--surface-card)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', outline: 'none', resize: props.multiline ? 'vertical' : undefined, transition: 'border-color .2s, box-shadow .2s' },
      onFocus: (e) => { e.target.style.borderColor = RED; e.target.style.boxShadow = 'var(--ring)'; },
      onBlur: (e) => { e.target.style.borderColor = 'var(--border-strong)'; e.target.style.boxShadow = 'none'; } }));

  return React.createElement('section', { style: { paddingTop: 'calc(78px + var(--section-y) * .5)', paddingBottom: 'var(--section-y)' } },
    React.createElement('div', { style: { ...WRAP, display: 'grid', gridTemplateColumns: '.9fr 1.1fr', gap: 'clamp(2rem,5vw,5rem)', alignItems: 'start' }, className: 'a1s-split' },
      React.createElement(Reveal, null,
        React.createElement(SectionHead, { eyebrow: 'Avancemos juntos', title: 'Cuéntanos qué necesitas proteger.', lead: 'Diseñamos un esquema a tu medida. Nuestros expertos te asesoran sin costo.' }),
        React.createElement('div', { style: { marginTop: 32, display: 'flex', flexDirection: 'column', gap: 18 } },
          [[Icons.phone, 'Teléfono / WhatsApp', '+57 305 771 0909'], [Icons.clock, 'Operación', '24 / 7 · Centro de Control nacional'], [Icons.pin, 'Regionales', 'Cartagena · Bucaramanga · Medellín · Bogotá · Cali']].map(([Ic, t, d], i) =>
            React.createElement('div', { key: i, style: { display: 'flex', gap: 14, alignItems: 'flex-start' } },
              React.createElement('span', { style: { flex: 'none', width: 44, height: 44, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'var(--surface)', border: '1px solid var(--border)', color: RED } }, React.createElement(Ic, { size: 20 })),
              React.createElement('div', null,
                React.createElement('div', { style: { fontSize: '.8125rem', color: 'var(--text-muted)', fontWeight: 600 } }, t),
                React.createElement('div', { style: { fontSize: '1.0625rem', fontWeight: 600, marginTop: 2 } }, d))))),
        React.createElement('div', { style: { marginTop: 28, display: 'flex', gap: 10 } },
          React.createElement(Badge, { variant: 'red', icon: React.createElement(Icons.cert, { size: 14 }) }, 'OEA'),
          React.createElement(Badge, { variant: 'red', icon: React.createElement(Icons.cert, { size: 14 }) }, 'BASC'),
          React.createElement(Badge, { variant: 'neutral' }, '+55 años'))),
      React.createElement(Reveal, { delay: 120 },
        React.createElement('div', { style: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'clamp(1.6rem,3vw,2.4rem)' } },
          sent
            ? React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16, padding: '40px 0' } },
                React.createElement('span', { style: { width: 64, height: 64, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'color-mix(in srgb, var(--success) 14%, transparent)', color: 'var(--success)' } }, React.createElement(Icons.check, { size: 34 })),
                React.createElement('h3', { style: { margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem' } }, 'Solicitud enviada.'),
                React.createElement('p', { style: { margin: 0, color: 'var(--text-muted)', maxWidth: '34ch' } }, 'Gracias. Te contactaremos muy pronto por WhatsApp o correo para diseñar tu esquema de seguridad.'),
                React.createElement(Btn, { variant: 'outline', onClick: () => setSent(false) }, 'Enviar otra solicitud'))
            : React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }, className: 'a1s-form' },
                field('Nombre completo', { ph: 'Tu nombre' }), field('Empresa', { ph: 'Razón social' }),
                field('Correo', { ph: 'correo@empresa.com' }), field('Teléfono', { ph: '+57 ___ ___ ____' }),
                field('Ciudad / Regional', { ph: 'Ej. Bogotá' }), field('Tipo de servicio', { ph: 'Ej. Vigilancia, CCTV…' }),
                field('¿Qué necesitas proteger?', { multiline: true, full: true, ph: 'Cuéntanos sobre tu operación…' }),
                React.createElement('label', { style: { gridColumn: '1 / -1', display: 'flex', gap: 11, alignItems: 'flex-start', fontSize: '.875rem', color: 'var(--text-muted)' } },
                  React.createElement('input', { type: 'checkbox', className: 'a1s-int', style: { marginTop: 3, accentColor: 'var(--a1s-red)', width: 18, height: 18 } }),
                  React.createElement('span', null, 'Autorizo el tratamiento de mis datos personales conforme a la ', React.createElement('a', { className: 'a1s-int', style: { color: RED, textDecoration: 'underline', cursor: 'pointer' } }, 'Política de Tratamiento de Datos'), ' (Habeas Data).')),
                React.createElement('div', { style: { gridColumn: '1 / -1', display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 } },
                  React.createElement(Btn, { variant: 'primary', size: 'lg', onClick: () => setSent(true) }, '¡Cotización gratuita!'),
                  React.createElement(Btn, { variant: 'outline', size: 'lg', icon: React.createElement(Icons.wa, { size: 18 }) }, 'Escríbenos por WhatsApp')))))));
}

/* ════════════════ POSTULACIÓN A VACANTE ════════════════ */
function PostulacionView({ go, payload }) {
  const [sent, setSent] = React.useState(false);
  const [cv, setCv] = React.useState('');
  const general = !payload;
  const cargo = payload || { t: 'Postulación espontánea', reg: 'Cualquiera', city: '—', type: 'Cualquier modalidad' };

  const fieldStyle = { width: '100%', boxSizing: 'border-box', padding: '14px 16px', minHeight: 50, fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'var(--text)', background: 'var(--surface-card)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', outline: 'none', transition: 'border-color .2s, box-shadow .2s' };
  const onFocus = (e) => { e.target.style.borderColor = RED; e.target.style.boxShadow = 'var(--ring)'; };
  const onBlur = (e) => { e.target.style.borderColor = 'var(--border-strong)'; e.target.style.boxShadow = 'none'; };
  const field = (label, props = {}) => React.createElement('label', { style: { display: 'flex', flexDirection: 'column', gap: 8, gridColumn: props.full ? '1 / -1' : undefined } },
    React.createElement('span', { style: { fontSize: '.875rem', fontWeight: 600 } }, label),
    props.options
      ? React.createElement('select', { className: 'a1s-int', style: fieldStyle, onFocus, onBlur, defaultValue: '' },
          React.createElement('option', { value: '', disabled: true }, props.ph || 'Selecciona…'),
          props.options.map((o) => React.createElement('option', { key: o, value: o }, o)))
      : React.createElement(props.multiline ? 'textarea' : 'input', { rows: props.multiline ? 4 : undefined, type: props.type, placeholder: props.ph || '', className: 'a1s-int',
          style: { ...fieldStyle, minHeight: props.multiline ? undefined : 50, resize: props.multiline ? 'vertical' : undefined }, onFocus, onBlur }));

  return React.createElement('section', { 'data-screen-label': 'Postulación', style: { paddingTop: 'calc(78px + var(--section-y) * .5)', paddingBottom: 'var(--section-y)' } },
    React.createElement('div', { style: WRAP },
      React.createElement('button', { className: 'a1s-int', onClick: () => go('talento'), style: { display: 'inline-flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '.9rem', color: 'var(--text-muted)', padding: 0, marginBottom: 24 } },
        React.createElement('span', { style: { transform: 'rotate(180deg)', display: 'inline-flex' } }, React.createElement(Icons.arrow, { size: 16 })), 'Volver a vacantes'),
      React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '.85fr 1.15fr', gap: 'clamp(2rem,4vw,3.5rem)', alignItems: 'start' }, className: 'a1s-split' },
        /* Resumen del cargo */
        React.createElement(Reveal, { style: { position: 'sticky', top: 100 } },
          React.createElement(Eyebrow, null, general ? 'Postulación espontánea' : 'Te postulas a'),
          React.createElement('h1', { style: { margin: '12px 0 0', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.7rem,3.2vw,2.5rem)', letterSpacing: '-.02em', lineHeight: 1.08 } }, cargo.t),
          !general && React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '10px 18px', marginTop: 18, color: 'var(--text-muted)', fontSize: '.9375rem' } },
            React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 7 } }, React.createElement(Icons.pin, { size: 16 }), cargo.reg + ' · ' + cargo.city),
            React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 7 } }, React.createElement(Icons.clock, { size: 16 }), cargo.type)),
          React.createElement('p', { style: { margin: '18px 0 0', color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '40ch' } }, general
            ? 'Déjanos tus datos y tu hoja de vida. Te contactaremos cuando se abra una vacante acorde a tu perfil.'
            : 'Completa tus datos para esta vacante. El equipo de selección revisará tu perfil y te contactará si avanzas en el proceso.'),
          React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 22 } },
            React.createElement(Badge, { variant: 'red', icon: React.createElement(Icons.shield, { size: 14 }) }, 'Empresa vigilada'),
            React.createElement(Badge, { variant: 'neutral' }, '+55 años'),
            React.createElement(Badge, { variant: 'neutral' }, '+3.500 colaboradores')),
          React.createElement('div', { style: { marginTop: 26, padding: '18px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' } },
            React.createElement('div', { style: { fontSize: '.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-muted)', marginBottom: 12 } }, 'Qué sigue'),
            ['Revisión de perfil', 'Entrevista y pruebas', 'Exámenes y vinculación'].map((s, i) => React.createElement('div', { key: s, style: { display: 'flex', gap: 11, alignItems: 'center', padding: '6px 0', fontSize: '.9rem' } },
              React.createElement('span', { style: { flex: 'none', width: 24, height: 24, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'color-mix(in srgb, var(--a1s-red) 12%, transparent)', color: RED, fontWeight: 700, fontSize: '.75rem' } }, i + 1), s)))),
        /* Formulario */
        React.createElement(Reveal, { delay: 120 },
          React.createElement('div', { style: { background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'clamp(1.6rem,3vw,2.4rem)' } },
            sent
              ? React.createElement('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16, padding: '40px 0' } },
                  React.createElement('span', { style: { width: 64, height: 64, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'color-mix(in srgb, var(--success) 14%, transparent)', color: 'var(--success)' } }, React.createElement(Icons.check, { size: 34 })),
                  React.createElement('h3', { style: { margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem' } }, '¡Postulación enviada!'),
                  React.createElement('p', { style: { margin: 0, color: 'var(--text-muted)', maxWidth: '40ch' } }, general ? 'Gracias por tu interés en A1S. Guardamos tu hoja de vida y te contactaremos cuando abra una vacante acorde.' : 'Gracias por postularte a ' + cargo.t + '. El equipo de selección revisará tu perfil y te contactará si avanzas en el proceso.'),
                  React.createElement(Btn, { variant: 'outline', onClick: () => go('talento') }, 'Ver otras vacantes'))
              : React.createElement('div', null,
                  React.createElement('h2', { style: { margin: '0 0 6px', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.3rem,2.4vw,1.7rem)', letterSpacing: '-.02em' } }, 'Tus datos'),
                  React.createElement('p', { style: { margin: '0 0 24px', color: 'var(--text-muted)', fontSize: '.95rem' } }, 'Los campos con * son obligatorios.'),
                  React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }, className: 'a1s-form' },
                    /* Cargo precargado, bloqueado */
                    React.createElement('label', { style: { display: 'flex', flexDirection: 'column', gap: 8, gridColumn: '1 / -1' } },
                      React.createElement('span', { style: { fontSize: '.875rem', fontWeight: 600 } }, 'Cargo al que te postulas'),
                      React.createElement('div', { style: { ...fieldStyle, display: 'flex', alignItems: 'center', gap: 10, background: 'var(--surface)', color: 'var(--text)', fontWeight: 600 } },
                        React.createElement('span', { style: { color: RED, flex: 'none' } }, React.createElement(Icons.shield, { size: 18 })), cargo.t,
                        !general && React.createElement('span', { style: { marginLeft: 'auto', fontSize: '.8rem', color: 'var(--text-muted)', fontWeight: 500 } }, cargo.city))),
                    field('Nombre completo *', { ph: 'Tu nombre' }),
                    field('Documento de identidad *', { ph: 'C.C. / C.E.' }),
                    field('Teléfono / WhatsApp *', { ph: '+57 ___ ___ ____' }),
                    field('Correo *', { type: 'email', ph: 'correo@ejemplo.com' }),
                    field('Ciudad de residencia *', { ph: 'Ej. Bogotá' }),
                    field('Años de experiencia', { options: ['Sin experiencia', 'Menos de 1 año', '1 a 3 años', '3 a 5 años', 'Más de 5 años'], ph: 'Selecciona…' }),
                    field('¿Cuentas con curso de vigilancia vigente?', { options: ['Sí, vigente', 'En trámite', 'No', 'No aplica al cargo'], ph: 'Selecciona…', full: true }),
                    /* Hoja de vida */
                    React.createElement('label', { style: { display: 'flex', flexDirection: 'column', gap: 8, gridColumn: '1 / -1' } },
                      React.createElement('span', { style: { fontSize: '.875rem', fontWeight: 600 } }, 'Adjunta tu hoja de vida *'),
                      React.createElement('label', { className: 'a1s-int', style: { display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px', border: '1px dashed var(--border-strong)', borderRadius: 'var(--radius-md)', cursor: 'pointer', background: 'var(--surface-card)' } },
                        React.createElement('span', { style: { flex: 'none', width: 40, height: 40, borderRadius: 'var(--radius-md)', display: 'grid', placeItems: 'center', background: 'color-mix(in srgb, var(--a1s-red) 12%, transparent)', color: RED } }, React.createElement(Icons.doc, { size: 20 })),
                        React.createElement('span', { style: { flex: 1, minWidth: 0, fontSize: '.9rem', color: cv ? 'var(--text)' : 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, cv || 'Subir archivo PDF, DOC o DOCX (máx. 5 MB)'),
                        React.createElement('span', { style: { flex: 'none', fontSize: '.82rem', fontWeight: 700, color: RED } }, 'Examinar'),
                        React.createElement('input', { type: 'file', accept: '.pdf,.doc,.docx', className: 'a1s-int', style: { display: 'none' }, onChange: (e) => setCv(e.target.files && e.target.files[0] ? e.target.files[0].name : '') }))),
                    field('Cuéntanos por qué quieres unirte a A1S', { multiline: true, full: true, ph: 'Opcional — un par de líneas sobre ti.' }),
                    React.createElement('label', { style: { gridColumn: '1 / -1', display: 'flex', gap: 11, alignItems: 'flex-start', fontSize: '.875rem', color: 'var(--text-muted)' } },
                      React.createElement('input', { type: 'checkbox', className: 'a1s-int', style: { marginTop: 3, accentColor: 'var(--a1s-red)', width: 18, height: 18 } }),
                      React.createElement('span', null, 'Autorizo el tratamiento de mis datos personales y de mi hoja de vida con fines de selección, conforme a la ', React.createElement('a', { className: 'a1s-int', style: { color: RED, textDecoration: 'underline', cursor: 'pointer' } }, 'Política de Tratamiento de Datos'), ' (Habeas Data).')),
                    React.createElement('div', { style: { gridColumn: '1 / -1', display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 } },
                      React.createElement(Btn, { variant: 'primary', size: 'lg', onClick: () => { setSent(true); window.scrollTo({ top: 0, behavior: 'smooth' }); } }, '¡Postúlate!'),
                      React.createElement(Btn, { variant: 'outline', size: 'lg', onClick: () => go('talento') }, 'Cancelar')))))))));
}

Object.assign(window, { TalentoView, ContactoView, PostulacionView });
