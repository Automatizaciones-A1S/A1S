/* @ds-bundle: {"format":3,"namespace":"A1SSecurityGroupDesignSystem_bcc44d","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"StatCounter","sourcePath":"components/core/StatCounter.jsx"},{"name":"Tabs","sourcePath":"components/core/Tabs.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"ServiceCard","sourcePath":"components/patterns/ServiceCard.jsx"},{"name":"VacancyCard","sourcePath":"components/patterns/VacancyCard.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"279f8cb781c8","components/core/Button.jsx":"14c48bddd8ae","components/core/Card.jsx":"e76655aa4bef","components/core/Eyebrow.jsx":"e26432c633f1","components/core/Logo.jsx":"5c0d81ae2135","components/core/StatCounter.jsx":"ec432dfb62d0","components/core/Tabs.jsx":"f14230a6e9d0","components/forms/Input.jsx":"f15773e2e96d","components/patterns/ServiceCard.jsx":"dae4b5c25f43","components/patterns/VacancyCard.jsx":"940d54d2750c","ui_kits/website/app.jsx":"3e3b4f2b89c5","ui_kits/website/views.jsx":"3292a192bb66"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.A1SSecurityGroupDesignSystem_bcc44d = window.A1SSecurityGroupDesignSystem_bcc44d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge A1S — etiqueta compacta para certificaciones (OEA, BASC), estados
 * ("Nueva" en vacantes) y metadatos. Tono según `variant`.
 */
function Badge({
  children,
  variant = 'neutral',
  icon = null,
  style = {},
  ...rest
}) {
  const palettes = {
    neutral: {
      background: 'var(--gray-100)',
      color: 'var(--text)',
      border: '1px solid var(--border)'
    },
    red: {
      background: 'color-mix(in srgb, var(--a1s-red) 12%, transparent)',
      color: 'var(--a1s-red)',
      border: '1px solid color-mix(in srgb, var(--a1s-red) 30%, transparent)'
    },
    solid: {
      background: 'var(--a1s-red)',
      color: '#fff',
      border: '1px solid transparent'
    },
    success: {
      background: 'color-mix(in srgb, var(--success) 14%, transparent)',
      color: 'var(--success)',
      border: '1px solid color-mix(in srgb, var(--success) 32%, transparent)'
    },
    'on-dark': {
      background: 'var(--dark-elevated)',
      color: 'var(--dark-text)',
      border: '1px solid var(--dark-line)'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '5px 12px',
      fontFamily: 'var(--font-sans)',
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.02em',
      lineHeight: 1,
      borderRadius: 'var(--radius-pill)',
      ...palettes[variant],
      ...style
    }
  }, rest), icon, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * A1S Button — botón de marca con interacción magnética sutil y micro-escala.
 * El rojo PUNTÚA: usar `primary` para el CTA principal de cada vista.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = null,
  iconRight = null,
  loading = false,
  disabled = false,
  href = null,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const ref = React.useRef(null);

  // Interacción magnética: el botón sigue levemente el cursor.
  const onMove = e => {
    const el = ref.current;
    if (!el || disabled) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const mx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const my = (e.clientY - (r.top + r.height / 2)) / r.height;
    el.style.transform = `translate(${mx * 5}px, ${my * 5}px) scale(var(--hover-scale, 1.02))`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = '';
  };
  const sizes = {
    sm: {
      padding: '8px 16px',
      fontSize: '0.8125rem',
      gap: '6px'
    },
    md: {
      padding: '12px 24px',
      fontSize: '0.9375rem',
      gap: '8px'
    },
    lg: {
      padding: '16px 32px',
      fontSize: '1.0625rem',
      gap: '10px'
    }
  };
  const palettes = {
    primary: {
      background: 'var(--a1s-red)',
      color: '#fff',
      border: '1px solid transparent'
    },
    outline: {
      background: 'transparent',
      color: 'var(--text)',
      border: '1px solid var(--a1s-red)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text)',
      border: '1px solid transparent'
    },
    'on-dark': {
      background: 'var(--a1s-white)',
      color: 'var(--a1s-ink)',
      border: '1px solid transparent'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    lineHeight: 1,
    borderRadius: 'var(--radius-pill)',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'transform var(--dur-base) var(--ease-magnetic), background var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    userSelect: 'none',
    ...sizes[size],
    ...palettes[variant],
    ...style
  };
  const hoverIn = e => {
    if (disabled || loading) return;
    if (variant === 'primary') e.currentTarget.style.background = 'var(--a1s-red-600)';
    if (variant === 'outline') {
      e.currentTarget.style.background = 'var(--a1s-red)';
      e.currentTarget.style.color = '#fff';
    }
    if (variant === 'ghost') e.currentTarget.style.background = 'color-mix(in srgb, var(--a1s-red) 8%, transparent)';
    if (variant === 'on-dark') e.currentTarget.style.background = 'var(--gray-100)';
  };
  const hoverOut = e => {
    e.currentTarget.style.background = palettes[variant].background;
    e.currentTarget.style.color = palettes[variant].color;
    onLeave();
  };
  const content = /*#__PURE__*/React.createElement(React.Fragment, null, loading && /*#__PURE__*/React.createElement(Spinner, null), !loading && icon, children && /*#__PURE__*/React.createElement("span", null, children), !loading && iconRight);
  const Tag = href ? 'a' : 'button';
  const tagProps = href ? {
    href
  } : {
    type,
    disabled: disabled || loading
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    ref: ref,
    style: base,
    onMouseMove: onMove,
    onMouseEnter: hoverIn,
    onMouseLeave: hoverOut,
    onMouseDown: e => {
      if (!disabled && !loading) e.currentTarget.style.transform = 'scale(var(--press-scale, 0.97))';
    },
    onMouseUp: onLeave,
    onClick: onClick
  }, tagProps, rest), content);
}
function Spinner() {
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: '1em',
      height: '1em',
      borderRadius: '50%',
      border: '2px solid currentColor',
      borderTopColor: 'transparent',
      display: 'inline-block',
      animation: 'a1s-spin 0.7s linear infinite'
    }
  });
}
if (typeof document !== 'undefined' && !document.getElementById('a1s-spin-kf')) {
  const s = document.createElement('style');
  s.id = 'a1s-spin-kf';
  s.textContent = '@keyframes a1s-spin{to{transform:rotate(360deg)}}';
  document.head.appendChild(s);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card A1S — superficie con esquinas suaves (--radius-lg), borde sutil y,
 * opcionalmente, elevación + leve tilt 3D al pasar el cursor (parallax).
 * Base de servicios, vacantes, noticias, casos y sectores.
 */
function Card({
  children,
  interactive = true,
  tilt = false,
  padding = 'var(--space-6)',
  as = 'div',
  style = {},
  ...rest
}) {
  const ref = React.useRef(null);
  const reduce = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const onMove = e => {
    const el = ref.current;
    if (!el || !tilt || reduce()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    const max = 6;
    el.style.transform = `perspective(800px) rotateY(${px * max}deg) rotateX(${-py * max}deg) translateY(var(--hover-lift, -4px))`;
  };
  const onEnter = e => {
    if (!interactive || reduce()) return;
    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
    e.currentTarget.style.borderColor = 'var(--border-strong)';
    if (!tilt) e.currentTarget.style.transform = 'translateY(var(--hover-lift, -4px))';
  };
  const onLeave = e => {
    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
    e.currentTarget.style.borderColor = 'var(--border)';
    e.currentTarget.style.transform = '';
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    ref: ref,
    onMouseMove: onMove,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-sm)',
      padding,
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard)',
      transformStyle: tilt ? 'preserve-3d' : undefined,
      willChange: interactive ? 'transform' : undefined,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Eyebrow A1S — antetítulo de firma: rojo, itálica, uppercase, tracking amplio.
 * Recurso heredado del sitio anterior; precede a casi todos los titulares de sección.
 */
function Eyebrow({
  children,
  as = 'p',
  withDot = false,
  style = {},
  ...rest
}) {
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontStyle: 'italic',
      fontWeight: 600,
      fontSize: 'var(--fs-eyebrow, 0.8125rem)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-eyebrow, 0.12em)',
      color: 'var(--eyebrow, var(--a1s-red))',
      ...style
    }
  }, rest), withDot && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: '7px',
      height: '7px',
      borderRadius: '50%',
      background: 'currentColor',
      flex: 'none'
    }
  }), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const PATHS = ['M0,664v-1c.66-.65,1.59-1.74,2.29-3.16l167.57-339.64c3.23-6.54,7.51-12.23,11.74-17.72,11.6-15.05,31.93-28.04,50.41-32.18,37.89-8.49,74.51,4.39,98.21,35.25,4.68,6.09,7.6,12.77,11.69,19.61l143.88,339.02-99.15.02-118.65-307.63c-3.76-5.55-7.46-8.76-13.65-8.72-4.93.03-10.82,2.39-13.5,8.38l-137.96,308.04L0,664Z', 'M962.6,632.58c-20.2,19.25-46.34,30.11-74.8,31.54h-209.87s-.02-66.13-.02-66.13l204.93.02c6.95-1.6,13.78-1.64,19.93-4.44,5.25-2.39,11.35-6.26,15.28-10.39,18.77-19.69,18.32-50.64-.1-69.19-4.03-4.06-10.06-8.24-15.44-10.35-5.73-2.25-13.17-4.35-19.54-4.38l-112.94-.46c-21.55-.09-43.98-6.67-61.73-18.15-9.22-5.97-25.34-20.33-30.71-29.15-5.97-9.81-11.3-19.72-15.58-30.27-3.08-7.58-4.03-16.2-5.74-24.34-2.04-9.74-.05-30.14,2.18-39.82,1.92-8.36,4.88-16.71,8.4-24.46,8.23-18.14,24.86-36.28,41.64-46.9,16.51-10.44,38.46-18.15,58.7-17.85h210.35s-.03,65.89-.03,65.89h-206.4c-6.81,1.53-13.34,1.66-19.45,4.25-5.21,2.21-11.18,6.19-15.34,10.24-19.35,18.84-19.4,50.54-.16,69.6,4.07,4.03,10.05,8.2,15.4,10.27,5.68,2.2,13.07,4.09,19.43,4.11l112.49.46c29.19.12,57.99,11.66,79.11,31.72,9.49,9.02,19.67,22.73,24.98,34.66,7.81,17.56,9.06,27.67,11,46.32,1.63,15.63-4.4,38.11-10.98,52.55-5.51,12.12-15.34,25.42-25,34.63Z', 'M586.76,302.14c5.01,8.6,9.46,22.67,9.46,33.1l.06,330.82h-69.05s-.03-305.65-.03-305.65c-2.1-13.26-10.3-23.68-23.8-23.91l-39.76-.7.04-68.87,64.35.16c5.56.01,11.3,1.59,16.85,2.13,18.25,6.71,32,15.98,41.88,32.93Z',
// punto (dot in the A)
'M248.62,588.23c-4.35,1.5-8.26,1.77-12.05.13-21.05-1.97-36.83-23.82-32.81-44.66,2.26-21.58,25.26-37.55,45.89-32.38,8.3.53,19.12,7.72,23.79,14.12,13.99,19.2,9.84,44.31-9.01,56.92-4.78,3.19-9.53,5.72-15.81,5.86Z'];

