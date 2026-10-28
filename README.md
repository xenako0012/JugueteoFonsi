# JugueteoFonsi — php2bash / PHP2Shell

> Práctica web sobre el **incidente php2bash (PHP2Shell)**: dos vulnerabilidades críticas en el motor de PHP (octubre de 2026) que permitían ejecutar comandos en el servidor sin iniciar sesión. El sitio explica el incidente de principio a fin —empezando por los fundamentos de PHP— con herramientas interactivas para comprobar y jugar.

**Stack:** Angular 22 (SSR + prerender) · TypeScript estricto · CSS propio sin frameworks · Vitest.

---

## 1. Qué es este sitio

Es una **práctica de clase**: un sitio multipágina que documenta el incidente php2bash con un enfoque pedagógico:

- **Empieza por lo básico** (qué es PHP, cómo ejecuta código) antes de entrar al incidente.
- **Una idea, un componente**: cada tema vive en su propia página; nada de muros de texto.
- **Interactivo y verificable**: checklists con progreso, comprobador de riesgo, cronología desplegable, terminal CSS jugable.
- **Estética propia**: no parece una plantilla ni un documento de IA — tiene personajes (Bit y Kuro), collage retro, pegatinas y un sistema tipográfico de símbolos sin emojis.

### El incidente en dos líneas

`php2bash` = **PHP2Shell** = **CVE-2026-109618** (corrupción de memoria vía multipart) + **CVE-2026-109619** (use-after-free con `session.upload_progress`). PHP 5.4.0–8.5.11 afectado; parches el 21 de octubre de 2026 (8.5.12 / 8.4.27 / 8.3.36 / 8.2.35). RCE sin autenticación como `www-data`.

---

## 2. Información: las páginas

La portada es un **resumen** con índice interactivo; cada tema se despliega a su propia página (13 rutas + 404):

| Ruta | Página | Qué contiene |
|---|---|---|
| `/` | Portada | Hero, resumen en 30 segundos, guía (Bit y Kuro), protagonistas, sala de máquinas, zona técnica (rack de modos) índice y CTA |
| `/php` | Fundamentos de PHP | Qué es PHP, cómo ejecuta código, SAPI (mod_php/FPM/CGI), sesiones y `session.upload_progress` |
| `/cronologia` | Cronología | Componente Glitchtype con el timeline desplegable del incidente (julio → octubre 2026) |
| `/incidente` | El incidente | Qué falló exactamente, el flujo de ataque, el coste y la velocidad |
| `/versiones` | Versiones | Quién estaba afectado (5.4.0–8.5.11), versiones corregidas y comparación de SAPI |
| `/soluciones` | Soluciones | Parches oficiales, mitigaciones de emergencia y WAF con virtual patching |
| `/comprobador` | Comprobador | **Formulario de diagnóstico** en 5 preguntas con veredicto en vivo (☠ ⚑ ✓) |
| `/caso-practico` | Caso práctico | **Checklist Twinteach** (Angular + Laravel): 8 pasos con comandos copiables y progreso guardado |
| `/deteccion` | Detección | Cómo saber si te han explotado: logs, sistema, aplicación y respuesta a incidentes |
| `/aspectos` | Otros aspectos | El papel de la IA en el descubrimiento, divulgación coordinada, defensa en profundidad |
| `/faq` | FAQ | Dudas frecuentes en formato pregunta/respuesta |
| `/bibliografia` | Bibliografía | **De dónde sale cada dato**: fuentes anotadas (incidente, fondos técnicos, diseño) |
| `/conclusiones` | Conclusiones | Cierre de la práctica, pruebas de verificación y fuentes |
| `*` | 404 | Página de error con personalidad (Kuro incluida) |

Cada página tiene **título de documento propio**, banner ilustrado (en varias), navegación *anterior/siguiente* y su componente exclusivo.

---

## 3. Apariencia y sistema visual

### Estética

Dos registros mezclados con criterio:

