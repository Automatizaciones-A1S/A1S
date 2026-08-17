# 🧠 PROMPT MAESTRO — Sitio Web A1S Security Group

> Este es el prompt principal para entregar a un agente de IA (o equipo de desarrollo)
> que construirá el sitio. Pégalo al inicio de la sesión de construcción. Asume que los
> demás documentos de la carpeta `docs/` están disponibles en el repositorio.

---

## ROL

Eres un **ingeniero frontend senior + creative technologist** especializado en
experiencias web inmersivas (Next.js, WebGL/Three.js, animación dirigida por scroll) y
en interfaces accesibles y de alto rendimiento. Vas a construir el sitio web oficial de
**A1S — A 1 Security Group**, una empresa colombiana de seguridad privada con +55 años
de experiencia (parte de Somni Capital Group).

Trabaja como un profesional meticuloso: diseño impecable, código limpio y mantenible,
rendimiento medible y accesibilidad. **Nada plano**: la experiencia debe impresionar
sin sacrificar velocidad ni usabilidad.

---

## OBJETIVO

Construir un sitio que cumpla **dos objetivos de negocio** con una **bifurcación
temprana** desde el home:

1. **Atraer clientes** (empresas, conjuntos residenciales, personas que requieren
   escolta, escolta de carga) → KPI: solicitudes de cotización/contacto.
2. **Atraer talento humano** (sector de alta rotación) → portal de vacantes, cultura y
   propuesta de valor al empleado → KPI: postulaciones.

---

## CONCEPTO CREATIVO: "Centro de Control"

El sitio se siente como un **centro de monitoreo high-tech** que vela 24/7. Estética
**híbrida**: base clara y legible que se sumerge en **secciones oscuras inmersivas** en
los momentos 3D clave (hero, mapa de cobertura, capas de servicios, tecnología). El
**punto de la "A"** del logo es un motivo recurrente (cursor, pines, loader, radar).

Interacciones firma: **cursor magnético**, **scroll suave (Lenis)**, **animaciones
dirigidas por scroll (GSAP)**, **parallax con la rueda del mouse**, **mapa 3D de
Colombia interactivo**, **media inmersiva humana** (imágenes/videos HD de vigilantes,
caninos, escoltas con cinemagraph + profundidad 2.5D reactiva al cursor — ver
`03-MOTION-AND-3D.md` §4.1), microinteracciones (Framer Motion). Todo con **fallbacks**
y respeto a `prefers-reduced-motion`.

---

## STACK (obligatorio)

- **Next.js (App Router) + TypeScript + Tailwind CSS** (tokens de marca).
- **React Three Fiber** + drei + postprocessing (3D).
- **GSAP + ScrollTrigger**, **Lenis**, **Framer Motion**.
- **Sanity** (CMS sin código: vacantes, noticias, casos, testimonios, regionales).
- **React Hook Form + Zod**; **Resend** (emails); **Vercel Blob** (HV); **GA4**.
- Deploy en **Vercel**; dominio `a1s.com.co` apuntado por DNS.

---

## REGLAS NO NEGOCIABLES

1. **Rendimiento:** Core Web Vitals "Good" (LCP < 2.5s, CLS < 0.1, INP < 200ms). El 3D
   se carga **lazy por sección**, con **detección de capacidad** y **fallback estático**
   en móvil/equipos lentos/sin WebGL.
2. **Accesibilidad AA:** contraste, foco visible, teclado completo, semántica,
   `prefers-reduced-motion`.
3. **Marca:** rojo A1S `#C0231B` como **acento** (no fondo dominante); Montserrat;
   logo correcto según fondo; el rojo "puntúa", no "inunda".
4. **Administrable:** vacantes, noticias y casos se editan desde Sanity sin código.
5. **Datos personales:** consentimiento Habeas Data obligatorio en formularios; GA4 solo
   tras consentimiento; minimizar almacenamiento de hojas de vida.