/**
 * Logo A1S — isotipo + logotipo "Security Group" en SVG, recolorable con
 * `color` (currentColor) o forzado por `variant`. Incluye el "punto" de la A.
 */
function Logo({
  variant = 'current',
  height = 40,
  title = 'A1S Security Group',
  style = {},
  ...rest
}) {
  const colorByVariant = {
    current: 'currentColor',
    rojo: 'var(--a1s-red)',
    negro: 'var(--a1s-ink)',
    blanco: 'var(--a1s-white)'
  };
  const fill = colorByVariant[variant] || 'currentColor';
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 285 970 388",
    role: "img",
    "aria-label": title,
    style: {
      height: typeof height === 'number' ? `${height}px` : height,
      width: 'auto',
      display: 'block',
      color: fill,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("title", null, title), PATHS.map((d, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: d,
    fill: fill === 'currentColor' ? 'currentColor' : fill
  })));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/StatCounter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StatCounter A1S — cifra clave con contador animado al entrar en viewport.
 * "Protección medible": +55 años, +3.500 colaboradores, +500 municipios, etc.
 */
function StatCounter({
  value,
  prefix = '+',
  suffix = '',
  label,
  align = 'start',
  onDark = false,
  duration = 1400,
  style = {},
  ...rest
}) {
  const ref = React.useRef(null);
  const [display, setDisplay] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(value);
      return;
    }
    let raf, start;
    let done = false;
    const run = () => {
      if (done) return;
      done = true;
      const animate = t => {
        if (!start) start = t;
        const p = Math.min((t - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(Math.round(value * eased));
        if (p < 1) raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);
    };
    // Si ya está visible al montar, anima de inmediato; si no, espera el scroll.
    const vh = window.innerHeight || 800;
    const r = el.getBoundingClientRect();
    if (r.top < vh * 0.92 && r.bottom > 0) {
      run();
      return () => cancelAnimationFrame(raf);
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) run();
      });
    }, {
      threshold: 0.35
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);
  const formatted = display.toLocaleString('es-CO');
  return /*#__PURE__*/React.createElement("div", _extends({
    ref: ref,
    style: {
      textAlign: align,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      lineHeight: 1,
      letterSpacing: '-0.02em',
      color: onDark ? 'var(--dark-text)' : 'var(--text)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--a1s-red)'
    }
  }, prefix), formatted, suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.5em',
      fontWeight: 600,
      marginLeft: '0.1em'
    }
  }, suffix)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '8px',
      fontSize: '0.9375rem',
      fontWeight: 500,
      color: onDark ? 'var(--dark-muted)' : 'var(--text-muted)'
    }
  }, label));
}
Object.assign(__ds_scope, { StatCounter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatCounter.jsx", error: String((e && e.message) || e) }); }

// components/core/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tabs A1S — pestañas tipo pill (patrón heredado del Wix). La activa va en
 * rojo; las inactivas claras. Usado en Portafolio de servicios y donde aplique.
 */
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  onDark = false,
  style = {},
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultValue ?? (items[0] && items[0].id));
  const active = value !== undefined ? value : internal;
  const select = id => {
    if (value === undefined) setInternal(id);
    onChange && onChange(id);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: 'inline-flex',
      flexWrap: 'wrap',
      gap: '6px',
      padding: '6px',
      borderRadius: 'var(--radius-pill)',
      background: onDark ? 'var(--dark-surface)' : 'var(--gray-100)',
      border: onDark ? '1px solid var(--dark-line)' : '1px solid var(--border)',
      ...style
    }
  }, rest), items.map(it => {
    const isActive = it.id === active;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      role: "tab",
      "aria-selected": isActive,
      onClick: () => select(it.id),
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 20px',
        border: 'none',
        cursor: 'pointer',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-sans)',
        fontWeight: 600,
        fontSize: '0.9375rem',
        whiteSpace: 'nowrap',
        transition: 'background var(--dur-base) var(--ease-standard), color var(--dur-base) var(--ease-standard)',
        background: isActive ? 'var(--a1s-red)' : 'transparent',
        color: isActive ? '#fff' : onDark ? 'var(--dark-muted)' : 'var(--text-muted)'
      }
    }, it.icon, it.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input A1S — campo de formulario con label, ayuda y estado de error.
 * Base de los formularios de cotización y postulación. Target táctil ≥ 44px.
 */
function Input({
  label,
  type = 'text',
  name,
  placeholder = '',
  value,
  defaultValue,
  onChange,
  required = false,
  error = '',
  hint = '',
  multiline = false,
  rows = 4,
  style = {},
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const id = React.useId ? React.useId() : name;
  const hasError = Boolean(error);
  const fieldStyle = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '13px 16px',
    minHeight: multiline ? undefined : '48px',
    fontFamily: 'var(--font-sans)',
    fontSize: '1rem',
    color: 'var(--text)',
    background: 'var(--surface-card)',
    border: `1px solid ${hasError ? 'var(--error)' : focused ? 'var(--a1s-red)' : 'var(--border-strong)'}`,
    borderRadius: 'var(--radius-md)',
    outline: 'none',
    boxShadow: focused && !hasError ? 'var(--ring)' : 'none',
    transition: 'border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)',
    resize: multiline ? 'vertical' : undefined
  };
  const Field = multiline ? 'textarea' : 'input';
  const typeProp = multiline ? {} : {
    type
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '7px',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      fontSize: '0.875rem',
      fontWeight: 600,
      color: 'var(--text)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--a1s-red)',
      marginLeft: '3px'
    }
  }, "*")), /*#__PURE__*/React.createElement(Field, _extends({
    id: id,
    name: name,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    required: required,
    rows: multiline ? rows : undefined,
    "aria-invalid": hasError,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: fieldStyle
  }, typeProp, rest)), hasError ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.8125rem',
      color: 'var(--error)'
    }
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.8125rem',
      color: 'var(--text-muted)'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/patterns/ServiceCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ServiceCard A1S — card de línea de servicio: media inmersiva (placeholder con
 * profundidad), eyebrow, título, descripción y CTA. Hover con elevación + tilt leve.
 * Si no hay foto real, deja el placeholder "Centro de Control".
 */
