# 07 · CMS Schema — Sanity

> Modelado de contenido en **Sanity** (CMS sin código). Permite a RRHH y marketing
> crear/editar/cerrar **vacantes, noticias, casos, testimonios y regionales** sin tocar
> código. A continuación, los tipos de documento y campos sugeridos.

---

## 1. Por qué Sanity
- Editor amigable (Studio) para usuarios no técnicos.
- Tiempo real, versionado, roles/permisos, previsualización.
- API (GROQ) consumida desde Next.js (SSG/ISR para velocidad + frescura).
- Manejo de imágenes y assets (incluye carga de archivos).

---

## 2. Tipos de documento

### `vacante` (job posting)
| Campo | Tipo | Notas |
|---|---|---|
| `titulo` | string | Cargo (req.) |
| `slug` | slug | desde título (req.) |
| `regional` | reference → `regional` | (req.) |
| `ciudad` | string | |
| `tipoContrato` | string (lista) | Término fijo / indefinido / obra-labor / temporal |
| `modalidad` | string (lista) | Presencial / turnos / etc. |
| `area` | string (lista) | Operativo / supervisión / administrativo / tecnología… |
| `descripcion` | portable text | |
| `responsabilidades` | array(string) | |
| `requisitos` | array(string) | |
| `ofrecemos` | array(string) | beneficios |
| `salario` | object | `{min, max, moneda, mostrar:boolean}` (para JobPosting) |
| `fechaPublicacion` | datetime | |
| `fechaCierre` | datetime | controla visibilidad/`validThrough` |
| `estado` | string | abierta / cerrada / pausada |
| `destacada` | boolean | badge "Nueva"/destacada |
| `correoNotificacion` | string | a dónde llegan las postulaciones (override) |

> Genera **JSON-LD `JobPosting`** automáticamente en el detalle.

### `regional`
| Campo | Tipo |
|---|---|
| `nombre` | string (Caribe, Santander, Antioquia, Centro, Suroccidente) |
| `ciudad` | string (Cartagena, Bucaramanga, Medellín, Bogotá, Cali) |
| `coordenadas` | geopoint (para el mapa 3D) |
| `direccion` / `telefono` / `correo` | string |
| `municipiosCubiertos` | number |

### `noticia` (blog)
| Campo | Tipo |
|---|---|
| `titulo` / `slug` | string / slug |
| `resumen` | text |
| `imagenPortada` | image (con alt) |
| `categoria` | reference → `categoria` |
| `autor` | reference → `autor` |
| `contenido` | portable text (con imágenes, citas, embeds) |
| `fechaPublicacion` | datetime |
| `seo` | object (ver tipo `seo`) |

### `caso` (caso de éxito)
| Campo | Tipo |
|---|---|
| `cliente` | string |
| `sector` | string (lista de sectores) |
| `reto` / `solucion` / `resultado` | portable text |
| `metricas` | array(`{valor, etiqueta}`) |
| `logo` / `imagen` | image |
| `testimonio` | reference → `testimonio` (opcional) |
| `publicar` | boolean (autorización de uso) |

### `testimonio`
| Campo | Tipo |
|---|---|
| `cita` | text |
| `nombre` / `cargo` / `empresa` | string |
| `foto` | image |
| `tipo` | string (cliente / colaborador) — sirve para Cultura y Casos |
| `video` | url (opcional) |

### `cliente` (logos)
| Campo | Tipo |
|---|---|
| `nombre` | string |
| `logo` | image |
| `sector` | string |
| `autorizadoMostrar` | boolean |

### `categoria` / `autor`
Tipos auxiliares para el blog.

### `seo` (objeto reutilizable)
`metaTitulo`, `metaDescripcion`, `imagenOG`, `noIndex` (boolean).

### Singletons de configuración
- `configSitio`: datos globales (teléfono, WhatsApp, correos, redes, cifras clave si
  se quieren editables, textos legales si se gestionan por CMS).

---

## 3. Postulaciones (manejo de datos personales)

Dos opciones (decisión técnica en [`08-TECH-ARCHITECTURE.md`](./08-TECH-ARCHITECTURE.md)):
1. **No almacenar en CMS** la HV ni datos sensibles: el formulario envía la postulación
   por **correo a RRHH** + sube la HV a almacenamiento privado (Vercel Blob) con enlace
   temporal. *(Recomendado por Habeas Data: minimizar almacenamiento.)*
2. Crear un tipo `postulacion` en Sanity con acceso restringido (solo RRHH) si se
   requiere un repositorio interno; en ese caso, definir **retención y borrado** acorde
   a la política de datos.

> En ambos casos: consentimiento obligatorio, finalidad declarada y política accesible.

---

## 4. Estrategia de render
- Vacantes y blog: **ISR** (revalidación, p. ej. 60s) para frescura sin sacrificar velocidad.
- Webhooks de Sanity → revalidación on-publish.
- Borradores con **preview** para revisar antes de publicar.
