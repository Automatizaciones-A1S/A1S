/* ============================================================================
   A1S — Guías por software de nómina (Pronos / Semántica)
   Cada guía: enlaces reales + paso a paso con capturas enmarcadas.
   ========================================================================== */
const { Reveal: NgReveal, Btn: NgBtn, Badge: NgBadge, SectionHead: NgHead, Icons: NgIcons, RED: NG_RED, WRAP: NG_WRAP, SECTION: NG_SECTION } = window;

const PRONOS_URL_NOMINA = 'http://atalaya.pronos.at/';
const PRONOS_URL_CERT = 'https://a1s.nexoapp.co/empleado_certificado_laboral_1.php';
const SEMANTICA_URL = 'https://empleado.co/';

/* ── Captura enmarcada: ventana de navegador, teléfono o lámina completa ── */
function Shot({ src, alt, url, caption, phone, flat }) {
  return React.createElement('figure', { style: { margin: 0 } },
    flat
      ? React.createElement('a', { className: 'a1s-int a1s-shot a1s-shot--flat', href: src, target: '_blank', rel: 'noopener' },
          React.createElement('img', { src, alt, loading: 'lazy' }),
          React.createElement('span', { className: 'a1s-shot-zoom' }, 'Ampliar', React.createElement(NgIcons.arrowUR, { size: 14 })))
      : phone
      ? React.createElement('div', { className: 'a1s-shot a1s-shot--phone' },
          React.createElement('div', { className: 'a1s-shot-notch', 'aria-hidden': true }, React.createElement('i', null)),
          React.createElement('img', { src, alt, loading: 'lazy' }))
      : React.createElement('div', { className: 'a1s-shot' },
          React.createElement('div', { className: 'a1s-shot-bar' },
            React.createElement('span', { className: 'a1s-shot-dots', 'aria-hidden': true }, React.createElement('i', null), React.createElement('i', null), React.createElement('i', null)),
            React.createElement('span', { className: 'a1s-shot-url' }, url)),
          React.createElement('img', { src, alt, loading: 'lazy' })),
    (caption || flat) && React.createElement('figcaption', { className: 'a1s-gcap' },
      caption,
      flat && React.createElement('a', { className: 'a1s-gcap-link', href: src, target: '_blank', rel: 'noopener' }, 'Ver imagen completa', React.createElement(NgIcons.arrowUR, { size: 13 }))))
}

/* ── Paso del paso a paso ── */
function GStep({ n, title, children, shots, note }) {
  return React.createElement(NgReveal, { delay: (n - 1) * 80, className: 'a1s-gstep' },
    React.createElement('span', { className: 'a1s-gnum', 'aria-hidden': true }, String(n).padStart(2, '0')),
    React.createElement('div', null,
      React.createElement('h3', null, title),
      children,
      note && React.createElement('p', { className: 'a1s-gnote' },
        React.createElement('span', { 'aria-hidden': true, style: { flex: 'none', color: NG_RED } }, React.createElement(NgIcons.target, { size: 18 })),
        React.createElement('span', null, note))),
    shots && React.createElement('div', { className: 'a1s-gshots' }, shots));
}

