/* ============================================================================
   A1S — Vista Blog / Noticias de seguridad
   Lista editorial + lectura de la noticia DENTRO del sitio (resumen visual con
   fotografías reales) y enlace a la fuente para leerla completa.
   Resúmenes con redacción propia a partir de información pública vigente.
   ========================================================================== */
const { Reveal, Eyebrow, Btn, Badge, SectionHead, Icons, RED, WRAP, SECTION } = window;

/* Fotografías de uso libre (Pexels, sin atribución requerida) */
const PX = (id, w) => 'https://images.pexels.com/photos/' + id + '/pexels-photo-' + id + '.jpeg?auto=compress&cs=tinysrgb&w=' + (w || 1600);

const BLOG_POSTS = [
  {
    id: 'costos-2026', cat: 'Regulación', tag: 'Análisis', tone: 0, Icon: Icons.growth, feat: true,
    title: 'El costo de la vigilancia presencial sube más del 30% en 2026',
    dek: 'El alza del salario mínimo (≈23%), la reforma laboral y la reducción de la jornada disparan el valor de un puesto 24/7: de cerca de $14,9 a más de $19,6 millones al mes hacia fin de año.',
    date: '4 Ene 2026', read: '5 min', src: 'El Tiempo',
    url: 'https://www.eltiempo.com/economia/finanzas-personales/vigilancia-privada-en-2026-las-tarifas-minimas-y-su-incremento-tras-aumento-del-salario-minimo-3521732',
    hero: 'assets/blog/equipo-blog.jpg', imgs: [PX(210607), PX(259027)],
    summary: [
      'El valor de un puesto de vigilancia atendido las 24 horas se encarece de forma notable durante 2026. La combinación del aumento del salario mínimo cercano al 23%, la reforma laboral y la reducción gradual de la jornada laboral empuja el costo de un puesto permanente desde alrededor de $14,9 millones hacia más de $19,6 millones mensuales a medida que avanza el año.',
      'El sector debate cómo sostener la operación sin sacrificar la formalidad ni la calidad del servicio. La respuesta apunta a esquemas híbridos que combinan personal humano con tecnología, optimizando la cobertura sin trasladar todo el incremento a la tarifa final del cliente.',
    ],
    points: ['El puesto 24/7 pasa de ≈$14,9 a más de $19,6 millones mensuales.', 'Salario mínimo (+≈23%), reforma laboral y menos jornada elevan el costo.', 'La vigilancia híbrida (humano + tecnología) emerge como salida sostenible.'],
  },
  {
    id: 'supervig-licencias', cat: 'Regulación', tag: 'Sector', tone: 1, Icon: Icons.shield,
    title: 'Supervigilancia suspende 31 licencias por presunta infiltración criminal',
    dek: 'La Superintendencia de Vigilancia y Seguridad Privada canceló o suspendió las licencias de 31 empresas señaladas de servir de fachada a estructuras ilegales.',
    date: '15 Abr 2026', read: '4 min', src: 'Infobae',
    url: 'https://www.infobae.com/colombia/2026/04/15/suspenden-licencias-a-31-empresas-de-seguridad-privada-por-nexos-con-el-crimen-organizado-entre-sus-responsables-figuran-exmilitares-y-lideres-mafiosos/',
    hero: PX(5668859), imgs: [PX(3760067)],
    summary: [
      'La autoridad de vigilancia adoptó medidas frente a 31 empresas de seguridad privada señaladas de haber sido utilizadas como fachada por estructuras criminales. Las licencias fueron canceladas o suspendidas tras los hallazgos de las investigaciones.',
      'La decisión refuerza un mensaje claro para el mercado: contratar únicamente con operadores vigilados, con licencia vigente y en regla. La trazabilidad, las certificaciones y el cumplimiento normativo dejan de ser un trámite y se convierten en un filtro de riesgo para las empresas que contratan seguridad.',
    ],
    points: ['31 empresas con licencias canceladas o suspendidas.', 'Investigación por presuntos nexos con estructuras ilegales.', 'Contratar solo con operadores vigilados y en regla reduce el riesgo.'],
  },
  {
    id: 'tecnologia-eje', cat: 'Tecnología', tag: 'Tendencia', tone: 2, Icon: Icons.cpu,
    title: 'La tecnología, eje de la transformación de la seguridad privada',
    dek: 'Videovigilancia inteligente, control de acceso y modelos híbridos dejan de ser un lujo para convertirse en la clave de viabilidad del sector.',
    date: '19 Ene 2026', read: '6 min', src: 'Tecnoseguro',
    url: 'https://www.tecnoseguro.com/analisis/salario-minimo-seguridad-2026',
    hero: PX(325229), imgs: [PX(29379779), PX(2881229)],
    summary: [
      'Ante la presión de costos, la tecnología pasa de ser un complemento a ser el eje de la operación. La videovigilancia con analítica, el control de acceso y los modelos híbridos permiten cubrir más con menos personal, sin perder capacidad de respuesta.',
      'El indicador de valor ya no es el número de guardas, sino la eficiencia de sistemas integrados que detectan, alertan y coordinan en tiempo real. La seguridad se mide por resultados y por la rapidez con que se actúa ante un evento.',
    ],
    points: ['La tecnología se vuelve el eje, no el accesorio, de la operación.', 'Analítica de video y control de acceso amplían la cobertura.', 'El valor se mide por eficiencia y respuesta, no por número de guardas.'],
  },
  {
    id: 'porteria-virtual', cat: 'Innovación', tag: 'Tecnología', tone: 3, Icon: Icons.cctv,
    title: 'Portería virtual: hasta 63% de ahorro frente al puesto físico',
    dek: 'Un solo operador en un centro de comando gestiona varios edificios a la vez. Sumada a la analítica de video, la portería remota responde a la presión de costos de 2026.',
    date: '19 Ene 2026', read: '5 min', src: 'Tecnoseguro',
    url: 'https://www.tecnoseguro.com/analisis/salario-minimo-seguridad-2026',
    hero: PX(7567434), imgs: [PX(27098531)],
    summary: [
      'La portería virtual concentra en un centro de comando la gestión de varios edificios al tiempo. Un operador atiende accesos, intercomunicación y novedades de forma remota, apoyado en cámaras, analítica y protocolos de respuesta.',
      'Frente al puesto físico tradicional, el ahorro reportado llega hasta el 63%. Combinada con la vigilancia híbrida, se perfila como una de las respuestas más directas a la escalada de costos del sector en 2026, especialmente para conjuntos residenciales.',
    ],
    points: ['Un operador gestiona varios edificios desde un centro de comando.', 'Ahorro reportado de hasta 63% frente al puesto físico.', 'Ideal para conjuntos residenciales bajo presión de costos.'],
  },
  {
    id: 'jornada-electoral', cat: 'Orden público', tag: 'Coyuntura', tone: 1, Icon: Icons.radar,
    title: 'Despliegue de seguridad y monitoreo cibernético en la jornada electoral',
    dek: 'Las autoridades activaron Puestos de Mando Unificado físicos y cibernéticos para anticipar disturbios y desinformación durante las elecciones de 2026.',
    date: '21 Jun 2026', read: '4 min', src: 'Infobae',
    url: 'https://www.infobae.com/colombia/2026/06/12/ministro-de-defensa-alerto-sobre-posibles-hechos-violentos-despues-de-las-elecciones-del-21-de-junio-bogota-medellin-cali-y-barranquilla-bajo-vigilancia/',
    hero: PX(5380664), imgs: [PX(16766906)],
    summary: [
      'Durante la jornada electoral de 2026, las autoridades activaron Puestos de Mando Unificado físicos y cibernéticos para anticipar disturbios y contener la desinformación. La vigilancia se reforzó en las principales ciudades del país.',
      'El despliegue combinó presencia en terreno con monitoreo digital, un modelo que refleja hacia dónde se mueve la seguridad: coordinación en tiempo real entre lo físico y lo cibernético para reaccionar antes de que un riesgo escale.',
    ],
    points: ['Puestos de Mando Unificado físicos y cibernéticos activados.', 'Vigilancia reforzada en las principales ciudades.', 'Coordinación física + digital para anticipar riesgos.'],
  },
  {
    id: 'ranking-2026', cat: 'Sector', tag: 'Ranking', tone: 0, Icon: Icons.star,
    title: 'Ranking 2026 de la seguridad y vigilancia privada en Colombia',
    dek: 'El informe anual recoge ingresos, crecimiento y rentabilidad de 90 empresas líderes del sector entre 2021 y 2025.',
    date: '13 May 2026', read: '3 min', src: 'La Nota Económica',
    url: 'https://lanota.com/index.php/ranking-2026-seguridad-y-vigilancia-privada-de-colombia.html',
    hero: PX(3184291), imgs: [PX(590041), PX(3183197)],
    summary: [
      'El ranking anual del sector ofrece una radiografía del mercado de la vigilancia privada en Colombia. Recoge ingresos, crecimiento y rentabilidad de 90 empresas líderes en el periodo 2021–2025.',
      'Es una referencia útil para entender la concentración del mercado, el desempeño de los principales operadores y las tendencias de un sector que se transforma bajo presión de costos y mayor exigencia tecnológica.',
    ],
    points: ['Cubre 90 empresas líderes del sector (2021–2025).', 'Compara ingresos, crecimiento y rentabilidad.', 'Radiografía del mercado de vigilancia privada en Colombia.'],
  },
  {
    id: 'universidad-vigilante', cat: 'Talento', tag: 'Profesión', tone: 2, Icon: Icons.cap,
    title: 'La "Universidad del Vigilante": hacia un guarda híbrido y tecnológico',
    dek: 'El gremio apuesta por la profesionalización para que el personal evolucione hacia un perfil capaz de operar sensores, cámaras y software.',
    date: '19 Ene 2026', read: '4 min', src: 'Tecnoseguro',
    url: 'https://www.tecnoseguro.com/analisis/salario-minimo-seguridad-2026',
    hero: PX(8636600), imgs: [PX(1181671)],
    summary: [
      'La profesionalización del personal se vuelve estratégica. El gremio impulsa la formación para que el vigilante evolucione hacia un perfil híbrido, capaz de operar sensores, cámaras y software además de sus funciones tradicionales.',
      'El "vigilante tradicional" da paso al operador de medios tecnológicos. Esta transformación del talento es la otra cara de la apuesta tecnológica del sector: la herramienta solo rinde si quien la opera está bien formado.',
    ],
    points: ['Apuesta gremial por la profesionalización del personal.', 'El guarda evoluciona a operador de medios tecnológicos.', 'Talento formado: condición para que la tecnología rinda.'],
  },
];

