# JugueteoFonsi — php2bash / PHP2Shell

Sitio web académico construido con **Angular 22** que explica, de forma clara y ordenada, el
incidente de seguridad **php2bash** (conocido internacionalmente como **PHP2Shell**):
CVE-2026-109618 y CVE-2026-109619, dos vulnerabilidades críticas de ejecución remota de código
en el motor de PHP parcheadas el 21 de octubre de 2026.

## Contenido del sitio

1. **PHP básico** — qué es PHP, cómo procesa una petición y por qué un fallo del motor afecta a todas las apps.
2. **Cronología** — por qué se descubrió (auditoría asistida por IA), cuándo ocurrió y cómo evolucionó.
3. **El incidente** — en qué consisten los dos CVE (corrupción por OOM y use-after-free), impacto real.
4. **Versiones afectadas** — de PHP 5.4 (2012) a 8.5.11; versiones corregidas y ramas sin soporte.
5. **Soluciones** — parcheo, mitigaciones de emergencia, WAF, endurecimiento y verificación.
6. **Caso práctico Twinteach (Angular + Laravel)** — checklist interactiva paso a paso con comandos.
7. **Detección** — cómo saber si alguien explotó la vulnerabilidad y qué hacer si sospechas.
8. **Otros aspectos, FAQ, conclusiones y referencias**.

## Desarrollo

Para iniciar el servidor de desarrollo local:

```bash
npm install
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`. Se recarga automáticamente al
modificar los archivos fuente.

## Compilación

```bash
ng build
```

Los artefactos de compilación se generan en el directorio `dist/`. El proyecto incluye soporte
SSR (renderizado en servidor) con `@angular/ssr`.

## Tests

```bash
ng test
```

Ejecuta las pruebas unitarias con [Vitest](https://vitest.dev/).

## Nota

Este sitio es una entrega académica informativa (se permite el uso de IA en su elaboración).
Ante un incidente real, sigue siempre los advisories oficiales de PHP y de tu proveedor.
