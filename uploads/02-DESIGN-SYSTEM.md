# 02 · Design System — A1S Security Group

> Tokens y componentes para implementar la marca con consistencia. Pensado para
> **Tailwind CSS** + CSS variables. Estética **híbrida**: base clara + secciones
> oscuras inmersivas ("Centro de Control").

---

## 1. Design tokens — Color

```css
:root {
  /* Marca */
  --a1s-red: #C0231B;        /* primario / acento */
  --a1s-red-600: #A91D16;    /* hover */
  --a1s-red-400: #D6453D;    /* highlight */
  --a1s-red-glow: #FF3B30;   /* glow en oscuro (usar con opacidad baja) */

  /* Neutros */
  --a1s-black: #000000;
  --a1s-ink: #1D1D1B;        /* negro de marca (logo) */
  --a1s-graphite: #5B5B5F;   /* gris secundario */
  --a1s-white: #FFFFFF;

  /* Escala de grises */
  --gray-50:  #F7F7F8;
  --gray-100: #ECECEE;
  --gray-200: #D9D9DC;
  --gray-300: #B9B9BE;
  --gray-500: #5B5B5F;
  --gray-700: #34343A;
  --gray-900: #141417;

  /* Modo oscuro / Centro de Control */
  --dark-bg:      #0A0A0C;   /* casi-negro base */
  --dark-surface: #121217;   /* superficies/cards */
  --dark-line:    #26262E;   /* bordes sutiles */
  --dark-text:    #EDEDF0;
  --dark-muted:   #9A9AA3;

  /* Semánticos (claro) */
  --bg:        var(--a1s-white);
  --surface:   var(--gray-50);
  --text:      var(--a1s-ink);
  --text-muted:var(--a1s-graphite);
  --border:    var(--gray-200);
  --accent:    var(--a1s-red);

  /* Estado */
  --success: #1E9E5A;
  --warning: #E0A106;
  --error:   #C0231B;
}
```

**Contraste:** todo texto debe cumplir **WCAG AA** (4.5:1 normal, 3:1 grande). Texto
sobre rojo `#C0231B` → blanco. Texto sobre oscuro → `--dark-text`.

---

## 2. Tipografía

```css
--font-sans: 'Montserrat', system-ui, -apple-system, 'Segoe UI', sans-serif;
```

### Escala (fluida, clamp)
| Token | Tamaño | Uso |
|---|---|---|
| `display` | `clamp(2.75rem, 6vw, 5.5rem)` | Hero |
| `h1` | `clamp(2.25rem, 4vw, 3.5rem)` | Título de página |
| `h2` | `clamp(1.75rem, 3vw, 2.5rem)` | Sección |
| `h3` | `clamp(1.25rem, 2vw, 1.5rem)` | Subsección/card |
| `body-lg` | `1.125rem` | Intro/lead |
| `body` | `1rem` | Texto base |
| `small` | `0.875rem` | Apoyo/legales |
| `eyebrow` | `0.8125rem`, uppercase, `letter-spacing: .12em`, **rojo, itálica** | Antetítulo |

- Titulares: peso **700/600**, `line-height` 1.05–1.15, `tracking` ligeramente negativo.
- Cuerpo: peso **400/500**, `line-height` 1.6, ancho máx. **65–75ch**.

---

## 3. Espaciado, grid y radios

```css
--space-unit: 8px; /* todo múltiplo de 8 (4 para ajustes finos) */
--container-max: 1280px;
--container-wide: 1440px;
--gutter: clamp(1rem, 4vw, 4rem);

--radius-sm: 8px;
--radius-md: 16px;
--radius-lg: 28px;   /* cards/imágenes estilo Wix (esquinas suaves) */
--radius-pill: 999px;

--shadow-sm: 0 1px 2px rgba(0,0,0,.06);
--shadow-md: 0 8px 24px rgba(0,0,0,.10);
--shadow-glow: 0 0 40px rgba(192,35,27,.25); /* glow rojo en oscuro */
```

- **Grid:** 12 columnas, contenedor máx. 1280px, gutters fluidos.
- **Breakpoints:** `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`.
- Ritmo vertical generoso entre secciones (`clamp(4rem, 10vw, 9rem)`).

---

## 4. Componentes base

### Botones
| Variante | Estilo | Uso |
|---|---|---|
| **Primary** | fondo rojo `#C0231B`, texto blanco, pill | CTA principal ("¡Cotización gratuita!") |
| **Outline** | borde rojo, texto oscuro, fondo transparente | CTA secundario ("Quiero saber más") |
| **Ghost** | sin borde, texto, hover sutil | acciones terciarias |
| **On-dark** | variantes para secciones oscuras | hero/inmersivas |

- Interacción **magnética** (el botón sigue levemente el cursor) + micro-escala en hover.
- Estados: default / hover / focus-visible (anillo accesible) / active / disabled / loading.

### Cards
- Esquinas `--radius-lg`, borde sutil, hover con elevación + leve tilt 3D (parallax).
- Variante "servicio", "vacante", "noticia", "caso", "sector".

### Tabs (patrón heredado del Wix)
- Pestañas tipo pill; activa en **rojo oscuro** (`--a1s-red-600`), inactivas claras.
- Usadas en **Portafolio de servicios** y donde aplique.

### ImmersiveMedia (interacción firma)
Componente reutilizable para imagen/video de alta calidad con vida y profundidad
(vigilantes, caninos, escoltas, drones). Props sugeridas: `src` (video/imagen),
`poster`, `depthMap?`, `mode` (`cinemagraph` | `depth` | `both`), `intensity`.
- Modo **cinemagraph** (video sutil en loop) y/o **depth 2.5D reactivo al cursor**.
- **Fallbacks obligatorios:** estático en touch/`reduced-motion`/`saveData`; lazy +
  pausa fuera de viewport; desplazamiento clamped. Detalle en
  [`03-MOTION-AND-3D.md`](./03-MOTION-AND-3D.md) §4.1.
- Esquinas `--radius-lg`; usado en bifurcación, cards de servicio y heros de sección.

### Otros
Navbar (sticky, se compacta al hacer scroll), Footer, Accordion (FAQ/proceso),
Stat/Counter (contadores animados), Badge (certificaciones), Form fields + validación,
Modal/Dialog, Toast, Breadcrumb, Pagination (blog/vacantes), Cookie/consent banner,
botón flotante de WhatsApp, custom cursor.

---

## 5. Iconografía e ilustración
- **Set de iconos lineal** consistente (ej. Lucide / Phosphor), grosor uniforme.
- Ilustración/3D para suplir falta de fotografía (ver [`03-MOTION-AND-3D.md`](./03-MOTION-AND-3D.md)).
- Imágenes con `--radius-lg` y tratamiento coherente (overlay sutil, no saturar).

---

## 6. Modo claro vs. oscuro (regla de uso)
- **Claro (default):** páginas de contenido, servicios, vacantes, blog, formularios.
- **Oscuro (inmersivo):** hero, mapa de cobertura, "Centro de Control", certificaciones,
  cierres de sección con 3D. La transición claro→oscuro debe sentirse intencional
  (no a cada bloque), reforzando los "momentos wow".

---

## 7. Accesibilidad (requisito)
- Contraste AA, foco visible, navegación por teclado completa.
- `prefers-reduced-motion`: desactiva parallax/animaciones intensas, deja microfades.
- Texto alternativo en imágenes; labels en formularios; jerarquía semántica de headings.
- Targets táctiles ≥ 44px.