- **Collage editorial retro** (crema, rojo ladrillo, verde salvia, tramas de semitono, papel rasgado) para los **carteles con tipografía integrada**: los titulares de cada sección van *dentro* de la imagen, no encima.
- **Pegatinas chibi** (bordes blancos gruesos, contornos navy, destellos, nubes, huellas de gato) para los personajes: **Bit** (la mascota, abraza una terminal `>_`) y **Kuro** (gatita negra con gorro bufón rosa y calaverita, guiño a la estética *kuromi*).

Los carteles viven en `public/art/` (PNG originales + WebP optimizados 50–320 KB).

### Tipografías (5, enlazadas en `index.html`)

| Fuente | Uso |
|---|---|
| **Bricolage Grotesque** | Display: titulares grandes y portada |
| **Plus Jakarta Sans** | Texto corrido y títulos formales (cronología) |
| **JetBrains Mono** | Código, comandos, etiquetas mono, marcas de gato |
| **VT323** | Terminal retro de la cronología (cursor, detalles Glitchtype) |
| **Caveat** | Anotaciones manuscritas (flechas `↳`, notas personales) |

### Sistema de símbolos (sin emojis)

Toda la iconografía es **tipográfica**, coherente con la estética «de entorno técnico»:

| Símbolo | Significado | Símbolo | Significado |
|---|---|---|---|
| `$_` | Fundamentos PHP | `☑` | Caso práctico |
| `~$` | Cronología | `◉` | Detección |
| `⚠` | El incidente | `✦` | Otros aspectos |
| `#` | Versiones | `?` | FAQ |
| `✚` | Soluciones | `✎` | Bibliografía |
| `⚖` | Comprobador | `∎` | Conclusiones |
| `☠` | Explotación / riesgo | `✓` | Verificado |
| `⚑` | Mitigación | `◐` | Apariencia |
| `=^..^=` | Marca de gato (Kuro) | `↰` | Anotaciones |

Los iconos de tarjeta son *tiles* mono en cuadros redondeados (`.card-icon`) y las secciones llevan textura de puntos (`.section-tint`).

---

## 4. Temas y accesibilidad cromática

**7 temas** conmutables desde el dock flotante (`◐ Apariencia`) y aplicados con `data-theme` en `<html>`; el tema se guarda en `localStorage` (`p2b-theme`) y se aplica **antes del primer pintado** (sin parpadeos):

| Tema | Para quién |
|---|---|
| `claro` | Por defecto (papel crema / tinta cálida) |
| `oscuro` | Modo noche |
| `alto-contraste` | Máximo contraste (negro puro / amarillo) |
| `protanopia` | Daltonismo rojo-verde (tipo 1) |
| `deuteranopia` | Daltonismo rojo-verde (tipo 2) |
| `tritanopia` | Daltonismo azul-amarillo |
| `acromatopsia` | Visión en escala de grises |

Los temas cambian variables CSS (`--paper`, `--ink`, `--primary`, `--voltage`…); los objetos con identidad propia (terminal de la sala de máquinas, marcadores ninja) mantienen su paleta estable. Los colores de acento se mezclan con la tinta del tema (`color-mix`) para conservar el contraste en todos ellos.

---

## 5. Navegación

- **Mega-menú** con los temas agrupados (Fundamentos · Protección · Recursos), generado desde `topics.data.ts` (fuente única).
- **Índice interactivo** en la portada (tarjetas → cada página).
- **Navegación anterior/siguiente** al pie de cada página de tema.
- **Dock flotante** (abajo a la derecha): anillo de progreso de lectura + volver arriba + selector de tema.
- **Skip link** «Saltar al contenido» para teclado/lectores de pantalla.
- **Enlace «Volver al resumen»** en la barra superior de cada tema.
- **404** con rutas de escape.

---

## 6. Interacciones y «jueguetes»

