/* ============================================================================
   A1S — App shell v5: ruteo SPA, cortina, cursor (mira | walkie | nativo),
   Tweaks. La home usa HomeView6 ("Cinematic Red").
   ========================================================================== */
const { Navbar, Footer, WhatsFab, RouteWipe, Breadcrumb, Icons } = window;
const { HomeView6, ServiciosView, CoberturaView, CertificacionesView, TalentoView, ContactoView, PagosView, CertificadoView, BlogView, PostulacionView } = window;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "cursorStyle": "mira",
  "accent": "#C0231B",
  "motion": true,
  "guardIdle": true
}/*EDITMODE-END*/;

const VIEWS = {
  home: HomeView6, servicios: ServiciosView, cobertura: CoberturaView,
  certificaciones: CertificacionesView, talento: TalentoView, contacto: ContactoView,
  pagos: PagosView, certificado: CertificadoView, 'portal-personas': CertificadoView, blog: BlogView, postulacion: PostulacionView,
};
const DARK_HERO = ['home', 'servicios', 'cobertura', 'certificaciones', 'talento', 'pagos', 'certificado', 'blog'];

class AppErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { console.error('App render failed', error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return React.createElement('div', { style: { minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, background: '#060606', color: '#fff' } },
        React.createElement('div', { style: { maxWidth: 480, textAlign: 'center', border: '1px solid rgba(255,255,255,.14)', borderRadius: 20, padding: '24px 20px', background: 'rgba(255,255,255,.04)' } },
          React.createElement('div', { style: { fontWeight: 700, fontSize: '1.05rem', marginBottom: 10 } }, 'No se pudo cargar la vista completa.'),
          React.createElement('p', { style: { margin: 0, color: 'rgba(255,255,255,.74)', lineHeight: 1.6 } }, 'La página se recuperará automáticamente al refrescar. Si persiste, revisa la consola del navegador.')));
    }
    return this.props.children;
  }
}

function AppShell() {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    const loader = document.getElementById('a1s-app-loader');
    if (loader) loader.remove();
    setReady(true);
  }, []);

  if (!ready) return null;
  return React.createElement(App);
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = React.useState('home');
  const [trail, setTrail] = React.useState(['home']);
  const [payload, setPayload] = React.useState(null);
  const [wipe, setWipe] = React.useState(false);
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const go = (r, data) => {
    setPayload(data != null ? data : null);
    if (r === route) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    setTrail((prev) => {
      if (r === 'home') return ['home'];
      const i = prev.indexOf(r);
      if (i >= 0) return prev.slice(0, i + 1);
      const base = prev[0] === 'home' ? prev : ['home', ...prev];
      return [...base, r].slice(-4);
    });
    setRoute(r);
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (!reduce && t.motion) { setWipe(true); setTimeout(() => setWipe(false), 820); }
  };

  /* ── Cursor: mira de precisión | walkie 3D | nativo ── */
  React.useEffect(() => {
    const aim = window.A1SAim, walkie = window.A1SCursor;
    if (aim && aim.setConfig) aim.setConfig({ enabled: t.cursorStyle === 'mira' });
    if (walkie && walkie.setConfig) walkie.setConfig({ enabled: t.cursorStyle === 'walkie', model: 'pro', color: '#15151b', accent: t.accent, scale: 0.32 });
    // el walkie controla su propia clase; si quedó activa al cambiar, limpiar
    if (t.cursorStyle !== 'walkie') document.documentElement.classList.remove('a1s-cursor-on');
    const cv = document.getElementById('a1s-cursor-canvas');
    if (cv) cv.style.display = t.cursorStyle === 'walkie' ? '' : 'none';
  }, [t.cursorStyle, t.accent]);

  /* ── Acento de marca ── */
  React.useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--a1s-red', t.accent);
    r.setProperty('--accent', t.accent);
    r.setProperty('--eyebrow', t.accent);
  }, [t.accent]);

  /* ── Movimiento global + idle del guarda ── */
  React.useEffect(() => {
    document.documentElement.classList.toggle('a1s-static', !t.motion);
  }, [t.motion]);
  React.useEffect(() => {
    document.documentElement.classList.toggle('a1s-no-idle', !t.guardIdle);
  }, [t.guardIdle]);

  const View = VIEWS[route] || HomeView6;

  return React.createElement(React.Fragment, null,
    React.createElement(Navbar, { route, go, darkHero: DARK_HERO.includes(route) }),
    React.createElement(Breadcrumb, { trail, go }),
    React.createElement('main', { key: route, className: 'a1s-route' }, React.createElement(View, { go, payload })),
    React.createElement(Footer, { go }),
    React.createElement(WhatsFab, null),
    React.createElement(RouteWipe, { active: wipe }),
    React.createElement(TweaksPanel, null,
      React.createElement(TweakSection, { label: 'Cursor' }),
      React.createElement(TweakRadio, { label: 'Estilo', value: t.cursorStyle, options: ['mira', 'walkie', 'nativo'], onChange: (v) => setTweak('cursorStyle', v) }),
      React.createElement(TweakSection, { label: 'Movimiento' }),
      React.createElement(TweakToggle, { label: 'Animaciones', value: t.motion, onChange: (v) => setTweak('motion', v) }),
      React.createElement(TweakToggle, { label: 'Idle del guarda (hero)', value: t.guardIdle, onChange: (v) => setTweak('guardIdle', v) }),
      React.createElement(TweakSection, { label: 'Marca' }),
      React.createElement(TweakColor, { label: 'Acento', value: t.accent, options: ['#C0231B', '#A91D16', '#5B5B5F'], onChange: (v) => setTweak('accent', v) })));
}

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(AppErrorBoundary, null,
    React.createElement(AppShell))
);