/* ── Encabezado común de cada guía ── */
function GuideHero({ logo, name, lead, chips, back, actions }) {
  return React.createElement('section', { className: 'a1s-dark', style: { background: '#0A0A0C', paddingTop: 'calc(78px + var(--section-y) * .4)', paddingBottom: 'calc(var(--section-y) * .6)', position: 'relative', overflow: 'hidden' } },
    React.createElement('div', { 'aria-hidden': true, style: { position: 'absolute', inset: 0, background: 'radial-gradient(62% 75% at 80% 12%, rgba(192,35,27,.20), transparent 60%)' } }),
    React.createElement('div', { 'aria-hidden': true, className: 'a1s-gridtex', style: { opacity: .4 } }),
    React.createElement('div', { style: { ...NG_WRAP, position: 'relative', maxWidth: 940 } },
      React.createElement('button', { type: 'button', className: 'a1s-int a1s-swback', onClick: back },
        React.createElement(NgIcons.arrow, { size: 15 }), React.createElement('span', null, 'Cambiar de software')),
      React.createElement(NgReveal, { style: { display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap', marginBottom: 22 } },
        React.createElement('span', { className: 'a1s-swplate a1s-swplate--sm' }, React.createElement('img', { src: logo, alt: name })),
        React.createElement(NgBadge, { variant: 'on-dark' }, 'Software de nómina')),
      React.createElement(NgReveal, { delay: 80 }, React.createElement(NgHead, { dark: true, eyebrow: name, title: 'Tus documentos laborales en ' + name + '.', lead })),
      React.createElement(NgReveal, { delay: 150, style: { display: 'flex', gap: 12, marginTop: 30, flexWrap: 'wrap' } }, actions),
      chips && React.createElement(NgReveal, { delay: 200, style: { display: 'flex', gap: 9, marginTop: 24, flexWrap: 'wrap' } }, chips)));
}

/* ── Nota de contraseña olvidada ── */
function PwdNote({ go }) {
  return React.createElement(
    NgReveal,
    {
      delay: 160,
      style: {
        marginTop: 26,
        display: 'flex',
        gap: 16,
        alignItems: 'center',
        flexWrap: 'wrap',
        background: 'var(--surface)',
        border: '1px dashed var(--border-strong)',
        borderRadius: 'var(--radius-lg)',
        padding: '22px 28px'
      }
    },
    React.createElement('span', { style: { flex: 'none', color: NG_RED }, 'aria-hidden': true }, React.createElement(NgIcons.lock, { size: 22 })),
    React.createElement('div', null,
      React.createElement('h3', { style: { margin: 0, fontSize: '1.05rem', fontWeight: 700 } }, '¿Olvidaste tu contraseña?'),
      React.createElement('p', { style: { margin: '3px 0 0', color: 'var(--text-muted)', fontSize: '.9375rem', maxWidth: '62ch' } }, 'Radica una PQRS solicitando el reinicio de tu contraseña. El área encargada la restablece y te confirma para que puedas volver a ingresar.')),
    React.createElement('div', { style: { marginLeft: 'auto', display: 'flex', gap: 10, flexWrap: 'wrap' } },
      React.createElement(
        NgBtn,
        { variant: 'primary', href: 'PQRS.html', iconRight: React.createElement(NgIcons.arrow, { size: 16 }) },
        'Radicar PQRS'
      )
    )
  );
}

/* ══ PRONOS ══════════════════════════════════════════════════════════════ */
function PronosGuide({ go, back }) {
  return React.createElement('div', { 'data-screen-label': 'Certificado laboral · Pronos' },
    React.createElement(GuideHero, {
      logo: 'assets/nomina/logo-pronos.png', name: 'Pronos', back,
      lead: 'En Pronos los desprendibles de nómina y el certificado laboral se descargan en dos portales distintos. Elige el documento que necesitas y sigue el paso a paso.',
      chips: [React.createElement(NgBadge, { key: 'a', variant: 'on-dark' }, 'Dos portales'), React.createElement(NgBadge, { key: 'b', variant: 'on-dark' }, 'Formato PDF'), React.createElement(NgBadge, { key: 'c', variant: 'on-dark' }, 'Disponible 24/7')],
      actions: [
        React.createElement(NgBtn, { key: 'n', variant: 'primary', size: 'lg', href: PRONOS_URL_NOMINA, target: '_blank', rel: 'noopener', iconRight: React.createElement(NgIcons.arrowUR, { size: 18 }) }, 'Descargar desprendibles de nómina'),
        React.createElement(NgBtn, { key: 'c', variant: 'on-dark', size: 'lg', href: PRONOS_URL_CERT, target: '_blank', rel: 'noopener', iconRight: React.createElement(NgIcons.arrowUR, { size: 18 }) }, 'Descargar certificado laboral'),
      ],
    }),

    /* Paso a paso · certificado laboral */
    React.createElement('section', { style: NG_SECTION },
      React.createElement('div', { style: { ...NG_WRAP, maxWidth: 1020 } },
        React.createElement(NgReveal, null, React.createElement(NgHead, { eyebrow: 'Paso a paso', title: 'Cómo descargar tu certificado laboral.', lead: 'Cuatro pasos desde el computador o el celular. Ten a mano tu documento y su fecha de expedición.' })),
        React.createElement('div', { className: 'a1s-guide-steps' },
          React.createElement(GStep, { n: 1, title: 'Entra al portal de certificados' },
            React.createElement('p', null, 'Abre el botón “Descargar certificado laboral” de esta página; te lleva directamente al portal de certificados de A1S.')),
          React.createElement(GStep, { n: 2, title: 'Escribe tu documento y la fecha de expedición',
            note: 'La fecha va en orden año, mes y día, con un guion medio entre cada dato (AAAA-MM-DD). El documento se escribe completo, sin puntos ni comas.',
            shots: [React.createElement(Shot, { key: 's', src: 'assets/nomina/cert-01-inicio.png', alt: 'Página inicial del certificado laboral: campos de documento y fecha de expedición', url: 'a1s.nexoapp.co/empleado_certificado_laboral_1.php', caption: 'Página inicial · escribe los dos datos y presiona “Solicitar certificado”.' })] },
            React.createElement('p', null, 'En la primera casilla va tu número de documento y en la segunda la fecha de expedición del mismo. Luego presiona “Solicitar certificado”.')),
          React.createElement(GStep, { n: 3, title: 'Elige si lo quieres con o sin sueldo',
            shots: [
              React.createElement(Shot, { key: 'pc', src: 'assets/nomina/cert-02-sueldo-pc.png', alt: 'Mensaje ¿Incluir sueldo? en computador', url: 'a1s.nexoapp.co/empleado_certificado_laboral_2.php', caption: 'En computador · “Aceptar” incluye el sueldo, “Cancelar” lo genera sin sueldo.' }),
              React.createElement(Shot, { key: 'mo', phone: true, src: 'assets/nomina/cert-03-sueldo-movil.png', alt: 'Mensaje ¿Incluir sueldo? en celular', caption: 'En celular · el mismo mensaje aparece como “OK” / “Cancel”.' }),
            ] },
            React.createElement('p', null, 'El sistema te pregunta “¿Incluir sueldo?”. Acepta si necesitas el certificado con salario, o cancela si lo necesitas sin salario.')),
          React.createElement(GStep, { n: 4, title: 'Descarga tu certificado' },
            React.createElement('p', null, 'Al seleccionar una de las dos opciones se abre la previsualización del certificado, ya listo para descargar, imprimir o enviar en PDF.'))),

        /* Paso a paso · desprendibles */
        React.createElement(NgReveal, { style: { marginTop: 'calc(var(--section-y) * .7)' } }, React.createElement(NgHead, { eyebrow: 'Paso a paso', title: 'Cómo descargar tus desprendibles de nómina.', lead: 'Tres pasos dentro del portal Pronos. Necesitas tu documento y la contraseña que creaste la primera vez que ingresaste.' })),
        React.createElement('div', { className: 'a1s-guide-steps' },
          React.createElement(GStep, { n: 1, title: 'Valida tu documento',
            shots: [React.createElement(Shot, { key: 's', src: 'assets/nomina/nom-01-inicio.png', alt: 'Página inicial de Pronos: validar número de documento', url: 'pronos-005-site1.etempurl.com/index.php', caption: 'Página inicial · escribe el documento y presiona “Validar Documento”.' })] },
            React.createElement('p', null, 'En la página principal escribe tu número de documento y presiona “Validar Documento”.')),
          React.createElement(GStep, { n: 2, title: 'Ingresa tu contraseña',
            shots: [React.createElement(Shot, { key: 's', src: 'assets/nomina/nom-02-login.png?v=2', alt: 'Pantalla de login de Pronos con campo de contraseña', url: 'pronos-005-site1.etempurl.com', caption: 'Login · el sistema muestra tu nombre y pide la contraseña.' })] },
            React.createElement('p', null, 'El sistema confirma tu nombre y te pide la contraseña que creaste la primera vez que ingresaste. Escríbela y presiona “Ingresar”.')),
          React.createElement(GStep, { n: 3, title: 'Descarga el desprendible que necesites',
            shots: [React.createElement(Shot, { key: 's', src: 'assets/nomina/nom-03-datos.png?v=2', alt: 'Datos del empleado y listado de periodos de nómina en Pronos', url: 'pronos-005-site1.etempurl.com/contenido.php', caption: 'Datos Empleado · abajo aparece cada periodo de nómina con su botón “Imprimir”.' })] },
            React.createElement('p', null, 'Verás tus datos personales y, al final de la página, el listado de periodos de nómina. Presiona “Imprimir” en la fecha que necesites para descargar ese desprendible.'))),
        React.createElement(PwdNote, { go })))
  );
}

/* ══ SEMÁNTICA ═══════════════════════════════════════════════════════════ */
function SemanticaGuide({ go, back }) {
  return React.createElement('div', { 'data-screen-label': 'Certificado laboral · Semántica' },
    React.createElement(GuideHero, {
      logo: 'assets/nomina/logo-semantica.png', name: 'Semántica Digital', back,
      lead: 'Semántica cambió de dirección: el portal ahora es empleado.co. Todos los colaboradores deben entrar al nuevo enlace y generar de nuevo su usuario y contraseña.',
      chips: [React.createElement(NgBadge, { key: 'a', variant: 'on-dark' }, 'Nuevo enlace'), React.createElement(NgBadge, { key: 'b', variant: 'on-dark' }, 'Portal único'), React.createElement(NgBadge, { key: 'c', variant: 'on-dark' }, 'Disponible 24/7')],
      actions: [React.createElement(NgBtn, { key: 's', variant: 'primary', size: 'lg', href: SEMANTICA_URL, target: '_blank', rel: 'noopener', iconRight: React.createElement(NgIcons.arrowUR, { size: 18 }) }, 'Entrar a Semántica')],
    }),
    React.createElement('section', { style: NG_SECTION },
      React.createElement('div', { style: { ...NG_WRAP, maxWidth: 1020 } },
        React.createElement(NgReveal, null, React.createElement(NgHead, { eyebrow: 'Paso a paso', title: 'Cómo entrar al nuevo portal.', lead: 'El enlace anterior ya no funciona. Regístrate en empleado.co, verifica tu cuenta y asóciala con la empresa; dentro del portal encontrarás todo lo necesario.' })),
        React.createElement('div', { className: 'a1s-guide-steps' },
          React.createElement(GStep, { n: 1, title: 'Regístrate en el Portal de Empleados',
            note: 'Como el portal cambió de dirección, las credenciales del enlace anterior ya no sirven: todos los colaboradores deben crear su usuario y contraseña de nuevo.',
            shots: [React.createElement(Shot, { key: 's', flat: true, src: 'assets/nomina/sem-guia-1-registro.png', alt: 'Guía de registro en el Portal de Empleados: ingresar al portal, clic en Regístrate, diligenciar datos y verificar la cuenta' })] },
            React.createElement('p', null, 'Ingresa a empleado.co, abre “Iniciar sesión” y usa el enlace “Regístrate”. Completa tus datos y acepta los términos y condiciones.')),
          React.createElement(GStep, { n: 2, title: 'Verifica tu cuenta desde tu correo',
            shots: [React.createElement(Shot, { key: 's', flat: true, src: 'assets/nomina/sem-guia-2-verificacion.png', alt: 'Guía de verificación de cuenta: abrir el correo de Semantica ERP, hacer clic en Verificar cuenta y qué hacer si el correo no llegó' })] },
            React.createElement('p', null, 'Abre el correo que te envía Semantica ERP y presiona “Verificar cuenta”. Si no te llegó, revisa notificaciones o spam y usa la opción “Reenviar verificación” dentro del portal.')),
          React.createElement(GStep, { n: 3, title: 'Asocia tu cuenta con la empresa',
            note: 'El correo con el que te registraste y tu número de identificación deben coincidir exactamente con los datos que la empresa tiene sobre ti.',
            shots: [React.createElement(Shot, { key: 's', flat: true, src: 'assets/nomina/sem-guia-3-empresa.png', alt: 'Guía para asociar la cuenta con la empresa: mensaje de cuenta no asociada, buscar la empresa y confirmar los datos' })] },
            React.createElement('p', null, 'Al iniciar sesión verás el aviso “Tu cuenta no está asociada a ninguna empresa”. Presiona “Asociar empresa”, busca A1S en el listado, verifica tus datos y confirma la asociación.')),
          React.createElement(GStep, { n: 4, title: 'Descarga tus documentos' },
            React.createElement('p', null, 'Dentro del portal encontrarás todo lo necesario para descargar tus desprendibles de nómina y tu certificado laboral.'))),
        React.createElement(NgReveal, { delay: 160, style: { marginTop: 26, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', background: 'var(--surface)', border: '1px dashed var(--border-strong)', borderRadius: 'var(--radius-lg)', padding: '22px 28px' } },
          React.createElement('span', { style: { flex: 'none', color: NG_RED }, 'aria-hidden': true }, React.createElement(NgIcons.lock, { size: 22 })),
          React.createElement('div', null,
            React.createElement('h3', { style: { margin: 0, fontSize: '1.05rem', fontWeight: 700 } }, '¿Olvidaste tu contraseña?'),
            React.createElement('p', { style: { margin: '3px 0 0', color: 'var(--text-muted)', fontSize: '.9375rem', maxWidth: '62ch' } }, 'Usa la opción “¿Olvidaste tu contraseña?” de la pantalla de inicio de sesión del portal. Si no logras ingresar, radica una PQRS y te ayudamos.')),
          React.createElement('div', { style: { marginLeft: 'auto', display: 'flex', gap: 10, flexWrap: 'wrap' } },
            React.createElement(NgBtn, { variant: 'outline', href: 'PQRS.html', iconRight: React.createElement(NgIcons.arrow, { size: 16 }) }, 'Radicar PQRS')))))
  );
}

Object.assign(window, { PronosGuide, SemanticaGuide, NominaShot: Shot });
