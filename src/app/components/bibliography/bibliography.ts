import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/reveal.directive';
import { bibliography, BiblioGroup } from '../../data/bibliography.data';

/** Página de bibliografía: fuentes anotadas de la información del sitio. */
@Component({
  selector: 'app-bibliography',
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="section">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="chip chip-info"><span class="dot"></span>Fuentes del proyecto</span>
          <h2>De dónde sale <span class="grad-text">cada dato</span></h2>
          <p class="lede">
            Toda la información de este sitio tiene un origen concreto. Aquí está la bibliografía
            completa, con una nota de qué aporta cada fuente a las páginas del sitio.
          </p>
        </div>

        @for (group of groups; track group.title; let gi = $index) {
          <section class="bl-group" appReveal [attr.data-delay]="gi % 3">
            <header class="bl-group-head">
              <span class="chip" [class]="'chip chip-' + chipKinds[gi]">
                <span class="dot"></span>{{ group.kind }}
              </span>
              <h3>{{ group.title }}</h3>
              <p class="bl-group-lede">{{ group.lede }}</p>
            </header>

            <ol class="bl-list">
              @for (e of group.entries; track e.url; let i = $index) {
                <li class="card bl-item">
                  <div class="bl-item-head">
                    <span class="bl-num">{{ pad(gi * 10 + i + 1) }}</span>
                    <a class="bl-label" [href]="e.url" target="_blank" rel="noopener noreferrer">
                      {{ e.label }} <span class="bl-ext" aria-hidden="true">↗</span>
                    </a>
                  </div>
                  <p class="bl-note">{{ e.note }}</p>
                  <code class="bl-url">{{ e.url }}</code>
                </li>
              }
            </ol>
          </section>
        }

        <p class="annotation bl-foot" appReveal>
          <span class="hand-arrow">↳</span> las URLs también están disponibles en la
          <a routerLink="/conclusiones">página de conclusiones</a>, en formato de checklist rápida.
        </p>
        <p class="cat-mark">=^..^= Kuro verifica las fuentes una por una</p>
      </div>
    </section>
  `,
  styleUrl: './bibliography.css',
})
export class Bibliography {
  protected readonly groups: BiblioGroup[] = bibliography;
  protected readonly chipKinds = ['danger', 'primary', 'info'];

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}