function ServiceCard({
  title,
  eyebrow,
  description,
  image = null,
  cta = 'Conocer más',
  href = '#',
  style = {},
  ...rest
}) {
  const ref = React.useRef(null);
  const reduce = () => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const onMove = e => {
    const el = ref.current;
    if (!el || reduce()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 4}deg) rotateX(${-py * 4}deg) translateY(-4px)`;
    const img = el.querySelector('[data-media]');
    if (img) img.style.transform = `scale(1.06) translate(${px * -10}px, ${py * -10}px)`;
  };
  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
    const img = el.querySelector('[data-media]');
    if (img) img.style.transform = '';
  };
  return /*#__PURE__*/React.createElement("a", _extends({
    ref: ref,
    href: href,
    onMouseMove: onMove,
    onMouseLeave: reset,
    style: {
      display: 'block',
      textDecoration: 'none',
      color: 'inherit',
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-standard)',
      willChange: 'transform',
      ...style
    },
    onMouseEnter: e => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '3 / 4',
      overflow: 'hidden',
      background: 'var(--dark-bg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    "data-media": true,
    style: {
      position: 'absolute',
      inset: 0,
      transition: 'transform var(--dur-slow) var(--ease-out)',
      background: image ? `center/cover no-repeat url("${image}")` : 'radial-gradient(120% 80% at 70% 20%, rgba(192,35,27,.30), transparent 55%), repeating-linear-gradient(0deg, rgba(255,255,255,.04) 0 1px, transparent 1px 22px), repeating-linear-gradient(90deg, rgba(255,255,255,.04) 0 1px, transparent 1px 22px), #0A0A0C'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to top, rgba(0,0,0,.55), transparent 45%)'
    }
  }), eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 16,
      left: 16,
      fontStyle: 'italic',
      fontWeight: 600,
      fontSize: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'var(--a1s-red-400)'
    }
  }, eyebrow)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '1.25rem',
      letterSpacing: '-0.01em'
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '10px 0 0',
      color: 'var(--text-muted)',
      fontSize: '0.9375rem',
      lineHeight: 1.55
    }
  }, description), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 16,
      color: 'var(--a1s-red)',
      fontWeight: 600,
      fontSize: '0.9375rem'
    }
  }, cta, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6"
  })))));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/patterns/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/patterns/VacancyCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * VacancyCard A1S — card de vacante para el listado de Talento. Título, regional,
 * tipo de contrato, fecha, badge "Nueva" y CTA "Ver y postularme".
 */
function VacancyCard({
  title,
  regional,
  city,
  type = 'Tiempo completo',
  date,
  isNew = false,
  href = '#',
  style = {},
  ...rest
}) {
  const meta = (icon, text) => /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: '0.8125rem',
      color: 'var(--text-muted)'
    }
  }, icon, text);
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      textDecoration: 'none',
      color: 'inherit',
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderLeft: '3px solid var(--a1s-red)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-5)',
      boxShadow: 'var(--shadow-sm)',
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard)',
      ...style
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = '';
      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '1.125rem',
      lineHeight: 1.2
    }
  }, title), isNew && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      padding: '4px 10px',
      fontSize: '0.6875rem',
      fontWeight: 700,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: '#fff',
      background: 'var(--a1s-red)',
      borderRadius: 'var(--radius-pill)'
    }
  }, "Nueva")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 16
    }
  }, meta(/*#__PURE__*/React.createElement(IconPin, null), `${regional}${city ? ' · ' + city : ''}`), meta(/*#__PURE__*/React.createElement(IconClock, null), type), date && meta(/*#__PURE__*/React.createElement(IconCal, null), date)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 2,
      color: 'var(--a1s-red)',
      fontWeight: 600,
      fontSize: '0.9375rem'
    }
  }, "Ver y postularme", /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14M13 6l6 6-6 6"
  }))));
}
const ico = {
  width: 15,
  height: 15,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};
function IconPin() {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24"
  }, ico), /*#__PURE__*/React.createElement("path", {
    d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "10",
    r: "3"
  }));
}
function IconClock() {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24"
  }, ico), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 7v5l3 2"
  }));
}
function IconCal() {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24"
  }, ico), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "4",
    width: "18",
    height: "18",
    rx: "2"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 2v4M8 2v4M3 10h18"
  }));
}
Object.assign(__ds_scope, { VacancyCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/patterns/VacancyCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/app.jsx
try { (() => {
/* A1S Website UI kit — primitivas y chrome (self-contained, usa los tokens de styles.css).
   Recreación cosmética de los componentes del design system para los screens. */

const A1S_RED = 'var(--a1s-red)';

/* ── Iconos lineales (stroke uniforme, estilo Lucide) ─────────────── */
const ico = (path, extra = {}) => p => React.createElement('svg', {
  width: p.size || 22,
  height: p.size || 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: p.sw || 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  style: p.style,
  ...extra
}, ...(Array.isArray(path) ? path : [path]).map((d, i) => React.createElement('path', {
  key: i,
  d
})));
const Icons = {
  shield: ico('M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z'),
  cctv: ico(['M3 7l15-4 1.5 4.5L4.5 11.5 3 7Z', 'M4.5 11.5 6 16M9 14v4a2 2 0 0 1-2 2H5', 'M18 6.5l3-1']),
  truck: ico(['M3 6h11v9H3zM14 9h4l3 3v3h-7', 'M7 18a2 2 0 1 0 0 .01M18 18a2 2 0 1 0 0 .01']),
  drone: ico(['M9 9h6v6H9z', 'M9 9 5 5M15 9l4-4M9 15l-4 4M15 15l4 4', 'M3 5h4M17 5h4M3 19h4M17 19h4']),
  lock: ico(['M5 11h14v9H5z', 'M8 11V7a4 4 0 0 1 8 0v4']),
  gauge: ico(['M12 14 16 9', 'M4 18a8 8 0 1 1 16 0']),
  dog: ico(['M10 5.5 8 4 6 6v3l-2 2v6h5l1-3h4l1 3h4v-6l-2-2', 'M10 9h6']),
  pin: ico(['M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z', 'M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0']),
  clock: ico(['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 7v5l3 2']),
  cal: ico(['M3 5h18v17H3zM3 9h18M8 2v4M16 2v4']),
  arrow: ico(['M5 12h14', 'M13 6l6 6-6 6']),
  check: ico('M5 12l5 5L20 7'),
  wa: ico(['M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Z', 'M8.5 8.5c0 4 3 7 6.5 7.2.7 0 1.3-.6 1.4-1.2.1-.5-.2-.8-.6-1l-1.4-.7c-.3-.1-.6 0-.8.2l-.5.6c-1.2-.5-2.1-1.5-2.6-2.7l.6-.5c.2-.2.3-.5.2-.8L10.3 7c-.2-.4-.5-.7-1-.6-.5.1-1 .6-1.1 1.3']),
  menu: ico(['M4 7h16M4 12h16M4 17h16']),
  phone: ico('M3 5c0 9 7 16 16 16l0-3.5-4-1.5-2 2c-2.5-1.2-4.8-3.5-6-6l2-2L7.5 5 4 5'),
  users: ico(['M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1', 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7', 'M22 19v-1a4 4 0 0 0-3-3.8M16 4.2A4 4 0 0 1 16 11.5']),
  growth: ico(['M3 17l5-5 4 4 8-8', 'M16 8h5v5']),
  heart: ico('M12 20s-7-4.5-9.5-9C1 8 2.5 4.5 6 4.5c2 0 3.2 1.3 4 2.3.8-1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 6.5C19 15.5 12 20 12 20Z'),
  search: ico(['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z', 'M21 21l-4.3-4.3'])
};

/* ── Logo A1S inline (recolorable) ────────────────────────────────── */
const LOGO_PATHS = ['M0,664v-1c.66-.65,1.59-1.74,2.29-3.16l167.57-339.64c3.23-6.54,7.51-12.23,11.74-17.72,11.6-15.05,31.93-28.04,50.41-32.18,37.89-8.49,74.51,4.39,98.21,35.25,4.68,6.09,7.6,12.77,11.69,19.61l143.88,339.02-99.15.02-118.65-307.63c-3.76-5.55-7.46-8.76-13.65-8.72-4.93.03-10.82,2.39-13.5,8.38l-137.96,308.04L0,664Z', 'M962.6,632.58c-20.2,19.25-46.34,30.11-74.8,31.54h-209.87s-.02-66.13-.02-66.13l204.93.02c6.95-1.6,13.78-1.64,19.93-4.44,5.25-2.39,11.35-6.26,15.28-10.39,18.77-19.69,18.32-50.64-.1-69.19-4.03-4.06-10.06-8.24-15.44-10.35-5.73-2.25-13.17-4.35-19.54-4.38l-112.94-.46c-21.55-.09-43.98-6.67-61.73-18.15-9.22-5.97-25.34-20.33-30.71-29.15-5.97-9.81-11.3-19.72-15.58-30.27-3.08-7.58-4.03-16.2-5.74-24.34-2.04-9.74-.05-30.14,2.18-39.82,1.92-8.36,4.88-16.71,8.4-24.46,8.23-18.14,24.86-36.28,41.64-46.9,16.51-10.44,38.46-18.15,58.7-17.85h210.35s-.03,65.89-.03,65.89h-206.4c-6.81,1.53-13.34,1.66-19.45,4.25-5.21,2.21-11.18,6.19-15.34,10.24-19.35,18.84-19.4,50.54-.16,69.6,4.07,4.03,10.05,8.2,15.4,10.27,5.68,2.2,13.07,4.09,19.43,4.11l112.49.46c29.19.12,57.99,11.66,79.11,31.72,9.49,9.02,19.67,22.73,24.98,34.66,7.81,17.56,9.06,27.67,11,46.32,1.63,15.63-4.4,38.11-10.98,52.55-5.51,12.12-15.34,25.42-25,34.63Z', 'M586.76,302.14c5.01,8.6,9.46,22.67,9.46,33.1l.06,330.82h-69.05s-.03-305.65-.03-305.65c-2.1-13.26-10.3-23.68-23.8-23.91l-39.76-.7.04-68.87,64.35.16c5.56.01,11.3,1.59,16.85,2.13,18.25,6.71,32,15.98,41.88,32.93Z', 'M248.62,588.23c-4.35,1.5-8.26,1.77-12.05.13-21.05-1.97-36.83-23.82-32.81-44.66,2.26-21.58,25.26-37.55,45.89-32.38,8.3.53,19.12,7.72,23.79,14.12,13.99,19.2,9.84,44.31-9.01,56.92-4.78,3.19-9.53,5.72-15.81,5.86Z'];
function Logo({
  color = 'currentColor',
  height = 38,
  style = {}
}) {
  return React.createElement('svg', {
    viewBox: '0 285 970 388',
    role: 'img',
    'aria-label': 'A1S Security Group',
    style: {
      height,
      width: 'auto',
      display: 'block',
      color,
      ...style
    }
  }, LOGO_PATHS.map((d, i) => React.createElement('path', {
    key: i,
    d,
    fill: 'currentColor'
  })));
}

/* ── Botón magnético ──────────────────────────────────────────────── */
function Btn({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  onClick,
  style = {}
}) {
  const ref = React.useRef(null);
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sizes = {
    sm: '8px 16px',
    md: '12px 24px',
    lg: '16px 32px'
  };
  const fs = {
    sm: '.8125rem',
    md: '.9375rem',
    lg: '1.0625rem'
  };
  const pal = {
    primary: {
      background: A1S_RED,
      color: '#fff',
      border: '1px solid transparent'
    },
    outline: {
      background: 'transparent',
      color: 'var(--text)',
      border: '1px solid ' + A1S_RED
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text)',
      border: '1px solid transparent'
    },
    'on-dark': {
      background: '#fff',
      color: 'var(--a1s-ink)',
      border: '1px solid transparent'
    }
  }[variant];
  const move = e => {
    if (reduce) return;
    const el = ref.current,
      r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) / r.width * 5}px,${(e.clientY - r.top - r.height / 2) / r.height * 5}px) scale(1.02)`;
  };
  return React.createElement('button', {
    ref,
    onClick,
    onMouseMove: move,
    onMouseLeave: e => e.currentTarget.style.transform = '',
    onMouseDown: e => e.currentTarget.style.transform = 'scale(.97)',
    onMouseEnter: e => {
      if (variant === 'primary') e.currentTarget.style.background = 'var(--a1s-red-600)';
      if (variant === 'outline') {
        e.currentTarget.style.background = A1S_RED;
        e.currentTarget.style.color = '#fff';
      }
    },
    onMouseUp: e => {
      e.currentTarget.style.background = pal.background;
      e.currentTarget.style.color = pal.color;
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      padding: sizes[size],
      fontSize: fs[size],
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      lineHeight: 1,
      borderRadius: 'var(--radius-pill)',
      cursor: 'pointer',
      transition: 'transform .22s cubic-bezier(.2,.8,.2,1), background .22s, color .22s',
      whiteSpace: 'nowrap',
      ...pal,
      ...style
    }
  }, icon, children && React.createElement('span', null, children), iconRight);
}
function Eyebrow({
  children,
  dark,
  style = {}
}) {
  return React.createElement('p', {
    style: {
      margin: 0,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontStyle: 'italic',
      fontWeight: 600,
      fontSize: '.8125rem',
      textTransform: 'uppercase',
      letterSpacing: '.12em',
      color: dark ? 'var(--a1s-red-400)' : A1S_RED,
      ...style
    }
  }, React.createElement('span', {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'currentColor'
    }
  }), children);
}
function Badge({
  children,
  variant = 'neutral',
  icon
}) {
  const pal = {
    neutral: {
      background: 'var(--gray-100)',
      color: 'var(--text)',
      border: '1px solid var(--border)'
    },
    red: {
      background: 'color-mix(in srgb, var(--a1s-red) 12%, transparent)',
      color: A1S_RED,
      border: '1px solid color-mix(in srgb, var(--a1s-red) 30%, transparent)'
    },
    solid: {
      background: A1S_RED,
      color: '#fff',
      border: '1px solid transparent'
    },
    'on-dark': {
      background: 'var(--dark-elevated)',
      color: 'var(--dark-text)',
      border: '1px solid var(--dark-line)'
    }
  }[variant];
  return React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '5px 12px',
      fontSize: '.75rem',
      fontWeight: 600,
      lineHeight: 1,
      borderRadius: 'var(--radius-pill)',
      ...pal
    }
  }, icon, children);
}

