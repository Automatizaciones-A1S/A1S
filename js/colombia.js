/* ============================================================================
   A1S — Datos del mapa de Colombia
   Silueta reconocible (SVG path): península de La Guajira al NE, costa Caribe,
   golfo de Urabá, costa Pacífica, trapecio amazónico (Leticia) al sur y los
   llanos/Orinoquía al oriente. ViewBox 0 0 600 720.
   Las 5 regionales llevan coordenadas en el mismo sistema.
   ========================================================================== */
(function () {
  'use strict';

  var PATH =
    'M 455 38 ' +
    'L 478 58 L 470 88 L 442 104 ' +   // La Guajira (punta Gallinas → Venezuela)
    'L 432 138 L 448 178 L 430 214 ' + // serranía del Perijá / Catatumbo
    'L 452 248 L 528 264 ' +           // frontera Arauca → Puerto Carreño
    'L 514 318 L 540 390 L 548 432 ' + // Vichada / Guainía (oriente)
    'L 502 468 L 472 518 L 422 558 ' + // Vaupés / Caquetá (frontera Brasil)
    'L 398 608 L 374 638 L 352 700 ' + // hacia el trapecio amazónico
    'L 330 658 L 332 612 L 300 562 ' + // Leticia → Putumayo
    'L 256 512 L 226 478 ' +           // frontera Ecuador
    'L 196 442 L 186 382 L 178 320 L 186 262 L 178 212 ' + // costa Pacífica
    'L 196 180 L 188 158 ' +           // frontera Panamá
    'L 208 148 L 216 172 L 234 152 ' + // golfo de Urabá
    'L 240 128 L 272 118 L 310 98 L 352 84 L 388 70 L 420 54 ' + // costa Caribe
    'Z';

  // Regionales — coords en el viewBox 600x720 (svg legado)
  // px / py = posición en porcentaje sobre la imagen del mapa (assets/mapa-colombia.png, 1:1)
  var REGIONALES = [
    { reg: 'Caribe',       city: 'Cartagena',    x: 302, y: 106, px: 32.6, py: 15.4, lead: 'Costa Caribe' },
    { reg: 'Santander',    city: 'Bucaramanga',  x: 396, y: 224, px: 49.1, py: 32.2, lead: 'Nororiente' },
    { reg: 'Antioquia',    city: 'Medellín',     x: 282, y: 266, px: 32.2, py: 36.9, lead: 'Noroccidente' },
    { reg: 'Centro',       city: 'Bogotá',       x: 352, y: 338, px: 42.5, py: 45.6, lead: 'Andina central' },
    { reg: 'Suroccidente', city: 'Cali',         x: 252, y: 408, px: 25.6, py: 51.8, lead: 'Pacífico sur' },
  ];

  // Red física nacional — Listado de agencias y sucursales 2026.
  // type: 'principal' | 'sucursal' | 'agencia'
  // px / py = posición en porcentaje sobre assets/mapa-colombia.png (calibrado con lat/lon).
  var SEDES = [
    { type: 'principal', city: 'Bogotá',          dpto: 'Cundinamarca',   addr: 'Calle 93B N.° 17-25',                              px: 42.5, py: 45.6 },

    { type: 'sucursal',  city: 'Barranquilla',    dpto: 'Atlántico',      addr: 'Cra 57 N.° 99A-65, Torres del Atlántico, Of. 908', px: 37.5, py: 12.5 },
    { type: 'sucursal',  city: 'Bucaramanga',     dpto: 'Santander',      addr: 'Calle 21 N.° 31-77',                               px: 49.1, py: 32.2 },
    { type: 'sucursal',  city: 'Cali',            dpto: 'Valle del Cauca',addr: 'Centro Empresarial Chipichape, Oficina 611-612',  px: 25.6, py: 51.0 },
    { type: 'sucursal',  city: 'Cartagena',       dpto: 'Bolívar',        addr: 'Calle 6A N.° 3-17, piso 4, Of. 408',               px: 32.6, py: 15.4 },
    { type: 'sucursal',  city: 'Medellín',        dpto: 'Antioquia',      addr: 'Cra 43A N.° 16A Sur-38, interior 0203',            px: 32.2, py: 36.9 },
    { type: 'sucursal',  city: 'Pasto',           dpto: 'Nariño',         addr: 'Cra 26 N.° 20-48',                                 px: 20.7, py: 62.4 },
    { type: 'sucursal',  city: 'Sogamoso',        dpto: 'Boyacá',         addr: 'Cra 9A N.° 16-22',                                 px: 50.4, py: 40.2 },
    { type: 'sucursal',  city: 'Valledupar',      dpto: 'Cesar',          addr: 'Cra 14 N.° 18-28',                                 px: 48.1, py: 15.5 },
    { type: 'sucursal',  city: 'Villavicencio',   dpto: 'Meta',           addr: 'Cra 26 N.° 8-33',                                  px: 45.6, py: 48.2 },
    { type: 'sucursal',  city: 'Cúcuta',          dpto: 'Norte de Santander', addr: 'Calle 4 N.° 1E-32',                            px: 53.3, py: 29.0 },

    { type: 'agencia',   city: 'Arauca',          dpto: 'Arauca',         addr: 'Av. Rondón, Cra 16 N.° 20-46',                     px: 65.2, py: 33.6 },
    { type: 'agencia',   city: 'Buenaventura',    dpto: 'Valle del Cauca',addr: 'Calle 2 N.° 5B-35',                                px: 22.4, py: 48.6 },
    { type: 'agencia',   city: 'Riohacha',        dpto: 'La Guajira',     addr: 'Calle 14H Bis N.° 27-21',                          px: 50.4, py: 10.0 },
    { type: 'agencia',   city: 'Montería',        dpto: 'Córdoba',        addr: 'Calle 31A N.° 16-35',                              px: 30.1, py: 23.7 },
    { type: 'agencia',   city: 'Popayán',         dpto: 'Cauca',          addr: 'Calle 30N N.° 2B-42',                              px: 25.3, py: 56.2 },
    { type: 'agencia',   city: 'San Andrés',      dpto: 'San Andrés y Providencia', addr: 'Av. Juan XXIII, Calle 5A N.° 6-78', island: true, px: 9.5, py: 8.0 },
    { type: 'agencia',   city: 'Sincelejo',       dpto: 'Sucre',          addr: 'Cra 18 N.° 20-34',                                 px: 33.4, py: 21.0 },
    { type: 'agencia',   city: 'Ibagué',          dpto: 'Tolima',         addr: 'Cra 4 N.° 38-65',                                  px: 34.6, py: 46.2 },
    { type: 'agencia',   city: 'Barrancabermeja', dpto: 'Santander',      addr: 'Calle 53 N.° 8-80',                                px: 44.1, py: 33.0 },
    { type: 'agencia',   city: 'Huila',           dpto: 'Huila',          addr: 'Neiva, Huila',                                     px: 34.3, py: 54.0 },
  ];

  window.A1SColombia = { path: PATH, regionales: REGIONALES, sedes: SEDES, viewBox: '0 0 600 720', img: 'assets/mapa-colombia.png?v=3' };
})();
