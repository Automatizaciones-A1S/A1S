/* ============================================================================
   A1S — PQRS · wizard (vanilla JS, sin dependencias)
   Vistas: select → form(cliente|trabajador|externo) → verify → done
           + estado (validar radicado)
   ========================================================================== */
(function () {
  'use strict';
  var app = document.getElementById('app');
  var stepper = document.getElementById('stepper');
  document.getElementById('yr').textContent = new Date().getFullYear();

  /* ── Iconos ── */
  var I = {
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    badge: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 7h6"/><circle cx="12" cy="13" r="2.5"/><path d="M8.5 19a3.5 3.5 0 0 1 7 0"/>',
    ext: '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><path d="M18 8v6M15 11h6"/>',
    track: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/><path d="M11 8v3l2 2"/>',
    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    check: '<path d="M5 12l5 5L20 7"/>'
  };
  function svg(p, s) { return '<svg viewBox="0 0 24 24" width="' + (s || 26) + '" height="' + (s || 26) + '" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + p + '</svg>'; }

  /* ── Datos ── */
  var TIPOS = ['Petición', 'Queja', 'Reclamo', 'Sugerencia', 'Denuncia (ética)', 'Felicitación'];
  var CLIENTES = ['OFFCORSS', 'SIMONIZ', 'TransMilenio', 'Hilton', 'IDRD', 'VÉLEZ', 'Tennis', 'Otro (especificar)'];
  var CARGOS = {
    operativo: ['Vigilante', 'Escolta', 'Manejador canino (K9)', 'Supervisor de operaciones', 'Operador de medios tecnológicos (CCTV)', 'Conductor de seguridad', 'Otro cargo operativo'],
    administrativo: ['Talento Humano', 'Contabilidad / Finanzas', 'Comercial / Ventas', 'Coordinación de operaciones', 'Tecnología / Sistemas', 'Compras / Logística', 'Otro cargo administrativo']
  };
  var RELACION = ['Proveedor / contratista', 'Aspirante a empleo', 'Visitante', 'Comunidad / vecino', 'Autoridad / entidad', 'Otro'];

  /* Subclasificación temática del asunto (según procedimiento PQRSDF) — por perfil */
  var TEMAS = {
    cliente: ['Prestación del servicio', 'Calidad de la operación', 'Facturación', 'Reclamación económica', 'Cobros jurídicos / cartera', 'Cambio o novedad del personal', 'Requerimiento contractual', 'Pago de nómina', 'Nómina', 'Otro asunto'],
    trabajador: ['Nómina', 'Pago de nómina', 'Cesantías', 'Certificaciones laborales', 'Prestaciones sociales', 'Dotación', 'ARL / Seguridad y salud (SST)', 'Turnos y operación', 'Acoso laboral', 'Conducta de personal en sitio', 'Otro asunto'],
    externo: ['Requerimiento de autoridad / entidad', 'Proveedores y contratación', 'Aspirante / proceso de selección', 'Conducta de personal en sitio', 'Comunidad / vecindad', 'Acoso laboral', 'Control interno', 'Otro asunto']
  };

  var AUDIENCES = {
    cliente: { tag: 'Soy cliente', title: 'Solicitud de un cliente A1S', sub: 'Cuéntanos sobre el servicio que tienes contratado para gestionar tu caso con prioridad.', alt: false },
    trabajador: { tag: 'Soy trabajador', title: 'Solicitud de un colaborador A1S', sub: 'Indícanos tu vínculo dentro de la compañía para dirigir tu caso al área correcta.', alt: false },
    externo: { tag: 'Soy externo', title: 'Solicitud de un tercero', sub: 'Si no eres cliente ni colaborador, radica aquí tu solicitud — proveedores, aspirantes, comunidad o autoridades.', alt: false }
  };

  var state = { audience: null, email: '', phone: '' };

  function setStep(n) {
    [].forEach.call(stepper.querySelectorAll('.s'), function (el) {
      var s = +el.getAttribute('data-step');
      el.classList.toggle('on', s === n);
      el.classList.toggle('done', s < n);
    });
  }
  function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

  /* ── Vista: selección ── */
  function viewSelect() {
    setStep(1);
    var cards = [
      ['cliente', I.user, 'Soy cliente', 'Tengo un servicio de seguridad contratado con A1S.', false],
      ['trabajador', I.badge, 'Soy trabajador', 'Soy o fui colaborador de A1S (operativo o administrativo).', false],
      ['externo', I.ext, 'Soy externo', 'Proveedor, aspirante, comunidad o autoridad.', false],
      ['estado', I.track, 'Validar estado de mi PQRS', 'Consulta el avance de una solicitud ya radicada.', true]
    ];
    app.innerHTML =
      '<div class="pq-secthead"><h2>Selecciona una opción para continuar</h2>' +
      '<p>Elegir tu perfil nos permite pedirte solo la información necesaria y resolver más rápido.</p></div>' +
      '<div class="pq-cards">' +
      cards.map(function (c) {
        return '<button class="pq-card' + (c[4] ? ' alt' : '') + '" data-go="' + c[0] + '">' +
          '<span class="pq-card__ic">' + svg(c[1], 26) + '</span>' +
          '<span style="flex:1 1 auto;min-width:0"><h3>' + c[2] + '</h3><p>' + c[3] + '</p>' +
          '<span class="pq-card__go">' + (c[4] ? 'Consultar' : 'Continuar') + ' ' + svg(I.arrow, 16) + '</span></span>' +
          '</button>';
      }).join('') + '</div>' +
      '<div class="pq-gloss">' +
        '<div class="pq-gloss__head"><h3>¿Qué significa PQRS?</h3>' +
        '<p>Cada letra corresponde a un tipo de solicitud. Reconócela para que tu caso llegue al área correcta y se resuelva más rápido.</p></div>' +
        '<div class="pq-gloss__grid">' +
        [['P', 'Petición', 'Solicitud respetuosa de información, documentos o una actuación de la empresa.'],
         ['Q', 'Queja', 'Manifestación de inconformidad por la conducta o la atención de un colaborador.'],
         ['R', 'Reclamo', 'Inconformidad por la prestación o la calidad de un servicio; esperas una solución.'],
         ['S', 'Sugerencia', 'Propuesta o idea para mejorar nuestros servicios, procesos o experiencia.']]
          .map(function (g) {
            return '<div class="pq-gloss__item"><span class="pq-gloss__l">' + g[0] + '</span>' +
              '<div><h4>' + g[1] + '</h4><p>' + g[2] + '</p></div></div>';
          }).join('') +
        '</div>' +
        '<p class="pq-gloss__note">También recibimos <b>Felicitaciones</b> y <b>Denuncias</b> (incluidas las de tipo ético).</p>' +
      '</div>';
    [].forEach.call(app.querySelectorAll('[data-go]'), function (b) {
      b.addEventListener('click', function () {
        var g = b.getAttribute('data-go');
        if (g === 'estado') viewEstado(); else viewForm(g);
        scrollTop();
      });
    });
  }

  /* ── helpers de campos ── */
  function attr(s) { return String(s == null ? '' : s).replace(/"/g, '&quot;'); }
  function fld(opts) {
    var req = opts.req ? ' <span class="req">*</span>' : '';
    var ph = attr(opts.ph);
    var inputmode = opts.inputmode ? ' inputmode="' + attr(opts.inputmode) + '"' : '';
    var pattern = opts.pattern ? ' pattern="' + attr(opts.pattern) + '"' : '';
    var inner;
    if (opts.type === 'select') {
      inner = '<select id="' + opts.id + '"' + (opts.req ? ' required' : '') + '><option value="" disabled selected>' + (opts.ph || 'Selecciona…') + '</option>' +
        opts.options.map(function (o) { return '<option>' + o + '</option>'; }).join('') + '</select>';
    } else if (opts.type === 'textarea') {
      inner = '<textarea id="' + opts.id + '" maxlength="2000" placeholder="' + ph + '"' + (opts.req ? ' required' : '') + '></textarea>';
    } else {
      inner = '<input id="' + opts.id + '" type="' + (opts.type || 'text') + '" placeholder="' + ph + '"' + (opts.req ? ' required' : '') + inputmode + pattern + '>';
    }
    return '<div class="fld' + (opts.full ? ' full' : '') + '">' +
      '<label for="' + opts.id + '">' + opts.label + req + '</label>' + inner +
      (opts.hint ? '<span class="hint">' + opts.hint + '</span>' : '') +
      (opts.type === 'textarea' ? '<span class="count" id="' + opts.id + '-count">0 / 2000</span>' : '') +
      '</div>';
  }

  function sanitizeNumericField(field) {
    if (!field) return;
    function keepOnlyDigits() {
      field.value = (field.value || '').replace(/\D/g, '');
    }
    field.addEventListener('input', keepOnlyDigits);
    field.addEventListener('paste', function (e) {
      e.preventDefault();
      var pasted = (e.clipboardData || window.clipboardData).getData('text');
      var digits = (pasted || '').replace(/\D/g, '');
      var start = field.selectionStart || 0;
      var end = field.selectionEnd || 0;
      var text = field.value || '';
      field.value = text.slice(0, start) + digits + text.slice(end);
      field.setSelectionRange(start + digits.length, start + digits.length);
      keepOnlyDigits();
    });
    field.addEventListener('keydown', function (e) {
      var allow = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'Enter', 'Escape'];
      if (allow.indexOf(e.key) !== -1 || e.ctrlKey || e.metaKey || e.altKey) return;
      if (!/^\d$/.test(e.key)) e.preventDefault();
    });
  }

  function viewForm(aud) {
    state.audience = aud;
    setStep(2);
    var A = AUDIENCES[aud];

    var condBlock = '';
    if (aud === 'cliente') {
      condBlock =
        '<div class="pq-grid">' +
        fld({ id: 'f_cliente', label: 'Empresa / cliente al que perteneces', req: true, full: true, ph: 'Escribe el nombre de tu empresa o conjunto', hint: 'Tal como aparece en tu contrato de servicio.' }) +
        fld({ id: 'f_servicio', label: 'N.º de contrato / sede o punto (opcional)', full: true, ph: 'Ej. Sede principal Bogotá · Contrato 00-1234' }) +
        '</div>';
    } else if (aud === 'trabajador') {
      condBlock =
        '<div class="pq-grid">' +
        '<div class="fld full"><label>Tipo de vínculo <span class="req">*</span></label>' +
        '<div class="seg" id="seg-vinculo">' +
          '<button type="button" data-v="operativo">Operativo (vigilante, escolta, K9…)</button>' +
          '<button type="button" data-v="administrativo">Administrativo (contabilidad, talento humano…)</button>' +
        '</div><input type="hidden" id="f_vinculo"></div>' +
        '</div>' +
        '<div class="pq-cond" id="cond-cargo"><div class="pq-cond-inner">' +
          fld({ id: 'f_cargo', label: 'Cargo / área', type: 'select', options: [], req: true, full: true, ph: 'Primero elige el tipo de vínculo' }) +
        '</div></div>' +
        '<div class="pq-cond" id="cond-otrocargo"><div class="pq-cond-inner">' +
          fld({ id: 'f_cargo_otro', label: 'Especifica tu cargo', full: true, ph: 'Escribe tu cargo o área' }) +
        '</div></div>';
    } else {
      condBlock = '<div class="pq-grid">' +
        fld({ id: 'f_relacion', label: 'Tu relación con A1S (opcional)', type: 'select', options: RELACION, full: true, ph: 'Selecciona…' }) +
        '</div>' +
        '<div class="pq-cond" id="cond-otrorel"><div class="pq-cond-inner">' +
          fld({ id: 'f_relacion_otro', label: 'Especifica tu relación con A1S', full: true, ph: 'Cuéntanos brevemente cuál es tu relación con A1S' }) +
        '</div></div>';
    }

    var fileBlock =
      '<div class="fld full" style="margin-top:6px">' +
        '<label>Adjuntar soportes o evidencia <span style="font-weight:500;color:var(--text-muted)">(opcional)</span></label>' +
        '<label class="pq-file" id="filedrop" tabindex="0">' +
          '<input type="file" id="f_files" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png" hidden>' +
          '<span class="pq-file-ic">' + svg('<path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M5 20h14"/>', 26) + '</span>' +
          '<span class="pq-file-main"><b>Haz clic para subir</b> o arrastra tus archivos aquí</span>' +
          '<span class="pq-file-sub">PDF, Word, Excel o imágenes · hasta 10 MB por archivo</span>' +
        '</label>' +
        '<div class="pq-file-list" id="filelist"></div>' +
      '</div>';

    app.innerHTML =
      '<div class="pq-form-wrap">' +
      '<button class="pq-backbtn" id="back">' + svg('<path d="M19 12H5"/><path d="M11 6 5 12l6 6"/>', 16) + ' Cambiar de opción</button>' +
      '<div class="pq-form-card">' +
        '<span class="pq-tag">' + svg(aud === 'cliente' ? I.user : aud === 'trabajador' ? I.badge : I.ext, 16) + ' ' + A.tag + '</span>' +
        '<h2>' + A.title + '</h2><p class="sub">' + A.sub + '</p>' +
        '<form id="pqform" novalidate>' +
          '<div class="pq-grid">' +
            fld({ id: 'f_nombre', label: 'Nombre completo', req: true, ph: 'Nombres y apellidos', full: true }) +
            '<div class="fld"><label for="f_doc">Documento <span class="req">*</span></label>' +
              '<div class="two"><select id="f_tipodoc"><option>CC</option><option>CE</option><option>NIT</option><option>PAS</option></select>' +
              '<input id="f_doc" type="text" inputmode="numeric" pattern="[0-9]*" placeholder="Número de documento" required></div></div>' +
            fld({ id: 'f_tel', label: 'Teléfono / celular', type: 'text', inputmode: 'numeric', pattern: '[0-9]*', ph: '+57 ___ ___ ____', req: true }) +
            fld({ id: 'f_email', label: 'Correo electrónico (opcional)', type: 'email', ph: 'tucorreo@dominio.com', full: true, hint: 'Opcional para notificaciones adicionales; la verificación será por teléfono.' }) +
          '</div>' +
          '<div class="pq-divider"></div>' +
          condBlock +
          '<div class="pq-divider"></div>' +
          '<div class="fld full" style="margin-bottom:18px"><label>Tipo de solicitud <span class="req">*</span></label>' +
            '<div class="seg" id="seg-tipo">' + TIPOS.map(function (t) { return '<button type="button" data-t="' + t + '">' + t + '</button>'; }).join('') + '</div>' +
            '<input type="hidden" id="f_tipo"></div>' +
          '<div class="pq-grid">' +
            fld({ id: 'f_tema', label: 'Asunto / tema de tu solicitud', type: 'select', options: TEMAS[aud], req: true, full: true, ph: 'Selecciona el asunto…', hint: 'Nos permite dirigir tu caso al área competente.' }) +
          '</div>' +
          '<div class="pq-cond" id="cond-otrotema"><div class="pq-cond-inner">' +
            fld({ id: 'f_tema_otro', label: 'Especifica el asunto', full: true, ph: 'Describe brevemente el asunto de tu solicitud' }) +
          '</div></div>' +
          '<div class="pq-grid">' +
            fld({ id: 'f_titulo', label: 'Título de tu solicitud', req: true, full: true, ph: 'Una descripción breve (ej. Demora en la respuesta del supervisor)', hint: 'Resume en una frase de qué se trata.' }) +
            fld({ id: 'f_desc', label: 'Descripción detallada', type: 'textarea', req: true, full: true, ph: 'Cuéntanos qué pasó: fechas, lugar, personas involucradas y lo que esperas de A1S. (Máx. 2000 caracteres)', max: 2000 }) +
          '</div>' +
          fileBlock +
          '<label class="checkrow"><input type="checkbox" id="f_acepto"> <span>Autorizo el tratamiento de mis datos personales conforme a la <a href="#" id="lnk-pol">Política de Protección de Datos</a> de A1S Security Group (Ley 1581 de 2012).</span></label>' +
          '<p class="pq-err hidden" id="formerr"></p>' +
          '<div class="pq-actions">' +
            '<button type="submit" class="btn btn--primary">Continuar ' + svg(I.arrow, 16) + '</button>' +
            '<button type="button" class="btn btn--ghost" id="cancel">Cancelar</button>' +
          '</div>' +
        '</form>' +
      '</div></div>';

    app.querySelector('#back').addEventListener('click', function () { viewSelect(); scrollTop(); });
    app.querySelector('#cancel').addEventListener('click', function () { viewSelect(); scrollTop(); });
    app.querySelector('#lnk-pol').addEventListener('click', function (e) { e.preventDefault(); });
    sanitizeNumericField(app.querySelector('#f_doc'));
    sanitizeNumericField(app.querySelector('#f_tel'));

    // contador textarea
    var ta = app.querySelector('#f_desc'), cnt = app.querySelector('#f_desc-count');
    ta.addEventListener('input', function () {
      var n = ta.value.length; cnt.textContent = n + ' / 2000';
      cnt.classList.toggle('warn', n > 1700 && n <= 2000);
      cnt.classList.toggle('over', n >= 2000);
    });

    // segmented: tipo de solicitud
    bindSeg(app.querySelector('#seg-tipo'), 't', app.querySelector('#f_tipo'));

    // condicionales
    var selTema = app.querySelector('#f_tema'), condTema = app.querySelector('#cond-otrotema');
    if (selTema && condTema) selTema.addEventListener('change', function () { condTema.classList.toggle('open', /Otro/.test(selTema.value)); });
    if (aud === 'externo') {
      var selRel = app.querySelector('#f_relacion'), condRel = app.querySelector('#cond-otrorel');
      selRel.addEventListener('change', function () {
        condRel.classList.toggle('open', /Otro/.test(selRel.value));
      });
    }
    if (aud === 'trabajador') {
      var segV = app.querySelector('#seg-vinculo'), hidV = app.querySelector('#f_vinculo');
      var condCargo = app.querySelector('#cond-cargo'), selCargo = app.querySelector('#f_cargo');
      var condCargoOtro = app.querySelector('#cond-otrocargo');
      selCargo.addEventListener('change', function () { condCargoOtro.classList.toggle('open', /Otro/.test(selCargo.value)); });
      [].forEach.call(segV.querySelectorAll('button'), function (b) {
        b.addEventListener('click', function () {
          [].forEach.call(segV.querySelectorAll('button'), function (x) { x.classList.remove('on'); });
          b.classList.add('on');
          var v = b.getAttribute('data-v'); hidV.value = v;
          selCargo.innerHTML = '<option value="" disabled selected>Selecciona tu cargo…</option>' +
            CARGOS[v].map(function (o) { return '<option>' + o + '</option>'; }).join('');
          condCargo.classList.add('open');
          condCargoOtro.classList.remove('open');
        });
      });
    }

    // adjuntar archivos (soportes / evidencia)
    (function () {
      var input = app.querySelector('#f_files'), drop = app.querySelector('#filedrop'), list = app.querySelector('#filelist');
      if (!input) return;
      var store = [];
      function fmt(b) { if (b < 1024) return b + ' B'; if (b < 1048576) return Math.round(b / 1024) + ' KB'; return (b / 1048576).toFixed(1) + ' MB'; }
      function render() {
        list.innerHTML = store.map(function (f, i) {
          return '<div class="pq-file-item"><span class="pq-file-itemic">' + svg('<path d="M6 2h8l4 4v16H6z"/><path d="M14 2v4h4"/>', 18) + '</span>' +
            '<span class="pq-file-name">' + escapeHtml(f.name) + '</span><span class="pq-file-size">' + fmt(f.size) + '</span>' +
            '<button type="button" class="pq-file-x" data-i="' + i + '" aria-label="Quitar archivo">' + svg('<path d="M6 6l12 12M18 6 6 18"/>', 14) + '</button></div>';
        }).join('');
        [].forEach.call(list.querySelectorAll('.pq-file-x'), function (b) {
          b.addEventListener('click', function () { store.splice(+b.getAttribute('data-i'), 1); render(); });
        });
      }
      function add(files) { for (var i = 0; i < files.length; i++) store.push(files[i]); render(); }
      input.addEventListener('change', function () { add(input.files); input.value = ''; });
      ['dragenter', 'dragover'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.add('drag'); }); });
      ['dragleave', 'drop'].forEach(function (ev) { drop.addEventListener(ev, function (e) { e.preventDefault(); drop.classList.remove('drag'); }); });
      drop.addEventListener('drop', function (e) { if (e.dataTransfer && e.dataTransfer.files) add(e.dataTransfer.files); });
      drop.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); } });
    })();

    app.querySelector('#pqform').addEventListener('submit', function (e) {
      e.preventDefault();
      var err = validateForm(aud);
      var box = app.querySelector('#formerr');
      if (err) { box.textContent = err; box.classList.remove('hidden'); return; }
      box.classList.add('hidden');
      state.email = app.querySelector('#f_email').value.trim();
      state.phone = app.querySelector('#f_tel').value.trim();
      state.formData = {
        nombre: app.querySelector('#f_nombre').value.trim(),
        documento: app.querySelector('#f_tipodoc').value + ' ' + app.querySelector('#f_doc').value.trim(),
        telefono: app.querySelector('#f_tel').value.trim(),
        email: state.email,
        tema: app.querySelector('#f_tema').value.trim(),
        tipo: app.querySelector('#f_tipo').value.trim(),
        titulo: app.querySelector('#f_titulo').value.trim(),
        descripcion: app.querySelector('#f_desc').value.trim()
      };
      viewVerify();
      scrollTop();
    });
  }

  function bindSeg(container, attr, hidden) {
    [].forEach.call(container.querySelectorAll('button'), function (b) {
      b.addEventListener('click', function () {
        [].forEach.call(container.querySelectorAll('button'), function (x) { x.classList.remove('on'); });
        b.classList.add('on'); hidden.value = b.getAttribute('data-' + attr);
      });
    });
  }

  function validateForm(aud) {
    var g = function (id) { var el = app.querySelector('#' + id); return el ? el.value.trim() : ''; };
    if (!g('f_nombre')) return 'Indícanos tu nombre completo.';
    if (!g('f_doc')) return 'Falta el número de documento.';
    var phone = g('f_tel');
    if (!phone) return 'Falta tu teléfono de contacto.';
    if (!/^\d{7,15}$/.test(phone.replace(/\D/g, ''))) return 'Ingresa un número de teléfono válido.';
    var email = g('f_email');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Ingresa un correo electrónico válido.';
    if (aud === 'cliente') {
      if (!g('f_cliente')) return 'Indica la empresa o cliente al que perteneces.';
    }
    if (aud === 'trabajador') {
      if (!g('f_vinculo')) return 'Indícanos si eres personal operativo o administrativo.';
      if (!g('f_cargo')) return 'Selecciona tu cargo o área.';
      if (/Otro/.test(g('f_cargo')) && !g('f_cargo_otro')) return 'Especifica tu cargo.';
    }
    if (aud === 'externo') {
      if (/Otro/.test(g('f_relacion')) && !g('f_relacion_otro')) return 'Especifica tu relación con A1S.';
    }
    if (!g('f_tema')) return 'Selecciona el asunto o tema de tu solicitud.';
    if (/Otro/.test(g('f_tema')) && !g('f_tema_otro')) return 'Especifica el asunto de tu solicitud.';
    if (!g('f_tipo')) return 'Selecciona el tipo de solicitud (Petición, Queja, Reclamo…).';
    if (!g('f_titulo')) return 'Escribe un título para tu solicitud.';
    if (!g('f_desc')) return 'Describe tu solicitud con un poco más de detalle.';
    if (!app.querySelector('#f_acepto').checked) return 'Debes autorizar el tratamiento de datos para continuar.';
    return null;
  }

  /* ── Vista: verificación de correo ── */
  function viewVerify() {
    setStep(3);
    var code = String(Math.floor(100000 + Math.random() * 900000));
    state.verificationCode = code;
    if (typeof window !== 'undefined' && window.fetch) {
      var verificationPayload = (window.A1SPQRSRouting && window.A1SPQRSRouting.buildVerificationSmsPayload)
        ? window.A1SPQRSRouting.buildVerificationSmsPayload(state.phone, code)
        : { to: state.phone, body: 'A1S CODIGO: ' + code };
      window.fetch('/api/pqrs/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(verificationPayload)
      }).then(function (response) {
        return response.json().catch(function () { return {}; });
      }).then(function (data) {
        if (!data || data.ok !== true) {
          feedback.textContent = 'El código no pudo enviarse por SMS automáticamente. Usa el código mostrado arriba para continuar.';
        }
      }).catch(function () {
        feedback.textContent = 'No se pudo contactar con el servidor para enviar el SMS. Usa el código mostrado arriba para continuar.';
      });
    }

    app.innerHTML =
      '<div class="pq-form-wrap"><div class="pq-form-card pq-verify">' +
        '<div class="mail-ic">' + svg(I.mail, 34) + '</div>' +
        '<h2>Verificación por teléfono</h2>' +
        '<p>Hemos enviado un código de 6 dígitos al número <span class="mailaddr">' + escapeHtml(state.phone || state.email) + '</span>. Ingrésalo para continuar con la radicación de tu solicitud.</p>' +
        '<div class="otp" id="otp">' + Array.apply(null, { length: 6 }).map(function () {
          return '<input inputmode="numeric" maxlength="1" autocomplete="one-time-code">';
        }).join('') + '</div>' +
        '<p class="pq-err" id="otperr">Código de verificación: <strong>' + code + '</strong>. Si el SMS no llega, ingrésalo aquí.</p>' +
        '<p class="pq-resend">¿No te llegó? <button id="resend" disabled>Reenviar código <span id="timer">(30s)</span></button></p>' +
        '<div class="pq-actions" style="justify-content:center">' +
          '<button class="btn btn--primary" id="verify">Verificar y radicar</button>' +
          '<button class="btn btn--ghost" id="vback">Volver</button>' +
        '</div>' +
        '<p style="font-size:.78rem;color:var(--text-muted);margin-top:18px">El código será enviado al número indicado para validar la identidad del solicitante.</p>' +
      '</div></div>';

    var feedback = app.querySelector('#otperr');
    var inputs = [].slice.call(app.querySelectorAll('#otp input'));
    inputs[0].focus();
    inputs.forEach(function (inp, i) {
      inp.addEventListener('input', function () {
        inp.value = inp.value.replace(/\D/g, '');
        inp.classList.toggle('filled', !!inp.value);
        if (inp.value && i < 5) inputs[i + 1].focus();
      });
      inp.addEventListener('keydown', function (e) {
        if (e.key === 'Backspace' && !inp.value && i > 0) inputs[i - 1].focus();
      });
      inp.addEventListener('paste', function (e) {
        var d = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 6);
        if (!d) return; e.preventDefault();
        d.split('').forEach(function (ch, k) { if (inputs[k]) { inputs[k].value = ch; inputs[k].classList.add('filled'); } });
        (inputs[d.length] || inputs[5]).focus();
      });
    });

    // temporizador de reenvío
    var t = 30, timerEl = app.querySelector('#timer'), resend = app.querySelector('#resend');
    var iv = setInterval(function () {
      t--; if (t <= 0) { clearInterval(iv); resend.disabled = false; timerEl.textContent = ''; }
      else timerEl.textContent = '(' + t + 's)';
    }, 1000);
    resend.addEventListener('click', function () {
      if (resend.disabled) return; t = 30; resend.disabled = true; timerEl.textContent = '(30s)';
      iv = setInterval(function () { t--; if (t <= 0) { clearInterval(iv); resend.disabled = false; timerEl.textContent = ''; } else timerEl.textContent = '(' + t + 's)'; }, 1000);
    });

    app.querySelector('#vback').addEventListener('click', function () { clearInterval(iv); viewForm(state.audience); scrollTop(); });
    app.querySelector('#verify').addEventListener('click', function () {
      var code = inputs.map(function (x) { return x.value; }).join('');
      if (code.length < 6) { app.querySelector('#otperr').classList.remove('hidden'); return; }
      if (String(code) !== String(state.verificationCode)) {
        app.querySelector('#otperr').textContent = 'El código ingresado no coincide. Revisa el teléfono y vuelve a intentarlo.';
        app.querySelector('#otperr').classList.remove('hidden');
        return;
      }
      clearInterval(iv);
      var data = state.formData || {};
      var recipient = (window.A1SPQRSRouting && window.A1SPQRSRouting.getPqrsRecipient)
        ? window.A1SPQRSRouting.getPqrsRecipient(state.audience, data.tema || '', data.tipo || '')
        : { name: 'Vforeo', email: 'vforero@a1scolombia.com' };
      var subject = 'PQRS A1S - ' + (data.titulo || 'Solicitud');
      var body = [
        'Perfil: ' + (state.audience || 'No definido'),
        'Nombre: ' + (data.nombre || ''),
        'Documento: ' + (data.documento || ''),
        'Correo: ' + (data.email || ''),
        'Teléfono: ' + (data.telefono || ''),
        'Asunto: ' + (data.tema || ''),
        'Tipo: ' + (data.tipo || ''),
        'Título: ' + (data.titulo || ''),
        'Descripción: ' + (data.descripcion || '')
      ].join('\n');

      if (typeof window !== 'undefined' && window.fetch) {
        window.fetch('/api/pqrs/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify((window.A1SPQRSRouting && window.A1SPQRSRouting.buildPqrsEmailContent)
            ? window.A1SPQRSRouting.buildPqrsEmailContent({ recipient: recipient, subject: subject, body: body })
            : { to: recipient.email, subject: subject, text: body })
        }).catch(function () {});
      }

      viewDone(); scrollTop();
    });
  }

  /* ── Vista: éxito ── */
  function viewDone() {
    setStep(4);
    var rad = 'A1S-' + new Date().getFullYear() + '-' + String(Math.floor(100000 + Math.random() * 899999));
    var data = state.formData || {};
    app.innerHTML =
      '<div class="pq-form-wrap"><div class="pq-form-card pq-done">' +
        '<div class="ok">' + svg(I.check, 40) + '</div>' +
        '<h2>¡Tu PQRS ha sido validada correctamente!</h2>' +
        '<p>Hemos recibido la información proporcionada y la solicitud ha quedado registrada en nuestro sistema. A partir de este momento, tu caso será atendido conforme a los tiempos establecidos por la normativa aplicable.</p>' +
        '<div class="pq-radicado"><span class="lbl">Número de radicado</span><span class="num">' + rad + '</span></div>' +
        '<div class="pq-actions" style="justify-content:center">' +
          '<button class="btn btn--primary" id="d-new">Radicar otra solicitud</button>' +
          '<a class="btn btn--ghost" href="index.html">Volver al sitio</a>' +
        '</div>' +
      '</div></div>';
    app.querySelector('#d-new').addEventListener('click', function () { state = { audience: null, email: '', phone: '' }; viewSelect(); scrollTop(); });
  }

  /* ── Vista: validar estado (solo visual) ── */
  function viewEstado() {
    setStep(1);
    app.innerHTML =
      '<div class="pq-form-wrap">' +
      '<button class="pq-backbtn" id="back">' + svg('<path d="M19 12H5"/><path d="M11 6 5 12l6 6"/>', 16) + ' Cambiar de opción</button>' +
      '<div class="pq-form-card">' +
        '<span class="pq-tag">' + svg(I.track, 16) + ' Estado de tu PQRS</span>' +
        '<h2>Consulta tu solicitud</h2><p class="sub">Ingresa los datos de la solicitud para ver su avance en tiempo real.</p>' +
        '<form id="estform" novalidate><div class="pq-grid">' +
          fld({ id: 'e_rad', label: 'N° de solicitud / radicado', req: true, full: true, ph: 'Ej. A1S-2026-123456' }) +
          fld({ id: 'e_doc', label: 'C.C. / NIT', req: true, full: true, ph: 'Número de documento' }) +
          fld({ id: 'e_tel', label: 'Teléfono', req: true, ph: '+57 ___ ___ ____' }) +
          fld({ id: 'e_email', label: 'Correo electrónico', type: 'email', req: true, full: true, ph: 'tucorreo@dominio.com' }) +
          fld({ id: 'e_asunto', label: 'Asunto', req: true, full: true, ph: 'Ej. Queja por atención o servicio' }) +
          fld({ id: 'e_fecha', label: 'Fecha', type: 'date', req: true }) +
        '</div>' +
        '<p class="pq-err hidden" id="esterr"></p>' +
        '<div class="pq-actions"><button type="submit" class="btn btn--primary">Consultar ' + svg(I.arrow, 16) + '</button></div>' +
        '</form>' +
        '<div id="estresult"></div>' +
      '</div></div>';
    app.querySelector('#back').addEventListener('click', function () { viewSelect(); scrollTop(); });
    app.querySelector('#estform').addEventListener('submit', function (e) {
      e.preventDefault();
      var rad = app.querySelector('#e_rad').value.trim();
      var doc = app.querySelector('#e_doc').value.trim();
      var tel = app.querySelector('#e_tel').value.trim();
      var email = app.querySelector('#e_email').value.trim();
      var asunto = app.querySelector('#e_asunto').value.trim();
      var fecha = app.querySelector('#e_fecha').value.trim();
      var box = app.querySelector('#esterr');
      if (!rad || !doc || !tel || !email || !asunto || !fecha) {
        box.textContent = 'Completa todos los campos para consultar la solicitud.';
        box.classList.remove('hidden');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        box.textContent = 'Ingresa un correo electrónico válido.';
        box.classList.remove('hidden');
        return;
      }
      box.classList.add('hidden');
      renderTrack(rad, { doc: doc, tel: tel, email: email, asunto: asunto, fecha: fecha });
    });
  }

  function renderTrack(rad, meta) {
    var steps = [
      ['done', 'Recibida', 'Tu solicitud fue radicada correctamente.', 'Hoy · 09:14'],
      ['done', 'En clasificación', 'Asignada al área de Servicio al Cliente.', 'Hoy · 10:02'],
      ['cur', 'En gestión', 'Un analista está revisando tu caso.', 'En curso'],
      ['', 'Respondida', 'Recibirás la respuesta en tu correo.', 'Pendiente']
    ];
    var info = meta || {};
    app.querySelector('#estresult').innerHTML =
      '<div class="pq-divider"></div>' +
      '<div style="display:grid;gap:6px;font-size:.9rem;color:var(--text-muted);margin:0 0 12px">' +
        '<div><b style="color:var(--text)">N° de solicitud:</b> ' + escapeHtml(rad) + '</div>' +
        '<div><b style="color:var(--text)">C.C. / NIT:</b> ' + escapeHtml(info.doc || '') + '</div>' +
        '<div><b style="color:var(--text)">Teléfono:</b> ' + escapeHtml(info.tel || '') + '</div>' +
        '<div><b style="color:var(--text)">Correo:</b> ' + escapeHtml(info.email || '') + '</div>' +
        '<div><b style="color:var(--text)">Asunto:</b> ' + escapeHtml(info.asunto || '') + '</div>' +
        '<div><b style="color:var(--text)">Fecha:</b> ' + escapeHtml(info.fecha || '') + '</div>' +
      '</div>' +
      '<p style="font-size:.85rem;color:var(--text-muted);margin:0 0 4px">Tipo: Queja · SLA: 15 días hábiles</p>' +
      '<div class="pq-track">' + steps.map(function (s, i) {
        var last = i === steps.length - 1;
        return '<div class="row ' + s[0] + '"><div class="dotcol"><span class="dot">' + (s[0] === 'done' ? svg(I.check, 16) : (i + 1)) + '</span>' +
          (last ? '' : '<span class="line"></span>') + '</div>' +
          '<div class="txt"><h4>' + s[1] + '</h4><p>' + s[2] + '</p><div class="when">' + s[3] + '</div></div></div>';
      }).join('') + '</div>';
  }

  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]; }); }

  viewSelect();
})();
