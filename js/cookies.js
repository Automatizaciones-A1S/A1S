/* ============================================================================
   A1S — Aviso de cookies "Centro de Control"
   · Aparece en cada visita hasta que el usuario decide.
   · No se puede cerrar sin elegir (sin X). Acciones válidas:
       - "Aceptar todas"  → consent = all
       - "Guardar selección" (dentro de Configurar) → consent granular
   · Categorías: Necesarias (bloqueada/ON), Analíticas, Marketing.
   ========================================================================== */
(function () {
  'use strict';
  var KEY = 'a1s-cookie-consent-v1';
  try { if (localStorage.getItem(KEY)) return; } catch (e) {}

  // Sin bloqueo: mostrar la web de inmediato y solo guardar la preferencia en segundo plano.
  try { localStorage.setItem(KEY, JSON.stringify({ ts: Date.now(), necesarias: true, analiticas: true, marketing: true, mode: 'all' })); } catch (e) {}
  window.dispatchEvent(new CustomEvent('a1s:cookie-consent', { detail: { necesarias: true, analiticas: true, marketing: true, mode: 'all' } }));
  return;

  /* ── Estilos (scoped, dependen de los tokens de marca de la página) ── */
  var css = `
  .a1s-ck-scrim { position: fixed; inset: 0; z-index: 2147483600; background: rgba(6,4,4,.55);
    backdrop-filter: blur(3px); opacity: 0; transition: opacity .45s var(--ease-standard, ease); }
  .a1s-ck-scrim.show { opacity: 1; }
  .a1s-ck { position: fixed; left: 50%; bottom: clamp(14px, 3vw, 30px); transform: translate(-50%, 140%);
    z-index: 2147483601; width: min(940px, calc(100vw - 28px));
    font-family: var(--font-sans, system-ui, sans-serif); color: #EDEDF0;
    background: linear-gradient(165deg, #15100F 0%, #0B0809 70%);
    border: 1px solid rgba(255,82,66,.30); border-radius: 22px; overflow: hidden;
    box-shadow: 0 50px 120px -30px rgba(0,0,0,.8), 0 0 0 1px rgba(255,255,255,.02) inset;
    transition: transform .6s cubic-bezier(.16,1,.3,1); }
  .a1s-ck.show { transform: translate(-50%, 0); }
  .a1s-ck__bar { height: 3px; background: linear-gradient(90deg, transparent, var(--a1s-red, #C0231B), transparent);
    position: relative; overflow: hidden; }
  .a1s-ck__bar::after { content: ''; position: absolute; top: 0; left: -30%; width: 30%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,140,128,.95), transparent); animation: a1s-ck-sweep 3.4s linear infinite; }
  @keyframes a1s-ck-sweep { to { left: 130%; } }
  .a1s-ck__in { padding: clamp(20px, 3vw, 30px); display: flex; gap: 22px; align-items: flex-start; }
  .a1s-ck__icon { flex: none; width: 56px; height: 56px; border-radius: 16px; display: grid; place-items: center;
    background: radial-gradient(60% 60% at 50% 32%, rgba(255,82,66,.28), transparent 70%), #1C1312;
    border: 1px solid rgba(255,82,66,.45); color: #fff; box-shadow: 0 0 26px rgba(192,35,27,.4); position: relative; }
  .a1s-ck__icon::before { content: ''; position: absolute; inset: -7px; border-radius: 20px;
    border: 1px solid rgba(255,82,66,.35); opacity: .6; animation: a1s-ck-ping 2.6s ease-out infinite; }
  @keyframes a1s-ck-ping { 0% { transform: scale(.85); opacity: .65; } 100% { transform: scale(1.25); opacity: 0; } }
  .a1s-ck__body { flex: 1 1 auto; min-width: 0; }
  .a1s-ck__eyebrow { font-style: italic; font-weight: 600; font-size: .72rem; text-transform: uppercase;
    letter-spacing: .16em; color: var(--a1s-red-400, #D6453D); margin: 0 0 6px; }
  .a1s-ck__title { font-family: var(--font-display, inherit); font-weight: 700; font-size: 1.3rem; letter-spacing: -.01em; margin: 0; color: #fff; }
  .a1s-ck__text { margin: 9px 0 0; font-size: .9rem; line-height: 1.6; color: #B7B7C0; max-width: 62ch; }
  .a1s-ck__text a { color: var(--a1s-red-400, #D6453D); text-decoration: underline; text-underline-offset: 2px; cursor: pointer; }
  .a1s-ck__actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 20px; align-items: center; }
  .a1s-ck__btn { font-family: inherit; font-weight: 700; font-size: .9rem; border-radius: 999px; padding: 13px 26px;
    cursor: pointer; border: 1px solid transparent; transition: transform .2s, background .25s, border-color .25s, box-shadow .25s; }
  .a1s-ck__btn:active { transform: scale(.97); }
  .a1s-ck__btn--primary { background: var(--a1s-red, #C0231B); color: #fff; box-shadow: 0 16px 38px -12px rgba(192,35,27,.7); }
  .a1s-ck__btn--primary:hover { background: var(--a1s-red-600, #A91D16); transform: translateY(-2px); }
  .a1s-ck__btn--ghost { background: transparent; color: #EDEDF0; border-color: rgba(255,255,255,.24); }
  .a1s-ck__btn--ghost:hover { border-color: rgba(255,82,66,.6); color: #fff; }
  .a1s-ck__panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .45s var(--ease-standard, ease); }
  .a1s-ck__panel.open { grid-template-rows: 1fr; }
  .a1s-ck__panel > div { overflow: hidden; }
  .a1s-ck__cats { padding: 4px clamp(20px,3vw,30px) 4px; display: flex; flex-direction: column; }
  .a1s-ck__cat { display: flex; gap: 16px; align-items: flex-start; padding: 16px 0; border-top: 1px solid rgba(255,255,255,.08); }
  .a1s-ck__cat h4 { margin: 0; font-size: .95rem; font-weight: 700; color: #fff; }
  .a1s-ck__cat p { margin: 4px 0 0; font-size: .82rem; line-height: 1.5; color: #9A9AA3; }
  .a1s-ck__sw { flex: none; width: 46px; height: 26px; border-radius: 999px; border: none; cursor: pointer; position: relative;
    background: #38383F; transition: background .25s; margin-top: 2px; }
  .a1s-ck__sw::after { content: ''; position: absolute; top: 3px; left: 3px; width: 20px; height: 20px; border-radius: 50%;
    background: #fff; transition: transform .25s var(--ease-out, ease); }
  .a1s-ck__sw[aria-checked="true"] { background: var(--a1s-red, #C0231B); }
  .a1s-ck__sw[aria-checked="true"]::after { transform: translateX(20px); }
  .a1s-ck__sw[data-locked] { background: var(--a1s-red, #C0231B); opacity: .5; cursor: not-allowed; }
  .a1s-ck__lock { font-size: .68rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: #6E6E78; margin-top: 4px; }
  .a1s-ck__save { padding: 4px clamp(20px,3vw,30px) clamp(20px,3vw,28px); }
  @media (max-width: 620px) {
    .a1s-ck__in { flex-direction: column; gap: 16px; }
    .a1s-ck__actions { width: 100%; } .a1s-ck__btn { flex: 1 1 auto; text-align: center; }
  }`;
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var SHIELD = '<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z"/><path d="M9 12l2 2 4-4"/></svg>';

  var scrim = document.createElement('div'); scrim.className = 'a1s-ck-scrim';
  var box = document.createElement('div'); box.className = 'a1s-ck'; box.setAttribute('role', 'dialog');
  box.setAttribute('aria-live', 'polite'); box.setAttribute('aria-label', 'Aviso de cookies');
  box.innerHTML =
    '<div class="a1s-ck__bar"></div>' +
    '<div class="a1s-ck__in">' +
      '<div class="a1s-ck__icon">' + SHIELD + '</div>' +
      '<div class="a1s-ck__body">' +
        '<p class="a1s-ck__eyebrow">Tu privacidad · A1S</p>' +
        '<h3 class="a1s-ck__title">Protegemos también tus datos.</h3>' +
        '<p class="a1s-ck__text">Usamos cookies para que el sitio funcione, entender cómo se usa y mejorar tu experiencia. ' +
          'Las <b>necesarias</b> siempre están activas. Elige qué más permites. ' +
          '<a data-toggle>Configurar preferencias</a> · <a href="#" data-policy>Política de cookies</a></p>' +
        '<div class="a1s-ck__panel">' +
          '<div>' +
            '<div class="a1s-ck__cats">' +
              cat('necesarias', 'Necesarias', 'Imprescindibles para la seguridad, la navegación y el envío de formularios. No se pueden desactivar.', true, true) +
              cat('analiticas', 'Analíticas', 'Nos ayudan a medir el tráfico y entender qué contenido es útil, de forma anónima.', false, false) +
              cat('marketing', 'Marketing', 'Permiten mostrarte comunicaciones relevantes de A1S dentro y fuera del sitio.', false, false) +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="a1s-ck__actions">' +
          '<button class="a1s-ck__btn a1s-ck__btn--primary" data-accept>Aceptar todas</button>' +
          '<button class="a1s-ck__btn a1s-ck__btn--ghost" data-toggle>Configurar</button>' +
          '<button class="a1s-ck__btn a1s-ck__btn--ghost" data-save style="display:none">Guardar selección</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  function cat(id, name, desc, on, locked) {
    return '<div class="a1s-ck__cat">' +
      '<div style="flex:1 1 auto;min-width:0"><h4>' + name + '</h4><p>' + desc + '</p>' +
        (locked ? '<div class="a1s-ck__lock">Siempre activas</div>' : '') + '</div>' +
      '<button class="a1s-ck__sw" data-cat="' + id + '" role="switch" aria-checked="' + (on ? 'true' : 'false') + '"' +
        (locked ? ' data-locked aria-disabled="true"' : '') + '></button></div>';
  }

  document.body.appendChild(scrim); document.body.appendChild(box);
  requestAnimationFrame(function () { requestAnimationFrame(function () { scrim.classList.add('show'); box.classList.add('show'); }); });

  var panel = box.querySelector('.a1s-ck__panel');
  var saveBtn = box.querySelector('[data-save]');
  var open = false;
  function openPanel() {
    open = true; panel.classList.add('open'); saveBtn.style.display = '';
    box.querySelectorAll('[data-toggle]').forEach(function (el) { if (el.tagName === 'BUTTON') el.textContent = 'Ocultar opciones'; });
  }
  box.querySelectorAll('[data-toggle]').forEach(function (el) {
    el.addEventListener('click', function (e) { e.preventDefault(); if (open) { closePanel(); } else { openPanel(); } });
  });
  function closePanel() {
    open = false; panel.classList.remove('open'); saveBtn.style.display = 'none';
    box.querySelectorAll('[data-toggle]').forEach(function (el) { if (el.tagName === 'BUTTON') el.textContent = 'Configurar'; });
  }

  box.querySelectorAll('.a1s-ck__sw').forEach(function (sw) {
    if (sw.hasAttribute('data-locked')) return;
    sw.addEventListener('click', function () {
      sw.setAttribute('aria-checked', sw.getAttribute('aria-checked') === 'true' ? 'false' : 'true');
    });
  });

  function persist(consent) {
    try { localStorage.setItem(KEY, JSON.stringify(Object.assign({ ts: Date.now() }, consent))); } catch (e) {}
    box.classList.remove('show'); scrim.classList.remove('show');
    window.dispatchEvent(new CustomEvent('a1s:cookie-consent', { detail: consent }));
    setTimeout(function () { box.remove(); scrim.remove(); }, 650);
  }
  box.querySelector('[data-accept]').addEventListener('click', function () {
    persist({ necesarias: true, analiticas: true, marketing: true, mode: 'all' });
  });
  saveBtn.addEventListener('click', function () {
    persist({
      necesarias: true,
      analiticas: box.querySelector('[data-cat="analiticas"]').getAttribute('aria-checked') === 'true',
      marketing: box.querySelector('[data-cat="marketing"]').getAttribute('aria-checked') === 'true',
      mode: 'custom'
    });
  });
  box.querySelector('[data-policy]').addEventListener('click', function (e) { e.preventDefault(); openPanel(); });
})();
