# 06 · Contenido — Core Talento (borradores)

> Copy **borrador** para el core de atracción de talento humano. Objetivo: reducir el
> impacto de la **alta rotación** comunicando una propuesta de valor real y facilitando
> la postulación. Tono: humano, motivador, honesto y orgulloso. `[corchetes]` = confirmar.

---

## LANDING — TRABAJA CON NOSOTROS (EVP)

- **Eyebrow:** Únete a A1S
- **Titular:** Tu seguridad también importa. Construye tu carrera con nosotros.
- **Subcopy:** Somos +3.500 personas protegiendo a Colombia. Aquí encontrarás
  estabilidad, formación constante y un equipo que te respalda. Crecemos cuando crece
  nuestra gente.
- **CTA primario:** Ver vacantes · **CTA secundario:** Conoce nuestra cultura

### Por qué A1S (pilares EVP) — *(confirmar/ajustar beneficios reales)*
| Pilar | Mensaje |
|---|---|
| **Estabilidad** | Contratación formal y respaldo de una empresa con +55 años. |
| **Formación continua** | Capacitación y certificación permanente para crecer profesionalmente. |
| **Crecimiento** | Planes de carrera y promoción interna en 5 regionales. |
| **Bienestar** | Programas de bienestar para ti y tu familia. `[detallar]` |
| **Respaldo y equipo** | Supervisión cercana, herramientas y tecnología para hacer bien tu trabajo. |
| **Propósito** | Tu trabajo protege a personas, familias y empresas reales. |

### Bloque cifras (talento)
+3.500 colaboradores · presencia en 5 regionales · formación continua ·
[X]% de promociones internas `[confirmar]`

---

## CULTURA ORGANIZACIONAL

- **Eyebrow:** Nuestra cultura
- **Titular:** Un equipo que protege y se cuida.
- **Intro:** En A1S la disciplina y el profesionalismo conviven con el respeto y el
  cuidado por nuestra gente. Esto es lo que vivirás siendo parte del equipo.

**Secciones sugeridas (rellenar con info/HR):**
- **Valores y forma de trabajar** `[definir valores]`
- **Bienestar y beneficios** (salud, familia, reconocimientos) `[detallar]`
- **Formación y certificación** (escuela de formación, cursos, especializaciones)
- **Seguridad y salud en el trabajo (HSE)**
- **Testimonios de colaboradores** (video/foto + cita) — *administrados por CMS*
- **Galería** del día a día (operaciones, ceremonias, capacitaciones)

---

## PROCESO DE SELECCIÓN

- **Titular:** Así es unirte a A1S.
- **Intro:** Un proceso claro y transparente. Estos son los pasos:
1. **Postulación** — aplica a una vacante o déjanos tu hoja de vida.
2. **Revisión de perfil** — validamos requisitos y experiencia.
3. **Entrevista y pruebas** — competencias, seguridad y estudio de antecedentes.
4. **Exámenes y documentación** — médicos y vinculación formal.
5. **Inducción y formación** — capacitación inicial antes de tu primer día.

### Requisitos generales *(confirmar con RRHH)*
- Mayor de edad, libreta militar `[si aplica]`, antecedentes al día.
- Curso/credencial de vigilancia vigente (Superintendencia de Vigilancia) `[según cargo]`.
- Documentación: cédula, hoja de vida, certificados laborales y de estudio.

---

## VACANTES (listado)

- **Titular:** Vacantes disponibles.
- **Intro:** Encuentra la oportunidad que se ajusta a ti. Filtra por regional, cargo y tipo.
- **Filtros:** Regional (Caribe/Santander/Antioquia/Centro/Suroccidente) · Cargo ·
  Tipo de contrato · Modalidad.
- **Card de vacante:** título, regional/ciudad, tipo, fecha, badge "Nueva", CTA "Ver y postularme".
- **Estado vacío:** "Por ahora no hay vacantes en esa categoría. Déjanos tu hoja de vida
  y te contactamos cuando abra una." → CTA postulación espontánea.

> El listado se alimenta del **CMS** (ver [`07-CMS-SCHEMA.md`](./07-CMS-SCHEMA.md)).

---

## DETALLE DE VACANTE — /vacantes/[slug]

**Estructura:**
- Título del cargo + regional/ciudad + tipo de contrato + modalidad + fecha de cierre.
- **Descripción del cargo** · **Responsabilidades** · **Requisitos** · **Lo que ofrecemos**.
- **Formulario de postulación:**
  - Nombre completo, documento, teléfono, correo, ciudad.
  - Cargo al que aplica (prellenado).
  - **Carga de hoja de vida** (PDF/DOC, máx. [5] MB).
  - Campos opcionales: experiencia, disponibilidad.
  - **Casilla obligatoria de autorización de tratamiento de datos** (Habeas Data) con
    enlace a la política.
- Confirmación de envío + notificación a RRHH (correo) y registro en CMS/almacenamiento.

> SEO: cada vacante genera **JSON-LD `JobPosting`** para aparecer en Google Jobs
> (ver [`09-SEO-ANALYTICS.md`](./09-SEO-ANALYTICS.md)).

---

## POSTULACIÓN ESPONTÁNEA (banco de hojas de vida)

- **Titular:** No encontraste tu vacante ideal. Déjanos tu hoja de vida.
- **Intro:** Guardamos tu perfil y te contactamos cuando abra una oportunidad acorde.
- Formulario igual al de vacante, sin cargo específico (selección de área de interés).
- Consentimiento de datos obligatorio.

---

## PUENTE DESDE LA HOME (bloque Talento)
- **Titular:** ¿Quieres hacer parte del equipo que protege a Colombia?
- **CTA:** Únete a A1S → /trabaja-con-nosotros
