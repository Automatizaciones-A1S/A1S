# 00 · Project Brief — Sitio Web A1S Security Group

> Documento maestro de contexto. Toda decisión de diseño, contenido y desarrollo
> debe ser coherente con este brief. Última actualización: 2026-06-09.

---

## 1. La empresa

**A1S — A 1 Security Group** (parte de **Somni Capital Group**) es una empresa
colombiana de **seguridad privada** con más de **55 años de experiencia**
(fundada en **1971**). Es un referente del sector en Colombia que integra
**seguridad humana + tecnología avanzada** para ofrecer una protección
**integral, proactiva y medible**.

> Posicionamiento central: *"El aliado estratégico de empresas y personas que no
> toleran riesgos no gestionados."*

### Cifras clave (verificar antes de publicar)
| Dato | Valor | Notas |
|---|---|---|
| Años de experiencia | **+55** | Calcular dinámicamente: `añoActual − 1971`. |
| Año de fundación | **1971** | Dato canónico. |
| Colaboradores | **+3.500** | Personal certificado y en formación continua. |
| Clientes activos | **+1.000** | Familias y empresas protegidas. |
| Municipios cubiertos | **+500** | Operación directa en territorio nacional. |
| Regionales | **5** | Caribe, Santander, Antioquia, Centro, Suroccidente. |
| Operación | **24/7** | Monitoreo permanente. |

### Regionales
| Regional | Ciudad sede |
|---|---|
| Caribe | Cartagena |
| Santander | Bucaramanga |
| Antioquia | Medellín |
| Centro | Bogotá |
| Suroccidente | Cali |

### Misión
Proteger activos, personas e información con soluciones inteligentes y cobertura total.

### Visión
Para el año 2027, ser reconocidos como una empresa líder en la prestación de
servicios de seguridad, microseguridad y tecnología, a través de procesos
innovadores y eficientes.

### Contacto
- **Teléfono / WhatsApp:** +57 305 771 0909
- **Web:** www.a1s.com.co
- **Correo:** servicioalcliente@tecnocash.com.co *(confirmar correo definitivo de leads)*
- **Grupo:** By Somni Capital Group

---

## 2. Objetivos del sitio (los dos "cores")

El sitio tiene **dos objetivos de negocio igual de importantes**, resueltos con una
**bifurcación temprana** desde el home:

### CORE 1 — Atracción de clientes (comercial)
Captar y convertir:
- **Empresas** (industrial, financiero, retail, salud, educación, comercio exterior).
- **Conjuntos residenciales / propiedad horizontal.**
- **Personas** que requieren protección (escoltas VIP).
- **Escolta de carga crítica.**

**KPI principal:** solicitudes de cotización / contacto comercial cualificado.

### CORE 2 — Atracción de talento humano (reclutamiento)
El sector tiene **alta rotación de personal**, por lo que captar y retener talento
es estratégico. El sitio debe:
- Mostrar **vacantes** (actualizables sin programar).
- Comunicar la **propuesta de valor al empleado (EVP)**: qué hace A1S por su gente.
- Mostrar **cultura organizacional**, bienestar, formación y crecimiento.
- Facilitar la **postulación** (con carga de hoja de vida).

**KPI principal:** postulaciones recibidas / vacantes cubiertas.

---

## 3. Audiencias

| Audiencia | Necesidad | Qué debe sentir |
|---|---|---|
| Gerente / comprador B2B | Reducir riesgo, cumplimiento, continuidad | Confianza, solidez, tecnología, respaldo medible |
| Administrador de conjunto residencial | Tranquilidad, buen servicio, costo justo | Cercanía + profesionalismo |
| Persona que requiere escolta | Discreción, experiencia, respuesta | Seriedad y capacidad real |
| Candidato a empleo | Estabilidad, buen trato, crecimiento | Orgullo de pertenecer, oportunidad real |

---

## 4. Principios rectores del proyecto

1. **Profesional pero nunca plano.** Experiencia inmersiva con 3D, interacciones de
   cursor y scroll. El "wow" es un requisito, no un adorno.
2. **3D + media inmersiva humana.** El WebGL ("Centro de Control") aporta tecnología y
   profundidad; en paralelo, **imágenes/videos de alta calidad** de vigilantes, caninos,
   escoltas y operación —con **cinemagraph + profundidad 2.5D reactiva al cursor**—
   aportan el lado humano y cálido. Juntos materializan el "**seguridad humana +
   tecnología**". Como hay poco material propio, se parte de stock premium / imágenes
   curadas o generadas, reemplazables por un shoot real más adelante.
3. **Confianza ante todo.** Es una empresa de seguridad: cada elemento debe transmitir
   solidez, control y credibilidad (certificaciones, cifras, cobertura).
4. **Rendimiento y accesibilidad no negociables.** Degradación elegante en móvil y
   equipos lentos; respeto a `prefers-reduced-motion`; objetivo AA.
5. **Dos públicos, una marca.** Cliente y candidato viven experiencias distintas sin
   romper la coherencia de A1S.
6. **Administrable.** Vacantes, noticias y casos se editan desde un CMS sin tocar código.

---

## 5. Decisiones cerradas (resumen ejecutivo)

| Tema | Decisión |
|---|---|
| Stack | Next.js (App Router) + TypeScript + WebGL (React Three Fiber) |
| Idioma | Español (arquitectura preparada para EN futuro) |
| Intensidad 3D | Máximo impacto, con plan de rendimiento y fallbacks |
| Estética | Híbrida: base clara + secciones oscuras inmersivas |
| Concepto creativo | **"Centro de Control"** (centro de monitoreo high-tech) |
| Arquitectura | Un sitio, bifurcación temprana (Clientes / Talento) |
| CMS | Sanity (sin código): vacantes, noticias, casos, testimonios, regionales |
| Mapa de cobertura | Pieza 3D/interactiva protagonista |
| Leads comerciales | Correo + WhatsApp (deep link prellenado) |
| Vacantes | Portal propio + formulario de postulación con carga de HV |
| Contenido | Borradores profesionales (basados en brochure + Wix) |
| Legal | Estructura + borradores Habeas Data (validar con legal) |
| SEO/Analítica | Completo + GA4 + JSON-LD (incl. JobPosting) |
| Deploy | Vercel; dominio a1s.com.co apuntado por DNS |
| Entrega | Por fases (1: Clientes · 2: Talento · 3: Blog/casos/refinamiento) |

---

## 6. Documentos del paquete

Ver [`README.md`](./README.md) para el índice completo y cómo usar este paquete.
