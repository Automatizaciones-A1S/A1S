/* ============================================================================
   A1S — Vista Pagos en línea (descripción + botón placeholder + videos)
   El botón se anclará al link de pago real en la fase de Backend (href="#").
   VideoSlot es paramétrico (horizontal 16:9 / vertical 9:16) y se exporta a window
   para reutilizarlo en la vista de Certificado laboral.
   ========================================================================== */
const { Reveal, Eyebrow, Btn, Badge, SectionHead, Icons, RED, WRAP, SECTION } = window;

const PAGO_PASOS = [
  ['Ten a la mano tu factura', 'Necesitas el número de factura o de contrato y el valor a pagar.', Icons.doc],
  ['Abre la pasarela segura', 'Te llevamos a nuestro proveedor de pagos certificado (PCI-DSS).', Icons.lock],
  ['Confirma y guarda el soporte', 'Recibe tu comprobante por correo al instante.', Icons.check],
];

function PagosView({ go }) {
  return React.createElement('div', { 'data-screen-label': 'Pagos' },
    /* Hero */
    React.createElement('section', { className: 'a1s-dark', style: { background: '#0A0A0C', paddingTop: 'calc(78px + var(--section-y) * .5)', paddingBottom: 'calc(var(--section-y) * .7)', position: 'relative', overflow: 'hidden' } },
      React.createElement('div', { 'aria-hidden': true, style: { position: 'absolute', inset: 0, background: 'radial-gradient(62% 75% at 80% 12%, rgba(192,35,27,.20), transparent 60%)' } }),
      React.createElement('div', { 'aria-hidden': true, className: 'a1s-gridtex', style: { opacity: .4 } }),
      React.createElement('div', { style: { ...WRAP, position: 'relative', display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 'clamp(2rem,5vw,4.5rem)', alignItems: 'start' }, className: 'a1s-split' },
        React.createElement(Reveal, null,
          React.createElement(SectionHead, { dark: true, eyebrow: 'Pagos en línea', title: 'Paga tu servicio de forma rápida y segura.', lead: 'Realiza el pago de tu factura o contrato A1S en pocos pasos, desde cualquier dispositivo. Transacciones cifradas a través de una pasarela de pago certificada.' }),
          React.createElement('div', { style: { display: 'flex', gap: 12, marginTop: 30, flexWrap: 'wrap', alignItems: 'center' } },
            // ▼▼ Botón a anclar al link de pago real en la fase de Backend ▼▼
            React.createElement(Btn, { variant: 'primary', size: 'lg', href: '#', iconRight: React.createElement(Icons.arrowUR, { size: 18 }) }, 'Pagar ahora'),
            React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--dark-muted)', fontSize: '.875rem' } },
              React.createElement(Icons.lock, { size: 16 }), 'Pago 100% seguro y cifrado')),
          React.createElement('div', { style: { display: 'flex', gap: 9, marginTop: 24, flexWrap: 'wrap' } },
            React.createElement(Badge, { variant: 'on-dark' }, 'PSE'), React.createElement(Badge, { variant: 'on-dark' }, 'Tarjeta de crédito'), React.createElement(Badge, { variant: 'on-dark' }, 'Débito'))),
        React.createElement(Reveal, { delay: 120, style: { display: 'flex', flexDirection: 'column', gap: 18 } },
          React.createElement(VideoSlot, { ratio: '16 / 9', title: 'Cómo realizar tu pago', subtitle: 'Espacio reservado para el video · horizontal 16:9 (PC)', tag: 'Video · PC' }),
          React.createElement(VideoSlot, { vertical: true, ratio: '9 / 16', title: 'Paga desde tu celular', subtitle: 'Espacio reservado para el video · vertical 9:16', tag: 'Video · Celular', maxWidth: 224 })))),

    /* Pasos */
    React.createElement('section', { style: SECTION },
      React.createElement('div', { style: WRAP },
        React.createElement(Reveal, null, React.createElement(SectionHead, { eyebrow: '¿Cómo funciona?', title: 'Tres pasos para pagar.', lead: 'Diseñado para que pagues en menos de dos minutos, sin filas ni desplazamientos.' })),
        React.createElement('div', { className: 'a1s-pay-flow' },
          React.createElement('div', { 'aria-hidden': true, className: 'a1s-pay-line' }),
          PAGO_PASOS.map(([t, d, Ic], i) => React.createElement(Reveal, { key: t, delay: i * 110, className: 'a1s-pay-step' },
            React.createElement('span', { 'aria-hidden': true, className: 'a1s-pay-num' }, String(i + 1).padStart(2, '0')),
            React.createElement('span', { className: 'a1s-pay-ic' }, React.createElement(Ic, { size: 26 })),
            React.createElement('h3', { className: 'a1s-pay-t' }, t),
            React.createElement('p', { className: 'a1s-pay-d' }, d)))),
        React.createElement(Reveal, { delay: 160, style: { marginTop: 30, display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', background: 'var(--surface)', border: '1px dashed var(--border-strong)', borderRadius: 'var(--radius-lg)', padding: '22px 28px' } },
          React.createElement('span', { style: { flex: 'none', color: RED }, 'aria-hidden': true }, React.createElement(Icons.phone, { size: 22 })),
          React.createElement('div', null,
            React.createElement('h3', { style: { margin: 0, fontSize: '1.05rem', fontWeight: 700 } }, '¿Dudas con tu pago o tu factura?'),
            React.createElement('p', { style: { margin: '3px 0 0', color: 'var(--text-muted)', fontSize: '.9375rem' } }, 'Escríbenos por WhatsApp o radica tu caso por PQRS y te ayudamos.')),
          React.createElement('div', { style: { marginLeft: 'auto' } }, React.createElement(Btn, { variant: 'outline', onClick: () => go('contacto'), iconRight: React.createElement(Icons.arrow, { size: 16 }) }, 'Contáctanos')))))
  );
}

