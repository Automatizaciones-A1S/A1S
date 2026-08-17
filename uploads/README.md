# 📦 Paquete de Especificación — Sitio Web A1S Security Group

Este paquete contiene **todo lo necesario para construir el sitio web de A1S** sin tener
que volver a tomar decisiones de fondo: contexto, marca, diseño, contenido, arquitectura
técnica, SEO, legal y el **prompt maestro** para entregar al equipo/agente que lo
desarrolle.

> **Importante:** este paquete **no incluye código**; es la especificación y el prompt.
> El desarrollo se hace en una sesión/proyecto aparte usando `PROMPT-MAESTRO.md`.

---

## 🚀 Cómo usar este paquete

1. **Lee `00-PROJECT-BRIEF.md`** para el contexto y las decisiones cerradas.
2. Revisa y **completa los `[corchetes]`** (datos a confirmar) en los documentos de
   contenido y legal.
3. **Valida los textos legales** (doc 10) con el área legal de A1S.
4. Para construir: abre una nueva sesión con un agente de código (o tu equipo), asegúrate
   de que esta carpeta `docs/` esté en el repositorio, y **entrega `PROMPT-MAESTRO.md`**
   como instrucción inicial.
5. Sigue el **roadmap por fases** (`11-ROADMAP-FASES.md`).

---

## 🗂️ Índice de documentos

| # | Documento | Para qué sirve |
|---|---|---|
| ⭐ | [`PROMPT-MAESTRO.md`](./PROMPT-MAESTRO.md) | **El prompt principal** para construir el sitio |
| 00 | [`00-PROJECT-BRIEF.md`](./00-PROJECT-BRIEF.md) | Empresa, objetivos, audiencias, decisiones |
| 01 | [`01-BRAND-GUIDELINES.md`](./01-BRAND-GUIDELINES.md) | Logo, color, tipografía, tono de voz |
| 02 | [`02-DESIGN-SYSTEM.md`](./02-DESIGN-SYSTEM.md) | Tokens, componentes, grid, accesibilidad |
| 03 | [`03-MOTION-AND-3D.md`](./03-MOTION-AND-3D.md) | Concepto "Centro de Control", 3D e interacciones, rendimiento |
| 04 | [`04-SITEMAP-AND-IA.md`](./04-SITEMAP-AND-IA.md) | Sitemap, navegación, taxonomía de servicios |
| 05 | [`05-CONTENT-CLIENTES.md`](./05-CONTENT-CLIENTES.md) | Copy borrador del core comercial |
| 06 | [`06-CONTENT-TALENTO.md`](./06-CONTENT-TALENTO.md) | Copy borrador del core de talento |
| 07 | [`07-CMS-SCHEMA.md`](./07-CMS-SCHEMA.md) | Modelos de contenido en Sanity |
| 08 | [`08-TECH-ARCHITECTURE.md`](./08-TECH-ARCHITECTURE.md) | Stack, estructura, integraciones, despliegue |
| 09 | [`09-SEO-ANALYTICS.md`](./09-SEO-ANALYTICS.md) | SEO técnico, JSON-LD, GA4 |
| 10 | [`10-LEGAL-DATOS.md`](./10-LEGAL-DATOS.md) | Borradores Habeas Data (validar con legal) |
| 11 | [`11-ROADMAP-FASES.md`](./11-ROADMAP-FASES.md) | Fases de construcción y criterios de aceptación |
| 12 | [`12-PROMPTS-IMAGENES-IA.md`](./12-PROMPTS-IMAGENES-IA.md) | Prompts de IA para generar todas las imágenes + depth maps |

---

## ✅ Decisiones cerradas (resumen)

- **Stack:** Next.js + TypeScript + WebGL (React Three Fiber) · **Idioma:** español.
- **Estética:** híbrida (clara + secciones oscuras) · **Concepto:** "Centro de Control".
- **3D:** máximo impacto con plan de rendimiento y fallbacks.
- **Arquitectura:** un sitio, bifurcación temprana (Clientes / Talento).
- **CMS:** Sanity · **Mapa de cobertura:** 3D interactivo protagonista.
- **Leads:** correo + WhatsApp · **Vacantes:** portal propio + carga de HV.
- **SEO:** completo + GA4 + JobPosting · **Deploy:** Vercel + DNS.
- **Entrega:** por fases (1 Clientes · 2 Talento · 3 Blog/casos/refinamiento).

---

## 📌 Pendientes del cliente (antes de construir)

- [ ] Confirmar cifras (años se calcula desde 1971 = dinámico) y datos de contacto.
- [ ] Razón social, NIT, dirección y correo oficial de protección de datos.
- [ ] Correos destino de **leads** (comercial) y **postulaciones** (RRHH).
- [ ] Aprobar/ajustar copy de los documentos 05 y 06.
- [ ] Validar textos legales (doc 10) con el área legal.
- [ ] Definir beneficios reales del EVP y valores de cultura (doc 06).
- [ ] Recolectar material visual real (fotos/video) en paralelo.
- [ ] **Media inmersiva por servicio:** conseguir 1 imagen/video HD por línea (vigilante,
      canino, escolta, dron, etc.) + sus depth maps; o aprobar stock/curado/generado
      inicial reemplazable por shoot real. Ver `03-MOTION-AND-3D.md` §4.1.
- [ ] Autorizaciones de uso de logos/testimonios de clientes
      (OFFCORSS, SIMONIZ, TRANSMILENIO, SAMSUNG, etc.) + completar lista de clientes.

---

## 🎨 Activos de marca disponibles
- Logos SVG: blanco, negro (`#1D1D1B`), rojo (`#C0241C`).
- Manual de identidad corporativa (PDF).
- Brochure corporativo (PDF).
- Pantallazos de la organización previa en Wix (referencia de contenido/estructura).

> Color oficial de marca para web: **`#C0231B`**.
