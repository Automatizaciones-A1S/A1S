# 12 · Prompts de Imágenes IA — A1S Security Group

> Prompts listos para generar **todas las imágenes del sitio** con IA (Midjourney, Flux,
> DALL·E, Ideogram, etc.). Los prompts están en **inglés** (los modelos rinden mejor),
> con explicación en español. Mantén el **bloque de estilo global** en todas para lograr
> coherencia visual.

---

## 0. Reglas importantes (leer antes de generar)

- **NO generes logos de marcas reales** (OFFCORSS, SAMSUNG, TRANSMILENIO, SIMONIZ, ni el
  logo A1S) con IA. Los logos de clientes se usan desde sus **assets oficiales** (con
  autorización); el logo A1S se **compone en post** (Photoshop/Figma) sobre la imagen.
- **Uniformes:** describe "modern black tactical security uniform with subtle red
  accents, plain (no readable text/logos)". Luego, si quieres, agregas el parche A1S en
  post. Evita que la IA escriba texto (suele salir deforme).
- **Contexto colombiano:** personal latinoamericano, entornos urbanos de Colombia
  (Bogotá, Medellín, Cartagena) para autenticidad.
- **Para el efecto 2.5D (profundidad al cursor):** encuadra **un sujeto claro en primer
  plano** con **fondo con profundidad** (bokeh de luces, sala de monitoreo). Eso facilita
  separar capas / generar el depth map. Ver §Depth maps al final.
- **Diversidad y realismo:** rostros variados, expresión seria-confiable, no "stock"
  exagerado. Evita armas apuntando a cámara o violencia explícita.

---

## 1. Bloque de estilo global (añádelo a CADA prompt)

```
STYLE: cinematic editorial photography, high-end commercial, hyper-detailed, sharp focus,
professional color grading, deep shadows with subtle red (#C0231B) accent lighting,
moody and trustworthy mood, shot on full-frame DSLR, 50mm or 85mm lens, shallow depth of
field, realistic skin and textures, 8k, photorealistic --style raw
```

**Negative prompt (para Flux/SDXL):**
```
NEGATIVE: text, watermark, logo, brand names, distorted faces, extra fingers, deformed
hands, low quality, blurry, cartoon, illustration, oversaturated, plastic skin, weapons
pointed at camera, gore
```

**Especificaciones técnicas**
| Uso | Relación | Resolución mínima | Formato final |
|---|---|---|---|
| Media inmersiva por servicio (retrato) | **3:4** | 1600×2133 | WebP/AVIF + poster |
| Bifurcación (portales) | **3:4** | 1600×2133 | WebP/AVIF |
| Hero / fondos | **16:9** (y 9:16 móvil) | 2560×1440 | WebP/AVIF |
| Sectores / blog | **16:9** | 1920×1080 | WebP/AVIF |
| OG / social share | **1.91:1** (1200×630) | 1200×630 | PNG/JPG |

---

## 2. Home & Bifurcación

### 2.1 Hero — "Centro de Control" (fondo/poster) · 16:9
```
A high-tech security operations control room at night, a lone operator silhouette seen
from behind facing a massive wall of glowing monitors showing CCTV feeds and maps, deep
blacks, volumetric haze, subtle red accent lighting, sense of vigilance and control,
ultra wide cinematic. [STYLE GLOBAL]
```

### 2.2 Bifurcación — Cliente · 3:4
```
Over-the-shoulder view of a security operator in a dark monitoring center watching a wall
of CCTV screens, red ambient glow, focused and professional, cinematic depth, bokeh
lights in background. [STYLE GLOBAL]
```

### 2.3 Bifurcación — Talento · 3:4
```
Modern bright corporate security company office, a confident professional in business
casual talking with a friendly female receptionist in a black uniform with subtle red
accents, glass walls, teammates working in background, welcoming and aspirational mood,
natural light. [STYLE GLOBAL]
```

---

## 3. Media inmersiva por servicio (retrato 3:4 — sujeto + fondo con profundidad)

