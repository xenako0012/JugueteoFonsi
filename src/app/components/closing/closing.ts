import { Component } from '@angular/core';
import { references } from '../../data/incident.data';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-closing',
  imports: [RevealDirective],
  template: `
    <section class="section section-tint" id="conclusiones">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="chip chip-ok"><span class="dot"></span>Conclusiones</span>
          <h2>Lo que nos llevamos de <span class="grad-text">php2bash</span></h2>
        </div>

        <div class="grid grid-3">
          <article class="card concl-card" appReveal data-delay="1">
            <div class="card-icon danger">⚠</div>
            <h3>El motor también falla</h3>
            <p>
              No basta con programar seguro: hay que mantener actualizado el <strong>motor que ejecuta el código</strong>.
              Este incidente lo recordó a toda la industria con un CVSS de 9.2 y 14 años de código vulnerable.
            </p>
          </article>
          <article class="card concl-card" appReveal data-delay="2">
            <div class="card-icon ok">➤</div>
            <h3>La velocidad es la defensa</h3>
            <p>
              Quien actualizó en horas quedó protegido; quien esperó se enfrentó a explotación masiva. Inventario,
              automatización de parches y planes de respuesta probados de antemano marcan la diferencia.
            </p>
          </article>
          <article class="card concl-card" appReveal data-delay="3">
            <div class="card-icon info">◉</div>
            <h3>Verificar es tan importante como parchear</h3>
            <p>
              Comprobar versiones, revisar logs, dejar evidencia y confirmar que el backend Laravel (y con él el
              producto completo, frontend Angular incluido) está protegido: la seguridad se demuestra, no se asume.
            </p>
          </article>
        </div>

        <div class="card refs-card" appReveal>
          <h3>Referencias y fuentes</h3>
          <p class="refs-lede">
            Información contrastada con advisories oficiales y análisis de firmas de seguridad. Recomendamos seguir
            los avisos de <a href="https://www.php.net/" target="_blank" rel="noopener">php.net</a> para futuras
            actualizaciones de seguridad.
          </p>
          <ul class="refs-list">
            @for (ref of refs; track ref.url) {
              <li>
                <a [href]="ref.url" target="_blank" rel="noopener">
                  <span class="refs-arrow">↗</span>
                  {{ ref.label }}
                </a>
              </li>
            }
          </ul>
        </div>
      </div>
    </section>
  `,
  styleUrl: './closing.css',
})
export class Closing {
  protected readonly refs = references;
}
