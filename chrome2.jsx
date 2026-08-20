/* ============================================================================
   A1S — Chrome del sitio: Navbar, Footer, FAB WhatsApp, RouteWipe (cortina roja)
   ========================================================================== */
const { Logo, Btn, Badge, Icons, RED, WRAP } = window;

const NAV_LINKS = [
  ['servicios', 'Servicios'],
  ['cobertura', 'Cobertura'],
  ['certificaciones', 'Certificados'],
  ['portal-personas', 'Portal Personas'],
  ['blog', 'Blog'],
  ['pagos', 'Pagos'],
];

function Navbar({ route, go, darkHero }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', h, { passive: true }); h();
    return () => window.removeEventListener('scroll', h);
  }, []);
  React.useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);
  const onDark = darkHero && !scrolled;
  const linkColor = onDark ? 'rgba(255,255,255,.8)' : 'var(--text-muted)';
  const isTal = route === 'talento';

  const navTo = (r) => { setOpen(false); go(r); };

  return React.createElement(React.Fragment, null,
    React.createElement('header', { style: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 60, transition: 'all .3s var(--ease-standard)',
      background: scrolled ? 'color-mix(in srgb, var(--a1s-white) 86%, transparent)' : 'transparent', backdropFilter: scrolled ? 'saturate(150%) blur(14px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent' } },
      React.createElement('div', { style: { ...WRAP, display: 'flex', alignItems: 'center', gap: 18, height: scrolled ? 64 : 78, transition: 'height .3s', paddingTop: 0, paddingBottom: 0 } },
        React.createElement('a', { className: 'a1s-int', onClick: () => navTo('home'), style: { cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: '2px 0 0', marginRight: 12, lineHeight: 0 } },
          React.createElement(Logo, { color: onDark ? '#fff' : 'var(--a1s-red)', height: scrolled ? 30 : 34, style: { margin: 0, padding: 0, transform: 'translateX(-1px)' } })),
        React.createElement('nav', { className: 'a1s-navlinks', style: { marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 } },
          NAV_LINKS.map(([id, label]) => React.createElement('a', { key: id, className: 'a1s-int', onClick: () => navTo(id),
            style: { cursor: 'pointer', padding: '9px 15px', borderRadius: 'var(--radius-pill)', fontSize: '.9375rem', fontWeight: 600, transition: 'all .2s',
              color: route === id ? (onDark ? '#fff' : RED) : linkColor,
              background: route === id ? (onDark ? 'rgba(255,255,255,.12)' : 'color-mix(in srgb, var(--a1s-red) 9%, transparent)') : 'transparent' } }, label)),
          React.createElement('a', { className: 'a1s-int', onClick: () => navTo('talento'),
            style: { cursor: 'pointer', padding: '9px 15px', borderRadius: 'var(--radius-pill)', fontSize: '.9375rem', fontWeight: 600, transition: 'all .2s',
              color: isTal ? (onDark ? '#fff' : RED) : linkColor, display: 'inline-flex', alignItems: 'center',
              background: isTal ? (onDark ? 'rgba(255,255,255,.12)' : 'color-mix(in srgb, var(--a1s-red) 9%, transparent)') : 'transparent' } },
            'Trabaja con nosotros')),
        React.createElement('div', { className: 'a1s-navcta' },
          React.createElement(Btn, { variant: onDark ? 'solid' : 'primary', size: 'sm', onClick: () => navTo('contacto') }, '¡Cotización gratuita!')),
        React.createElement('button', { className: 'a1s-int a1s-burger', onClick: () => setOpen(true), 'aria-label': 'Menú',
          style: { display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: onDark ? '#fff' : 'var(--text)', padding: 6 } }, React.createElement(Icons.menu, { size: 26 })))),
    // Menú móvil full-screen
    open && React.createElement('div', { className: 'a1s-dark', style: { position: 'fixed', inset: 0, zIndex: 90, background: 'var(--dark-bg)', color: '#fff', display: 'flex', flexDirection: 'column', padding: '14px calc(var(--gutter) + 2px) 16px', backdropFilter: 'blur(10px)' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 } },
        React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, lineHeight: 0 } },
          React.createElement(Logo, { color: '#fff', height: 26 })),
        React.createElement('button', { className: 'a1s-int', onClick: () => setOpen(false), 'aria-label': 'Cerrar', style: { background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 6, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' } }, React.createElement(Icons.close, { size: 22 }))),
      React.createElement('nav', { style: { display: 'flex', flexDirection: 'column', gap: 1, marginTop: 10 } },
        [['home', 'Inicio'], ...NAV_LINKS, ['talento', 'Trabaja con nosotros'], ['contacto', 'Contacto']].map(([id, label]) =>
          React.createElement('a', { key: id, className: 'a1s-int', onClick: () => navTo(id),
            style: { cursor: 'pointer', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '.96rem', letterSpacing: '-.01em', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,.12)', color: route === id ? 'var(--a1s-red-400)' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' } },
            React.createElement('span', null, label),
            route === id ? React.createElement('span', { style: { color: 'var(--a1s-red-400)', fontSize: '.8rem' } }, '●') : null))),
      React.createElement('div', { style: { marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 10 } },
        React.createElement(Btn, { variant: 'primary', size: 'lg', onClick: () => navTo('contacto') }, '¡Cotización gratuita!'),
        React.createElement('span', { style: { color: 'var(--dark-muted)', fontSize: '.8rem', textAlign: 'center' } }, 'Atención 24/7'))));
}

