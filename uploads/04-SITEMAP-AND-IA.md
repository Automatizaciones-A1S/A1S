# 04 · Sitemap & Arquitectura de Información

> Estructura completa del sitio. Modelo: **un sitio, bifurcación temprana** entre los
> dos cores (Clientes / Talento). Rutas en español, SEO-friendly.

---

## 1. Mapa del sitio

```
/                                  Home — "Centro de Control" + bifurcación
│
├── CLIENTES (core comercial)
│   ├── /quienes-somos             Historia, propósito, misión/visión, estructura
│   ├── /servicios                 Portafolio (tabs) — overview
│   │   ├── /servicios/seguridad-fisica
│   │   ├── /servicios/seguridad-electronica
│   │   ├── /servicios/seguridad-movil-gps
│   │   ├── /servicios/drones
│   │   ├── /servicios/ciberseguridad
│   │   └── /servicios/gestion-del-riesgo
│   ├── /soluciones                Por sector (industrial, financiero, retail…)
│   ├── /tecnologia                Atlas IoT, plataformas, CCTV, GPS, perimetral
│   ├── /certificaciones           OEA & BASC + acompañamiento
│   ├── /cobertura                 Mapa 3D + 5 regionales
│   ├── /casos-de-exito            Casos, testimonios, logos de clientes
│   └── /contacto                  Formulario cotización → correo + WhatsApp
│
├── TALENTO (core reclutamiento)  [prefijo /trabaja-con-nosotros]
│   ├── /trabaja-con-nosotros      Landing EVP — por qué A1S
│   ├── /trabaja-con-nosotros/cultura          Cultura, bienestar, beneficios, formación
│   ├── /trabaja-con-nosotros/proceso          Proceso de selección + requisitos
│   ├── /vacantes                  Listado filtrable (CMS)
│   │   └── /vacantes/[slug]        Detalle + formulario de postulación (carga HV)
│   └── /vacantes/postulacion-espontanea       Banco de hojas de vida
│
├── CONTENIDO
│   ├── /blog                      Listado de noticias/artículos (CMS)
│   └── /blog/[slug]               Artículo
│
└── LEGAL / SISTEMA
    ├── /politica-de-tratamiento-de-datos
    ├── /aviso-de-privacidad
    ├── /terminos-y-condiciones
    ├── /politica-de-cookies
    └── 404 (página personalizada)
```

> Rutas de Talento agrupadas bajo `/trabaja-con-nosotros` (excepto `/vacantes`, que se
> deja en raíz por SEO de empleo y URLs cortas). Alternativa válida: subdominio
> `trabaja.a1s.com.co` en el futuro — la arquitectura no debe impedirlo.

---

## 2. Navegación

### Header (sticky, se compacta al hacer scroll)
- **Logo A1S** (izq.).
- Nav principal: **Quiénes somos · Servicios · Soluciones · Cobertura · Certificaciones · Blog**.
- **Switch de modo / CTA dual:** acceso visible a **"Trabaja con nosotros"** (cambia el
  acento del menú al core Talento) y CTA primario **"Cotización gratuita"**.
- Menú móvil full-screen con las dos rutas (Cliente / Talento) bien diferenciadas.

### Footer
- Bloque marca + bajada + "By Somni Capital Group".
- Columnas: **Servicios · Empresa · Talento · Legal**.
- **Regionales** (5 ciudades) con datos de contacto.
- **Certificaciones** (OEA, BASC) como sellos.
- Teléfono/WhatsApp +57 305 771 0909 · redes sociales.
- Línea legal + enlaces a páginas legales.

### Elementos globales
- **Botón flotante de WhatsApp** (deep link prellenado).
- **Banner de consentimiento de datos/cookies** (Habeas Data) — controla GA4.
- **Custom cursor** (desktop).

---

## 3. Estructura de la Home (orden de secciones)

1. **Hero "Centro de Control"** — headline (*"Seguridad privada para Colombia"* /
   *"Protegemos lo que más importa"*), subcopy, CTA dual.
2. **Bifurcación temprana** — dos portales: *"Soy cliente / Quiero proteger algo"* vs
   *"Quiero trabajar en A1S"*.
3. **Cifras clave** — contadores (+55 años, +3.500, +1.000, +500 municipios, 5 regionales, 24/7).
4. **Quiénes somos (resumen)** — propuesta de valor + link.
5. **Portafolio (tabs/capas)** — las 6 líneas de servicio.
6. **¿Cómo operamos?** — 4 pasos (Evaluación → Planeación → Implementación → Optimización).
7. **CTA asesoría** — *"¿No sabes cuál servicio es el adecuado para tu empresa?"* →
   "Quiero saber más" + "¡Cotización gratuita!".
8. **Mapa de cobertura (teaser 3D)** — link a /cobertura.
9. **Certificaciones** — OEA & BASC (banda de confianza).
10. **Casos / Clientes** — logos + testimonios.
11. **Bloque Talento** — invitación a "Únete a A1S" (puente al core 2).
12. **CTA final + contacto** — formulario corto / acceso a /contacto.

---

## 4. Taxonomía de servicios (reconciliada)

Patrón de **tabs** (heredado del Wix). 6 líneas; cada una con subservicios:

| Línea (tab) | Subservicios |
|---|---|
| **Seguridad Física** | Vigilancia con/sin armas · Supervisión · **Escoltas** (VIP, carga crítica) · **Caninos** (antinarcóticos, anti-explosivos, búsqueda y rescate, defensa controlada) |
| **Seguridad Electrónica** | CCTV con analítica · Control de acceso · Protección perimetral · Detección de incendios · **Atlas IoT** (integración/automatización) |
| **Seguridad Móvil & GPS** | Monitoreo de flotas · Rastreo de cargas de valor · Escoltaje GPS en tiempo real |
| **Servicios con Drones** | Inspección y supervisión · Ortomosaico · Modelos 3D (topografía) |
| **Ciberseguridad** | IAM · Pentesting · Desarrollo de políticas · Formación · Evaluación y gestión del riesgo de la información |
| **Gestión del Riesgo** | Metodología de análisis de riesgos (5 pasos) · KPIs y seguimiento |

> Cada línea = una página `/servicios/[linea]` con detalle, beneficios, casos y CTA.

---

## 5. Soluciones por sector

Industrial & Manufactura · Financiero & Bancario · Retail & Comercio ·
Salud & Hospitales · Educación · Comercio Exterior & Puertos.

> Página `/soluciones` con grid de sectores; cada sector enlaza a su detalle o ancla.

---

## 6. Reglas de IA / UX
- Máx. **3 clics** para llegar a cotización o a postularse.
- CTA de conversión presente en cada página (cliente → cotización; talento → vacantes).
- Breadcrumbs en páginas internas; estados activos claros en nav.
- Buscador/filtros en **vacantes** (regional, cargo, tipo) y **blog** (categoría).
- Coherencia de plantillas: overview → detalle → CTA.