/* ── Contador animado ─────────────────────────────────────────────── */
function Stat({
  value,
  prefix = '+',
  suffix = '',
  label,
  dark,
  big
}) {
  const ref = React.useRef(null);
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setN(value);
      return;
    }
    let timer,
      done = false;
    const run = () => {
      if (done) return;
      done = true;
      const t0 = Date.now();
      timer = setInterval(() => {
        const p = Math.min((Date.now() - t0) / 1400, 1);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p >= 1) clearInterval(timer);
      }, 40);
    };
    const vh = window.innerHeight || 800;
    const r = el.getBoundingClientRect();
    if (r.top < vh * 0.92 && r.bottom > 0) {
      run();
      return () => clearInterval(timer);
    }
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) run();
    }), {
      threshold: .35
    });
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, [value]);
  return React.createElement('div', {
    ref
  }, React.createElement('div', {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: big ? 'clamp(2.6rem,5vw,4rem)' : 'clamp(2rem,4vw,3rem)',
      lineHeight: 1,
      letterSpacing: '-.02em',
      color: dark ? 'var(--dark-text)' : 'var(--text)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, React.createElement('span', {
    style: {
      color: A1S_RED
    }
  }, prefix), n.toLocaleString('es-CO'), suffix && React.createElement('span', {
    style: {
      fontSize: '.5em',
      marginLeft: '.1em',
      fontWeight: 600
    }
  }, suffix)), React.createElement('div', {
    style: {
      marginTop: 8,
      fontSize: '.9375rem',
      fontWeight: 500,
      color: dark ? 'var(--dark-muted)' : 'var(--text-muted)'
    }
  }, label));
}

/* ── Placeholder de media inmersiva "Centro de Control" ───────────── */
function MediaPlaceholder({
  ratio = '3 / 4',
  label,
  Icon,
  style = {},
  parallax = true
}) {
  const ref = React.useRef(null);
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const move = e => {
    if (!parallax || reduce) return;
    const el = ref.current.querySelector('[data-l]');
    const r = ref.current.getBoundingClientRect();
    el.style.transform = `scale(1.08) translate(${((e.clientX - r.left) / r.width - .5) * -14}px,${((e.clientY - r.top) / r.height - .5) * -14}px)`;
  };
  return React.createElement('div', {
    ref,
    onMouseMove: move,
    onMouseLeave: () => {
      const el = ref.current.querySelector('[data-l]');
      if (el) el.style.transform = '';
    },
    style: {
      position: 'relative',
      aspectRatio: ratio,
      overflow: 'hidden',
      borderRadius: 'var(--radius-lg)',
      background: '#0A0A0C',
      ...style
    }
  }, React.createElement('div', {
    'data-l': true,
    style: {
      position: 'absolute',
      inset: -2,
      transition: 'transform .5s cubic-bezier(.16,1,.3,1)',
      background: 'radial-gradient(120% 90% at 70% 15%, rgba(192,35,27,.32), transparent 55%), repeating-linear-gradient(0deg, rgba(255,255,255,.045) 0 1px, transparent 1px 24px), repeating-linear-gradient(90deg, rgba(255,255,255,.045) 0 1px, transparent 1px 24px), #0A0A0C'
    }
  }), Icon && React.createElement('div', {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      placeItems: 'center',
      color: 'rgba(255,255,255,.22)'
    }
  }, React.createElement(Icon, {
    size: 64,
    sw: 1
  })), React.createElement('div', {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(to top, rgba(0,0,0,.6), transparent 50%)'
    }
  }), label && React.createElement('span', {
    style: {
      position: 'absolute',
      left: 16,
      bottom: 14,
      fontSize: '.75rem',
      color: 'rgba(255,255,255,.55)'
    }
  }, label));
}

