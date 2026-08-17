# 09 · SEO & Analítica

> SEO técnico completo + GA4, alineado a los dos objetivos: captar **clientes** y
> **talento** por búsqueda. Incluye datos estructurados (incl. **JobPosting** para
> Google Jobs).

---

## 1. SEO técnico (base)
- **Metadata API** de Next.js: `<title>`, `description`, canonical por página.
- **Open Graph** + **Twitter Cards** (imágenes OG por plantilla; default de marca).
- **sitemap.xml** dinámico (incluye servicios, sectores, blog, vacantes abiertas).
- **robots.txt** (permitir indexación; bloquear rutas de API/preview).
- URLs limpias en español, jerárquicas (ver `04-SITEMAP-AND-IA.md`).
- **Velocidad** = SEO: Core Web Vitals en "Good" (ver `03-MOTION-AND-3D.md`).
- Encabezados semánticos (un `h1` por página), `alt` en imágenes, enlaces internos.
- Idioma `es-CO`; preparar `hreflang` si se agrega EN.

---

## 2. Datos estructurados (JSON-LD)

| Schema | Dónde | Para qué |
|---|---|---|
| `Organization` / `LocalBusiness` | global | Identidad, logo, redes, contacto |
| `BreadcrumbList` | páginas internas | Migas en resultados |
| `Service` | páginas de servicios | Cada línea de servicio |
| `JobPosting` | detalle de vacante | **Aparecer en Google Jobs** |
| `Article` / `BlogPosting` | blog | Artículos |
| `FAQPage` | donde haya FAQ | Rich results |

**`JobPosting` (campos clave):** `title`, `description`, `datePosted`, `validThrough`
(= fechaCierre), `employmentType`, `hiringOrganization` (A1S), `jobLocation`
(ciudad/regional), `baseSalary` (si `salario.mostrar`). Alimentado desde el CMS.

**`LocalBusiness`/`Organization`:** nombre A1S — A 1 Security Group, `url`, `logo`,
`telephone` +57 305 771 0909, `areaServed` Colombia, `sameAs` (redes), 5 sedes
(`location` por regional).

---

## 3. Estrategia de contenido / keywords (orientación)
- **Clientes:** "empresa de seguridad privada Colombia", "vigilancia privada
  [ciudad]", "escoltas Colombia", "seguridad electrónica empresas", "monitoreo CCTV",
  "rastreo GPS de carga", "OEA BASC asesoría", "seguridad para conjuntos residenciales".
- **Talento:** "vacantes vigilante [ciudad]", "empleo seguridad privada Colombia",
  "trabajar en seguridad [regional]".
- **Blog** como motor SEO: guías de seguridad, normativa, casos, consejos por sector.
- Páginas por **regional/ciudad** y por **sector** refuerzan SEO local y de nicho.

---

## 4. Analítica (GA4)
- **GA4** cargado **tras consentimiento** (ver doc 10 — banner Habeas Data/cookies).
- Eventos clave:
  - `generate_lead` (envío de cotización/contacto).
  - `whatsapp_click` (clic en WhatsApp).
  - `job_view` (ver detalle de vacante).
  - `job_application` (postulación enviada).
  - `cv_upload` (carga de HV).
  - `tab_service_view`, `map_region_hover`, `scroll_depth` (engagement).
- **Conversiones:** `generate_lead` y `job_application`.
- Recomendado: **Google Search Console** + envío de sitemap; opcional **GTM** y
  **Microsoft Clarity** (heatmaps) si se desea, respetando consentimiento.

---

## 5. Checklist de lanzamiento SEO
- [ ] Metadata y OG en todas las páginas.
- [ ] sitemap.xml y robots.txt correctos.
- [ ] JSON-LD validado (Rich Results Test), incl. JobPosting.
- [ ] Canonical y redirecciones 301 de URLs antiguas (Wix).
- [ ] GA4 + Search Console activos y verificados.
- [ ] Core Web Vitals "Good" en producción.
- [ ] `es-CO` configurado; estructura lista para `hreflang`.
