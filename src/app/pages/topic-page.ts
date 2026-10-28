import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { topics, TopicInfo } from '../data/topics.data';
import { RevealDirective } from '../shared/reveal.directive';
import { PageBanner } from '../components/page-banner/page-banner';
import { PhpBasics } from '../components/php-basics/php-basics';
import { Timeline } from '../components/timeline/timeline';
import { IncidentDetail } from '../components/incident-detail/incident-detail';
import { Versions } from '../components/versions/versions';
import { Solutions } from '../components/solutions/solutions';
import { Comprobador } from '../components/comprobador/comprobador';
import { Checklist } from '../components/checklist/checklist';
import { Detection } from '../components/detection/detection';
import { Lessons } from '../components/lessons/lessons';
import { Faq } from '../components/faq/faq';
import { Bibliography } from '../components/bibliography/bibliography';
import { Closing } from '../components/closing/closing';

/**
 * Página de contenido: cada tema tiene su propia ruta y muestra el
 * componente correspondiente, con navegación anterior/siguiente.
 */
@Component({
  selector: 'app-topic-page',
  imports: [
    RouterLink,
    RevealDirective,
    PageBanner,
    PhpBasics,
    Timeline,
    IncidentDetail,
    Versions,
    Solutions,
    Comprobador,
    Checklist,
    Detection,
    Lessons,
    Faq,
    Bibliography,
    Closing,
  ],
  template: `
    <div class="topic-bar container" appReveal>
      <a class="topic-back" routerLink="/">
        <span aria-hidden="true">←</span> Volver al resumen
      </a>
      <span class="chip" [class]="'chip chip-' + topic.chipKind">
        <span class="dot"></span>{{ topic.chip }}
      </span>
    </div>

    @if (topic.banner) {
      <div class="container">
        <app-page-banner
          [src]="topic.banner"
          [alt]="topic.bannerAlt ?? topic.label"
          [tip]="topic.bannerTip ?? ''"
          [side]="topic.bannerSide ?? 'left'"
        />
      </div>
    }

    @switch (topic.kind) {
      @case ('php') { <app-php-basics /> }
      @case ('cronologia') { <app-timeline /> }
      @case ('incidente') { <app-incident-detail /> }
      @case ('versiones') { <app-versions /> }
      @case ('soluciones') { <app-solutions /> }
      @case ('comprobador') { <app-comprobador /> }
      @case ('caso-practico') { <app-checklist /> }
      @case ('deteccion') { <app-detection /> }
      @case ('aspectos') { <app-lessons /> }
      @case ('faq') { <app-faq /> }
      @case ('bibliografia') { <app-bibliography /> }
      @case ('conclusiones') { <app-closing /> }
    }

    <nav class="topic-nav container" aria-label="Navegación entre temas">
      @if (prev; as p) {
        <a class="topic-nav-link" [routerLink]="p.path">
          <small>← Anterior</small>
          <strong>{{ p.label }}</strong>
        </a>
      } @else {
        <span></span>
      }
      <a class="topic-nav-home" routerLink="/">Resumen</a>
      @if (next; as n) {
        <a class="topic-nav-link topic-nav-next" [routerLink]="n.path">
          <small>Siguiente →</small>
          <strong>{{ n.label }}</strong>
        </a>
      } @else {
        <span></span>
      }
    </nav>
  `,
  styleUrl: './topic-page.css',
})
export class TopicPage {
  private readonly route = inject(ActivatedRoute);
  private readonly data = toSignal(this.route.data, {
    initialValue: this.route.snapshot.data as TopicInfo,
  });

  protected get topic(): TopicInfo {
    return this.data() as TopicInfo;
  }

  protected get prev(): TopicInfo | null {
    const i = topics.findIndex((t) => t.path === this.topic.path);
    return i > 0 ? topics[i - 1] : null;
  }

  protected get next(): TopicInfo | null {
    const i = topics.findIndex((t) => t.path === this.topic.path);
    return i >= 0 && i < topics.length - 1 ? topics[i + 1] : null;
  }
}
