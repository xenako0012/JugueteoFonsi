/** Catálogo de páginas del sitio: fuente única para menús, resumen y navegación. */

export type TopicKind =
  | 'php'
  | 'cronologia'
  | 'incidente'
  | 'versiones'
  | 'soluciones'
  | 'comprobador'
  | 'caso-practico'
  | 'deteccion'
  | 'aspectos'
  | 'faq'
  | 'bibliografia'
  | 'conclusiones';

export interface TopicInfo {
  path: string;
  kind: TopicKind;
  label: string;
  icon: string;
  desc: string;
  chip: string;
  chipKind: 'primary' | 'danger' | 'warn' | 'ok' | 'info';
  lede: string;
  group: 'Fundamentos' | 'Protección' | 'Recursos';
  /** Banner ilustrado opcional de la página. */
  banner?: string;
  bannerAlt?: string;
  /** Lado del bocadillo: coincide con el espacio libre del banner. */
  bannerSide?: 'left' | 'right';
  /** Frase de la mascota sobre el banner. */
  bannerTip?: string;
}

export const topics: TopicInfo[] = [
  {
    path: '/php',
    kind: 'php',
    label: 'PHP básico',
    icon: '$_',
    desc: 'Qué es PHP y cómo procesa una petición',
    chip: 'Punto de partida',
    chipKind: 'primary',
    lede: 'Antes de entender el incidente, conviene repasar en qué consiste PHP, cómo funciona el ciclo de vida de una petición y por qué un fallo en su motor afecta a todas las aplicaciones.',
    group: 'Fundamentos',
  },
  {
    path: '/cronologia',
    kind: 'cronologia',
    label: 'Cronología',
    icon: '~$',
    desc: 'Del hallazgo con IA a la explotación masiva',
    chip: '¿Por qué se descubrió y cuándo?',
    chipKind: 'info',
    lede: 'Una auditoría del motor de PHP asistida por inteligencia artificial destapó dos fallos de 2012. Después llegó la carrera entre parches, fugas y atacantes.',
    group: 'Fundamentos',
    banner: 'art/banner-cronologia.webp',
    bannerAlt: 'Cartel collage «cronología»: Bit sentado sobre disquetes entre despertadores y calendarios, con la insignia «12 días»',
  },
  {
    path: '/incidente',
    kind: 'incidente',
    label: 'El incidente',
    icon: '⚠',
    desc: 'Los dos CVE explicados paso a paso',
    chip: '¿En qué consiste?',
    chipKind: 'danger',
    lede: 'php2bash (PHP2Shell) son dos vulnerabilidades críticas de ejecución remota de código en el propio motor de PHP: CVE-2026-109618 y CVE-2026-109619.',
    group: 'Fundamentos',
  },
  {
    path: '/versiones',
    kind: 'versiones',
    label: 'Versiones',
    icon: '#',
    desc: 'Qué ramas son vulnerables y cuáles están corregidas',
    chip: '¿A qué versiones afecta?',
    chipKind: 'warn',
    lede: 'El código vulnerable existe desde PHP 5.4 (2012). Estas son las ramas afectadas, las versiones corregidas y qué hacer si estás en una rama sin soporte.',
    group: 'Fundamentos',
  },
  {
    path: '/soluciones',
    kind: 'soluciones',
    label: 'Soluciones',
    icon: '✚',
    desc: 'Parches, mitigaciones de emergencia y WAF',
    chip: '¿Qué soluciones existen?',
    chipKind: 'ok',
    lede: 'Actualizar PHP es la única solución definitiva; el resto son capas que compran tiempo y reducen el riesgo.',
    group: 'Protección',
  },
  {
    path: '/comprobador',
    kind: 'comprobador',
    label: 'Comprobador',
    icon: '⚖',
    desc: 'Diagnostica tu stack en 5 preguntas',
    chip: 'Diagnóstico express',
    chipKind: 'warn',
    lede:
      'Un formulario que calcula, en tu propio navegador, el riesgo de php2bash en tu servidor y te ' +
      'dice qué hacer a continuación.',
    group: 'Protección',
  },
  {
    path: '/caso-practico',
    kind: 'caso-practico',
    label: 'Caso práctico',
    icon: '☑',
    desc: 'Checklist Twinteach (Angular + Laravel)',
    chip: 'Caso práctico',
    chipKind: 'primary',
    lede: 'Los pasos concretos para comprobar que un stack con Angular en el frontend y Laravel en el backend está protegido, con comandos listos para copiar.',
    group: 'Protección',
    banner: 'art/banner-checklist.webp',
    bannerAlt: 'Cartel collage «checklist»: una chica con lazo azul sosteniendo una libreta de comprobaciones, con la insignia «el progreso se guarda»',
  },
  {
    path: '/deteccion',
    kind: 'deteccion',
    label: 'Detección',
    icon: '◉',
    desc: '¿Alguien ha aprovechado la vulnerabilidad?',
    chip: 'Detección y respuesta',
    chipKind: 'danger',
    lede: 'Cómo saber si tu sistema fue explotado: qué buscar en logs, en el sistema y en la aplicación, y qué hacer si encuentras indicios de compromiso.',
    group: 'Protección',
    banner: 'art/banner-deteccion.webp',
    bannerAlt: 'Cartel collage «detección»: detective con lupa junto a una terminal vigilada por una figura sospechosa, con el aviso «no borres nada»',
  },
  {
    path: '/aspectos',
    kind: 'aspectos',
    label: 'Otros aspectos',
    icon: '✦',
    desc: 'Lecciones y contexto del incidente',
    chip: 'Otros aspectos importantes',
    chipKind: 'info',
    lede: 'El papel de la IA en el descubrimiento, la fragilidad de la divulgación coordinada y por qué la defensa en profundidad sigue siendo la clave.',
    group: 'Recursos',
    banner: 'art/banner-aspectos.webp',
    bannerAlt: 'Cartel collage «aspectos»: Kuro, una gatita con gorro bufón rosa, con un ovillo de lana y una llave antigua, y la insignia «claves y detalles»',
  },
  {
    path: '/faq',
    kind: 'faq',
    label: 'FAQ',
    icon: '?',
    desc: 'Dudas frecuentes resueltas',
    chip: 'Preguntas frecuentes',
    chipKind: 'primary',
    lede: 'Las respuestas cortas a las dudas que más se repiten sobre el incidente.',
    group: 'Recursos',
    banner: 'art/banner-faq.webp',
    bannerAlt: 'Cartel collage «faq»: Kuro, una gatita con gorro bufón rosa, asomando de una caja entre notas, con la insignia «dudas frecuentes»',
  },
  {
    path: '/bibliografia',
    kind: 'bibliografia',
    label: 'Bibliografía',
    icon: '✎',
    desc: 'De dónde sale cada dato del sitio',
    chip: 'Fuentes del proyecto',
    chipKind: 'info',
    lede:
      'La bibliografía completa y anotada del sitio: qué aporta cada fuente al contenido, de la ' +
      'cronología a la estética.',
    group: 'Recursos',
  },
  {
    path: '/conclusiones',
    kind: 'conclusiones',
    label: 'Conclusiones',
    icon: '∎',
    desc: 'Cierre de la práctica y referencias',
    chip: 'Cierre',
    chipKind: 'ok',
    lede: 'Lo que nos llevamos de php2bash y las fuentes consultadas.',
    group: 'Recursos',
    banner: 'art/banner-conclusiones.webp',
    bannerAlt: 'Cartel collage «conclusiones»: Bit durmiendo sobre un teclado y Kuro rizada sobre una pila de libros bajo la luna, con la insignia «cierre»',
  },
];

export const topicGroups: { title: string; items: TopicInfo[] }[] = [
  { title: 'Fundamentos', items: topics.filter((t) => t.group === 'Fundamentos') },
  { title: 'Protección', items: topics.filter((t) => t.group === 'Protección') },
  { title: 'Recursos', items: topics.filter((t) => t.group === 'Recursos') },
];