| Interacción | Dónde | Qué hace |
|---|---|---|
| **Checklist ninja** | `/caso-practico` | Marcadores con aspas giratorias y núcleo estelar pulsante; progreso (contador, %, persistencia) y reinicio |
| **Comprobador** | `/comprobador` | Formulario de 5 preguntas → veredicto en vivo (riesgo alto / mitigado / protegido) con pasos recomendados |
| **Sala de máquinas** | Portada | Servidor SVG isométrico flotante con sliders que escriben **CSS en vivo** (`--bounce-h`, `--float-speed`, LED…), modos parcheado/explotación y copia del código generado |
| **Rack de modos (zona técnica)** | Portada | Reproductor retro estilo Winamp donde cada «pista» es un modo de servidor (FPM, mod_php, CGI/LiteSpeed): LED, ecualizador y ficha técnica reaccionan a la estación elegida |
| **Perseguidor del ratón** | Global | Arcos orbitantes que persiguen el cursor (colores del tema activo; desactivado en táctil y con `prefers-reduced-motion`) |
| **Cronología Glitchtype** | `/cronologia` | Timeline de consola con eventos desplegables, filtros y botón «abrir ficha» |
| **Bloques de código** | Varios | Comandos con botón de copiar |
| **Reveal on scroll** | Global | Aparición progresiva de secciones (`appReveal`) |
| **Selector de tema** | Dock | Cambia entre los 7 temas al instante |

---

## 7. Arquitectura técnica

```
src/
├── app/
│   ├── components/        # 22 componentes, uno por cosa
│   │   ├── nav/  hero/  guide-intro/  protagonists/  machine-room/
│   │   ├── timeline/  incident-detail/  versions/  solutions/
│   │   ├── comprobador/  checklist/  detection/  lessons/  faq/
│   │   ├── bibliography/  closing/  page-banner/  php-basics/
│   │   ├── cursor-follower/  scroll-dock/  theme-picker/  footer/
│   ├── pages/             # home (resumen), topic-page (shell de tema), not-found (404)
│   ├── data/              # topics.data.ts (catálogo/rutas/menús),
│   │                      # incident.data.ts (contenido), bibliography.data.ts
│   ├── shared/            # code-block, squiggle, reveal.directive
│   ├── app.routes.ts      # 13 rutas + 404, títulos por página
│   └── app.html           # shell: skip-link, nav, main, footer, dock, cursor
├── styles.css             # 7 temas, primitivas (.card, .btn, .chip, .sticker…) y utilidades
public/art/                # carteles collage (PNG + WebP)
```

**Decisiones relevantes:**

- **Datos centralizados**: `topics.data.ts` alimenta rutas, mega-menú, índice de portada y navegación prev/next — añadir una página es un objeto de datos + un caso en el `@switch`.
- **SSR + prerender** de las 13 rutas (mejor SEO y carga inicial); `localStorage` y `matchMedia` protegidos con guards (seguros en servidor y en jsdom).
- **Angular estricto**: sin `any`, handlers tipados, señales (`signal`/`computed`) para estado local.
- **Tests** (Vitest): 7 en verde — shell, navegación y una regresión que impide desenchufar los widgets de la shell (NG8113).
- **Build**: `fonts.inline: false` (el sandbox bloquea la descarga de fuentes), `allowedHosts: true` para previews.

---

## 8. Cómo ejecutar

```bash
npm install
npm start          # dev server → http://localhost:4200
npm test           # 7 tests (Vitest)
npm run build      # build de producción con prerender (dist/)
```

---

## 9. Accesibilidad, responsive y rendimiento

- **Responsive**: grids que colapsan a una columna (<1024px / <680px), tipografía fluida (`clamp`), controles táctiles grandes.
- **Accesibilidad**: skip link, `aria-label` en controles, `aria-live` en el veredicto del comprobador, foco visible (`:focus-visible`), semántica de formulario real (fieldset/legend, checkbox nativos), contraste revisado en los 7 temas, `prefers-reduced-motion` respetado (cursor, ninja, glitch).
- **Impresión**: `@media print` limpia navegación, dock y paneles de control para entregar la práctica en papel.
- **Rendimiento**: imágenes WebP optimizadas, `loading="lazy"` en banners, fuentes enlazadas (no bloqueantes), sin frameworks CSS.

---

## 10. Bibliografía y recursos

### El incidente (de dónde salen los datos)