/* ── Navbar ───────────────────────────────────────────────────────── */
function Navbar({
  route,
  go,
  darkHero
}) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const el = document.querySelector('[data-scroll]') || window;
    const h = () => setScrolled((el.scrollTop || 0) > 24);
    el.addEventListener('scroll', h);
    return () => el.removeEventListener('scroll', h);
  }, []);
  const links = [['servicios', 'Servicios'], ['cobertura', 'Cobertura'], ['talento', 'Trabaja con nosotros']];
  const onDark = darkHero && !scrolled; // texto claro sobre hero oscuro
  const linkColor = onDark ? 'rgba(255,255,255,.82)' : 'var(--text)';
  return React.createElement('header', {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      transition: 'all .25s',
      background: scrolled ? 'rgba(255,255,255,.88)' : 'transparent',
      backdropFilter: scrolled ? 'saturate(140%) blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent'
    }
  }, React.createElement('div', {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '14px var(--gutter)',
      display: 'flex',
      alignItems: 'center',
      gap: 24
    }
  }, React.createElement('a', {
    onClick: () => go('home'),
    style: {
      cursor: 'pointer'
    }
  }, React.createElement(Logo, {
    color: onDark ? '#fff' : 'var(--a1s-red)',
    height: 34
  })), React.createElement('nav', {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, links.map(([id, label]) => React.createElement('a', {
    key: id,
    onClick: () => go(id),
    style: {
      cursor: 'pointer',
      padding: '8px 14px',
      borderRadius: 'var(--radius-pill)',
      fontSize: '.9375rem',
      fontWeight: 600,
      color: route === id ? onDark ? '#fff' : A1S_RED : linkColor,
      background: route === id ? onDark ? 'rgba(255,255,255,.12)' : 'color-mix(in srgb, var(--a1s-red) 9%, transparent)' : 'transparent'
    }
  }, label))), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 10
    }
  }, React.createElement(Btn, {
    variant: 'primary',
    size: 'sm',
    onClick: () => go('contacto')
  }, '¡Cotización gratuita!'))));
}

