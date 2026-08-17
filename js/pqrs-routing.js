(function (root) {
  'use strict';

  var DEFAULT_RECIPIENT = { name: 'Vforeo', email: 'vforero@a1scolombia.com' };

  var ROUTES = [
    {
      id: 'etica',
      match: function (audience, tema, tipo) {
        var text = [tema, tipo].join(' ').toLowerCase();
        return text.includes('acoso') || text.includes('ética') || text.includes('denuncia');
      },
      recipient: { name: 'Acoso laboral', email: 'lineaetica@a1scolombia.com' }
    },
    {
      id: 'juridica',
      match: function (audience, tema, tipo) {
        var text = [tema, tipo].join(' ').toLowerCase();
        return text.includes('juríd') || text.includes('jurid') || text.includes('cobro') || text.includes('cartera') || text.includes('contrato');
      },
      recipient: { name: 'Jurídica', email: 'juridica@a1scolombia.com' }
    },
    {
      id: 'nomina',
      match: function (audience, tema, tipo) {
        var text = [tema, tipo].join(' ').toLowerCase();
        return text.includes('nomina') || text.includes('nómina') || text.includes('pago') || text.includes('salario');
      },
      recipient: { name: 'Karen', email: 'kgonzalez@a1scolombia.com' }
    },
    {
      id: 'cesantias',
      match: function (audience, tema, tipo) {
        var text = [tema, tipo].join(' ').toLowerCase();
        return text.includes('cesant') || text.includes('prestaciones');
      },
      recipient: { name: 'Jefferson', email: 'jsierra@a1scolombia.com' }
    },
    {
      id: 'certificaciones',
      match: function (audience, tema, tipo) {
        var text = [tema, tipo].join(' ').toLowerCase();
        return text.includes('certific') || text.includes('laboral');
      },
      recipient: { name: 'Jefferson', email: 'jsierra@a1scolombia.com' }
    },
    {
      id: 'compras',
      match: function (audience, tema, tipo) {
        var text = [tema, tipo].join(' ').toLowerCase();
        return text.includes('proveedor') || text.includes('contrat') || text.includes('compra') || text.includes('logística');
      },
      recipient: { name: 'Compras · Edward', email: 'evalencia@a1scolombia.com' }
    },
    {
      id: 'control',
      match: function (audience, tema, tipo) {
        var text = [tema, tipo].join(' ').toLowerCase();
        return text.includes('control') || text.includes('interno');
      },
      recipient: { name: 'Control interno', email: 'dvelandia@a1scolombia.com' }
    },
    {
      id: 'karen-facturacion',
      match: function (audience, tema, tipo) {
        var text = [tema, tipo].join(' ').toLowerCase();
        return text.includes('factur') || text.includes('reclamación económica') || text.includes('reclamacion economica');
      },
      recipient: { name: 'Karen', email: 'kgonzalez@a1scolombia.com' }
    },
    {
      id: 'apinedo',
      match: function (audience, tema, tipo) {
        var text = [tema, tipo].join(' ').toLowerCase();
        return text.includes('servicio') || text.includes('operación') || text.includes('operacion') || text.includes('calidad') || text.includes('reclamo');
      },
      recipient: { name: 'Apinedo', email: 'apinedo@a1scolombia.com' }
    }
  ];

  function getPqrsRecipient(audience, tema, tipo) {
    for (var i = 0; i < ROUTES.length; i++) {
      var route = ROUTES[i];
      if (route.match(audience, tema, tipo)) {
        return route.recipient;
      }
    }
    return DEFAULT_RECIPIENT;
  }

  function buildMailtoLink(options) {
    var recipient = options.recipient || DEFAULT_RECIPIENT;
    var subject = encodeURIComponent(options.subject || 'PQRS A1S');
    var body = encodeURIComponent(options.body || '');
    return 'mailto:' + recipient.email + '?subject=' + subject + '&body=' + body;
  }

  function buildVerificationMailto(email, code) {
    var subject = encodeURIComponent('A1S CODIGO · Verificación de correo');
    var body = encodeURIComponent('Hola.\n\nA1S CODIGO: ' + code + '\n\nUsa este código para verificar tu correo y continuar con tu PQRS.');
    return 'mailto:' + encodeURIComponent(email) + '?subject=' + subject + '&body=' + body;
  }

  function buildVerificationEmailContent(email, code) {
    return {
      to: email,
      subject: 'A1S CODIGO · Verificación de correo',
      text: 'Hola,\n\nGracias por usar el formulario de PQRS de A1S Security Group.\n\nA1S CODIGO: ' + code + '\n\nUsa este código para verificar tu correo y continuar con tu PQRS.\n\nGracias,\nA1S Security Group'
    };
  }

  function buildVerificationSmsPayload(phone, code) {
    return {
      to: phone,
      channel: 'sms',
      sms: true,
      body: 'A1S CODIGO: ' + code + '\nTu código de verificación para el PQRS es ' + code + '.'
    };
  }

  function buildPqrsEmailContent(options) {
    var recipient = options.recipient || DEFAULT_RECIPIENT;
    var subject = options.subject || 'PQRS A1S · Solicitud recibida';
    var text = options.body || '';
    return {
      to: recipient.email,
      subject: subject,
      text: 'Se ha recibido un PQRS desde el formulario web de A1S Security Group.\n\n' +
        'Destinatario: ' + recipient.name + ' <' + recipient.email + '>\n\n' +
        text + '\n\n' +
        'Este mensaje fue generado automáticamente por Automatizaciones A1S Security Group.'
    };
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      getPqrsRecipient: getPqrsRecipient,
      buildMailtoLink: buildMailtoLink,
      buildVerificationMailto: buildVerificationMailto,
      buildVerificationEmailContent: buildVerificationEmailContent,
      buildVerificationSmsPayload: buildVerificationSmsPayload,
      buildPqrsEmailContent: buildPqrsEmailContent
    };
  }

  root.A1SPQRSRouting = { getPqrsRecipient: getPqrsRecipient, buildMailtoLink: buildMailtoLink };
})(typeof window !== 'undefined' ? window : globalThis);