const SOURCES = [
  ['El Tiempo — Vigilancia privada en 2026: tarifas mínimas e incremento', 'https://www.eltiempo.com/economia/finanzas-personales/vigilancia-privada-en-2026-las-tarifas-minimas-y-su-incremento-tras-aumento-del-salario-minimo-3521732'],
  ['Infobae — Suspenden licencias a 31 empresas de seguridad privada', 'https://www.infobae.com/colombia/2026/04/15/suspenden-licencias-a-31-empresas-de-seguridad-privada-por-nexos-con-el-crimen-organizado-entre-sus-responsables-figuran-exmilitares-y-lideres-mafiosos/'],
  ['Tecnoseguro — Seguridad privada 2026: crisis de costos y revolución tecnológica', 'https://www.tecnoseguro.com/analisis/salario-minimo-seguridad-2026'],
  ['Infobae — Vigilancia reforzada por las elecciones de 2026', 'https://www.infobae.com/colombia/2026/06/12/ministro-de-defensa-alerto-sobre-posibles-hechos-violentos-despues-de-las-elecciones-del-21-de-junio-bogota-medellin-cali-y-barranquilla-bajo-vigilancia/'],
  ['La Nota Económica — Ranking 2026 seguridad y vigilancia privada', 'https://lanota.com/index.php/ranking-2026-seguridad-y-vigilancia-privada-de-colombia.html'],
  ['El Heraldo — 31 empresas de seguridad presuntamente infiltradas', 'https://www.elheraldo.co/colombia/2026/04/14/estas-son-las-31-empresas-de-seguridad-que-estarian-infiltradas-por-estructuras-criminales/'],
];

