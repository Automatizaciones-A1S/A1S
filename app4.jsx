/* ============================================================================
   A1S — App shell: ruteo SPA, cortina de transición, hero WebGL, Tweaks
   ========================================================================== */
const { Navbar, Footer, WhatsFab, RouteWipe, Icons } = window;
const { HomeView, ServiciosView, CoberturaView, CertificacionesView, TalentoView, ContactoView } = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "cursorEnabled": true,
  "cursorModel": "pro",
  "cursorColor": "#15151b",
  "cursorScale": 0.32,
  "heroMode": "control",
  "fx3d": 1.0,
  "accent": "#C0231B",
  "motion": true
}/*EDITMODE-END*/;

const VIEWS = {
  home: HomeView, servicios: ServiciosView, cobertura: CoberturaView,
  certificaciones: CertificacionesView, talento: TalentoView, contacto: ContactoView,
};
const DARK_HERO = ['home', 'servicios', 'cobertura', 'certificaciones', 'talento'];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = React.useState('home');
  const [wipe, setWipe] = React.useState(false);
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const go = (r) => {
    if (r === route) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    setRoute(r);
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (!reduce && t.motion) { setWipe(true); setTimeout(() => setWipe(false), 820); }
  };

  /* ── Hero WebGL ── */
  React.useEffect(() => {
    if (!window.A1SHero) return;
    if (route === 'home' && t.heroMode !== 'minimal') {
      const id = setTimeout(() => {
        const cv = document.getElementById('a1s-hero-canvas');
        if (cv) window.A1SHero.mount(cv, { intensity: (t.heroMode === 'intense' ? 1.6 : 1.0) * t.fx3d });
      }, 60);
      return () => { clearTimeout(id); window.A1SHero.unmount(); };
    }
    window.A1SHero.unmount();
  }, [route, t.heroMode, t.fx3d]);

  /* ── Cursor walkie-talkie config ── */
  React.useEffect(() => {
    if (window.A1SCursor && window.A1SCursor.setConfig) {
      window.A1SCursor.setConfig({ enabled: t.cursorEnabled, model: t.cursorModel, color: t.cursorColor, accent: t.accent, scale: t.cursorScale });
    }
  }, [t.cursorEnabled, t.cursorModel, t.cursorColor, t.cursorScale, t.accent]);

  /* ── Acento de marca (override token) ── */
  React.useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--a1s-red', t.accent);
    r.setProperty('--accent', t.accent);
    r.setProperty('--eyebrow', t.accent);
  }, [t.accent]);

  /* ── Movimiento global ── */
  React.useEffect(() => {
    document.documentElement.classList.toggle('a1s-static', !t.motion);
  }, [t.motion]);

  const View = VIEWS[route] || HomeView;

  return React.createElement(React.Fragment, null,
    React.createElement(Navbar, { route, go, darkHero: DARK_HERO.includes(route) }),
    React.createElement('main', { key: route, className: 'a1s-route' }, React.createElement(View, { go })),
    React.createElement(Footer, { go }),
    React.createElement(WhatsFab, null),
    React.createElement(RouteWipe, { active: wipe }),
    React.createElement(TweaksPanel, null,
      React.createElement(TweakSection, { label: 'Cursor walkie-talkie' }),
      React.createElement(TweakToggle, { label: 'Cursor 3D activo', value: t.cursorEnabled, onChange: (v) => setTweak('cursorEnabled', v) }),
      React.createElement(TweakRadio, { label: 'Modelo', value: t.cursorModel, options: ['pro', 'compact'], onChange: (v) => setTweak('cursorModel', v) }),
      React.createElement(TweakColor, { label: 'Acabado', value: t.cursorColor, options: ['#15151b', '#3a3a42', '#C0231B'], onChange: (v) => setTweak('cursorColor', v) }),
      React.createElement(TweakSlider, { label: 'Tamaño', value: t.cursorScale, min: 0.7, max: 1.6, step: 0.05, onChange: (v) => setTweak('cursorScale', v) }),
      React.createElement(TweakSection, { label: 'Centro de Control (3D)' }),
      React.createElement(TweakRadio, { label: 'Hero', value: t.heroMode, options: ['control', 'intense', 'minimal'], onChange: (v) => setTweak('heroMode', v) }),
      React.createElement(TweakSlider, { label: 'Intensidad 3D', value: t.fx3d, min: 0.3, max: 1.6, step: 0.1, onChange: (v) => setTweak('fx3d', v) }),
      React.createElement(TweakSection, { label: 'Marca y movimiento' }),
      React.createElement(TweakColor, { label: 'Acento', value: t.accent, options: ['#C0231B', '#A91D16', '#5B5B5F'], onChange: (v) => setTweak('accent', v) }),
      React.createElement(TweakToggle, { label: 'Animaciones', value: t.motion, onChange: (v) => setTweak('motion', v) })));
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
