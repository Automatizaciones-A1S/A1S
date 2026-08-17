/* ============================================================================
   A1S — Vista "Certificado laboral y nómina"
   Ahora incluye un selector de software de nómina (Pronos / Semántica),
   con guías paso a paso para descargar el certificado y los desprendibles.
   ========================================================================== */
const { Reveal, Btn, Badge, SectionHead, Icons, RED, WRAP, SECTION } = window;

const SOFTWARES = [
  { id: 'semantica', name: 'Semántica Digital', logo: 'assets/nomina/logo-semantica.png',
    desc: 'Portal único, ahora en empleado.co. El enlace cambió: debes registrarte de nuevo para descargar tus desprendibles y tu certificado laboral.',
    chips: ['Desprendibles', 'Certificado laboral'] },
  { id: 'pronos', name: 'Pronos', logo: 'assets/nomina/logo-pronos.png',
    desc: 'Dos accesos independientes: uno para los desprendibles de nómina y otro para el certificado laboral.',
    chips: ['Desprendibles', 'Certificado laboral'] },
];

function CertificadoView({ go }) {
  const [sw, setSw] = React.useState(null);
  const back = () => { setSw(null); window.scrollTo({ top: 0, behavior: 'auto' }); };
  const open = (id) => { setSw(id); window.scrollTo({ top: 0, behavior: 'auto' }); };

  if (sw === 'pronos' && window.PronosGuide) return React.createElement(window.PronosGuide, { go, back });
  if (sw === 'semantica' && window.SemanticaGuide) return React.createElement(window.SemanticaGuide, { go, back });

  return React.createElement('div', { 'data-screen-label': 'Certificado laboral' },
    React.createElement('section', { className: 'a1s-dark', style: { background: '#0A0A0C', paddingTop: 'calc(78px + var(--section-y) * .5)', paddingBottom: 'calc(var(--section-y) * .7)', position: 'relative', overflow: 'hidden' } },
      React.createElement('div', { 'aria-hidden': true, style: { position: 'absolute', inset: 0, background: 'radial-gradient(62% 75% at 80% 12%, rgba(192,35,27,.20), transparent 60%)' } }),
      React.createElement('div', { 'aria-hidden': true, className: 'a1s-gridtex', style: { opacity: .4 } }),
      React.createElement('div', { style: { ...WRAP, position: 'relative', maxWidth: 940 } },
        React.createElement(Reveal, null,
          React.createElement(SectionHead, { dark: true, eyebrow: 'Certificado laboral y nómina', title: 'Descarga tu certificado laboral y tus desprendibles de nómina.', lead: 'Si eres o fuiste colaborador de A1S, puedes generar tus documentos en línea, disponibles 24/7 y sin trámites presenciales.' })),
        React.createElement(Reveal, { delay: 90, style: { display: 'flex', gap: 9, marginTop: 26, flexWrap: 'wrap' } },
          React.createElement(Badge, { variant: 'on-dark' }, 'Con salario'), React.createElement(Badge, { variant: 'on-dark' }, 'Sin salario'), React.createElement(Badge, { variant: 'on-dark' }, 'Formato PDF'),
          React.createElement(Badge, { variant: 'on-dark' }, 'Disponible 24/7')))),

    React.createElement('section', { style: SECTION },
      React.createElement('div', { style: { ...WRAP, maxWidth: 1020 } },
        React.createElement(Reveal, null,
          React.createElement('div', { className: 'a1s-swnotice' },
            React.createElement('span', { className: 'a1s-swnotice-ic', 'aria-hidden': true }, React.createElement(Icons.shield, { size: 22 })),
            React.createElement('div', null,
              React.createElement('h2', null, 'Antes de continuar, selecciona tu software de nómina'),
              React.createElement('p', null, 'A1S trabaja con dos plataformas de nómina distintas. Debes ingresar por el software al que te inscribiste en tu proceso de contratación; si eliges el otro, el sistema no encontrará tus datos. Si no lo recuerdas, radica una PQRS y te confirmamos cuál te corresponde.')))),
        React.createElement('div', { className: 'a1s-swgrid' },
          SOFTWARES.map((s, i) => React.createElement(Reveal, { key: s.id, delay: i * 110 },
            React.createElement('button', { type: 'button', className: 'a1s-int a1s-swcard', onClick: () => open(s.id) },
              React.createElement('span', { className: 'a1s-swplate' }, React.createElement('img', { src: s.logo, alt: s.name })),
              React.createElement('h3', null, s.name),
              React.createElement('p', null, s.desc),
              React.createElement('span', { className: 'a1s-swchips' }, s.chips.map((c) => React.createElement('span', { key: c }, c))),
              React.createElement('span', { className: 'a1s-swcta' }, 'Entrar', React.createElement(Icons.arrow, { size: 16 })))))),
        React.createElement(Reveal, { delay: 220, style: { marginTop: 30, display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', background: 'var(--surface)', border: '1px dashed var(--border-strong)', borderRadius: 'var(--radius-lg)', padding: '22px 28px' } },
          React.createElement('span', { style: { flex: 'none', color: RED }, 'aria-hidden': true }, React.createElement(Icons.phone, { size: 22 })),
          React.createElement('div', null,
            React.createElement('h3', { style: { margin: 0, fontSize: '1.05rem', fontWeight: 700 } }, '¿No sabes cuál es tu software o no puedes descargar tus documentos?'),
            React.createElement('p', { style: { margin: '3px 0 0', color: 'var(--text-muted)', fontSize: '.9375rem' } }, 'Escríbenos al +57 305 771 0909 por WhatsApp o radica tu caso por PQRS y te ayudamos.')),
          React.createElement('div', { style: { marginLeft: 'auto', display: 'flex', gap: 10, flexWrap: 'wrap' } },
            React.createElement(Btn, { variant: 'outline', href: 'PQRS.html', iconRight: React.createElement(Icons.arrow, { size: 16 }) }, 'Radicar PQRS')))))
  );
}

Object.assign(window, { CertificadoView });
