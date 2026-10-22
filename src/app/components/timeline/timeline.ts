import { Component } from '@angular/core';
import { timeline, TimelineEvent } from '../../data/incident.data';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-timeline',
  imports: [RevealDirective],
  template: `
    <section class="section section-tint" id="cronologia">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="chip chip-info"><span class="dot"></span>¿Por qué se descubrió y cuándo ocurrió?</span>
          <h2>Cronología de un <span class="grad-text">incidente en tres actos</span></h2>
          <p class="lede">
            El hallazgo nació de una <strong>auditoría del motor de PHP asistida por inteligencia artificial</strong>:
            los fallos llevaban ahí desde 2012, escondidos en rutas poco obvias de limpieza de memoria. Lo que siguió
            fue una carrera entre parches, fugas de información y atacantes.
          </p>
        </div>

        <ol class="tl">
          @for (event of events; track event.date; let i = $index) {
            <li class="tl-item" appReveal [attr.data-delay]="i % 3">
              <div class="tl-date">
                <span class="tl-date-text">{{ event.date }}</span>
              </div>
              <div class="tl-dot" [class]="'tl-dot tl-dot-' + event.tagKind" aria-hidden="true"></div>
              <article class="card tl-card">
                <span class="chip" [class]="'chip chip-' + event.tagKind">
                  <span class="dot"></span>{{ event.tag }}
                </span>
                <h3>{{ event.title }}</h3>
                <p>{{ event.text }}</p>
              </article>
            </li>
          }
        </ol>

        <div class="tl-note card" appReveal>
          <div class="card-icon warn">💡</div>
          <div>
            <h3>¿Por qué se descubrió justo entonces?</h3>
            <p>
              Dos factores. Primero, la <strong>presión de la investigación</strong>: las firmas de seguridad Calif y
              Wiz dedicaron equipos a auditar el núcleo de PHP (millones de líneas de código) apoyándose en agentes de
              IA (GPT‑5.6 Sol de OpenAI y Wiz Atlas con Gemini 4 Argon), capaces de detectar patrones de corrupción de
              estado que llevan años sin tocarse. Segundo, el tipo de fallo: errores en la <strong>limpieza tras un
              agotamiento de memoria</strong> y en el <strong>cierre de peticiones</strong>, caminos que rara vez se
              prueban a fondo. El código vulnerable había pasado desapercibido durante 14 años y varias auditorías.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './timeline.css',
})
export class Timeline {
  protected readonly events: TimelineEvent[] = timeline;
}