/* ── Footer ───────────────────────────────────────────────────────── */
function Footer({
  go
}) {
  const col = (title, items) => React.createElement('div', null, React.createElement('div', {
    style: {
      fontSize: '.75rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '.08em',
      color: 'var(--dark-muted)',
      marginBottom: 14
    }
  }, title), React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, items.map((t, i) => React.createElement('a', {
    key: i,
    onClick: t[1] ? () => go(t[1]) : null,
    style: {
      fontSize: '.9375rem',
      color: 'var(--dark-text)',
      cursor: t[1] ? 'pointer' : 'default',
      opacity: .85
    }
  }, t[0]))));
  return React.createElement('footer', {
    className: 'a1s-dark',
    style: {
      background: '#0A0A0C',
      color: 'var(--dark-text)',
      paddingTop: 'var(--space-9)'
    }
  }, React.createElement('div', {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      padding: '0 var(--gutter)'
    }
  }, React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
      gap: 40,
      paddingBottom: 'var(--space-8)'
    }
  }, React.createElement('div', null, React.createElement(Logo, {
    color: '#fff',
    height: 40
  }), React.createElement('p', {
    style: {
      marginTop: 18,
      maxWidth: '30ch',
      color: 'var(--dark-muted)',
      fontSize: '.9375rem',
      lineHeight: 1.6
    }
  }, 'Seguridad humana + tecnología avanzada. Protegemos lo que más importa desde 1971.'), React.createElement('p', {
    style: {
      marginTop: 18,
      fontSize: '.8125rem',
      color: 'var(--dark-muted)'
    }
  }, 'By Somni Capital Group')), col('Servicios', [['Seguridad Física', 'servicios'], ['Seguridad Electrónica', 'servicios'], ['Móvil & GPS', 'servicios'], ['Drones', 'servicios'], ['Ciberseguridad', 'servicios']]), col('Empresa', [['Quiénes somos'], ['Cobertura', 'cobertura'], ['Certificaciones'], ['Casos de éxito'], ['Contacto', 'contacto']]), col('Talento', [['Trabaja con nosotros', 'talento'], ['Cultura'], ['Vacantes', 'talento'], ['Proceso de selección']])), React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '22px 0',
      borderTop: '1px solid var(--dark-line)',
      flexWrap: 'wrap'
    }
  }, React.createElement(Badge, {
    variant: 'on-dark'
  }, 'OEA'), React.createElement(Badge, {
    variant: 'on-dark'
  }, 'BASC'), React.createElement('span', {
    style: {
      marginLeft: 'auto',
      fontSize: '.8125rem',
      color: 'var(--dark-muted)'
    }
  }, '+57 305 771 0909 · servicioalcliente@a1s.com.co'), React.createElement('span', {
    style: {
      fontSize: '.8125rem',
      color: 'var(--dark-muted)'
    }
  }, '© ' + new Date().getFullYear() + ' A1S Security Group'))));
}
Object.assign(window, {
  Icons,
  Logo,
  Btn,
  Eyebrow,
  Badge,
  Stat,
  MediaPlaceholder,
  Navbar,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/views.jsx
try { (() => {
/* A1S Website UI kit — vistas (Home, Cobertura, Vacantes, Contacto). */
const {
  Icons,
  Logo,
  Btn,
  Eyebrow,
  Badge,
  Stat,
  MediaPlaceholder
} = window;
const SECTION = {
  padding: 'var(--section-y) 0'
};
const WRAP = {
  maxWidth: 'var(--container-max)',
  margin: '0 auto',
  padding: '0 var(--gutter)'
};
const SERVICES = [{
  id: 'fisica',
  label: 'Seguridad Física',
  Icon: Icons.shield,
  eyebrow: 'Personas',
  title: 'Vigilancia, escoltas y caninos',
  desc: 'Vigilancia con o sin armas, supervisión permanente, escoltas VIP / carga crítica y unidades caninas certificadas.'
}, {
  id: 'electronica',
  label: 'Seguridad Electrónica',
  Icon: Icons.cctv,
  eyebrow: 'Tecnología',
  title: 'CCTV, acceso y Atlas IoT',
  desc: 'CCTV HD con analítica, control de acceso, protección perimetral y detección de incendios integrados con Atlas IoT.'
}, {
  id: 'movil',
  label: 'Móvil & GPS',
  Icon: Icons.truck,
  eyebrow: 'Trazabilidad',
  title: 'Monitoreo de flotas y cargas',
  desc: 'Control de flotas y cargamentos de valor en tiempo real, con escoltaje y rastreo GPS.'
}, {
  id: 'drones',
  label: 'Drones',
  Icon: Icons.drone,
  eyebrow: 'Vista aérea',
  title: 'Inspección y ortomosaicos',
  desc: 'Sobrevuelos programados, ortomosaicos georreferenciados y modelos 3D con datos topográficos.'
}, {
  id: 'ciber',
  label: 'Ciberseguridad',
  Icon: Icons.lock,
  eyebrow: 'Información',
  title: 'IAM, pentesting y políticas',
  desc: 'Identificación y autorización (IAM), desarrollo de políticas, formación y pruebas de penetración.'
}, {
  id: 'riesgo',
  label: 'Gestión del Riesgo',
  Icon: Icons.gauge,
  eyebrow: 'Metodología',
  title: 'Análisis de riesgo medible',
  desc: 'Metodología estructurada en 5 pasos para identificar, valorar y tratar los riesgos con planes medibles.'
}];
const REGIONALES = [{
  reg: 'Caribe',
  city: 'Cartagena',
  x: 33,
  y: 9
}, {
  reg: 'Santander',
  city: 'Bucaramanga',
  x: 46,
  y: 34
}, {
  reg: 'Antioquia',
  city: 'Medellín',
  x: 31,
  y: 38
}, {
  reg: 'Centro',
  city: 'Bogotá',
  x: 45,
  y: 52
}, {
  reg: 'Suroccidente',
  city: 'Cali',
  x: 24,
  y: 64
}];

/* ════════════════ HOME ════════════════ */
function HomeView({
  go
}) {
  const [tab, setTab] = React.useState('fisica');
  const svc = SERVICES.find(s => s.id === tab);
  return React.createElement('div', null, /* HERO — Centro de Control */
  React.createElement('section', {
    className: 'a1s-dark',
    style: {
      position: 'relative',
      background: '#0A0A0C',
      overflow: 'hidden',
      marginTop: '-72px',
      paddingTop: '72px'
    }
  }, React.createElement('div', {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(80% 60% at 75% 12%, rgba(192,35,27,.22), transparent 60%), repeating-linear-gradient(0deg, rgba(255,255,255,.035) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, rgba(255,255,255,.035) 0 1px, transparent 1px 40px)'
    }
  }), React.createElement('div', {
    'aria-hidden': true,
    style: {
      position: 'absolute',
      top: '-10%',
      right: '-5%',
      width: 420,
      height: 420,
      borderRadius: '50%',
      border: '1px solid rgba(255,59,48,.18)',
      background: 'conic-gradient(from 0deg, rgba(255,59,48,.18), transparent 55%)',
      animation: 'a1s-sweep 6s linear infinite'
    }
  }), React.createElement('div', {
    style: {
      ...WRAP,
      position: 'relative',
      paddingTop: 'clamp(3rem,8vw,6rem)',
      paddingBottom: 'clamp(3rem,8vw,6rem)'
    }
  }, React.createElement(Eyebrow, {
    dark: true
  }, 'Seguridad privada para Colombia'), React.createElement('h1', {
    style: {
      margin: '18px 0 0',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(2.6rem,6vw,5rem)',
      lineHeight: 1.04,
      letterSpacing: '-.02em',
      maxWidth: '15ch'
    }
  }, 'Protegemos lo que ', React.createElement('span', {
    style: {
      color: 'var(--a1s-red-400)'
    }
  }, 'más importa'), '.'), React.createElement('p', {
    style: {
      marginTop: 22,
      maxWidth: '52ch',
      fontSize: '1.125rem',
      lineHeight: 1.6,
      color: 'var(--dark-muted)'
    }
  }, 'Más de 55 años diseñando soluciones de seguridad estructuradas, confiables y a la medida. Operamos con monitoreo permanente 24/7: control, respuesta oportuna y tranquilidad constante.'), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 30,
      flexWrap: 'wrap'
    }
  }, React.createElement(Btn, {
    variant: 'primary',
    size: 'lg',
    onClick: () => go('contacto'),
    iconRight: React.createElement(Icons.arrow, {
      size: 18
    })
  }, 'Cotización gratuita'), React.createElement(Btn, {
    variant: 'on-dark',
    size: 'lg',
    onClick: () => go('servicios')
  }, 'Conoce nuestros servicios')), /* Bifurcación */
  React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      marginTop: 48
    }
  }, [['Quiero proteger mi empresa, propiedad o personas', 'Ver soluciones', Icons.shield, () => go('servicios')], ['Quiero construir mi carrera en seguridad', 'Únete a A1S', Icons.users, () => go('talento')]].map(([t, c, Ic, fn], i) => React.createElement('button', {
    key: i,
    onClick: fn,
    style: {
      textAlign: 'left',
      cursor: 'pointer',
      display: 'flex',
      gap: 16,
      alignItems: 'center',
      background: 'var(--dark-surface)',
      border: '1px solid var(--dark-line)',
      borderRadius: 'var(--radius-lg)',
      padding: '20px 22px',
      color: 'inherit',
      transition: 'border-color .25s, transform .25s'
    },
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = 'var(--a1s-red)';
      e.currentTarget.style.transform = 'translateY(-3px)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = 'var(--dark-line)';
      e.currentTarget.style.transform = '';
    }
  }, React.createElement('span', {
    style: {
      flex: 'none',
      width: 48,
      height: 48,
      display: 'grid',
      placeItems: 'center',
      borderRadius: '50%',
      background: 'color-mix(in srgb, var(--a1s-red) 16%, transparent)',
      color: 'var(--a1s-red-400)'
    }
  }, React.createElement(Ic, {
    size: 24
  })), React.createElement('span', null, React.createElement('span', {
    style: {
      display: 'block',
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.3
    }
  }, t), React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      marginTop: 6,
      color: 'var(--a1s-red-400)',
      fontWeight: 600,
      fontSize: '.875rem'
    }
  }, c, React.createElement(Icons.arrow, {
    size: 14
  })))))))), /* CIFRAS */
  React.createElement('section', {
    style: {
      ...SECTION,
      background: 'var(--surface)'
    }
  }, React.createElement('div', {
    style: WRAP
  }, React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(6,1fr)',
      gap: 24
    }
  }, [[55, 'Años de experiencia', '+', ''], [3500, 'Colaboradores', '+', ''], [1000, 'Clientes activos', '+', ''], [500, 'Municipios', '+', ''], [5, 'Regionales', '', ''], [24, 'Monitoreo', '', '/7']].map(([v, l, p, s], i) => React.createElement(Stat, {
    key: i,
    value: v,
    prefix: p,
    suffix: s,
    label: l
  }))))), /* PORTAFOLIO — tabs */
  React.createElement('section', {
    style: SECTION
  }, React.createElement('div', {
    style: WRAP
  }, React.createElement(Eyebrow, null, 'Nuestras soluciones de seguridad'), React.createElement('h2', {
    style: {
      margin: '14px 0 0',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(1.9rem,3.5vw,2.8rem)',
      letterSpacing: '-.02em',
      maxWidth: '18ch'
    }
  }, 'Soluciones adaptadas a tu necesidad.'), React.createElement('div', {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6,
      marginTop: 28,
      padding: 6,
      background: 'var(--gray-100)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-pill)',
      width: 'fit-content',
      maxWidth: '100%'
    }
  }, SERVICES.map(s => React.createElement('button', {
    key: s.id,
    onClick: () => setTab(s.id),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 18px',
      border: 'none',
      cursor: 'pointer',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: '.9rem',
      whiteSpace: 'nowrap',
      transition: 'all .2s',
      background: tab === s.id ? 'var(--a1s-red)' : 'transparent',
      color: tab === s.id ? '#fff' : 'var(--text-muted)'
    }
  }, React.createElement(s.Icon, {
    size: 17
  }), s.label))), React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.1fr',
      gap: 40,
      marginTop: 36,
      alignItems: 'center'
    }
  }, React.createElement(MediaPlaceholder, {
    ratio: '4 / 3',
    Icon: svc.Icon,
    label: 'Media inmersiva · ' + svc.label
  }), React.createElement('div', null, React.createElement(Eyebrow, null, svc.eyebrow), React.createElement('h3', {
    style: {
      margin: '12px 0 0',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '1.75rem',
      letterSpacing: '-.01em'
    }
  }, svc.title), React.createElement('p', {
    style: {
      marginTop: 14,
      color: 'var(--text-muted)',
      fontSize: '1.0625rem',
      lineHeight: 1.6,
      maxWidth: '46ch'
    }
  }, svc.desc), React.createElement('div', {
    style: {
      marginTop: 24
    }
  }, React.createElement(Btn, {
    variant: 'outline',
    onClick: () => go('servicios'),
    iconRight: React.createElement(Icons.arrow, {
      size: 16
    })
  }, 'Conocer más')))))), /* CÓMO OPERAMOS */
  React.createElement('section', {
    style: {
      ...SECTION,
      background: 'var(--surface)'
    }
  }, React.createElement('div', {
    style: WRAP
  }, React.createElement(Eyebrow, null, '¿Cómo operamos?'), React.createElement('h2', {
    style: {
      margin: '14px 0 36px',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(1.9rem,3.5vw,2.8rem)',
      letterSpacing: '-.02em'
    }
  }, 'Un proceso probado en 4 pasos.'), React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 20
    }
  }, [['01', 'Evaluación', 'Análisis de riesgos y de la operación para diseñar el esquema más óptimo.'], ['02', 'Planeación', 'Diseñamos el esquema (física, electrónica o ambas) con monitoreo 24/7.'], ['03', 'Implementación', 'Instalamos, asignamos personal y capacitamos al equipo desde el día 1.'], ['04', 'Optimización', 'Monitoreo constante y mejora continua para garantizar adaptabilidad.']].map(([n, t, d]) => React.createElement('div', {
    key: n,
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-6)'
    }
  }, React.createElement('div', {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '2.4rem',
      color: 'color-mix(in srgb, var(--a1s-red) 22%, var(--gray-200))',
      lineHeight: 1
    }
  }, n), React.createElement('h3', {
    style: {
      margin: '14px 0 8px',
      fontSize: '1.125rem',
      fontWeight: 700
    }
  }, t), React.createElement('p', {
    style: {
      margin: 0,
      color: 'var(--text-muted)',
      fontSize: '.9375rem',
      lineHeight: 1.55
    }
  }, d))))), /* CERTIFICACIONES — band oscura */
  React.createElement('section', {
    className: 'a1s-dark',
    style: {
      background: '#0A0A0C',
      padding: 'var(--section-y) 0',
      position: 'relative',
      overflow: 'hidden'
    }
  }, React.createElement('div', {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(60% 100% at 50% 0%, rgba(192,35,27,.16), transparent 60%)'
    }
  }), React.createElement('div', {
    style: {
      ...WRAP,
      position: 'relative',
      textAlign: 'center'
    }
  }, React.createElement(Eyebrow, {
    dark: true,
    style: {
      justifyContent: 'center'
    }
  }, 'Comercio seguro'), React.createElement('h2', {
    style: {
      margin: '14px auto 0',
      maxWidth: '20ch',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(1.8rem,3.4vw,2.6rem)',
      letterSpacing: '-.02em'
    }
  }, 'Respaldados por los estándares más exigentes.'), React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'center',
      gap: 18,
      marginTop: 34,
      flexWrap: 'wrap'
    }
  }, [['OEA', 'Operador Económico Autorizado'], ['BASC', 'Business Alliance for Secure Commerce']].map(([t, d]) => React.createElement('div', {
    key: t,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      background: 'var(--dark-surface)',
      border: '1px solid var(--dark-line)',
      borderRadius: 'var(--radius-lg)',
      padding: '22px 28px',
      boxShadow: 'var(--shadow-glow)'
    }
  }, React.createElement('div', {
    style: {
      width: 60,
      height: 60,
      borderRadius: '50%',
      display: 'grid',
      placeItems: 'center',
      border: '2px solid var(--a1s-red)',
      color: 'var(--a1s-red-400)'
    }
  }, React.createElement(Icons.shield, {
    size: 30
  })), React.createElement('div', {
    style: {
      textAlign: 'left'
    }
  }, React.createElement('div', {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '1.5rem'
    }
  }, t), React.createElement('div', {
    style: {
      color: 'var(--dark-muted)',
      fontSize: '.875rem',
      maxWidth: '24ch'
    }
  }, d)))))), /* CASOS / CLIENTES */
  React.createElement('section', {
    style: SECTION
  }, React.createElement('div', {
    style: WRAP
  }, React.createElement('div', {
    style: {
      textAlign: 'center'
    }
  }, React.createElement(Eyebrow, {
    style: {
      justifyContent: 'center'
    }
  }, 'Casos de éxito'), React.createElement('h2', {
    style: {
      margin: '14px auto 0',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(1.8rem,3.4vw,2.6rem)',
      letterSpacing: '-.02em'
    }
  }, 'La confianza de quienes protegemos.')), React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 16,
      marginTop: 34
    }
  }, ['OFFCORSS', 'SIMONIZ', 'TRANSMILENIO', 'SAMSUNG'].map(c => React.createElement('div', {
    key: c,
    style: {
      display: 'grid',
      placeItems: 'center',
      height: 84,
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      color: 'var(--gray-400)',
      fontWeight: 700,
      letterSpacing: '.04em',
      fontSize: '1.0625rem'
    }
  }, c))), React.createElement('p', {
    style: {
      textAlign: 'center',
      marginTop: 14,
      fontSize: '.8125rem',
      color: 'var(--text-muted)'
    }
  }, 'Logos ilustrativos · sujeto a autorización de uso de cada cliente.'))), /* TALENTO BRIDGE */
  React.createElement('section', {
    style: {
      paddingBottom: 'var(--section-y)'
    }
  }, React.createElement('div', {
    style: WRAP
  }, React.createElement('div', {
    style: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 'var(--radius-xl)',
      background: '#121217',
      color: '#fff',
      padding: 'clamp(2.5rem,5vw,4rem)'
    }
  }, React.createElement('div', {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(70% 120% at 90% 20%, rgba(192,35,27,.30), transparent 55%)'
    }
  }), React.createElement('div', {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 40,
      flexWrap: 'wrap'
    }
  }, React.createElement('div', {
    style: {
      flex: '1 1 320px'
    }
  }, React.createElement(Eyebrow, {
    dark: true
  }, 'Únete a A1S'), React.createElement('h2', {
    style: {
      margin: '14px 0 0',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(1.8rem,3.2vw,2.5rem)',
      letterSpacing: '-.02em',
      maxWidth: '18ch'
    }
  }, '¿Quieres hacer parte del equipo que protege a Colombia?'), React.createElement('p', {
    style: {
      marginTop: 16,
      color: 'var(--dark-muted)',
      fontSize: '1.0625rem',
      lineHeight: 1.6,
      maxWidth: '46ch'
    }
  }, 'Somos +3.500 personas. Aquí encontrarás estabilidad, formación constante y un equipo que te respalda.')), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 12
    }
  }, React.createElement(Btn, {
    variant: 'primary',
    size: 'lg',
    onClick: () => go('talento'),
    iconRight: React.createElement(Icons.arrow, {
      size: 18
    })
  }, 'Ver vacantes')))))))));
}