/* ── Footer ───────────────────────────────────────────────────────────── */
function Footer({ go }) {
  const col = (title, items) => React.createElement('div', null,
    React.createElement('div', { style: { fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--dark-muted)', marginBottom: 16 } }, title),
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: 11 } },
      items.map((t, i) => { const href = t[2]; const clickable = !!(t[1] || href);
        return React.createElement('a', { key: i, className: clickable ? 'a1s-int' : '', href: href || undefined, onClick: t[1] ? () => go(t[1]) : null, style: { fontSize: '.9375rem', color: 'var(--dark-text)', textDecoration: 'none', cursor: clickable ? 'pointer' : 'default', opacity: .82 } }, t[0]); })));
  const REG = [['Caribe', 'Cartagena'], ['Santander', 'Bucaramanga'], ['Antioquia', 'Medellín'], ['Centro', 'Bogotá'], ['Suroccidente', 'Cali']];
  return React.createElement('footer', { className: 'a1s-dark', style: { background: 'var(--dark-bg)', color: 'var(--dark-text)', paddingTop: 'var(--space-9)', position: 'relative', overflow: 'hidden' } },
    React.createElement('div', { style: { position: 'absolute', inset: 0, background: 'radial-gradient(60% 80% at 85% 0%, rgba(192,35,27,.12), transparent 60%)' } }),
    React.createElement('div', { style: { ...WRAP, position: 'relative' } },
      React.createElement('div', { className: 'a1s-foot-grid', style: { display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: 36, paddingBottom: 'var(--space-8)' } },
        React.createElement('div', null,
          React.createElement(Logo, { variant: 'lockup', color: '#fff', height: 64 }),
          React.createElement('p', { style: { marginTop: 20, maxWidth: '32ch', color: 'var(--dark-muted)', fontSize: '.9375rem', lineHeight: 1.6 } }, 'Seguridad humana + tecnología avanzada. Protegemos lo que más importa desde 1971.'),
          React.createElement('div', { style: { marginTop: 22, display: 'flex', gap: 10 } },
            React.createElement(Badge, { variant: 'on-dark' }, 'OEA'), React.createElement(Badge, { variant: 'on-dark' }, 'BASC')),
          React.createElement('p', { style: { marginTop: 20, fontSize: '.8125rem', color: 'var(--dark-muted)', letterSpacing: '.02em' } }, 'By Somni Capital Group')),
        col('Servicios', [['Seguridad Física', 'servicios'], ['Seguridad Electrónica', 'servicios'], ['Móvil & GPS', 'servicios'], ['Drones', 'servicios'], ['Ciberseguridad', 'servicios']]),
        col('Empresa', [['Quiénes somos', 'servicios'], ['Cobertura', 'cobertura'], ['Certificaciones', 'certificaciones'], ['Portal Personas', 'certificado'], ['Blog · Noticias', 'blog'], ['Pagos en línea', 'pagos'], ['Contacto', 'contacto'], ['PQRS · Atención al ciudadano', null, 'PQRS.html']]),
        col('Talento', [['Trabaja con nosotros', 'talento'], ['Cultura', 'talento'], ['Vacantes', 'talento'], ['Proceso de selección', 'talento']]),
        col('Legal', [['Política SARLAFT', null, 'legal.html#sarlaft'], ['Alcohol y Drogas', null, 'legal.html#alcohol-drogas'], ['Seguridad Vial', null, 'legal.html#seguridad-vial'], ['Política Integral', null, 'legal.html#integral'], ['Prevención de acoso laboral y sexual', null, 'legal.html#acoso'], ['Equidad de género e inclusión', null, 'legal.html#equidad-genero'], ['Tratamiento de datos personales', null, 'legal.html#tratamiento-datos'], ['Reglamento Interno de Trabajo', null, 'legal.html#reglamento-interno']])),
      // Regionales
      React.createElement('div', { className: 'a1s-foot-reg', style: { display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 16, padding: '26px 0', borderTop: '1px solid var(--dark-line)' } },
        REG.map(([r, c]) => React.createElement('div', { key: r, style: { display: 'flex', gap: 10, alignItems: 'flex-start' } },
          React.createElement('span', { style: { color: 'var(--a1s-red-400)', marginTop: 2 } }, React.createElement(Icons.pin, { size: 16 })),
          React.createElement('div', null,
            React.createElement('div', { style: { fontSize: '.875rem', fontWeight: 600 } }, r),
            React.createElement('div', { style: { fontSize: '.8125rem', color: 'var(--dark-muted)' } }, c))))),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 16, padding: '22px 0', borderTop: '1px solid var(--dark-line)', flexWrap: 'wrap' } },
        React.createElement('span', { style: { fontSize: '.8125rem', color: 'var(--dark-muted)' } }, 'Atención 24/7'),
        React.createElement('a', { className: 'a1s-int', href: 'PQRS.html', style: { fontSize: '.8125rem', color: 'var(--a1s-red-400)', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 7 } },
          React.createElement(Icons.doc, { size: 15 }), 'Radicar PQRS'),
        React.createElement('a', { className: 'a1s-int', onClick: () => go('pagos'), style: { fontSize: '.8125rem', color: 'var(--a1s-red-400)', fontWeight: 700, textDecoration: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7 } },
          React.createElement(Icons.lock, { size: 15 }), 'Pagos en línea'),
        React.createElement('a', { className: 'a1s-int', onClick: () => go('certificado'), style: { fontSize: '.8125rem', color: 'var(--a1s-red-400)', fontWeight: 700, textDecoration: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7 } },
          React.createElement(Icons.cert, { size: 15 }), 'Portal Personas'),
        React.createElement('span', { style: { marginLeft: 'auto', fontSize: '.8125rem', color: 'var(--dark-muted)', display: 'inline-flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' } }, '© ' + new Date().getFullYear() + ' A1S Security Group', React.createElement('span', { 'aria-hidden': true }, '·'), React.createElement('a', { className: 'a1s-int', href: 'legal.html#tratamiento-datos', style: { color: 'inherit', textDecoration: 'none' } }, 'Política de datos'), React.createElement('span', { 'aria-hidden': true }, '·'), React.createElement('a', { className: 'a1s-int', href: 'legal.html', style: { color: 'inherit', textDecoration: 'none' } }, 'Legal')))));
}

