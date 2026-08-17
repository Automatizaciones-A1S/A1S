# 03 · Motion & 3D — Concepto "Centro de Control"

> El alma del sitio. Define el concepto creativo, el inventario de escenas 3D, las
> interacciones de cursor/scroll/rueda y el **plan de rendimiento** (no negociable).

---

## 1. Concepto creativo: "Centro de Control"

Todo el sitio se siente como un **centro de monitoreo de alta tecnología** que vela
24/7 por lo que más importa. La estética alterna entre **claridad institucional**
(secciones claras, legibles) y **inmersión tipo sala de control** (secciones oscuras
con datos, radar, glow rojo, profundidad 3D).

**Metáforas visuales recurrentes:**
- **Radar / barrido** (vigilancia activa, el "blip" usa el punto del logo).
- **Mapa de Colombia** como pieza holográfica de cobertura.
- **Capas** (humana + tecnológica) que se ensamblan = protección integral.
- **Datos en vivo** (contadores, indicadores) que refuerzan "protección medible".
- **Profundidad y parallax** que dan sensación de control y amplitud.

**Regla de oro:** el movimiento **sirve a la narrativa y a la confianza**, nunca
distrae de la lectura ni penaliza el rendimiento.

---

## 2. Stack de animación y 3D

| Capa | Librería | Uso |
|---|---|---|
| 3D / WebGL | **React Three Fiber** + **@react-three/drei** + **@react-three/postprocessing** | escenas 3D, mapa, partículas |
| Scroll-driven | **GSAP** + **ScrollTrigger** | timelines dirigidos por scroll, pin, scrub |
| Scroll suave | **Lenis** | smoothing global (sincronizado con ScrollTrigger) |
| Microinteracciones | **Framer Motion** | reveals, hover, layout, transiciones de ruta |
| Cursor | custom (canvas/DOM) | cursor magnético + estados contextuales |
| Optimización modelos | **Draco / meshopt**, glTF | compresión de geometría |

