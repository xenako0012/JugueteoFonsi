# JugueteoFonsi — php2bash / PHP2Shell

Sitio web académico construido con **Angular 22** que explica, de forma clara y ordenada, el
incidente de seguridad **php2bash** (conocido internacionalmente como **PHP2Shell**):
CVE-2026-109618 y CVE-2026-109619, dos vulnerabilidades críticas de ejecución remota de código
en el motor de PHP parcheadas el 21 de octubre de 2026.

## Estructura del sitio

La **página principal** es un resumen con el índice interactivo; cada tema vive en su propia ruta:

| Ruta | Contenido |
| --- | --- |
| `/` | Resumen del incidente + índice de contenidos |
| `/php` | PHP básico: qué es y cómo procesa peticiones |
| `/cronologia` | Cronología estilo terminal retro (Glitchtype), expandible |
| `/incidente` | Los dos CVE explicados con pestañas |
| `/versiones` | Versiones afectadas y corregidas |
| `/soluciones` | Parches, mitigaciones de emergencia y WAF |
| `/caso-practico` | Checklist interactiva Twinteach (Angular + Laravel) |
| `/deteccion` | Detección de explotación y respuesta a incidentes |
| `/aspectos` | Otros aspectos y lecciones |
| `/faq` | Preguntas frecuentes |
| `/conclusiones` | Conclusiones y referencias |

## Interfaz

- **Temas de accesibilidad**: claro, oscuro, alto contraste y modos para protanopia,
  deuteranopia, tritanopia y acromatopsia (con tramas de patrón, no solo color). Selector
  persistente en el dock flotante (🎨).
- **Menús interactivos**: mega-menú «Explorar», menú móvil en acordeón e índice visual en la portada.
- **Dock flotante**: anillo de progreso de lectura y botón de volver arriba.
- **Cronología Glitchtype**: componente exclusivo con estética de terminal (VT323, amarillo
  voltaje, glitch RGB) y eventos desplegables.

## Desarrollo

```bash
npm install
ng serve        # http://localhost:4200/
ng build        # compilación (incluye SSR + prerender de las 11 rutas)
ng test         # tests unitarios con Vitest
```

## Nota

Este sitio es una entrega académica informativa (se permite el uso de IA en su elaboración).
Ante un incidente real, sigue siempre los advisories oficiales de PHP y de tu proveedor.
