import { Component, signal } from '@angular/core';
import { timeline, TimelineEvent } from '../../data/incident.data';
import { RevealDirective } from '../../shared/reveal.directive';

/**
 * Cronología con estética propia de la informática (estilo «Glitchtype»:
 * papel crema, bordes de tinta, VT323, amarillo voltaje y glitch RGB).
 * Cada evento es un «commit» expandible: sin desplegar solo se lee una línea.
 */
@Component({
  selector: 'app-timeline',
  imports: [RevealDirective],
  template: `
    <section class="section section-tint tl-section" id="cronologia">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="sticker">~/incidente $ git log --follow</span>
          <h2>Cronología <span class="marker">en modo terminal</span></h2>
          <p class="lede">
            El hallazgo nació de una <strong>auditoría del motor de PHP asistida por inteligencia artificial</strong>.
            Lo que siguió fue una carrera entre parches, fugas y atacantes. Pulsa cada evento para ver los detalles.
          </p>
          <p class="annotation"><span class="hand-arrow">↳</span> clic en «detalles» para desplegar cada bloque</p>
        </div>

        <div class="tl-console" appReveal>
          <div class="tl-console-head">
            <span class="tdot tdot-r" aria-hidden="true"></span>
            <span class="tdot tdot-y" aria-hidden="true"></span>
            <span class="tdot tdot-g" aria-hidden="true"></span>
            <span class="tl-console-title">php2shell.log — registro del incidente</span>
            <span class="tl-cursor" aria-hidden="true">█</span>
          </div>

          <div class="tl-toolbar">
            <span class="tl-count">{{ openCount() }}/{{ events.length }} bloques desplegados</span>
            <button class="tl-btn" type="button" (click)="toggleAll()">
              {{ allOpen() ? 'plegar todos −' : 'desplegar todos +' }}
            </button>
          </div>

          <ol class="tl">
            @for (event of events; track event.hash; let i = $index) {
              <li class="tl-item" [class.tl-item-open]="isOpen(i)" appReveal [attr.data-delay]="i % 3">
                <div class="tl-meta">
                  <span class="tl-hash">commit {{ event.hash }}</span>
                  <span class="tl-date">{{ event.date }}</span>
                </div>

                <div class="tl-rail" aria-hidden="true">
                  <span class="tl-node"></span>
                </div>

                <article class="tl-card">
                  <header class="tl-card-head">
                    <span class="chip" [class]="'chip chip-' + event.tagKind">
                      <span class="dot"></span>{{ event.tag }}
                    </span>
                    <button
                      class="tl-btn tl-btn-sm"
                      type="button"
                      (click)="toggle(i)"
                      [attr.aria-expanded]="isOpen(i)"
                    >
                      {{ isOpen(i) ? 'plegar −' : 'detalles +' }}
                    </button>
                  </header>

                  <h3 class="glitch-text" [attr.data-text]="event.title">{{ event.title }}</h3>
                  <p class="tl-short">{{ event.short }}</p>

                  @if (isOpen(i)) {
                    <div class="tl-detail">
                      <p>{{ event.text }}</p>
                    </div>
                  }
                </article>
              </li>
            }
          </ol>

          <div class="tl-foot">
            <span>// fin del registro — {{ events.length }} eventos</span>
          </div>
        </div>

        <div class="tl-note card" appReveal>
          <div class="card-icon warn">💡</div>
          <div>
            <h3>¿Por qué se descubrió justo entonces?</h3>
            <p>
              Las firmas Calif y Wiz auditaron el núcleo de PHP (millones de líneas) con agentes de IA capaces de
              detectar patrones de corrupción de estado invisibles para una revisión manual. El tipo de fallo ayudó:
              errores en la <strong>limpieza tras un agotamiento de memoria</strong> y en el <strong>cierre de
              peticiones</strong>, caminos que rara vez se prueban a fondo. El código vulnerable llevaba ahí desde
              2012, sobreviviendo a varias auditorías.
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
  private readonly open = signal<Set<number>>(new Set([0]));

  protected readonly openCount = () => this.open().size;
  protected readonly allOpen = () => this.open().size === this.events.length;

  protected isOpen(i: number): boolean {
    return this.open().has(i);
  }

  protected toggle(i: number): void {
    this.open.update((set) => {
      const next = new Set(set);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  }

  protected toggleAll(): void {
    this.open.update(() =>
      this.allOpen() ? new Set<number>() : new Set(this.events.map((_, i) => i)),
    );
  }
}