/* Portada con fotografía real + velo de marca + scanline + etiqueta */
function PhotoCover({ post, big }) {
  return React.createElement('div', { 'aria-hidden': true, className: 'a1s-blog-photo' },
    React.createElement('img', { src: post.hero, alt: '', loading: 'lazy', className: 'a1s-blog-photo-img' }),
    React.createElement('div', { className: 'a1s-blog-photo-veil' }),
    React.createElement('div', { className: 'a1s-scan' }),
    React.createElement('span', { className: 'a1s-blog-photo-cat' },
      React.createElement(post.Icon, { size: 15, sw: 1.6 }), post.cat));
}

function meta(p, dark) {
  return React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', fontSize: '.8125rem', color: dark ? 'var(--dark-muted)' : 'var(--text-muted)' } },
    React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 6 } }, React.createElement(Icons.cal, { size: 14 }), p.date),
    React.createElement('span', { 'aria-hidden': true }, '·'),
    React.createElement('span', { style: { display: 'inline-flex', alignItems: 'center', gap: 6 } }, React.createElement(Icons.clock, { size: 14 }), p.read, ' de lectura'),
    React.createElement('span', { 'aria-hidden': true }, '·'),
    React.createElement('span', null, 'Fuente: ', React.createElement('b', { style: { color: dark ? '#fff' : 'var(--text)', fontWeight: 600 } }, p.src)));
}

