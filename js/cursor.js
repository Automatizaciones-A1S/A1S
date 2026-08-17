/* ============================================================================
   A1S — Cursor Walkie-Talkie 3D
   Three.js. Reemplaza la flecha nativa en desktop (fine pointer) por un
   walkie-talkie negro mate realista que sigue el mouse, se inclina con el
   movimiento y enciende su antena/LED al pasar sobre botones y links.
   Fallbacks: touch / coarse pointer / sin WebGL / reduced-motion → cursor nativo.
   API global: window.A1SCursor.setConfig({ color, accent, scale, model, enabled })
   ========================================================================== */
(function () {
  'use strict';

  var prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  var hasWebGL = (function () {
    try { var c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))); }
    catch (e) { return false; }
  })();

  // Configuración por defecto (mutable vía Tweaks)
  var CFG = {
    enabled: true,
    color: '#15151b',     // cuerpo negro mate
    accent: '#C0231B',    // rojo de marca
    scale: 1.0,
    model: 'pro',         // 'pro' | 'compact' | 'antena'
    tilt: 1.0,            // intensidad de inclinación
  };

  // Si no aplica, no hacemos nada (cursor nativo intacto)
  if (!fine || !hasWebGL || typeof THREE === 'undefined') {
    window.A1SCursor = { setConfig: function () {}, unsupported: true };
    return;
  }

  // ---- DOM / canvas --------------------------------------------------------
  var canvas = document.createElement('canvas');
  canvas.id = 'a1s-cursor-canvas';
  Object.assign(canvas.style, {
    position: 'fixed', inset: '0', width: '100vw', height: '100vh',
    pointerEvents: 'none', zIndex: '2147483646',
  });
  document.documentElement.appendChild(canvas);
  // Anillo de "radar" 2D (DOM) que se dispara al hacer click
  var ring = document.createElement('div');
  ring.id = 'a1s-cursor-ring';
  document.documentElement.appendChild(ring);

  function applyCursorHidden(on) {
    document.documentElement.classList.toggle('a1s-cursor-on', on);
  }

  // ---- Three.js setup ------------------------------------------------------
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(window.innerWidth, window.innerHeight, false);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(32, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 8);

  // Luces — clave + relleno frío + rim rojo (look premium)
  var key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(-3, 5, 6); scene.add(key);
  var fill = new THREE.DirectionalLight(0x99aaff, 0.5); fill.position.set(4, -2, 3); scene.add(fill);
  var rim = new THREE.DirectionalLight(0xff3b30, 1.1); rim.position.set(2, 1, -4); scene.add(rim);
  scene.add(new THREE.AmbientLight(0x404049, 0.7));

  // ---- Materiales ----------------------------------------------------------
  function makeMaterials() {
    return {
      body: new THREE.MeshStandardMaterial({ color: new THREE.Color(CFG.color), roughness: 0.62, metalness: 0.28 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x0a0a0d, roughness: 0.85, metalness: 0.15 }),
      metal: new THREE.MeshStandardMaterial({ color: 0x33333a, roughness: 0.35, metalness: 0.85 }),
      grille: new THREE.MeshStandardMaterial({ color: 0x202026, roughness: 0.7, metalness: 0.4 }),
      screen: new THREE.MeshStandardMaterial({ color: 0x0c1f18, roughness: 0.25, metalness: 0.1, emissive: 0x0d3a26, emissiveIntensity: 0.6 }),
      accent: new THREE.MeshStandardMaterial({ color: new THREE.Color(CFG.accent), roughness: 0.5, metalness: 0.2 }),
      led: new THREE.MeshStandardMaterial({ color: new THREE.Color(CFG.accent), emissive: new THREE.Color(CFG.accent), emissiveIntensity: 0.5, roughness: 0.3 }),
    };
  }
  var MAT = makeMaterials();

  // ---- Construcción del walkie-talkie -------------------------------------
  var walkie = new THREE.Group();
  var ledMesh = null, ledLight = null, screenMesh = null;

  function roundedBox(w, h, d, r) {
    // Aproximación de caja con bordes suaves usando BoxGeometry + bevel falso por escala.
    var g = new THREE.BoxGeometry(w, h, d, 1, 1, 1);
    return g;
  }

  function buildWalkie() {
    // Limpiar
    while (walkie.children.length) walkie.remove(walkie.children[0]);
    ledMesh = ledLight = screenMesh = null;

    var compact = CFG.model === 'compact';
    var bodyH = compact ? 2.0 : 2.6;
    var bodyW = compact ? 1.05 : 1.0;
    var bodyD = 0.5;

    // Cuerpo principal
    var body = new THREE.Mesh(roundedBox(bodyW, bodyH, bodyD), MAT.body);
    walkie.add(body);

    // Bisel frontal (placa ligeramente sobresalida)
    var face = new THREE.Mesh(new THREE.BoxGeometry(bodyW * 0.86, bodyH * 0.92, 0.06), MAT.dark);
    face.position.set(0, 0, bodyD / 2 + 0.01);
    walkie.add(face);

    // Rejilla del altavoz (líneas) — parte superior frontal
    var grilleGroup = new THREE.Group();
    var lines = 5;
    for (var i = 0; i < lines; i++) {
      var gl = new THREE.Mesh(new THREE.BoxGeometry(bodyW * 0.6, 0.045, 0.04), MAT.grille);
      gl.position.set(0, (bodyH * 0.30) + (i - lines / 2) * 0.10, bodyD / 2 + 0.05);
      grilleGroup.add(gl);
    }
    walkie.add(grilleGroup);

    // Pantalla pequeña (verde monitor) — debajo de la rejilla
    screenMesh = new THREE.Mesh(new THREE.BoxGeometry(bodyW * 0.62, 0.42, 0.04), MAT.screen);
    screenMesh.position.set(0, bodyH * 0.05, bodyD / 2 + 0.05);
    walkie.add(screenMesh);

    // Perilla de canal (arriba)
    var knob = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.34, 24), MAT.metal);
    knob.position.set(bodyW * 0.22, bodyH / 2 + 0.06, 0);
    walkie.add(knob);
    var knob2 = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.12, 0.28, 20), MAT.metal);
    knob2.position.set(-bodyW * 0.18, bodyH / 2 + 0.04, 0);
    walkie.add(knob2);

    // Antena (cilindro inclinable) — sale por la esquina superior izquierda
    var antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.10, 1.5, 16), MAT.dark);
    antenna.position.set(-bodyW * 0.42, bodyH / 2 + 0.75, -0.02);
    antenna.rotation.z = 0.12;
    walkie.add(antenna);
    var antTip = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), MAT.body);
    antTip.position.set(-bodyW * 0.42 - 0.18, bodyH / 2 + 1.5, -0.02);
    walkie.add(antTip);

    // LED indicador (encima de la rejilla) — se enciende al hover
    ledMesh = new THREE.Mesh(new THREE.SphereGeometry(0.085, 18, 18), MAT.led.clone());
    ledMesh.position.set(0, bodyH * 0.42, bodyD / 2 + 0.06);
    walkie.add(ledMesh);
    ledLight = new THREE.PointLight(new THREE.Color(CFG.accent), 0, 3);
    ledLight.position.set(0, bodyH * 0.42, bodyD / 2 + 0.5);
    walkie.add(ledLight);

    // Botón PTT lateral (rojo de marca)
    var ptt = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.55, 0.30), MAT.accent);
    ptt.position.set(-bodyW / 2 - 0.02, bodyH * 0.12, 0);
    walkie.add(ptt);

    // Botones inferiores (teclado)
    for (var bx = -1; bx <= 1; bx++) {
      for (var by = 0; by < 2; by++) {
        var btn = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.05), MAT.metal);
        btn.position.set(bx * 0.26, -bodyH * 0.28 - by * 0.26, bodyD / 2 + 0.04);
        walkie.add(btn);
      }
    }

    // Clip trasero
    var clip = new THREE.Mesh(new THREE.BoxGeometry(0.14, bodyH * 0.5, 0.10), MAT.dark);
    clip.position.set(0, -bodyH * 0.05, -bodyD / 2 - 0.06);
    walkie.add(clip);

    // Escala / orientación base — ligeramente girado para dar volumen 3D
    walkie.scale.setScalar(0.34 * CFG.scale);
    walkie.rotation.set(-0.12, -0.5, 0.05);
  }
  buildWalkie();
  scene.add(walkie);

  // ---- Seguimiento del mouse ----------------------------------------------
  var target = { x: -100, y: -100 }; // px
  var pos = { x: -100, y: -100 };
  var vel = { x: 0, y: 0 };
  var hovered = false;
  var active = false; // hay actividad de puntero
  var visible = false;

  function planeSize() {
    var dist = camera.position.z;
    var h = 2 * Math.tan((camera.fov * Math.PI / 180) / 2) * dist;
    var w = h * camera.aspect;
    return { w: w, h: h };
  }

  function onMove(e) {
    target.x = e.clientX; target.y = e.clientY;
    if (!visible) { visible = true; applyCursorHidden(CFG.enabled); }
    active = true;
    var t = e.target;
    var interactive = t && t.closest && t.closest('a, button, input, textarea, select, label, [data-cursor="link"], .a1s-int');
    hovered = !!interactive;
  }
  window.addEventListener('mousemove', onMove, { passive: true });
  window.addEventListener('mouseout', function (e) { if (!e.relatedTarget) { visible = false; applyCursorHidden(false); } });
  window.addEventListener('mousedown', function () {
    // anillo de radar
    ring.style.left = target.x + 'px'; ring.style.top = target.y + 'px';
    ring.classList.remove('go'); void ring.offsetWidth; ring.classList.add('go');
  });

  // ---- Resize --------------------------------------------------------------
  function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);

  // ---- Loop ----------------------------------------------------------------
  var clock = new THREE.Clock();
  var ledI = 0;       // intensidad actual del LED
  var blinkT = 0;
  function tick() {
    requestAnimationFrame(tick);
    var dt = Math.min(clock.getDelta(), 0.05);
    var t = clock.elapsedTime;

    // Suavizado de posición
    var ease = prefersReduce ? 1 : 0.22;
    var nx = pos.x + (target.x - pos.x) * ease;
    var ny = pos.y + (target.y - pos.y) * ease;
    vel.x = nx - pos.x; vel.y = ny - pos.y;
    pos.x = nx; pos.y = ny;

    // px → mundo (plano z=0)
    var ps = planeSize();
    var wx = (pos.x / window.innerWidth - 0.5) * ps.w;
    var wy = -(pos.y / window.innerHeight - 0.5) * ps.h;
    // offset: el "hotspot" es la punta de la antena (arriba-izq), bajamos el cuerpo
    walkie.position.x = wx + ps.w * 0.012;
    walkie.position.y = wy - ps.h * 0.045;

    // Inclinación según velocidad + bob de vida
    if (!prefersReduce) {
      var leanZ = THREE.MathUtils.clamp(-vel.x * 0.012, -0.5, 0.5) * CFG.tilt;
      var leanX = THREE.MathUtils.clamp(vel.y * 0.010, -0.4, 0.4) * CFG.tilt;
      walkie.rotation.z += (0.05 + leanZ - walkie.rotation.z) * 0.12;
      walkie.rotation.x += (-0.12 + leanX - walkie.rotation.x) * 0.12;
      walkie.rotation.y += ((-0.5 + Math.sin(t * 0.8) * 0.10) - walkie.rotation.y) * 0.05;
      walkie.position.y += Math.sin(t * 2.2) * ps.h * 0.0015;
    }

    // LED: encendido en hover, parpadeo sutil en idle
    blinkT += dt;
    var targetLed;
    if (hovered) {
      targetLed = 1.0;
    } else {
      targetLed = 0.18 + (Math.sin(blinkT * 3.0) > 0.6 ? 0.25 : 0); // "blip" ocasional
    }
    ledI += (targetLed - ledI) * 0.18;
    if (ledMesh) ledMesh.material.emissiveIntensity = 0.4 + ledI * 2.6;
    if (ledLight) ledLight.intensity = ledI * 2.2;
    // micro-escala al hover
    var sc = (0.34 * CFG.scale) * (hovered ? 1.12 : 1.0);
    walkie.scale.x += (sc - walkie.scale.x) * 0.18;
    walkie.scale.y = walkie.scale.z = walkie.scale.x;
    // pantalla viva
    if (screenMesh) screenMesh.material.emissiveIntensity = 0.45 + (Math.sin(t * 1.5) * 0.5 + 0.5) * 0.4;

    renderer.render(scene, camera);
  }
  tick();

  // ---- API pública ---------------------------------------------------------
  window.A1SCursor = {
    setConfig: function (next) {
      var rebuildNeeded = (next.model && next.model !== CFG.model);
      Object.assign(CFG, next || {});
      if (next.color || next.accent) {
        MAT = makeMaterials(); rebuildNeeded = true;
      }
      if (rebuildNeeded) buildWalkie();
      if (typeof next.enabled === 'boolean') applyCursorHidden(next.enabled && visible);
    },
    config: CFG,
  };
})();
