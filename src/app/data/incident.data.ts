/** Datos del contenido del incidente php2bash / PHP2Shell (octubre de 2026). */

export interface TimelineEvent {
  date: string;
  tag: string;
  tagKind: 'primary' | 'danger' | 'warn' | 'ok' | 'info';
  title: string;
  text: string;
}

export interface VersionRow {
  branch: string;
  status: 'vulnerable' | 'parcheado' | 'eol';
  fixed: string;
  notes: string;
}

export interface ChecklistStep {
  id: string;
  icon: string;
  title: string;
  text: string;
  commands: { label: string; code: string }[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export const timeline: TimelineEvent[] = [
  {
    date: 'Jul — Ago 2026',
    tag: 'Descubrimiento',
    tagKind: 'primary',
    title: 'Dos fallos dormidos desde 2012 salen a la luz',
    text:
      'Investigadores de las firmas Calif y Wiz auditan el núcleo de PHP con ayuda de agentes de IA ' +
      '(GPT‑5.6 Sol de OpenAI y Wiz Atlas con Gemini 4 Argon). Encuentran dos vulnerabilidades críticas ' +
      'en rutas poco visibles del motor (limpieza de memoria y cierre de peticiones) presentes desde PHP 5.4.',
  },
  {
    date: '11 de agosto de 2026',
    tag: 'Divulgación coordinada',
    tagKind: 'info',
    title: 'El proyecto PHP recibe los primeros informes',
    text:
      'Se abre un proceso de divulgación coordinada con los descubridores (Calif, Wiz, OpenAI y Quarkslab). ' +
      'El objetivo: preparar parches y anunciarlo todo a la vez, evitando que los atacantes se adelanten.',
  },
  {
    date: '17 de octubre de 2026',
    tag: 'Primer ataque',
    tagKind: 'danger',
    title: 'Se observa el primer intento de explotación… cuatro días antes del anuncio',
    text:
      'La red de señuelos MadPot de Amazon registra un intento de explotación procedente de una red de ' +
      'anonimización. La «seguridad por oscuridad» ya no existía: alguien conocía el fallo antes de que se hiciera público.',
  },
  {
    date: '20 de octubre de 2026',
    tag: 'Anuncio + fuga',
    tagKind: 'warn',
    title: 'PHP anuncia un parche de emergencia… y se filtran detalles técnicos',
    text:
      'El equipo de seguridad de PHP avisa de una release fuera de banda para el día 21 a las 14:00 UTC. ' +
      'En foros empiezan a circular detalles del fallo y el apodo del incidente: php2shell / php2bash («de PHP a shell»).',
  },
  {
    date: '21 de octubre · 02:00 UTC',
    tag: 'Carrera contra el reloj',
    tagKind: 'danger',
    title: 'Aparecen pruebas de concepto (PoC) públicas ~12 horas antes del embargo',
    text:
      'Amazon detecta los primeros PoC sobre las 02:00 UTC y más intentos entre las 02:00 y las 08:00 UTC. ' +
      'A las 13:34 UTC se publican los advisories en GitHub, 26 minutos antes de la hora anunciada.',
  },
  {
    date: '21 de octubre · 13:35 UTC',
    tag: 'Parches',
    tagKind: 'ok',
    title: 'PHP publica las versiones corregidas, 25 minutos antes de lo previsto',
    text:
      'Salen PHP 8.5.12, 8.4.27, 8.3.36 y 8.2.35. Esa misma madrugada (03:02 UTC) Cloudflare ya había activado ' +
      'reglas WAF por defecto para todos sus clientes, gratis y de pago.',
  },
  {
    date: '21 — 22 de octubre de 2026',
    tag: 'Explotación masiva',
    tagKind: 'danger',
    title: 'Miles de intentos por hora y avisos oficiales en todo el mundo',
    text:
      'Cloudflare observa picos de miles de intentos y atacantes adaptando sus tácticas para burlar protecciones. ' +
      'La NSA emite advertencias, algunos gobiernos retiran temporalmente sitios web y se confirma explotación real.',
  },
];

export const versions: VersionRow[] = [
  { branch: 'PHP 5.4 — 5.6', status: 'vulnerable', fixed: 'Sin parche oficial', notes: 'Código vulnerable desde 5.4 (2012). Ramas sin soporte.' },
  { branch: 'PHP 7.0 — 7.3', status: 'vulnerable', fixed: 'Sin parche oficial', notes: 'Sin soporte oficial. Backport de código disponible para 7.4.' },
  { branch: 'PHP 7.4', status: 'eol', fixed: 'Backport de código', notes: 'Ramas EOL: depende de tu distribución (Ubuntu, Debian, Alma…).' },
  { branch: 'PHP 8.0 — 8.1', status: 'eol', fixed: 'Backport de código', notes: '8.1 y anteriores están fuera del soporte oficial de PHP.' },
  { branch: 'PHP 8.2', status: 'parcheado', fixed: '≥ 8.2.35', notes: 'Versión mínima recomendada con soporte activo.' },
  { branch: 'PHP 8.3', status: 'parcheado', fixed: '≥ 8.3.36', notes: 'Rama muy extendida en producción.' },
  { branch: 'PHP 8.4', status: 'parcheado', fixed: '≥ 8.4.27', notes: 'Rama estable actual.' },
  { branch: 'PHP 8.5', status: 'parcheado', fixed: '≥ 8.5.12', notes: 'Última rama. Todas las anteriores a 8.5.12 son vulnerables.' },
];

export const checklist: ChecklistStep[] = [
  {
    id: 'inventario',
    icon: '🔎',
    title: '1. Inventario: averigua qué versiones de PHP se ejecutan',
    text:
      'Revisa producción, staging, contenedores, CI/CD y máquinas locales. En un stack como el de Twinteach ' +
      '(Angular en el frontend y Laravel en el backend) solo el backend ejecuta PHP, pero hay que comprobarlo todo.',
    commands: [
      { label: 'Versión del runtime', code: 'php -v\nphp-fpm -v   # o php-fpm8.3 -v' },
      { label: 'Paquetes instalados (Debian/Ubuntu)', code: 'dpkg -l | grep -i php' },
      { label: 'Paquetes instalados (RHEL/Alma)', code: 'rpm -qa | grep -i php' },
      { label: 'Contenedores Docker', code: 'docker images | grep php\ngrep -R "FROM php" . --include="Dockerfile*"' },
      { label: 'Requisitos del proyecto Laravel', code: 'composer check-platform-reqs' },
    ],
  },
  {
    id: 'comparar',
    icon: '📊',
    title: '2. Compara cada versión con la tabla de parches',
    text:
      'Toda instalación de PHP que sirva peticiones web con versión inferior a 8.2.35 / 8.3.36 / 8.4.27 / 8.5.12 ' +
      'se considera vulnerable. Si tienes una rama EOL (5.x, 7.x, 8.0, 8.1), decide ya: backport de tu distribución o migración.',
    commands: [
      {
        label: 'Consulta rápida',
        code: 'php -r \'echo PHP_VERSION, PHP_EOL;\'',
      },
    ],
  },
  {
    id: 'parchear',
    icon: '🩹',
    title: '3. Actualiza PHP y reinicia los servicios',
    text:
      'Instala el paquete parcheado de tu distribución o reconstruye las imágenes Docker con una base oficial actualizada. ' +
      'No olvides reiniciar php-fpm/Apache: sin reinicio el proceso viejo sigue en memoria.',
    commands: [
      { label: 'Debian/Ubuntu', code: 'sudo apt update && sudo apt install --only-upgrade "php*"\nsudo systemctl restart php*-fpm nginx' },
      { label: 'RHEL / Alma / Rocky', code: 'sudo dnf update php*\nsudo systemctl restart php-fpm nginx' },
      { label: 'Docker (ejemplo)', code: 'FROM php:8.3.36-fpm-alpine\n# ... reconstruir y redesplegar la imagen' },
    ],
  },
  {
    id: 'verificar',
    icon: '✅',
    title: '4. Verifica que la instalación quedó protegida',
    text:
      'Comprueba la versión efectiva en cada nodo y haz una prueba de humo de la aplicación: login, API y cargas del ' +
      'frontend Angular contra el backend Laravel.',
    commands: [
      { label: 'Versión efectiva', code: 'php -v\nphp -i | grep -i "session.upload_progress"' },
      { label: 'Laravel responde', code: 'php artisan about\ncurl -sI https://api.tu-dominio.com/health' },
    ],
  },
  {
    id: 'mitigar',
    icon: '🛡️',
    title: '5. Mientras tanto, aplica mitigaciones de emergencia',
    text:
      'Si no puedes parchear hoy mismo, reduce la superficie de ataque. La vía más usada por los atacantes abusa de ' +
      'session.upload_progress, que viene activado por defecto.',
    commands: [
      {
        label: 'php.ini / pool de php-fpm',
        code: 'session.upload_progress.enabled = Off\n; endurecimiento adicional\ndisable_functions = exec,passthru,shell_exec,system\nexpose_php = Off',
      },
    ],
  },
  {
    id: 'laravel',
    icon: '🐘',
    title: '6. Repasa la aplicación Laravel',
    text:
      'Reinicia workers de colas y cachés tras el cambio de PHP, ejecuta auditorías de dependencias y revisa los logs. ' +
      'Rota APP_KEY y credenciales solo si hay indicios de compromiso (invalida sesiones y datos cifrados con la clave antigua).',
    commands: [
      { label: 'Mantenimiento Laravel', code: 'php artisan config:cache && php artisan route:cache\nphp artisan queue:restart\ncomposer audit' },
      { label: 'Revisión de logs', code: 'tail -n 200 storage/logs/laravel.log' },
    ],
  },
  {
    id: 'angular',
    icon: '🅰️',
    title: '7. Confirma el estado del frontend Angular y del despliegue',
    text:
      'Angular se ejecuta en el navegador (TypeScript) y no usa PHP: el riesgo está en el servidor que sirve la API y, ' +
      'en su caso, en cualquier proxy o paso de CI/CD con imágenes PHP antiguas. Genera el build de producción y revisa cabeceras.',
    commands: [
      { label: 'Build de producción', code: 'ng build --configuration production' },
      { label: 'Cabeceras de seguridad', code: 'curl -sI https://tu-dominio.com | grep -iE "content-security|x-frame|x-content"' },
    ],
  },
  {
    id: 'vigilar',
    icon: '👁️',
    title: '8. Automatiza la vigilancia futura',
    text:
      'Añade un control de versiones de PHP en el CI, integra logs del WAF y del servidor en tu SIEM, activa monitorización ' +
      'de integridad de archivos y define una política de parcheo mensual. Lo que no se inventaría, no se parchea.',
    commands: [
      { label: 'Ejemplo de control en CI', code: 'php -r \'exit(version_compare(PHP_VERSION, "8.2.35", ">=") ? 0 : 1);\' || echo "PHP desactualizado"' },
    ],
  },
];

export const iocs = [
  {
    icon: '🌐',
    title: 'En los logs del servidor web',
    kind: 'info' as const,
    items: [
      'Peticiones POST multipart/form-data inusuales a endpoints arbitrarios (no solo a formularios de subida).',
      'Presencia del parámetro PHP_SESSION_UPLOAD_PROGRESS en cuerpos de peticiones.',
      'Peticiones con muchas partes o nombres de campo gigantes, diseñadas para forzar agotamiento de memoria.',
      'Picos de errores 500/502/503 o reinicios frecuentes de workers de php-fpm.',
    ],
  },
  {
    icon: '💻',
    title: 'En el sistema operativo',
    kind: 'danger' as const,
    items: [
      'Procesos hijos inesperados del usuario del servidor web (sh, bash, curl, wget) generados por php-fpm/Apache.',
      'Archivos nuevos o modificados en el webroot, storage/ o /tmp (webshells tipo <?php system($_GET[...]).',
      'Tareas cron nuevas, usuarios nuevos o claves SSH añadidas sin autorización.',
      'Conexiones salientes hacia IPs o dominios desconocidos desde el servidor.',
    ],
  },
  {
    icon: '🐘',
    title: 'En la aplicación Laravel',
    kind: 'warn' as const,
    items: [
      'Cuentas administradoras creadas sin explicación o permisos ampliados.',
      'Lecturas masivas de base de datos o exportaciones no previstas.',
      'Errores internos del motor PHP en storage/logs (no errores de la propia aplicación).',
      'Jobs de cola o comandos artisan ejecutados en horarios inusuales.',
    ],
  },
];

export const faqs: FaqItem[] = [
  {
    q: '¿El frontend de Angular también está en peligro?',
    a:
      'No de forma directa. Angular se ejecuta en el navegador como JavaScript/TypeScript y no depende del motor PHP. ' +
      'El riesgo está en el backend Laravel y en cualquier servidor que procese peticiones con PHP. Eso sí: si comprometen ' +
      'el backend, pueden atacar a los usuarios del frontend (datos, sesiones, API), así que proteger PHP protege también la app completa.',
  },
  {
    q: 'Usamos un hosting gestionado (no tenemos acceso al servidor). ¿Qué hacemos?',
    a:
      'Solicita por escrito la versión exacta de PHP y del paquete instalado en tus entornos, y la confirmación de que se ha ' +
      'aplicado el parche de octubre de 2026. Exige un plan de migración si estás en una rama sin soporte. Mientras tanto, ' +
      'activa las protecciones WAF disponibles y vigila tus logs de acceso.',
  },
  {
    q: '¿Basta con tener un firewall (WAF) delante?',
    a:
      'No. El WAF es una mitigación temporal excelente (Cloudflare activó reglas por defecto horas antes del anuncio y bloqueó ' +
      'miles de intentos), pero los atacantes modifican sus tácticas para evadirlo. La única solución real es actualizar PHP.',
  },
  {
    q: '¿Debo rotar la APP_KEY de Laravel?',
    a:
      'Rotala solo si hay indicios de compromiso (o tras confirmar explotación), porque invalida sesiones activas y los datos ' +
      'cifrados con la clave anterior. En caso de duda razonable, es preferible rotarla asumiendo ese coste, junto con credenciales ' +
      'de base de datos, claves de API y secretos del .env.',
  },
  {
    q: '¿Afecta también a cron, colas y CLI de PHP?',
    a:
      'El vector de ataque son peticiones HTTP que llegan al servidor web, pero el binario de PHP es el mismo para CLI, workers ' +
      'de colas y tareas programadas: hay que actualizarlo igualmente para que todo el entorno quede en versión parcheada.',
  },
  {
    q: '¿Por qué se llama php2bash / PHP2Shell?',
    a:
      'Porque el efecto de la vulnerabilidad es convertir una instalación de PHP en una «shell» remota: el atacante pasa de enviar ' +
      'una petición web a ejecutar comandos en el servidor con los permisos del usuario del servidor web (normalmente www-data).',
  },
];

export const references = [
  { label: 'NCSC-NL — Repositorio operativo php2shell', url: 'https://github.com/NCSC-NL/php2shell' },
  { label: 'Cloudflare — Protecciones WAF contra php2shell', url: 'https://blog.cloudflare.com/php-vulnerabilities-waf-protection/' },
  { label: 'watchTowr — FAQ sobre CVE-2026-109618 y CVE-2026-109619', url: 'https://watchtowr.com/intelligence/php-cve-2026-109618-faq/' },
  { label: 'Ubuntu — Parches disponibles para php2shell', url: 'https://ubuntu.com/blog/php2shell-vulnerability-fixes-available' },
  { label: 'Amazon — Explotación detectada antes de la divulgación', url: 'https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/' },
  { label: 'SecurityWeek — Explotación masiva de las fugas', url: 'https://www.securityweek.com/php2shell-mass-exploitation-looms-for-leaked-critical-php-flaws/' },
  { label: 'Universidad de Toronto — Advisory técnico', url: 'https://security.utoronto.ca/advisories/security-advisory-critical-unauthenticated-rce-in-php-php2shell/' },
  { label: 'Wikipedia — PHP2Shell', url: 'https://en.wikipedia.org/wiki/PHP2Shell' },
];