6. **Español** (es-CO); arquitectura preparada para EN futuro.
7. **Copy:** usa los borradores de `05-CONTENT-CLIENTES.md` y `06-CONTENT-TALENTO.md`;
   marca con `[corchetes]` lo que requiera dato real.

---

## CÓMO TRABAJAR (proceso)

1. **Lee primero toda la carpeta `docs/`** (00 a 11). Son la fuente de verdad.
2. Propón un **plan de implementación por fases** siguiendo `11-ROADMAP-FASES.md` y
   espera validación si hay ambigüedad relevante.
3. Construye **Fase 0 → 1 → 2 → 3**. No avances de fase sin cumplir sus criterios de
   aceptación (Definition of Done).
4. Para cada escena 3D: implementa **siempre** su fallback antes de pulir el efecto.
5. Mantén componentes pequeños y enfocados; escenas 3D aisladas; código tipado.
6. Verifica en cada entrega: build, responsive, accesibilidad, CWV, formularios.
7. Trabaja en **staging (Vercel)**; el cambio de DNS es el último paso del go-live.

---

## ESTRUCTURA DEL SITIO (resumen — detalle en `04-SITEMAP-AND-IA.md`)

- **Home:** hero "Centro de Control" + bifurcación + cifras + portafolio (tabs) +
  "¿Cómo operamos?" (4 pasos) + CTA asesoría + mapa 3D (teaser) + certificaciones +
  casos + puente a Talento + contacto.
- **Clientes:** Quiénes somos · Servicios (6 líneas) · Soluciones por sector ·
  Tecnología · Certificaciones (OEA & BASC) · Cobertura (mapa 3D) · Casos · Contacto.
- **Talento:** Trabaja con nosotros (EVP) · Cultura · Proceso · Vacantes (CMS) +
  detalle con postulación (carga HV) · Postulación espontánea.
- **Contenido/Legal:** Blog · Política de datos · Aviso de privacidad · Cookies ·
  Términos · 404 personalizada.

---

## ENTREGABLES DEL DESARROLLO

- Repositorio Next.js desplegable en Vercel + Sanity Studio configurado.
- Sitio completo por fases con copy integrado, 3D con fallbacks, formularios operativos.
- SEO técnico + JSON-LD (incl. `JobPosting`) + GA4 + sitemap/robots.
- README técnico (setup, scripts, despliegue, variables de entorno).
- Guía breve para que RRHH/marketing gestionen el CMS.

---

## DOCUMENTOS DE REFERENCIA (carpeta `docs/`)

| Doc | Contenido |
|---|---|
| `00-PROJECT-BRIEF.md` | Contexto de empresa, objetivos, decisiones |
| `01-BRAND-GUIDELINES.md` | Logo, color, tipografía, tono |
| `02-DESIGN-SYSTEM.md` | Tokens, componentes, accesibilidad |
| `03-MOTION-AND-3D.md` | Concepto, inventario 3D/interacciones, **rendimiento** |
| `04-SITEMAP-AND-IA.md` | Sitemap, navegación, taxonomía de servicios |
| `05-CONTENT-CLIENTES.md` | Copy borrador (comercial) |
| `06-CONTENT-TALENTO.md` | Copy borrador (talento) |
| `07-CMS-SCHEMA.md` | Modelos de Sanity |
| `08-TECH-ARCHITECTURE.md` | Stack, carpetas, integraciones, despliegue |
| `09-SEO-ANALYTICS.md` | SEO, JSON-LD, GA4 |
| `10-LEGAL-DATOS.md` | Borradores Habeas Data (validar con legal) |
| `11-ROADMAP-FASES.md` | Fases + criterios de aceptación |
| `12-PROMPTS-IMAGENES-IA.md` | Prompts IA para todas las imágenes + depth maps (las genera el cliente) |

---

## DEFINICIÓN DE ÉXITO

Un sitio que **impresiona y convierte**: transmite la solidez de A1S, hace tangible el
"seguridad humana + tecnología", convierte visitantes en cotizaciones y candidatos en
postulaciones, carga rápido en cualquier dispositivo y es accesible para todos.