/* ── FAB WhatsApp (visual) ────────────────────────────────────────────── */
function WhatsFab() {
  return null;
}

/* ── Breadcrumb / mini línea de tiempo de navegación ──────────────────── */
const ROUTE_LABELS = { home: 'Inicio', servicios: 'Servicios', cobertura: 'Cobertura', certificaciones: 'Certificaciones', 'portal-personas': 'Portal Personas', blog: 'Blog', pagos: 'Pagos', talento: 'Talento', contacto: 'Contacto', postulacion: 'Postulación', certificado: 'Portal Personas' };

function Breadcrumb({ trail, go }) {
  const [hide, setHide] = React.useState(false);
  React.useEffect(() => {
    let last = window.scrollY;
    const h = () => { const y = window.scrollY; setHide(y > 240 && y > last + 4); last = y; };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  if (!trail || trail.length < 2) return null;
  return React.createElement('nav', { className: 'a1s-crumb' + (hide ? ' is-hidden' : ''), 'aria-label': 'Ruta de navegación' },
    trail.map((r, i) => {
      const last = i === trail.length - 1;
      const label = ROUTE_LABELS[r] || r;
      return React.createElement(React.Fragment, { key: r + i },
        i > 0 && React.createElement('span', { className: 'a1s-crumb-rail', 'aria-hidden': true }),
        React.createElement('button', {
          className: 'a1s-int a1s-crumb-step' + (last ? ' is-cur' : ''),
          onClick: last ? undefined : () => go(r), disabled: last, type: 'button',
        },
          React.createElement('span', { className: 'a1s-crumb-dot', 'aria-hidden': true }),
          i === 0 ? React.createElement(Icons.arrow, { size: 13, style: { transform: 'rotate(180deg)' } }) : null,
          React.createElement('span', null, label)));
    }));
}

/* ── RouteWipe — cortina roja de transición ───────────────────────────── */
function RouteWipe({ active }) {
  return React.createElement('div', { className: 'a1s-wipe' + (active ? ' go' : ''), 'aria-hidden': true },
    React.createElement('span', { className: 'a1s-wipe-dot' }));
}

Object.assign(window, { Navbar, Footer, WhatsFab, RouteWipe, Breadcrumb });
