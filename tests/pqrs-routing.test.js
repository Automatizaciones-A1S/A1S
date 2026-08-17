const test = require('node:test');
const assert = require('node:assert/strict');
const { getPqrsRecipient, buildMailtoLink, buildVerificationMailto, buildVerificationEmailContent, buildVerificationSmsPayload } = require('../js/pqrs-routing.js');

test('routes payroll-related worker issues to Karen', () => {
  const recipient = getPqrsRecipient('trabajador', 'Nómina y pago', 'Queja');
  assert.equal(recipient.email, 'kgonzalez@a1scolombia.com');
  assert.equal(recipient.name, 'Karen');
});

test('routes procurement-related external issues to Edward', () => {
  const recipient = getPqrsRecipient('externo', 'Proveedores y contratación', 'Petición');
  assert.equal(recipient.email, 'evalencia@a1scolombia.com');
  assert.equal(recipient.name, 'Compras · Edward');
});

test('routes legal collection issues to the legal team', () => {
  const recipient = getPqrsRecipient('cliente', 'Cobros jurídicos / cartera', 'Reclamo');
  assert.equal(recipient.email, 'juridica@a1scolombia.com');
  assert.equal(recipient.name, 'Jurídica');
});

test('routes workplace harassment complaints to the ethics channel', () => {
  const recipient = getPqrsRecipient('trabajador', 'Acoso laboral', 'Denuncia (ética)');
  assert.equal(recipient.email, 'lineaetica@a1scolombia.com');
  assert.equal(recipient.name, 'Acoso laboral');
});

test('routes billing issues to Karen', () => {
  const recipient = getPqrsRecipient('cliente', 'Facturación', 'Reclamo');
  assert.equal(recipient.email, 'kgonzalez@a1scolombia.com');
  assert.equal(recipient.name, 'Karen');
});

test('builds the verification mailto for the entered email', () => {
  const link = buildVerificationMailto('cliente@dominio.com', '123456');
  assert.match(link, /^mailto:/);
  assert.match(link, /A1S%20CODIGO/);
  assert.match(link, /123456/);
});

test('builds the verification email with A1S CODIGO in the subject and body', () => {
  const payload = buildVerificationEmailContent('cliente@dominio.com', '123456');
  assert.match(payload.subject, /A1S CODIGO/i);
  assert.match(payload.text, /A1S CODIGO/i);
  assert.match(payload.text, /123456/);
});

test('builds the SMS verification payload for the provided phone number', () => {
  const payload = buildVerificationSmsPayload('+573001112233', '123456');
  assert.equal(payload.to, '+573001112233');
  assert.match(payload.body, /123456/);
  assert.match(payload.body, /A1S CODIGO/i);
});

test('builds the internal PQRS email for the mapped recipient', () => {
  const payload = require('../js/pqrs-routing.js').buildPqrsEmailContent({
    recipient: getPqrsRecipient('cliente', 'Facturación', 'Reclamo'),
    subject: 'PQRS A1S - Factura',
    body: 'Detalle del caso'
  });
  assert.equal(payload.to, 'kgonzalez@a1scolombia.com');
  assert.match(payload.subject, /PQRS A1S/);
  assert.match(payload.text, /Detalle del caso/);
});