### 3.1 Seguridad Física — Vigilante
```
Portrait of a professional Latin American male security guard at night in a modern city,
wearing a clean black tactical uniform and cap with subtle red accents (no readable
logos), holding a two-way radio, alert and trustworthy expression, blurred city lights
bokeh behind him, dramatic side lighting with subtle red rim light. [STYLE GLOBAL]
```

### 3.2 Caninos — Manejador + perro
```
Portrait of a Latin American K9 security handler kneeling beside an alert Belgian Malinois
working dog, both facing forward, black tactical uniform with subtle red accents, dawn
light, industrial perimeter softly blurred behind, strong bond and discipline, the dog's
head sharply detailed. [STYLE GLOBAL]
```

### 3.3 Escoltas — Protección ejecutiva
```
A professional close-protection bodyguard in a dark suit with earpiece standing beside a
black armored SUV, scanning the surroundings, urban Colombian street with bokeh, serious
and discreet, cinematic. [STYLE GLOBAL]
```

### 3.4 Seguridad Electrónica — Operador CCTV
```
A security technician monitoring a large wall of high-definition CCTV screens in a dark
SOC room, reflections on glasses, red and blue screen glow, hands on console, focused
expression, depth and bokeh. [STYLE GLOBAL]
```

### 3.5 Seguridad Móvil & GPS — Flota / rastreo
```
A fleet logistics operator viewing a real-time GPS tracking map on large screens, cargo
trucks visible through window at a logistics yard at dusk, control and traceability,
cinematic, red accent UI glow. [STYLE GLOBAL]
```

### 3.6 Drones — Operador / vuelo
```
A drone pilot in black uniform with subtle red accents operating a professional
quadcopter drone hovering in the air at golden hour over an industrial facility, focused,
shallow depth of field, the drone sharply detailed. [STYLE GLOBAL]
```

### 3.7 Ciberseguridad — Analista SOC
```
A focused cybersecurity analyst in a dark security operations center, face lit by code
and data dashboards on multiple monitors, abstract network visualization reflected,
serious and intelligent mood, red and cyan accents. [STYLE GLOBAL]
```

---

## 4. Quiénes somos / Empresa

### 4.1 Equipo A1S · 16:9
```
A confident team of Latin American security professionals (men and women) in clean black
uniforms with subtle red accents standing together in a modern facility, group portrait,
proud and trustworthy, soft cinematic light. [STYLE GLOBAL]
```

### 4.2 Estructura del servicio — Comité de seguridad · 16:9
```
A security operations briefing: supervisor pointing at a screen with KPIs and a site map
while uniformed team members listen attentively in a modern meeting room, professional,
collaborative, depth of field. [STYLE GLOBAL]
```

---

## 5. Soluciones por sector (16:9)

### 5.1 Industrial & Manufactura
```
Wide shot of a large industrial manufacturing plant at dusk with perimeter security
lighting, a guard patrolling, CCTV poles, controlled and protected atmosphere. [STYLE GLOBAL]
```
### 5.2 Financiero & Bancario
```
A modern bank/corporate tower lobby with a discreet professional security presence and
access-control turnstiles, polished, secure, corporate. [STYLE GLOBAL]
```
### 5.3 Retail & Comercio
```
A bright modern retail store interior with subtle CCTV domes and a professional loss-
prevention officer in background, clean commercial look. [STYLE GLOBAL]
```
### 5.4 Salud & Hospitales
```
A hospital main entrance with a calm professional security officer assisting visitors at
an access-control desk, clean, caring, safe atmosphere. [STYLE GLOBAL]
```
### 5.5 Educación
```
A university campus entrance with students walking and a friendly security officer
ensuring safe access, sunny, safe and welcoming. [STYLE GLOBAL]
```
### 5.6 Comercio Exterior & Puertos
```
A container port at dusk with cranes and stacked shipping containers, a security
inspection point with a K9 unit, international trade and secure logistics. [STYLE GLOBAL]
```