/* ════════════════ COBERTURA ════════════════ */
function CoberturaView({
  go
}) {
  const [active, setActive] = React.useState(null);
  return React.createElement('section', {
    className: 'a1s-dark',
    style: {
      background: '#0A0A0C',
      minHeight: '100%',
      padding: 'var(--section-y) 0'
    }
  }, React.createElement('div', {
    style: WRAP
  }, React.createElement(Eyebrow, {
    dark: true
  }, 'Cobertura nacional, presencia local'), React.createElement('h1', {
    style: {
      margin: '14px 0 0',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(2.2rem,4.5vw,3.4rem)',
      letterSpacing: '-.02em'
    }
  }, 'Operamos donde nos necesitas.'), React.createElement('p', {
    style: {
      marginTop: 16,
      maxWidth: '48ch',
      color: 'var(--dark-muted)',
      fontSize: '1.0625rem',
      lineHeight: 1.6
    }
  }, '5 regionales y operación directa en +500 municipios, 24/7. Pasa el cursor sobre cada regional.'), React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.1fr 1fr',
      gap: 40,
      marginTop: 40,
      alignItems: 'center'
    }
  }, /* mapa esquemático */
  React.createElement('div', {
    style: {
      position: 'relative',
      aspectRatio: '3 / 4',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--dark-line)',
      overflow: 'hidden',
      background: 'radial-gradient(80% 60% at 60% 30%, rgba(192,35,27,.12), transparent 60%), repeating-linear-gradient(0deg, rgba(255,255,255,.04) 0 1px, transparent 1px 30px), repeating-linear-gradient(90deg, rgba(255,255,255,.04) 0 1px, transparent 1px 30px)'
    }
  }, React.createElement('div', {
    'aria-hidden': true,
    style: {
      position: 'absolute',
      left: '34%',
      top: '28%',
      width: '42%',
      height: '56%',
      borderRadius: '42% 55% 50% 60% / 40% 42% 58% 60%',
      border: '1.5px solid rgba(255,255,255,.18)',
      background: 'rgba(255,255,255,.03)'
    }
  }), REGIONALES.map(r => React.createElement('button', {
    key: r.reg,
    onClick: () => setActive(r.reg),
    onMouseEnter: () => setActive(r.reg),
    style: {
      position: 'absolute',
      left: r.x + '%',
      top: r.y + '%',
      transform: 'translate(-50%,-50%)',
      cursor: 'pointer',
      background: 'none',
      border: 'none'
    }
  }, React.createElement('span', {
    style: {
      display: 'block',
      width: active === r.reg ? 16 : 12,
      height: active === r.reg ? 16 : 12,
      borderRadius: '50%',
      background: 'var(--a1s-red)',
      boxShadow: active === r.reg ? '0 0 0 6px rgba(192,35,27,.25), 0 0 16px var(--a1s-red-glow)' : '0 0 0 4px rgba(192,35,27,.18)',
      transition: 'all .2s'
    }
  })))), /* lista de regionales */
  React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, REGIONALES.map(r => React.createElement('div', {
    key: r.reg,
    onMouseEnter: () => setActive(r.reg),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '16px 18px',
      borderRadius: 'var(--radius-md)',
      background: active === r.reg ? 'var(--dark-elevated)' : 'var(--dark-surface)',
      border: '1px solid ' + (active === r.reg ? 'var(--a1s-red)' : 'var(--dark-line)'),
      transition: 'all .2s'
    }
  }, React.createElement('span', {
    style: {
      color: 'var(--a1s-red-400)'
    }
  }, React.createElement(Icons.pin, {
    size: 22
  })), React.createElement('div', null, React.createElement('div', {
    style: {
      fontWeight: 700,
      fontSize: '1.0625rem'
    }
  }, 'Regional ' + r.reg), React.createElement('div', {
    style: {
      color: 'var(--dark-muted)',
      fontSize: '.875rem'
    }
  }, 'Sede ' + r.city)), React.createElement('span', {
    style: {
      marginLeft: 'auto',
      fontSize: '.75rem',
      color: 'var(--dark-muted)'
    }
  }, '24/7'))))), React.createElement('div', {
    style: {
      marginTop: 36
    }
  }, React.createElement(Btn, {
    variant: 'primary',
    onClick: () => go('contacto'),
    iconRight: React.createElement(Icons.arrow, {
      size: 16
    })
  }, 'Solicitar cobertura'))));
}

