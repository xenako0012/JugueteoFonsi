import { Component } from '@angular/core';
import { iocs } from '../../data/incident.data';
import { CodeBlock } from '../../shared/code-block';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-detection',
  imports: [CodeBlock, RevealDirective],
  template: `
    <section class="section section-tint" id="deteccion">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="chip chip-danger"><span class="dot"></span>¿Se ha explotado contra mi sistema?</span>
          <h2>Cómo saber si <span class="grad-text">alguien ya lo aprovechó</span></h2>
          <p class="lede">
            No existe un indicador único. La respuesta combina <strong>revisar logs, el sistema y la aplicación</strong>.
            Un dato importante: se observaron intentos de explotación <strong>desde el 17 de octubre de 2026</strong>,
            cuatro días antes del anuncio, así que hay que mirar hacia atrás, no solo a partir del día del parche.
          </p>
        </div>

        <div class="grid grid-3">
          @for (group of iocGroups; track group.title) {
            <article class="card" appReveal [attr.data-delay]="$index">
              <div class="card-icon" [class]="'card-icon ' + group.kind">{{ group.icon }}</div>
              <h3>{{ group.title }}</h3>
              <ul class="tick-list">
                @for (item of group.items; track item) {
                  <li>
                    <span class="tick" [class]="group.kind === 'danger' ? 'tick danger' : group.kind === 'warn' ? 'tick warn' : 'tick info'">!</span>
                    <span>{{ item }}</span>
                  </li>
                }
              </ul>
            </article>
          }
        </div>

        <div class="det-terminal" appReveal>
          <h3 class="det-title">Comandos de revisión rápida (sobre los logs y el servidor)</h3>
          <app-code-block [code]="huntCommands" />
        </div>

        <div class="grid grid-2 det-next">
          <div class="card det-plan" appReveal data-delay="1">
            <div class="card-icon ok">✓</div>
            <h3>Si sospechas que te han explotado</h3>
            <ul class="tick-list">
              <li><span class="tick ok">1</span><span><strong>Aísla</strong> el servidor afectado, pero <strong>no borres nada</strong>: los logs y la memoria son evidencia.</span></li>
              <li><span class="tick ok">2</span><span><strong>Parchea primero</strong> y restaura desde un <strong>backup limpio</strong> conocido.</span></li>
              <li><span class="tick ok">3</span><span><strong>Rota credenciales</strong>: APP_KEY de Laravel, .env, bases de datos, claves SSH y APIs.</span></li>
              <li><span class="tick ok">4</span><span><strong>Analiza y documenta</strong>: qué robaron, cuándo entraron, qué cambiaron. Si hay datos personales, aplica el protocolo del RGPD.</span></li>
            </ul>
          </div>

          <div class="card det-window" appReveal data-delay="2">
            <div class="card-icon warn">⚠</div>
            <h3>¿Hasta dónde mirar hacia atrás?</h3>
            <p>
              Como mínimo hasta el <strong>17 de octubre de 2026</strong> (primer intento observado públicamente).
              Pero la explotación pudo empezar antes, y el código vulnerable llevaba años disponible: revisa
              <strong>toda la retención de logs</strong> que tengas. Si tus logs no cubren ese periodo, no puedes
              descartar un compromiso previo: actúa con la presunción de riesgo y haz un análisis de compromiso
              (buscar webshells, procesos extraños, accesos anómalos).
            </p>
            <p>
              Recuerda también el consejo de los laboratorios: usa <strong>detectores pasivos</strong> o plantillas de
              escaneo (por ejemplo, la plantilla oficial de nuclei) para verificar versiones, pero
              <strong>nunca lances exploits de RCE contra producción</strong> sin autorización explícita.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './detection.css',
})
export class Detection {
  protected readonly iocGroups = iocs;

  protected readonly huntCommands =
    '# 1. Peticiones multipart sospechosas y session.upload-progress\ngrep -n "PHP_SESSION_UPLOAD_PROGRESS" /var/log/nginx/access.log*\ngrep -cE "POST .* multipart/form-data" /var/log/nginx/access.log\n\n# 2. Errores del motor PHP (OOM, corrupción, caídas de workers)\ngrep -iE "zend_mm|bailout|segfault|Allowed memory size|out of memory" \\\n  /var/log/php*-fpm.log /var/log/apache2/error.log /var/log/nginx/error.log\n\n# 3. Procesos inesperados bajo el usuario del servidor web\nps aux | grep -E "www-data.*(sh|bash|curl|wget)" | grep -v grep\nss -tpn | grep -i php\n\n# 4. Archivos recientes en el código y en storage (webshells)\nfind /var/www/html -name "*.php" -mtime -60 -printf "%T+ %p\\n" | sort\n\n# 5. Persistencia: cron y tareas programadas\ncrontab -l -u www-data\nls -la /var/spool/cron/ 2>/dev/null';
}
