import { Component } from '@angular/core';
import { CodeBlock } from '../../shared/code-block';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-solutions',
  imports: [CodeBlock, RevealDirective],
  template: `
    <section class="section section-wash" id="soluciones">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="chip chip-ok"><span class="dot"></span>¿Qué soluciones existen?</span>
          <h2>La receta es simple: <span class="grad-text">parchear, mitigar y vigilar</span></h2>
          <p class="lede">
            El parche oficial es la <strong>única solución definitiva</strong>. Todo lo demás (WAF, configuración,
            endurecimiento) compra tiempo y reduce el riesgo, pero no elimina la vulnerabilidad.
          </p>
        </div>

        <div class="sol-grid">
          <article class="card sol-card sol-urgent" appReveal data-delay="1">
            <div class="sol-num">1</div>
            <h3>Actualiza PHP hoy mismo</h3>
            <p>
              Sube a <strong>8.2.35 / 8.3.36 / 8.4.27 / 8.5.12</strong> o superior. Usa los paquetes oficiales de tu
              distribución o imágenes de contenedor oficiales actualizadas, y <strong>reinicia php-fpm/Apache</strong>
              (si no, el proceso vulnerable sigue en memoria).
            </p>
            <app-code-block [code]="patchCommands" />
          </article>

          <article class="card sol-card" appReveal data-delay="2">
            <div class="sol-num">2</div>
            <h3>Mitigaciones de emergencia</h3>
            <p>
              Si no puedes parchear aún, reduce la superficie de ataque. La ruta más utilizada por los atacantes abusa
              de <span class="code-inline">session.upload_progress</span>, activado por defecto:
            </p>
            <app-code-block [code]="mitigationCommands" />
          </article>

          <article class="card sol-card" appReveal data-delay="3">
            <div class="sol-num">3</div>
            <h3>WAF: un cortafuegos de aplicaciones</h3>
            <p>
              Cloudflare y similares desplegaron reglas virtuales horas antes del anuncio y bloquearon miles de
              intentos. Útil como paraguas inmediato (incluso en plan gratuito), pero los atacantes adaptan sus
              tácticas para evadirlo: <strong>es un puente, no el destino</strong>.
            </p>
          </article>

          <article class="card sol-card" appReveal data-delay="1">
            <div class="sol-num">4</div>
            <h3>Endurecimiento permanente</h3>
            <ul class="tick-list">
              <li><span class="tick ok">✓</span><span>Permisos mínimos: pool de php-fpm con usuario propio y sin acceso de escritura al código.</span></li>
              <li><span class="tick ok">✓</span><span>Restringir funciones peligrosas (<span class="code-inline">exec</span>, <span class="code-inline">system</span>…) y activar <span class="code-inline">open_basedir</span>.</span></li>
              <li><span class="tick ok">✓</span><span>Filtrado de conexiones salientes desde el servidor web y monitorización de integridad de archivos.</span></li>
              <li><span class="tick ok">✓</span><span>Política de parcheo con plazos máximos y alertas cuando una versión queda obsoleta.</span></li>
            </ul>
          </article>

          <article class="card sol-card" appReveal data-delay="2">
            <div class="sol-num">5</div>
            <h3>Si estás en una rama sin soporte (EOL)</h3>
            <p>
              PHP ya no publica parches para 5.x/7.x/8.0/8.1: tus opciones son los <strong>backports de tu
              distribución</strong> (Ubuntu, Debian, Alma…) o, preferiblemente, <strong>migrar a PHP 8.2+</strong>.
              Un framework como Laravel moderno ya lo exige: planifica la migración si aún no lo has hecho.
            </p>
          </article>

          <article class="card sol-card sol-highlight" appReveal data-delay="3">
            <div class="sol-num">6</div>
            <h3>Verificación y evidencia</h3>
            <p>
              Tras parchear, deja constancia: salida de <span class="code-inline">php -v</span> en cada nodo, fecha
              del despliegue, resultados de las pruebas de humo y confirmación del proveedor si el hosting es
              gestionado. En un incidente real, demostrar cuándo quedaste protegido es tan importante como protegerte.
            </p>
          </article>
        </div>
      </div>
    </section>
  `,
  styleUrl: './solutions.css',
})
export class Solutions {
  protected readonly patchCommands =
    '# Debian / Ubuntu\nsudo apt update && sudo apt install --only-upgrade "php*"\nsudo systemctl restart php*-fpm nginx\n\n# RHEL / Alma / Rocky\nsudo dnf update php*\nsudo systemctl restart php-fpm nginx\n\n# Verificación\nphp -v   # debe mostrar >= 8.2.35 / 8.3.36 / 8.4.27 / 8.5.12';

  protected readonly mitigationCommands =
    '; php.ini (o en el pool de php-fpm)\nsession.upload_progress.enabled = Off\n\n; endurecimiento adicional\ndisable_functions = exec,passthru,shell_exec,system\nexpose_php = Off';
}