---

## 6. Talento

### 6.1 Cultura / Formación · 16:9
```
A security training academy session: instructor teaching a diverse group of uniformed
trainees, engaged and motivated, modern classroom, sense of growth and belonging,
warm light. [STYLE GLOBAL]
```
### 6.2 Proceso de selección / Bienvenida · 16:9
```
A welcoming HR interview in a bright modern office, recruiter shaking hands with a smiling
candidate, positive and human, natural light. [STYLE GLOBAL]
```
### 6.3 Testimonio de colaborador (retrato) · 3:4 / 1:1
```
Authentic portrait of a proud Latin American security guard smiling slightly, clean black
uniform with subtle red accents, neutral studio-like background with soft red gradient,
genuine and approachable. [STYLE GLOBAL]
```

---

## 7. Sistema / utilitarias

### 7.1 OG / Social share (1200×630)
```
Cinematic dark banner with a high-tech security control room and subtle red accent glow,
clean negative space on the left for logo and headline, premium corporate. [STYLE GLOBAL]
```
> El logo A1S y el texto se agregan **en post** (no por IA).

### 7.2 Error 404 · 16:9
```
A minimalist dark scene of a single security camera in fog looking toward empty space,
subtle red signal light, moody, lots of negative space. [STYLE GLOBAL]
```

### 7.3 Fondos abstractos para secciones oscuras (opcional)
```
Abstract dark technological background: subtle radar sweep, fine grid, floating data
points and particles, deep black with faint red glow, minimal, seamless. [STYLE GLOBAL]
```
> Alternativamente, estos fondos los genera el WebGL en tiempo real (preferible).

### 7.4 Portada por defecto de Blog · 16:9
```
Neutral editorial cover: abstract security/technology concept with red accent, clean,
space for title overlay. [STYLE GLOBAL]
```

---

## 8. Depth maps y efecto 2.5D (para la media inmersiva)

Para el parallax reactivo al cursor necesitas, por cada imagen de servicio/bifurcación,
un **mapa de profundidad** (grayscale: blanco = cerca, negro = lejos).

**Opciones para generarlos:**
- **Depth Anything V2** o **Marigold** (modelos de depth estimation) — mejor calidad,
  gratis/local.
- **Immersity AI** (antes LeiaPix) — genera el efecto 2.5D/animación directo desde una
  foto (rápido, sin código) si se quiere exportar video en vez de shader.
- Plugins de profundidad en Photoshop / herramientas online de "2.5D / 3D photo".

**Recomendación de flujo:**
1. Genera la imagen (3:4) con sujeto claro + fondo con profundidad.
2. Genera su **depth map** con Depth Anything V2.
3. Entrega ambos (`imagen.webp` + `imagen-depth.webp`) al componente `ImmersiveMedia`
   (modo `depth`). Ver [`02-DESIGN-SYSTEM.md`](./02-DESIGN-SYSTEM.md) y
   [`03-MOTION-AND-3D.md`](./03-MOTION-AND-3D.md) §4.1.
4. Opcional cinemagraph: crea un video corto en loop (Immersity AI, Runway, Pika) y úsalo
   en modo `cinemagraph`/`both`.

**Tip de consistencia:** genera variaciones con el mismo *seed*/estilo y haz un ligero
*color grade* final igual para todas (mismo contraste y temperatura, acento rojo A1S),
para que el sitio se vea cohesionado.

---

## 9. Checklist de imágenes a generar
- [ ] Hero Centro de Control (16:9 + 9:16 móvil)
- [ ] Bifurcación Cliente (3:4) · Bifurcación Talento (3:4)
- [ ] 7 medias por servicio (3:4) + sus depth maps
- [ ] Equipo A1S · Comité de seguridad (16:9)
- [ ] 6 sectores (16:9)
- [ ] Cultura · Proceso · Testimonio (talento)
- [ ] OG (1200×630) · 404 · portada blog default
- [ ] (Opcional) fondos abstractos si no se hacen por WebGL
