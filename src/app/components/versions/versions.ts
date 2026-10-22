import { Component } from '@angular/core';
import { versions, VersionRow } from '../../data/incident.data';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-versions',
  imports: [RevealDirective],
  template: `
    <section class="section section-tint" id="versiones">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="chip chip-warn"><span class="dot"></span>¿A qué versiones afecta?</span>
          <h2>De PHP 5.4 en 2012 <span class="grad-text">hasta ayer mismo</span></h2>
          <p class="lede">
            El código vulnerable se introdujo en <strong>PHP 5.4 (2012)</strong> y se arrastró durante 14 años.
            Afecta a <strong>toda instalación de PHP que sirva peticiones web</strong> anterior a los parches del
            21 de octubre de 2026 — incluidas las ramas que ya no tienen soporte oficial.
          </p>
        </div>

        <div class="grid grid-3 v-summary">
          <div class="card v-card v-card-danger" appReveal data-delay="1">
            <div class="card-icon danger">⚠️</div>
            <h3>Vulnerables</h3>
            <p>
              Todas las versiones desde <strong>5.4.0</strong> hasta <strong>8.5.11</strong>: PHP-FPM,
              Apache mod_php, php-cgi, FrankenPHP y LiteSpeed. Si sirve la web, entra en la lista.
            </p>
          </div>
          <div class="card v-card v-card-ok" appReveal data-delay="2">
            <div class="card-icon ok">✅</div>
            <h3>Corregidas (21 oct 2026)</h3>
            <p>
              <strong>8.5.12 · 8.4.27 · 8.3.36 · 8.2.35</strong>. Publicadas fuera de banda, 25 minutos antes de lo
              anunciado. Además hay backports de código para 8.1, 8.0 y 7.4 (según la distribución).
            </p>
          </div>
          <div class="card v-card v-card-warn" appReveal data-delay="3">
            <div class="card-icon warn">🕰️</div>
            <h3>Ramas sin soporte (EOL)</h3>
            <p>
              5.x, 7.x y 8.0/8.1 están fuera del soporte oficial: <strong>no recibirán parches de PHP.net</strong>.
              Dependen de los backports de tu distribución o de migrar cuanto antes a 8.2+.
            </p>
          </div>
        </div>

        <div class="v-table-wrap" appReveal>
          <table class="vtable">
            <thead>
              <tr>
                <th>Rama de PHP</th>
                <th>Estado</th>
                <th>Versión segura</th>
                <th>Notas</th>
              </tr>
            </thead>
            <tbody>
              @for (row of rows; track row.branch) {
                <tr>
                  <td><strong>{{ row.branch }}</strong></td>
                  <td>
                    <span class="chip" [class]="'chip chip-' + statusKind(row.status)">
                      <span class="dot"></span>{{ statusLabel(row.status) }}
                    </span>
                  </td>
                  <td><code class="code-inline">{{ row.fixed }}</code></td>
                  <td>{{ row.notes }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <div class="grid grid-2 v-extra">
          <div class="card" appReveal data-delay="1">
            <div class="card-icon danger">🎯</div>
            <h3>El escenario más peligroso: Apache + mod_php</h3>
            <p>
              Los investigadores demostraron el ataque en una petición <strong>sin autenticar</strong> que se resolvía
              <strong>antes de ejecutar el código de la aplicación</strong>. Con php-cgi la exposición también es muy
              alta. Con PHP-FPM el ataque necesita tráfico multipart (por ejemplo, subidas de archivo o
              <span class="code-inline">session.upload_progress</span>), algo tremendamente común.
            </p>
          </div>
          <div class="card" appReveal data-delay="2">
            <div class="card-icon ok">🅰️</div>
            <h3>¿Y el frontend de Angular?</h3>
            <p>
              Angular se compila a JavaScript y corre en el navegador: <strong>no utiliza PHP</strong> y no es
              vulnerable a php2bash. El riesgo está en el <strong>backend Laravel</strong> y en cualquier servicio que
              ejecute PHP. Eso sí, si cae el backend, la aplicación completa (incluida la experiencia Angular) queda
              comprometida: hay que proteger el motor de PHP.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './versions.css',
})
export class Versions {
  protected readonly rows: VersionRow[] = versions;

  protected statusLabel(status: VersionRow['status']): string {
    return { vulnerable: 'Vulnerable', parcheado: 'Parcheado', eol: 'Sin soporte' }[status];
  }

  protected statusKind(status: VersionRow['status']): string {
    return { vulnerable: 'danger', parcheado: 'ok', eol: 'warn' }[status];
  }
}
