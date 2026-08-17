/* ============================================================================
   A1S — Escena Hero "Centro de Control" (Three.js)
   Ambiente oscuro: campo de partículas (datos), grid en perspectiva (sala de
   control) y barrido de radar con el "blip" del punto A1S. Parallax al mouse.
   Fallback: si no hay WebGL o reduced-motion → el CSS del hero ya provee fondo.
   API: window.A1SHero.mount(canvasEl, {intensity}) / .unmount()
   ========================================================================== */
(function () {
  'use strict';
  var prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var state = null;

  function hasWebGL() {
    try { var c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))); }
    catch (e) { return false; }
  }

  function mount(canvas, opts) {
    if (!canvas || typeof THREE === 'undefined' || !hasWebGL()) return false;
    if (state) unmount();
    opts = opts || {};
    var intensity = typeof opts.intensity === 'number' ? opts.intensity : 1;

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    var W = canvas.clientWidth || canvas.parentElement.clientWidth;
    var H = canvas.clientHeight || canvas.parentElement.clientHeight;
    renderer.setSize(W, H, false);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 200);
    camera.position.set(0, 1.6, 16);
    camera.lookAt(0, 1.2, 0);

    var group = new THREE.Group(); scene.add(group);

    // ── Grid en perspectiva (suelo de sala de control) ──────────────────
    var grid = new THREE.GridHelper(120, 60, 0x3a3a44, 0x1c1c24);
    grid.position.y = -3.5;
    grid.material.transparent = true; grid.material.opacity = 0.5;
    group.add(grid);

    // ── Campo de partículas (datos en vivo) ─────────────────────────────
    var COUNT = Math.round(900 * intensity);
    var pos = new Float32Array(COUNT * 3);
    var col = new Float32Array(COUNT * 3);
    var red = new THREE.Color(0xC0231B), white = new THREE.Color(0x9aa0b5);
    for (var i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 1] = (Math.random() - 0.2) * 26;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50 - 6;
      var c = Math.random() < 0.18 ? red : white;
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    var pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    pg.setAttribute('color', new THREE.BufferAttribute(col, 3));
    var pm = new THREE.PointsMaterial({ size: 0.10, vertexColors: true, transparent: true, opacity: 0.85, depthWrite: false, blending: THREE.AdditiveBlending });
    var points = new THREE.Points(pg, pm);
    group.add(points);

    // ── Radar (anillos + barrido) ───────────────────────────────────────
    var radar = new THREE.Group();
    radar.position.set(6.5, 0.4, -2);
    radar.rotation.x = -Math.PI / 2.15;
    group.add(radar);
    for (var r = 1; r <= 3; r++) {
      var ringGeo = new THREE.RingGeometry(r * 1.5 - 0.02, r * 1.5, 64);
      var ringMat = new THREE.MeshBasicMaterial({ color: 0xC0231B, transparent: true, opacity: 0.18, side: THREE.DoubleSide });
      radar.add(new THREE.Mesh(ringGeo, ringMat));
    }
    // cruces del radar
    var crossMat = new THREE.LineBasicMaterial({ color: 0x4a4a55, transparent: true, opacity: 0.5 });
    var cg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-4.5,0,0), new THREE.Vector3(4.5,0,0), new THREE.Vector3(0,0,0), new THREE.Vector3(0,4.5,0), new THREE.Vector3(0,-4.5,0)]);
    radar.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-4.5,0,0), new THREE.Vector3(4.5,0,0)]), crossMat));
    radar.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,-4.5,0), new THREE.Vector3(0,4.5,0)]), crossMat));
    // barrido (sector que gira)
    var sweepGeo = new THREE.CircleGeometry(4.5, 48, 0, Math.PI / 3.2);
    var sweepMat = new THREE.MeshBasicMaterial({ color: 0xFF3B30, transparent: true, opacity: 0.16, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending });
    var sweep = new THREE.Mesh(sweepGeo, sweepMat);
    radar.add(sweep);
    // blip (punto A1S)
    var blip = new THREE.Mesh(new THREE.CircleGeometry(0.14, 16), new THREE.MeshBasicMaterial({ color: 0xFF6058 }));
    blip.position.set(2.2, 1.4, 0.02); radar.add(blip);

    // ── Luz/glow ────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    var mouse = { x: 0, y: 0 }, mt = { x: 0, y: 0 };
    function onMove(e) {
      var r = canvas.getBoundingClientRect();
      mt.x = ((e.clientX - r.left) / r.width - 0.5);
      mt.y = ((e.clientY - r.top) / r.height - 0.5);
    }
    window.addEventListener('mousemove', onMove, { passive: true });

    function resize() {
      var w = canvas.parentElement.clientWidth, h = canvas.parentElement.clientHeight;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resize);

    var raf, clock = new THREE.Clock(), running = true;
    function loop() {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      var t = clock.elapsedTime, dt = clock.getDelta();
      mouse.x += (mt.x - mouse.x) * 0.05; mouse.y += (mt.y - mouse.y) * 0.05;
      if (!prefersReduce) {
        camera.position.x += (mouse.x * 3.2 - camera.position.x) * 0.05;
        camera.position.y += (1.6 - mouse.y * 2.0 - camera.position.y) * 0.05;
        camera.lookAt(0, 1.0, 0);
        points.rotation.y = t * 0.02;
        sweep.rotation.z -= dt * 1.2;
        blip.material.opacity = 0.4 + (Math.sin(t * 4) * 0.5 + 0.5) * 0.6;
        blip.material.transparent = true;
      }
      renderer.render(scene, camera);
    }
    resize(); loop();

    state = {
      unmount: function () {
        running = false; cancelAnimationFrame(raf);
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('resize', resize);
        pg.dispose(); pm.dispose(); renderer.dispose();
      },
      setIntensity: function () { /* recrear si se quisiera; barato dejarlo */ }
    };
    return true;
  }

  function unmount() { if (state) { state.unmount(); state = null; } }

  window.A1SHero = { mount: mount, unmount: unmount, hasWebGL: hasWebGL };
})();
