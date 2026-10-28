/**
 * Bibliografía del sitio: fuentes de la información del incidente,
 * documentación técnica de apoyo y recursos de diseño. Cada entrada
 * explica qué dato concreto se ha obtenido de ella.
 */

export interface BiblioEntry {
  label: string;
  url: string;
  note: string;
}

export interface BiblioGroup {
  kind: string;
  title: string;
  lede: string;
  entries: BiblioEntry[];
}

export const bibliography: BiblioGroup[] = [
  {
    kind: 'Divulgación',
    title: 'El incidente php2bash',
    lede:
      'De aquí salen las fechas de la cronología, la descripción de las dos vulnerabilidades, ' +
      'las versiones afectadas y los datos de explotación.',
    entries: [
      {
        label: 'watchTowr — FAQ sobre CVE-2026-109618 y CVE-2026-109619',
        url: 'https://watchtowr.com/intelligence/php-cve-2026-109618-faq/',
        note:
          'Análisis técnico de las dos fallas (corrupción de memoria por multipart y use-after-free ' +
          'con session.upload_progress), su evaluación de criticidad y la cronología del descubrimiento.',
      },
      {
        label: 'NCSC-NL — Repositorio operativo php2shell',
        url: 'https://github.com/NCSC-NL/php2shell',
        note:
          'Indicadores de compromiso (IOCs), reglas de detección y guía de respuesta: base de la ' +
          'página de detección y de la checklist de explotación.',
      },
      {
        label: 'Cloudflare — Protecciones WAF contra php2shell',
        url: 'https://blog.cloudflare.com/php-vulnerabilities-waf-protection/',
        note:
          'Telemetría de la explotación masiva (miles de peticiones por hora, tácticas cambiantes) ' +
          'y el virtual patching activado por defecto horas antes del anuncio.',
      },
      {
        label: 'Amazon Security — Explotación detectada antes de la divulgación (MadPot)',
        url: 'https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/',
        note:
          'Primeras señales de explotación el 17 de octubre en los honeypots MadPot, cuatro días ' +
          'antes del anuncio público: el hito «primer intento» de la cronología.',
      },
      {
        label: 'SecurityWeek — Explotación masiva tras la fuga',
        url: 'https://www.securityweek.com/php2shell-mass-exploitation-looms-for-leaked-critical-php-flaws/',
        note:
          'La fuga de detalles del 20 de octubre («php2shell»), la PoC pública del 21 y el inicio ' +
          'de la explotación masiva.',
      },
      {
        label: 'Universidad de Toronto — Advisory técnico',
        url: 'https://security.utoronto.ca/advisories/security-advisory-critical-unauthenticated-rce-in-php-php2shell/',
        note:
          'Advisory independiente que resume el impacto (RCE sin autenticación) y las acciones ' +
          'inmediatas para organizaciones afectadas.',
      },
      {
        label: 'Ubuntu — Parches disponibles para php2shell',
        url: 'https://ubuntu.com/blog/php2shell-vulnerability-fixes-available',
        note:
          'Backports de distribución: ejemplo real de que los parches llegan también por el ' +
          'gestor de paquetes, no solo compilando desde php.net.',
      },
      {
        label: 'Wikipedia — PHP2Shell',
        url: 'https://en.wikipedia.org/wiki/PHP2Shell',
        note:
          'Consulta de apoyo para contrastar la cronología general y el contexto divulgativo.',
      },
    ],
  },
  {
    kind: 'Fondos',
    title: 'Documentación técnica',
    lede: 'Fundamentos de PHP y conceptos previos que el sitio explica antes de entrar al incidente.',
    entries: [
      {
        label: 'PHP.net — Manual y avisos oficiales',
        url: 'https://www.php.net/',
        note:
          'Fundamentos del lenguaje (sesiones, peticiones multipart, SAPI: mod_php/FPM/CGI), ' +
          'el comportamiento de session.upload_progress y las notas de las versiones corregidas ' +
          '(8.5.12 / 8.4.27 / 8.3.36 / 8.2.35).',
      },
      {
        label: 'GitHub Advisories — GHSA-w8hw-w9fx-j79w y GHSA-6wmf-4rv5-p3rp',
        url: 'https://github.com/advisories/GHSA-w8hw-w9fx-j79w',
        note:
          'Las fichas oficiales de las dos CVE: CVE-2026-109618 (corrupción de memoria por ' +
          'multipart) y CVE-2026-109619 (use-after-free / estado global obsoleto).',
      },
    ],
  },
  {
    kind: 'Diseño',
    title: 'Recursos visuales',
    lede: 'De dónde sale la estética del sitio (el contenido informático es propio del proyecto).',
    entries: [
      {
        label: 'Uiverse — kit «Glitchtype»',
        url: 'https://uiverse.io/ui-kits/bad-dolphin-14-186e4d54',
        note:
          'Referencia de estilo de la cronología: terminal retro, papel crema, líneas de tinta ' +
          'y amarillo voltaje con aberración RGB.',
      },
      {
        label: 'Piliapp — inventario de símbolos',
        url: 'https://es.piliapp.com/symbol/',
        note:
          'Fuente de los símbolos tipográficos (✓ ⚑ ☠ ⚖ ∎ …) que sustituyen a los emojis en ' +
          'todo el sitio.',
      },
    ],
  },
];