/* ── Recuadro para el video explicativo (placeholder, se conecta luego).
   Paramétrico: horizontal (16:9) o vertical (9:16) vía `vertical`/`ratio`. ── */
function VideoSlot({ ratio = '16 / 9', title = 'Cómo realizar tu pago', subtitle = 'Espacio reservado para el video tutorial · 16:9', tag = 'Video', vertical = false, maxWidth } = {}) {
  const mw = maxWidth || (vertical ? 232 : null);
  return React.createElement('div', { style: { position: 'relative', width: '100%', maxWidth: mw || undefined, marginInline: mw ? 'auto' : undefined, aspectRatio: ratio, borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--dark-line)', background: 'radial-gradient(80% 90% at 50% 30%, rgba(192,35,27,.18), transparent 62%), linear-gradient(160deg, #15100F, #0A0A0C)', boxShadow: 'var(--shadow-glow)' } },
    React.createElement('div', { 'aria-hidden': true, className: 'a1s-gridtex', style: { opacity: .5 } }),
    React.createElement('div', { 'aria-hidden': true, className: 'a1s-scan' }),
    React.createElement('div', { style: { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, textAlign: 'center', padding: 20 } },
      React.createElement('span', { style: { width: vertical ? 58 : 74, height: vertical ? 58 : 74, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'var(--a1s-red)', color: '#fff', boxShadow: '0 18px 44px -10px rgba(192,35,27,.7)' } }, React.createElement(Icons.play, { size: vertical ? 24 : 30 })),
      React.createElement('div', null,
        React.createElement('div', { style: { fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: vertical ? '1rem' : '1.15rem', color: '#fff' } }, title),
        React.createElement('div', { style: { marginTop: 6, fontSize: '.8125rem', color: 'var(--dark-muted)', letterSpacing: '.02em', maxWidth: '32ch', marginInline: 'auto' } }, subtitle))),
    React.createElement('span', { style: { position: 'absolute', top: 14, left: 14, display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: '.7rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--a1s-red-400)' } },
      React.createElement('span', { className: 'a1s-rec', style: { width: 8, height: 8, borderRadius: '50%', background: 'var(--a1s-red)' } }), tag));
}

Object.assign(window, { PagosView, VideoSlot });