/* ════════════════ VACANTES (Talento) ════════════════ */
const VACANTES = [{
  t: 'Guarda de seguridad',
  reg: 'Antioquia',
  city: 'Medellín',
  type: 'Tiempo completo',
  date: 'Publicada hoy',
  isNew: true
}, {
  t: 'Manejador canino (K9)',
  reg: 'Centro',
  city: 'Bogotá',
  type: 'Tiempo completo',
  date: 'Hace 3 días'
}, {
  t: 'Operador de monitoreo CCTV',
  reg: 'Caribe',
  city: 'Cartagena',
  type: 'Turnos rotativos',
  date: 'Hace 5 días',
  isNew: true
}, {
  t: 'Escolta de protección',
  reg: 'Centro',
  city: 'Bogotá',
  type: 'Tiempo completo',
  date: 'Hace 1 semana'
}, {
  t: 'Supervisor de operaciones',
  reg: 'Suroccidente',
  city: 'Cali',
  type: 'Tiempo completo',
  date: 'Hace 1 semana'
}, {
  t: 'Analista de ciberseguridad',
  reg: 'Santander',
  city: 'Bucaramanga',
  type: 'Híbrido',
  date: 'Hace 2 semanas'
}];
function VacantesView({
  go
}) {
  const [reg, setReg] = React.useState('Todas');
  const filtered = reg === 'Todas' ? VACANTES : VACANTES.filter(v => v.reg === reg);
  const regs = ['Todas', ...REGIONALES.map(r => r.reg)];
  return React.createElement('div', null, React.createElement('section', {
    className: 'a1s-dark',
    style: {
      background: '#0A0A0C',
      padding: 'calc(var(--section-y) * .8) 0',
      position: 'relative',
      overflow: 'hidden',
      marginTop: '-72px',
      paddingTop: 'calc(72px + var(--section-y) * .6)'
    }
  }, React.createElement('div', {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(70% 90% at 80% 10%, rgba(192,35,27,.22), transparent 60%)'
    }
  }), React.createElement('div', {
    style: {
      ...WRAP,
      position: 'relative'
    }
  }, React.createElement(Eyebrow, {
    dark: true
  }, 'Únete a A1S'), React.createElement('h1', {
    style: {
      margin: '14px 0 0',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(2.2rem,4.5vw,3.4rem)',
      letterSpacing: '-.02em',
      maxWidth: '18ch'
    }
  }, 'Tu seguridad también importa.'), React.createElement('p', {
    style: {
      marginTop: 16,
      maxWidth: '48ch',
      color: 'var(--dark-muted)',
      fontSize: '1.0625rem',
      lineHeight: 1.6
    }
  }, 'Somos +3.500 personas protegiendo a Colombia. Estabilidad, formación constante y un equipo que te respalda.'), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 28,
      marginTop: 30
    }
  }, React.createElement(Stat, {
    value: 3500,
    label: 'Colaboradores',
    dark: true
  }), React.createElement(Stat, {
    value: 5,
    prefix: '',
    label: 'Regionales',
    dark: true
  })))), React.createElement('section', {
    style: {
      padding: 'var(--section-y) 0'
    }
  }, React.createElement('div', {
    style: WRAP
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      flexWrap: 'wrap',
      marginBottom: 28
    }
  }, React.createElement('h2', {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '1.6rem',
      letterSpacing: '-.01em'
    }
  }, 'Vacantes disponibles'), React.createElement('div', {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, regs.map(r => React.createElement('button', {
    key: r,
    onClick: () => setReg(r),
    style: {
      padding: '7px 14px',
      border: '1px solid ' + (reg === r ? 'var(--a1s-red)' : 'var(--border)'),
      cursor: 'pointer',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: '.8125rem',
      background: reg === r ? 'var(--a1s-red)' : 'transparent',
      color: reg === r ? '#fff' : 'var(--text-muted)'
    }
  }, r)))), React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      gap: 14
    }
  }, filtered.map((v, i) => React.createElement('a', {
    key: i,
    onClick: () => go('contacto'),
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      cursor: 'pointer',
      textDecoration: 'none',
      color: 'inherit',
      background: 'var(--surface-card)',
      border: '1px solid var(--border)',
      borderLeft: '3px solid var(--a1s-red)',
      borderRadius: 'var(--radius-md)',
      padding: 'var(--space-5)',
      boxShadow: 'var(--shadow-sm)',
      transition: 'transform .22s, box-shadow .22s'
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = '';
      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 12,
      alignItems: 'flex-start'
    }
  }, React.createElement('h3', {
    style: {
      margin: 0,
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '1.125rem',
      lineHeight: 1.2
    }
  }, v.t), v.isNew && React.createElement('span', {
    style: {
      flex: 'none',
      padding: '4px 10px',
      fontSize: '.6875rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '.04em',
      color: '#fff',
      background: 'var(--a1s-red)',
      borderRadius: 'var(--radius-pill)'
    }
  }, 'Nueva')), React.createElement('div', {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px 16px',
      color: 'var(--text-muted)',
      fontSize: '.8125rem'
    }
  }, React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      whiteSpace: 'nowrap'
    }
  }, React.createElement(Icons.pin, {
    size: 15
  }), v.reg + ' · ' + v.city), React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      whiteSpace: 'nowrap'
    }
  }, React.createElement(Icons.clock, {
    size: 15
  }), v.type), React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      whiteSpace: 'nowrap'
    }
  }, React.createElement(Icons.cal, {
    size: 15
  }), v.date)), React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      color: 'var(--a1s-red)',
      fontWeight: 600,
      fontSize: '.9375rem'
    }
  }, 'Ver y postularme', React.createElement(Icons.arrow, {
    size: 16
  }))))), filtered.length === 0 && React.createElement('div', {
    style: {
      textAlign: 'center',
      padding: '48px',
      color: 'var(--text-muted)'
    }
  }, 'Por ahora no hay vacantes en esa regional. Déjanos tu hoja de vida y te contactamos.'))));
}

/* ════════════════ CONTACTO ════════════════ */
function ContactoView() {
  const [sent, setSent] = React.useState(false);
  const field = (label, props = {}) => React.createElement('label', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7
    }
  }, React.createElement('span', {
    style: {
      fontSize: '.875rem',
      fontWeight: 600
    }
  }, label), React.createElement(props.multiline ? 'textarea' : 'input', {
    rows: props.multiline ? 4 : undefined,
    placeholder: props.ph || '',
    style: {
      width: '100%',
      boxSizing: 'border-box',
      padding: '13px 16px',
      minHeight: props.multiline ? undefined : 48,
      fontFamily: 'var(--font-sans)',
      fontSize: '1rem',
      color: 'var(--text)',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-md)',
      outline: 'none',
      resize: props.multiline ? 'vertical' : undefined
    },
    onFocus: e => {
      e.target.style.borderColor = 'var(--a1s-red)';
      e.target.style.boxShadow = 'var(--ring)';
    },
    onBlur: e => {
      e.target.style.borderColor = 'var(--border-strong)';
      e.target.style.boxShadow = 'none';
    }
  }));
  return React.createElement('section', {
    style: {
      padding: 'var(--section-y) 0'
    }
  }, React.createElement('div', {
    style: {
      maxWidth: 760,
      margin: '0 auto',
      padding: '0 var(--gutter)'
    }
  }, React.createElement(Eyebrow, null, 'Avancemos juntos'), React.createElement('h1', {
    style: {
      margin: '14px 0 0',
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(2rem,4vw,3rem)',
      letterSpacing: '-.02em'
    }
  }, 'Cuéntanos qué necesitas proteger.'), React.createElement('p', {
    style: {
      marginTop: 14,
      color: 'var(--text-muted)',
      fontSize: '1.0625rem',
      lineHeight: 1.6,
      maxWidth: '52ch'
    }
  }, 'Diseñamos un esquema a tu medida. Nuestros expertos te asesoran sin costo.'), sent ? React.createElement('div', {
    style: {
      marginTop: 32,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '24px',
      background: 'color-mix(in srgb, var(--success) 10%, transparent)',
      border: '1px solid color-mix(in srgb, var(--success) 35%, transparent)',
      borderRadius: 'var(--radius-lg)',
      color: 'var(--success)'
    }
  }, React.createElement(Icons.check, {
    size: 26
  }), React.createElement('div', {
    style: {
      color: 'var(--text)'
    }
  }, React.createElement('strong', null, 'Solicitud enviada.'), ' Te contactaremos muy pronto por WhatsApp o correo.')) : React.createElement('div', {
    style: {
      marginTop: 32,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 18
    }
  }, field('Nombre completo', {
    ph: 'Tu nombre'
  }), field('Empresa', {
    ph: 'Razón social'
  }), field('Correo', {
    ph: 'correo@empresa.com'
  }), field('Teléfono', {
    ph: '+57 ___ ___ ____'
  }), React.createElement('div', {
    style: {
      gridColumn: '1 / -1'
    }
  }, field('¿Qué necesitas proteger?', {
    multiline: true,
    ph: 'Cuéntanos sobre tu operación…'
  })), React.createElement('label', {
    style: {
      gridColumn: '1 / -1',
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      fontSize: '.875rem',
      color: 'var(--text-muted)'
    }
  }, React.createElement('input', {
    type: 'checkbox',
    style: {
      marginTop: 3,
      accentColor: 'var(--a1s-red)',
      width: 18,
      height: 18
    }
  }), React.createElement('span', null, 'Autorizo el tratamiento de mis datos personales conforme a la ', React.createElement('a', {
    style: {
      color: 'var(--a1s-red)',
      textDecoration: 'underline'
    }
  }, 'Política de Tratamiento de Datos'), ' (Habeas Data).')), React.createElement('div', {
    style: {
      gridColumn: '1 / -1',
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, React.createElement(Btn, {
    variant: 'primary',
    size: 'lg',
    onClick: () => setSent(true)
  }, '¡Cotización gratuita!'), React.createElement(Btn, {
    variant: 'outline',
    size: 'lg',
    icon: React.createElement(Icons.wa, {
      size: 18
    })
  }, 'Escríbenos por WhatsApp')))));
}
Object.assign(window, {
  HomeView,
  CoberturaView,
  VacantesView,
  ContactoView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/views.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.StatCounter = __ds_scope.StatCounter;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.VacancyCard = __ds_scope.VacancyCard;

})();