/* ════════════════ LECTURA DE LA NOTICIA (dentro del sitio) ════════════════ */
function ArticleView({ post, onBack, onOpen }) {
  React.useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }); }, [post.id]);
  const related = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  return React.createElement('div', { 'data-screen-label': 'Noticia' },
    /* Hero de la noticia */
    React.createElement('section', { className: 'a1s-dark', style: { background: '#0A0A0C', paddingTop: 'calc(78px + var(--section-y) * .42)', paddingBottom: 'calc(var(--section-y) * .5)', position: 'relative', overflow: 'hidden' } },
      React.createElement('div', { 'aria-hidden': true, style: { position: 'absolute', inset: 0, background: 'radial-gradient(60% 70% at 75% 0%, rgba(192,35,27,.16), transparent 60%)' } }),
      React.createElement('div', { style: { ...WRAP, position: 'relative', maxWidth: 900 } },
        React.createElement('button', { className: 'a1s-int', onClick: onBack, style: { display: 'inline-flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: 'var(--dark-muted)', fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '.9rem', cursor: 'pointer', padding: 0, marginBottom: 22 } },
          React.createElement(Icons.arrow, { size: 16, style: { transform: 'rotate(180deg)' } }), 'Volver al blog'),
        React.createElement('div', { style: { display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 } },
          React.createElement(Badge, { variant: 'red' }, post.cat), React.createElement(Badge, { variant: 'on-dark' }, post.tag)),
        React.createElement('h1', { style: { margin: 0, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.9rem,4.4vw,3.1rem)', letterSpacing: '-.025em', lineHeight: 1.06, color: '#fff', maxWidth: '20ch' } }, post.title),
        React.createElement('div', { style: { marginTop: 18 } }, meta(post, true)))),

    /* Imagen principal */
    React.createElement('section', { style: { ...WRAP, marginTop: 'calc(var(--section-y) * -.34)', position: 'relative', zIndex: 2 } },
      React.createElement('div', { className: 'a1s-article-hero' },
        React.createElement('img', { src: post.hero, alt: post.title, className: 'a1s-article-hero-img' }),
        React.createElement('div', { 'aria-hidden': true, className: 'a1s-scan' }))),

    /* Cuerpo: resumen + lo más relevante */
    React.createElement('section', { style: { ...SECTION, paddingTop: 'clamp(2rem,4vw,3rem)' } },
      React.createElement('div', { style: { ...WRAP, maxWidth: 760 } },
        React.createElement('p', { className: 'a1s-article-lead' }, post.dek),
        post.summary.map((para, i) => React.createElement(React.Fragment, { key: i },
          React.createElement('p', { className: 'a1s-article-p' }, para),
          i === 0 && post.imgs && post.imgs[0] && React.createElement('figure', { className: 'a1s-article-fig' },
            React.createElement('img', { src: post.imgs[0], alt: '', loading: 'lazy' })))),

        /* Lo más relevante */
        React.createElement('div', { className: 'a1s-article-points' },
          React.createElement('div', { className: 'a1s-article-points-h' },
            React.createElement(Icons.target, { size: 18 }), 'Lo más relevante'),
          post.points.map((pt, i) => React.createElement('div', { key: i, className: 'a1s-article-point' },
            React.createElement('span', { className: 'a1s-article-point-ic' }, React.createElement(Icons.check, { size: 15 })),
            React.createElement('span', null, pt)))),

        post.imgs && post.imgs[1] && React.createElement('figure', { className: 'a1s-article-fig' },
          React.createElement('img', { src: post.imgs[1], alt: '', loading: 'lazy' })),

        /* Llamado a leer la fuente */
        React.createElement('div', { className: 'a1s-article-src' },
          React.createElement('div', null,
            React.createElement('div', { className: 'a1s-article-src-k' }, 'Este es un resumen elaborado por A1S'),
            React.createElement('p', { className: 'a1s-article-src-d' }, 'Para conocer todos los detalles, consulta la noticia completa en su fuente original — ', React.createElement('b', null, post.src), '.')),
          React.createElement(Btn, { variant: 'primary', href: post.url, target: '_blank', rel: 'noopener', iconRight: React.createElement(Icons.arrowUR, { size: 18 }) }, 'Leer la noticia completa')))),

    /* Más noticias */
    React.createElement('section', { style: { ...SECTION, background: 'var(--surface)', paddingTop: 'clamp(2.4rem,4vw,3.4rem)' } },
      React.createElement('div', { style: WRAP },
        React.createElement(Eyebrow, null, 'Sigue leyendo'),
        React.createElement('h2', { style: { margin: '12px 0 0', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.4rem,2.6vw,2rem)', letterSpacing: '-.02em' } }, 'Más noticias del sector'),
        React.createElement('div', { className: 'a1s-blog-grid', style: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginTop: 28 } },
          related.map((p) => React.createElement('button', { key: p.id, className: 'a1s-int a1s-blog-card', onClick: () => onOpen(p), style: { textAlign: 'left', font: 'inherit' } },
            React.createElement('div', { className: 'a1s-blog-card-media' },
              React.createElement(PhotoCover, { post: p }),
              React.createElement('span', { className: 'a1s-blog-tag' }, p.tag)),
            React.createElement('div', { className: 'a1s-blog-card-body' },
              React.createElement('h3', { style: { margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.12rem', letterSpacing: '-.01em', lineHeight: 1.2 } }, p.title),
              React.createElement('div', { style: { marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--border)' } }, meta(p))))))))
  );
}

/* ════════════════ LISTA DE NOTICIAS ════════════════ */
function BlogView({ go }) {
  const [active, setActive] = React.useState(null);
  const open = (p) => setActive(p);
  const back = () => { setActive(null); window.scrollTo({ top: 0, behavior: 'auto' }); };

  if (active) return React.createElement(ArticleView, { post: active, onBack: back, onOpen: open });

  const feat = BLOG_POSTS.find((p) => p.feat) || BLOG_POSTS[0];
  const rest = BLOG_POSTS.filter((p) => p !== feat);

  return React.createElement('div', { 'data-screen-label': 'Blog' },
    /* Hero */
    React.createElement('section', { className: 'a1s-dark', style: { background: '#0A0A0C', paddingTop: 'calc(78px + var(--section-y) * .45)', paddingBottom: 'calc(var(--section-y) * .55)', position: 'relative', overflow: 'hidden' } },
      React.createElement('div', { 'aria-hidden': true, style: { position: 'absolute', inset: 0, background: 'radial-gradient(60% 75% at 50% 0%, rgba(192,35,27,.18), transparent 60%)' } }),
      React.createElement('div', { style: { ...WRAP, position: 'relative' } },
        React.createElement(Reveal, null, React.createElement(SectionHead, { dark: true, center: true, eyebrow: 'Blog · Noticias de seguridad', title: 'Lo que está pasando en la seguridad de Colombia.', lead: 'Análisis, regulación y tecnología del sector de la vigilancia y la seguridad privada — seleccionado por el equipo A1S.' })))),

    /* Destacada — inmersiva (foto a sangre) */
    React.createElement('section', { style: { ...SECTION, paddingTop: 'clamp(2rem,3.5vw,3rem)' } },
      React.createElement('div', { className: 'a1s-blog-wrap' },
        React.createElement(Reveal, null,
          React.createElement('div', { className: 'a1s-int a1s-feat2', role: 'button', tabIndex: 0, onClick: () => open(feat), onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(feat); } } },
            React.createElement('img', { className: 'a1s-feat2-img', src: feat.hero, alt: feat.title }),
            React.createElement('div', { className: 'a1s-feat2-veil', 'aria-hidden': true }),
            React.createElement('div', { className: 'a1s-scan', 'aria-hidden': true }),
            React.createElement('span', { className: 'a1s-blog-photo-cat' }, React.createElement(feat.Icon, { size: 15, sw: 1.6 }), feat.cat),
            React.createElement('div', { className: 'a1s-feat2-body' },
              React.createElement('div', { style: { display: 'inline-flex', alignItems: 'center', gap: 8 } },
                React.createElement(Badge, { variant: 'solid' }, 'Destacada'),
                React.createElement(Badge, { variant: 'red' }, feat.tag)),
              React.createElement('h2', null, feat.title),
              React.createElement('p', null, feat.dek),
              React.createElement('div', { className: 'a1s-feat2-meta', style: { marginTop: 18 } }, meta(feat, true)),
              React.createElement('span', { style: { marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 8, color: '#fff', fontWeight: 700 } }, 'Leer el resumen', React.createElement(Icons.arrow, { size: 18 }))))),

        /* Grid de noticias */
        React.createElement('div', { className: 'a1s-blog-grid a1s-blog-grid2', style: { marginTop: 'clamp(2rem,3.5vw,3rem)' } },
          rest.map((p, i) => React.createElement(Reveal, { key: p.id, delay: (i % 3) * 80 },
            React.createElement('button', { className: 'a1s-int a1s-blog-card', onClick: () => open(p), style: { textAlign: 'left', font: 'inherit', width: '100%' } },
              React.createElement('div', { className: 'a1s-blog-card-media' },
                React.createElement(PhotoCover, { post: p }),
                React.createElement('span', { className: 'a1s-blog-tag' }, p.tag)),
              React.createElement('div', { className: 'a1s-blog-card-body' },
                React.createElement('h3', { style: { margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', letterSpacing: '-.01em', lineHeight: 1.18 } }, p.title),
                React.createElement('p', { style: { margin: '10px 0 0', color: 'var(--text-muted)', fontSize: '.9375rem', lineHeight: 1.55, flex: 1 } }, p.dek),
                React.createElement('div', { style: { marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border)' } }, meta(p))))))))),

  );
}

Object.assign(window, { BlogView });
