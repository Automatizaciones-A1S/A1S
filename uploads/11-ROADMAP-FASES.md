# 11 · Roadmap por Fases

> Construcción **por fases** para lanzar antes y medir. Cada fase tiene alcance y
> **criterios de aceptación** (Definition of Done).

---

## Fase 0 — Cimientos (setup)
**Alcance:** repo Next.js + TS + Tailwind con tokens de marca; sistema de diseño base
(botones, tipografía, grid, dark/light); fuentes (Montserrat); estructura de carpetas;
layout global (header sticky, footer, cursor, WhatsApp flotante, banner de cookies);
pipeline de despliegue en Vercel (staging).

**Done cuando:**
- [ ] Tokens y componentes base funcionando (claro/oscuro).
- [ ] Header/footer/nav responsive + menú móvil.
- [ ] Lenis + GSAP + Framer Motion + R3F integrados (hola-mundo 3D con fallback).
- [ ] Deploy de staging en Vercel operativo.
- [ ] Accesibilidad base (foco, teclado, reduced-motion) y CWV "Good" en home vacía.

---

## Fase 1 — Experiencia comercial (Clientes) 🎯 *primer lanzamiento*
**Alcance:** Home completa ("Centro de Control" + bifurcación), Quiénes somos,
Servicios (overview + 6 líneas con tabs), Soluciones por sector, Tecnología,
Certificaciones, **Cobertura con mapa 3D**, Casos (estático inicial), Contacto con
formulario (correo + WhatsApp), legal base + banner de cookies, SEO + GA4.

**Done cuando:**
- [ ] Todas las páginas de Clientes navegables con copy borrador integrado.
- [ ] Hero 3D + mapa 3D con **fallbacks** verificados (móvil/reduced-motion).
- [ ] Formulario de contacto enviando a correo + deep link WhatsApp; anti-spam.
- [ ] SEO técnico + JSON-LD (Organization/LocalBusiness/Service) + sitemap/robots.
- [ ] GA4 con consentimiento; eventos `generate_lead`, `whatsapp_click`.
- [ ] Core Web Vitals "Good"; AA; QA cross-browser/dispositivo.

---

## Fase 2 — Portal de Talento + CMS
**Alcance:** Sanity Studio + schemas (vacante, regional, testimonio…);
Trabaja con nosotros (EVP), Cultura, Proceso; **Vacantes** (listado filtrable desde
CMS) + detalle + **formulario de postulación con carga de HV**; postulación espontánea;
JSON-LD `JobPosting`; notificaciones a RRHH.

**Done cuando:**
- [ ] RRHH puede crear/editar/cerrar vacantes en Sanity sin código.
- [ ] Listado con filtros (regional/cargo/tipo) + estados vacíos.
- [ ] Postulación: validación, carga de HV a storage privado, correo a RRHH,
      consentimiento registrado.
- [ ] `JobPosting` válido (Rich Results) y vacantes en sitemap.
- [ ] Eventos GA4 `job_view`, `job_application`, `cv_upload`.
- [ ] Cumplimiento Habeas Data revisado (retención/borrado).

---

## Fase 3 — Blog, casos dinámicos y refinamiento
**Alcance:** Blog (listado + artículo) desde CMS; Casos/testimonios dinámicos desde CMS
con autorización; pulido de animaciones/3D restantes; páginas por regional/sector para
SEO; optimización fina de rendimiento.

**Done cuando:**
- [ ] Blog y casos administrables por CMS con `Article`/`BlogPosting`.
- [ ] Todas las escenas 3D del inventario implementadas con fallback.
- [ ] Auditoría final SEO + performance + accesibilidad.

---

## Migración y go-live (al cerrar la fase deseada)
1. Validar todo en **staging** (`*.vercel.app`).
2. Cargar contenido real / reemplazar borradores; aprobar textos legales.
3. Mapear **redirecciones 301** de URLs antiguas de Wix.
4. Cambiar **DNS** del dominio a Vercel en ventana de bajo tráfico.
5. Verificar: correos (leads/postulaciones), WhatsApp, GA4, Search Console, formularios,
   SSL y redirecciones.
6. Monitoreo post-lanzamiento (errores, CWV, conversiones).

---

## Notas de priorización
- **Lanzable** al cerrar **Fase 1** (Clientes); Talento entra en Fase 2.
- Las escenas 3D marcadas "Alta" en `03-MOTION-AND-3D.md` son prioritarias; las "Baja"
  pueden diferirse a Fase 3 sin afectar el lanzamiento.
- Recolectar material visual real en paralelo para sustituir stock/3D gradualmente.
