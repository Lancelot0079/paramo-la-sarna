// Todo el contenido de la página. Fuentes: Cinep (Revista Cien Días, 2022), Rutas del Conflicto,
// Consejo de Estado (boletín 223), Vanguardia (2019), Prensa Libre Casanare.

const img = name => `./assets/${name}`;

export const IMAGES = {
  road: img('wle2026-co-camino-entre-la-niebla-del.jpg'),
  consuelo1: img('paramo-del-consuelo-1-boyaca-colombia.jpg'),
  consuelo11: img('paramo-del-consuelo-11-boyaca-colombia.jpg'),
  consuelo12: img('paramo-del-consuelo-12-boyaca-colombia.jpg'),
  frailejon: img('frailejon-espeletia.jpg'),
  aquitania: img('aquitania-boyaca.jpg'),
  fog: img('la-niebla-en-el-paramo.jpg'),
  chapel: img('wle2026-co-capilla-en-la-niebla-pnn.jpg'),
  tota: img('lago-de-tota.jpg'),
};

export const CHAPTERS = [
  { id: 'inicio', label: 'Portada' },
  { id: 'contexto', label: 'Contexto', nav: true },
  { id: 'el-dia', label: 'El día', nav: true },
  { id: 'victimas', label: 'Víctimas', nav: true },
  { id: 'cifras', label: 'Cifras' },
  { id: 'justicia', label: 'Justicia', nav: true },
  { id: 'sentencia', label: 'La sentencia' },
  { id: 'memoria', label: 'Memoria', nav: true },
  { id: 'discusion', label: 'Discusión', nav: true },
];

export const STATIONS = [
  { when: 'Madrugada', what: 'Sale el bus de Cootracero', why: 'Ruta Sogamoso – Labranzagrande. A bordo, dieciocho personas: comerciantes, estudiantes, funcionarios de alcaldías de la provincia, un docente, niños.', reach: 0 },
  { when: 'El Crucero', what: 'El retén que no estaba', why: 'El retén militar de El Crucero, que operaba los fines de semana, no se instaló ese sábado.', reach: 0 },
  { when: 'Hacia las 7:00', what: 'El retén ilegal en La Sarna', why: 'En la vereda Toquilla, hombres de las ACC detienen el bus. Decían buscar a un supuesto guerrillero del ELN; luego mataron a la mayoría de los pasajeros.', reach: 0.02 },
  { when: '7:00 – 14:00', what: 'El páramo, solo', why: 'Sobreviven dos niños y una mujer mayor. Los autores huyen; algunos, armados y en un vehículo hurtado, fueron retenidos y después liberados.', reach: 0.55 },
  { when: '14:00', what: 'Llegan las autoridades', why: 'Siete horas después. El Consejo de Estado leyó esta demora, junto con el retén ausente, como parte de la responsabilidad estatal.', reach: 1 },
];

export const VICTIMS = [
  ['Tania Leonor Correa Pidiache', 21, 'estudiante de Medicina'],
  ['Mercedes Rivera', 22, 'Alcaldía de Paya'],
  ['Luis Arturo Cárdenas', 29, 'director de la UMATA de Paya'],
  ['Isidro Alba Guío', 54, 'docente y sindicalista'],
  ['Jhon Fredy Poveda Bayona', 17, 'universitario'],
  ['Luis Miguel Melo Espitia', 17, 'ayudante del bus'],
  ['Abel Cudris Rodríguez', 52, 'comerciante'],
  ['Gonzalo Rincón Barrera', 30, 'ingeniero sanitario'],
  ['Luis Ángel Gil Orduz', 30, 'ayudante'],
  ['Luis Alejandro Pérez Fernández', 22, 'estudiante de la UPTC'],
  ['José Antonio Monguí Pérez', 52, 'comerciante'],
  ['Jairo Isidoro Peña', 48, 'comerciante'],
  ['Herminda Blanco de Peña', 44, 'profesora'],
  ['José Bertulfo Noa Rosas', 50, 'agricultor'],
  ['Hernando Gómez Garavito', 32, 'conductor del bus'],
].map(([name, age, role]) => ({ name, age, role }));

export const YEARS = [
  { y: '2001', title: 'La masacre', text: 'Los desmovilizados en Justicia y Paz señalan como jefe del grupo a Josué Darío Orjuela, alias «Solín». El Cinep menciona además a Ernesto Zipaquirá Riaño, alias «Renegado», y a un agente de inteligencia de la Brigada que servía de enlace.' },
  { y: '2011', title: 'Primera condena a la Nación', text: 'La justicia administrativa declara responsable al Estado por la masacre.' },
  { y: '2015', title: '40 años de prisión', text: 'El 7 de septiembre, el Juzgado 56 de Bogotá condena a Luis Afrodis Sandoval, señalado de pertenecer a las ACC, conseguir las armas y ocultar a los autores.' },
  { y: '2019', title: 'Ejército y Policía, partícipes', text: 'Una sentencia del Juzgado 11 Penal Especializado de Bogotá concluye que miembros de la Primera Brigada y de la SIJIN planearon y coordinaron la masacre con los paramilitares, y ordena investigarlos.' },
  { y: '2019', title: 'El Consejo de Estado ratifica', text: 'El 27 de agosto confirma la condena contra la Nación y ordena una reparación integral.' },
  { y: '2022', title: 'La verdad, en el informe final', text: <>La Comisión de la Verdad recoge el caso en el capítulo <i>Hasta la guerra tiene límites</i>.</> },
];