> Sincronizar Lenis con GSAP ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)`).

---

## 3. Inventario de interacciones (firma del sitio)

### Cursor
- **Cursor personalizado** con núcleo (el "punto" A1S) + anillo que se expande.
- **Magnetismo** en botones, links y cards (atracción suave).
- **Estados contextuales:** "ver" (sobre imágenes/casos), "arrastrar" (carruseles),
  "explorar" (sobre el mapa).
- En touch/coarse pointer → se desactiva (cursor nativo).

### Scroll (vertical)
- **Reveal** progresivo de bloques (fade + translate sutil, stagger).
- **Pin + scrub** en secciones clave (mapa, "capas de protección", proceso).
- **Parallax** multicapa (fondo/medio/frente) en heros y secciones oscuras.
- **Contadores** que animan al entrar en viewport (54→55 años, +3.500, etc.).
- **Barra/indicador de progreso** sutil tipo "señal".

### Rueda del mouse (wheel)
- En la sección "Centro de Control", el wheel controla un **barrido de radar** o el
  **giro/zoom del mapa** (con `pin` para no romper el flujo).
- **Galerías horizontales** (casos, sectores) que avanzan con scroll/rueda.
- Siempre con **límites** y `prefers-reduced-motion`/fallback a scroll normal.

### Hover / focus
- Tilt 3D sutil en cards, glow rojo en elementos activos, subrayados animados,
  imágenes con leve zoom/parallax interno.

### Media inmersiva (humano + cursor) — INTERACCIÓN FIRMA
Imágenes/videos de **alta calidad** de vigilantes, caninos, escoltas, drones y
operación, con vida y profundidad. Dos modos combinables (ver §4.1 para el detalle
técnico y los fallbacks):
- **Cinemagraph / loop sutil:** video corto en bucle con movimiento mínimo (respiración,
  luces, leve giro de cabeza del perro/vigilante). Da sensación de "está vivo".
- **Profundidad 2.5D reactiva al cursor:** la imagen se separa en capas con **mapa de
  profundidad**; al mover el cursor el sujeto (cara del vigilante, perro) se desplaza
  sutilmente en parallax 3D (efecto "foto 3D"). Desplazamiento **clamped** y discreto.
- Refuerza el posicionamiento **humano + tecnología** y aporta calidez frente al frío
  del "Centro de Control".

### Transiciones de página
- Transición de ruta cohesiva (cortina/wipe con el rojo A1S o fade con el punto),
  manteniendo contexto entre Clientes ↔ Talento.

---

## 4. Escenas 3D por sección

> Cada escena debe tener **fallback estático** (poster/imagen o versión 2D) para
> móvil, equipos sin WebGL y `prefers-reduced-motion`.

| # | Sección | Escena 3D / interacción | Prioridad |
|---|---|---|---|
| 1 | **Hero (Home)** | Escena "Centro de Control": ambiente oscuro con partículas/grid, barrido de radar, profundidad y parallax al cursor. Headline + bifurcación. | Alta |
| 2 | **Bifurcación** | Dos portales 3D (Cliente / Talento) que reaccionan al hover con profundidad y luz. | Alta |
| 3 | **Mapa de cobertura** | **Mapa 3D de Colombia** interactivo: 5 regionales con pines (punto A1S), hover muestra ciudad + datos; rota/zoom con wheel (pin). | Alta (pieza protagonista) |
| 4 | **Portafolio (Capas)** | Las líneas de servicio se **ensamblan en capas** sobre scroll hasta formar el "escudo integral". | Media |
| 5 | **Análisis de riesgo** | Línea de tiempo/flujo animado de la metodología (5 pasos) con scrub. | Media |
| 6 | **¿Cómo operamos?** | Stepper animado de 4 pasos (Evaluación→Optimización). | Media |
| 7 | **Tecnología / Atlas IoT** | Nodos conectados (red) que se iluminan, representando integración de sistemas. | Media |
| 8 | **Certificaciones OEA & BASC** | Sellos/insignias con leve 3D y glow de confianza. | Baja |
| 9 | **Cifras clave** | Contadores + microvisualización (anillos/medidores estilo dashboard). | Media |
| 10 | **Talento – Hero** | Variante cálida del Centro de Control (humano + tecnología). | Alta |
| 11 | **Cierres CTA** | Fondo oscuro con partículas + botón magnético. | Baja |
| 12 | **Bifurcación (portales)** | Cada portal usa **media inmersiva** (control room / oficina A1S) con profundidad al hover. | Alta |
| 13 | **Media inmersiva por servicio** | Vigilante, canino, escolta, dron, etc. con cinemagraph + profundidad 2.5D (ver §4.1). | Alta |

---

## 4.1 Media inmersiva por servicio (componente reutilizable)

Cada **línea de servicio** y la **bifurcación** usan el componente de media inmersiva.
Una imagen/video de alta calidad por servicio:

| Servicio | Sujeto sugerido |
|---|---|
| Seguridad Física | Vigilante en operación (día/noche urbano) |
| Caninos | Manejador + perro (retrato con leve movimiento de cabeza del perro) |
| Escoltas | Escolta junto a vehículo / protección a persona |
| Seguridad Electrónica | Centro de monitoreo / muro de CCTV |
| Seguridad Móvil & GPS | Flota / pantalla de rastreo + carretera |
| Drones | Dron en vuelo / vista aérea ortomosaico |
| Ciberseguridad | Operador SOC / visual de datos |
| Bifurcación – Cliente | Control room (oscuro) |
| Bifurcación – Talento | Oficina A1S / equipo humano |

**Técnica recomendada**
- **Profundidad 2.5D:** shader de desplazamiento en R3F usando imagen + **depth map**
  (generado con herramientas de depth estimation o a mano). El cursor desplaza las capas
  con `lerp` (suavizado) y desplazamiento máximo pequeño (~ 6–12px / pocos grados).
  Alternativa más ligera: parallax de **capas recortadas** (sujeto/fondo separados).
- **Cinemagraph:** video `muted autoplay loop playsInline` con **poster**, recorte corto
  (2–6 s), bitrate optimizado (MP4/H.264 + WebM/AV1), o WebP/GIF-lite para loops muy cortos.
- Combinables: cinemagraph de fondo + parallax leve de capas al cursor.

**Fallbacks y reglas (obligatorias)**
- **Touch / coarse pointer:** sin parallax de cursor → imagen estática nítida (o leve
  movimiento por giroscopio opcional, desactivable).
- **`prefers-reduced-motion` / `saveData` / GPU débil:** imagen estática con poster; sin
  video autoplay (mostrar poster + control de play opcional).
- **Lazy-load** y **pausa fuera de viewport**; no más de 1–2 medias inmersivas pesadas
  activas a la vez.
- Desplazamiento **clamped** (nunca exagerado): debe sentirse "vivo", no mareante.
- `next/image` para stills; depth maps ligeros; presupuesto de peso por media.

---

## 5. Plan de rendimiento (NO negociable)

**Presupuesto objetivo**
- **LCP < 2.5 s**, **CLS < 0.1**, **INP < 200 ms** (Core Web Vitals "Good").
- 3D objetivo **60 fps** en desktop medio; **degradar** antes que trabar.
- Peso inicial controlado: el WebGL **no** bloquea el primer render del contenido.

**Técnicas obligatorias**
- **Lazy-load** del WebGL por sección (dynamic import, `IntersectionObserver`);
  no montar escenas fuera de viewport.
- **Detección de capacidad:** si no hay WebGL, GPU débil, `saveData`, o pantalla
  pequeña → **fallback** a imagen/poster o versión 2D ligera.
- Modelos comprimidos (**Draco/meshopt**), texturas en **WebP/AVIF/KTX2**, tamaños
  razonables; reutilizar geometrías/materiales; instancing donde aplique.
- **Pausar render** cuando la pestaña/scene no está visible (`frameloop="demand"` o
  pausa por visibilidad).
- Limitar `dpr` (p.ej. `[1, 2]`), postprocessing solo donde aporta.
- `next/image` para imágenes; `next/font` para Montserrat; code-splitting por ruta.
- **`prefers-reduced-motion: reduce`** → desactivar parallax/scrub/3D animado,
  conservar fades mínimos.

**Estrategia móvil**
- Heros 3D → **poster estático** o video corto optimizado por defecto; 3D solo si el
  dispositivo lo soporta con holgura.
- Interacciones de cursor → reemplazadas por gestos táctiles simples o desactivadas.
- Reducir partículas/efectos; priorizar contenido y velocidad.

---

## 6. Checklist de calidad de movimiento
- [ ] ¿Cada escena 3D tiene fallback estático?
- [ ] ¿Se respeta `prefers-reduced-motion`?
- [ ] ¿El contenido es legible y usable sin esperar a las animaciones?
- [ ] ¿60 fps en desktop y degradación elegante en móvil?
- [ ] ¿El movimiento refuerza el mensaje (confianza/control) y no distrae?
- [ ] ¿Core Web Vitals en "Good" en producción?
