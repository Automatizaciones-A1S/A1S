# 08 · Tech Architecture

> Stack, estructura, integraciones y despliegue. Objetivo: una base **moderna, rápida,
> mantenible y escalable** para una experiencia 3D de alto impacto.

---

## 1. Stack

| Capa | Tecnología |
|---|---|
| Framework | **Next.js (App Router)** + **TypeScript** |
| Estilos | **Tailwind CSS** + CSS variables (tokens de `02-DESIGN-SYSTEM.md`) |
| UI base | Componentes propios + (opcional) **shadcn/ui** / Radix para accesibilidad |
| 3D | **React Three Fiber** + **@react-three/drei** + **@react-three/postprocessing** |
| Animación | **GSAP + ScrollTrigger**, **Lenis**, **Framer Motion** |
| Formularios | **React Hook Form** + **Zod** (validación) |
| CMS | **Sanity** (Studio + GROQ) |
| Email | **Resend** (o similar) para notificaciones de leads/postulaciones |
| Almacenamiento HV | **Vercel Blob** (privado) — o storage equivalente |
| Analítica | **GA4** (con consentimiento) |
| Hosting | **Vercel** |
| Fuentes | `next/font` (Montserrat) |
| Imágenes | `next/image` (AVIF/WebP) |

---

## 2. Estructura de carpetas (sugerida)

```
/app
  /(marketing)            # core clientes
    /quienes-somos
    /servicios/[linea]
    /soluciones
    /tecnologia
    /certificaciones
    /cobertura
    /casos-de-exito
    /contacto
  /(talento)
    /trabaja-con-nosotros
      /cultura
      /proceso
    /vacantes
      /[slug]
      /postulacion-espontanea
  /blog/[slug]
  /(legal)
    /politica-de-tratamiento-de-datos
    ...
  /api
    /lead          # POST contacto/cotización → Resend + (WhatsApp link en cliente)
    /postulacion   # POST postulación → upload HV + Resend a RRHH
    /revalidate    # webhook Sanity (ISR)
  layout.tsx
  not-found.tsx
/components
  /ui              # botones, inputs, cards, tabs...
  /3d              # escenas R3F (Hero, Mapa, Capas...) con fallbacks
  /media           # ImmersiveMedia (cinemagraph + depth 2.5D al cursor) + fallbacks
  /motion          # wrappers GSAP/Framer, hooks de scroll/cursor
  /sections        # bloques de página
/lib
  /sanity          # cliente, queries GROQ, tipos
  /seo             # helpers metadata + JSON-LD
  /analytics       # GA4 + consentimiento
  /validation      # esquemas Zod
/sanity            # Studio + schemas (ver 07-CMS-SCHEMA.md)
/public            # assets estáticos, posters/fallbacks 3D
/styles
```

---

## 3. Formularios e integraciones

### Lead comercial (contacto / cotización)
1. Validación cliente (Zod) → `POST /api/lead`.
2. Servidor: anti-spam (honeypot + rate limit / verificación), envío por **Resend** al
   correo comercial `[definir]`.
3. Cliente: además, botón **"Enviar por WhatsApp"** que abre
   `https://wa.me/573057710909?text=<mensaje prellenado>`.
4. Confirmación (toast/página de gracias) + evento GA4 `generate_lead`.

### Postulación (talento)
1. Validación + **carga de HV** (PDF/DOC, límite de tamaño/tipo).
2. `POST /api/postulacion`: sube HV a **Vercel Blob (privado)**, notifica a RRHH por
   **Resend** con enlace seguro + datos del candidato.
3. Consentimiento obligatorio registrado (timestamp + versión de política).
4. Evento GA4 `job_application`. (Almacenamiento mínimo por Habeas Data — ver doc 10.)

### WhatsApp flotante
Botón global con deep link `wa.me`; en móvil abre la app.

---

## 4. Variables de entorno (`.env`)

```
NEXT_PUBLIC_SITE_URL=https://www.a1s.com.co
SANITY_PROJECT_ID=
SANITY_DATASET=production
SANITY_API_TOKEN=          # lectura/escritura según uso
SANITY_WEBHOOK_SECRET=
RESEND_API_KEY=
LEADS_EMAIL_TO=            # correo comercial
RRHH_EMAIL_TO=            # correo de RRHH para postulaciones
BLOB_READ_WRITE_TOKEN=     # Vercel Blob
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_WHATSAPP=573057710909
```

---

## 5. Rendimiento (ver detalle en `03-MOTION-AND-3D.md`)
- 3D **lazy** por sección + detección de capacidad + fallbacks.
- ISR para CMS; `next/image`, `next/font`; code-splitting; `frameloop="demand"`.
- Core Web Vitals objetivo "Good" (LCP < 2.5s, CLS < 0.1, INP < 200ms).

---

## 6. Despliegue y dominio
- **Hosting:** Vercel (build de Next.js, previews por rama, ISR/edge).
- **Dominio:** `a1s.com.co` **se mantiene donde está registrado**; se apunta vía **DNS**
  a Vercel:
  - Registro **A** / **CNAME** según indique Vercel (apex + `www`).
  - Configurar **redirect** apex ↔ `www` (elegir canónico, recomendado `www`).
  - **SSL** automático (Vercel).
- **Sanity Studio:** desplegado (Vercel o `sanity deploy`) con acceso para el equipo.
- Plan de migración desde Wix: construir y validar en dominio de staging
  (`*.vercel.app`) → congelar contenido → cambiar DNS en ventana de bajo tráfico →
  verificar correos, formularios, analítica y redirecciones 301 de URLs antiguas.

---

## 7. Calidad y mantenibilidad
- ESLint + Prettier + TypeScript estricto.
- Componentes pequeños y enfocados; escenas 3D aisladas con su fallback.
- Accesibilidad verificada (teclado, foco, contraste, reduced-motion).
- Testing básico de formularios y utilidades clave.
- `README` técnico con setup local, scripts y guía de despliegue.