export const RITUALS = [
  { title: 'La peregrinación', text: 'Cada año, el último domingo de noviembre o el primero de diciembre, familiares y vecinos suben de Sogamoso al páramo. Hay una eucaristía en el lugar.' },
  { title: 'La ruta ciclística', text: 'Desde 2021 la peregrinación incluye un recorrido en bicicleta por la vía. La segunda edición fue el 27 de noviembre de 2022, a los 21 años.' },
  { title: 'Vida, Memoria y Dignidad', text: 'El grupo de familiares sostiene la memoria y forma parte del Movimiento Nacional de Víctimas de Crímenes de Estado, capítulo Boyacá.' },
];

export const REEL = [
  { kind: 'tall', src: IMAGES.fog, w: 1920, h: 2560, alt: 'Niebla espesa sobre un páramo, con siluetas de árboles', cap: 'Niebla en el páramo de Guerrero' },
  { kind: 'pair', items: [
    { src: IMAGES.consuelo11, w: 1920, h: 1440, alt: 'Ladera de páramo con pajonal dorado y flores', cap: 'Páramo del Consuelo, Boyacá' },
    { src: IMAGES.consuelo12, w: 1920, h: 1440, alt: 'Colinas rocosas de páramo con frailejones', cap: 'Páramo del Consuelo, Boyacá' },
  ] },
  { kind: 'wide', src: IMAGES.tota, w: 1920, h: 1280, alt: 'Lago de Tota visto desde una montaña, con cultivos verdes', cap: 'Lago de Tota, Aquitania' },
  { kind: 'tall', src: IMAGES.chapel, w: 1920, h: 1280, alt: 'Pequeña capilla de piedra entre la niebla junto a un camino de tierra', cap: 'Capilla en la niebla, Chingaza', pos: '45% 50%' },
  { kind: 'wide', src: IMAGES.consuelo1, w: 1920, h: 1440, alt: 'Frailejones entre rocas en el páramo del Consuelo', cap: 'Páramo del Consuelo, Boyacá' },
];

export const QUESTIONS = [
  { q: '¿Qué queda del monopolio de la violencia?', text: 'Si el Estado se define por reclamar el uso legítimo de la fuerza, ¿qué ocurre con esa legitimidad cuando sus agentes coordinan una masacre con un ejército privado?', who: <>Max Weber, <i>La política como vocación</i></> },
  { q: 'Responder por no actuar', text: 'El Consejo de Estado condenó por un riesgo conocido y no atendido. ¿Hasta dónde llega el deber de protección del Estado frente a quienes viven en una zona en guerra?', who: 'Hobbes y el pacto de protección' },
  { q: 'Nombrar al enemigo', text: 'Llamar «colaboradores» a los habitantes de una provincia entera los convirtió en blanco. ¿Cómo opera el estigma para volver matable a una población civil?', who: 'Carl Schmitt · Giorgio Agamben' },
  { q: '¿Qué repara una reparación?', text: 'Una indemnización, un acto de perdón aún pendiente, veletas en el páramo. ¿Qué le debe un Estado a las víctimas: dinero, verdad, justicia o garantías de no repetición?', who: 'Justicia transicional · Hannah Arendt' },
];

export const SOURCES = [
  ['Fuentes', [
    ['Cinep, Revista Cien Días (2022)', 'https://www.revistaciendiascinep.com/home/marcas-de-la-memoria-21-anos-de-la-masacre-del-paramo-de-la-sarna/'],
    ['Rutas del Conflicto', 'https://rutasdelconflicto.com/masacres/el-paramo-la-sarna'],
    ['Consejo de Estado, boletín 223', 'https://www.consejodeestado.gov.co/documentos/boletines/223/15001-23-31-000-2003-03453-01.pdf'],
  ]],
  ['Prensa', [
    ['Vanguardia (2019)', 'https://www.vanguardia.com/colombia/condenan-al-estado-por-masacre-en-boyaca-AG1459772'],
    ['Prensa Libre Casanare', 'https://prensalibrecasanare.com/judicial/34736-consejo-de-estado-ratificu-condena-contra-la-naciun-por-masacre-del-pbramo-de-la-sarna.html'],
    ['Boyacá 7 Días (2021)', 'https://boyaca7dias.com.co/2021/12/01/hoy-se-cumplen-20-anos-de-la-masacre-de-la-sarna/'],
  ]],
];