1. **watchTowr — FAQ CVE-2026-109618 / CVE-2026-109619** — [watchtowr.com](https://watchtowr.com/intelligence/php-cve-2026-109618-faq/) — análisis técnico de las dos fallas, criticidad y cronología del descubrimiento.
2. **NCSC-NL — Repositorio operativo php2shell** — [github.com/NCSC-NL/php2shell](https://github.com/NCSC-NL/php2shell) — IOCs, reglas de detección y guía de respuesta (base de la página de detección).
3. **Cloudflare — Protecciones WAF** — [blog.cloudflare.com](https://blog.cloudflare.com/php-vulnerabilities-waf-protection/) — telemetría de la explotación masiva y virtual patching por defecto.
4. **Amazon Security — MadPot** — [aws.amazon.com](https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/) — primeras señales de explotación (17 de octubre, antes de la divulgación).
5. **SecurityWeek — Explotación masiva** — [securityweek.com](https://www.securityweek.com/php2shell-mass-exploitation-looms-for-leaked-critical-php-flaws/) — la fuga del 20 de octubre, la PoC del 21 y la explotación masiva.
6. **Universidad de Toronto — Advisory técnico** — [security.utoronto.ca](https://security.utoronto.ca/advisories/security-advisory-critical-unauthenticated-rce-in-php-php2shell/) — resumen de impacto y acciones inmediatas.
7. **Ubuntu — Parches de distribución** — [ubuntu.com](https://ubuntu.com/blog/php2shell-vulnerability-fixes-available) — backports vía gestor de paquetes.
8. **Wikipedia — PHP2Shell** — [en.wikipedia.org](https://en.wikipedia.org/wiki/PHP2Shell) — cronología general (consulta de apoyo).

### Fondos técnicos

9. **PHP.net — manual y avisos oficiales** — [php.net](https://www.php.net/) — fundamentos del lenguaje, `session.upload_progress`, SAPI y notas de las versiones corregidas.
10. **GitHub Advisories** — [GHSA-w8hw-w9fx-j79w](https://github.com/advisories/GHSA-w8hw-w9fx-j79w) · GHSA-6wmf-4rv5-p3rp — fichas oficiales de las dos CVE.

### Recursos de diseño (inspiraciones sueltas de Uiverse.io)

11. **Uiverse — kit «Glitchtype»** — [uiverse.io](https://uiverse.io/ui-kits/bad-dolphin-14-186e4d54) — estilo de la cronología (terminal retro, papel crema, amarillo voltaje).
12. **Uiverse — «Radio» de adamgiebl** — [uiverse.io](https://uiverse.io/adamgiebl/hard-vampirebat-36) — radios skeuomórficos con neón → rack de modos de la zona técnica.
13. **Uiverse — «Checkbox estrella» de andrew-demchenk0** — [uiverse.io](https://uiverse.io/andrew-demchenk0/light-lionfish-40) — estrella que se enciende al marcar → marcadores ninja de la checklist.
14. **Uiverse — «Radio glitch» de andrew-demchenk0** — [uiverse.io](https://uiverse.io/andrew-demchenk0/pink-dragon-17) — ambiente glitch/ciber → acentos con aberración.
15. **Uiverse — «Ninja loader» de JaydipPrajapati1910** — [uiverse.io](https://uiverse.io/JaydipPrajapati1910/spicy-eel-83) — estrellas ninja giratorias → aire ninja de los marcadores.
16. **Uiverse — «Loader neón» de mrhyddenn** — [uiverse.io](https://uiverse.io/mrhyddenn/average-dodo-53) — anillo neón en órbita → perseguidor del ratón.
17. **Piliapp — símbolos** — [es.piliapp.com/symbol](https://es.piliapp.com/symbol/) — inventario de símbolos tipográficos del sitio.

> La misma bibliografía, anotada, está en la web: **`/bibliografia`** (apartado de Recursos).

---

## Nota

Práctica académica con fines educativos. Los personajes Bit y Kuro y el diseño son originales del proyecto; los datos del incidente proceden de las fuentes citadas. Hecho con cariño — y con huellas de gato.
