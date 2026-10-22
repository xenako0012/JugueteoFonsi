import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/reveal.directive';
import { protagonists, Protagonist } from '../../data/protagonists.data';

/** Sección «Los protagonistas del incidente»: banner + fichas de personajes. */
@Component({
  selector: 'app-protagonists',
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="section section-tint pr">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="chip chip-info"><span class="dot"></span>Nueva sección</span>
          <h2 class="sticker-title">Los protagonistas del incidente</h2>
          <p class="lede">
            Detrás de cualquier incidente hay personajes. Estos son los cuatro papeles que se repartieron
            php2bash —y que se repiten en casi todos los fallos de seguridad—.
          </p>
        </div>

        <figure class="pr-banner" appReveal>
          <img
            src="art/banner-protagonistas.webp"
            alt="Tres personajes chibi: una investigadora con lupa y robot, una figura encapuchada con un bicho de peluche y un defensor con escudo y portátil"
            loading="lazy"
          />
        </figure>

        <div class="pr-grid">
          @for (p of cast; track p.name; let i = $index) {
            <article class="card pr-card" appReveal [attr.data-delay]="i % 3">
              <header class="pr-card-head">
                <span class="pr-icon" aria-hidden="true">{{ p.icon }}</span>
                <span class="chip" [class]="'chip chip-' + p.roleKind">
                  <span class="dot"></span>{{ p.role }}
                </span>
              </header>
              <h3>{{ p.name }}</h3>
              <p>{{ p.text }}</p>
            </article>
          }
        </div>

        <p class="annotation pr-annotation" appReveal>
          <span class="hand-arrow">↳</span> cada personaje tiene su detalle completo en
          <a routerLink="/incidente">El incidente</a> y en la <a routerLink="/cronologia">cronología</a>
        </p>
      </div>
    </section>
  `,
  styleUrl: './protagonists.css',
})
export class Protagonists {
  protected readonly cast: Protagonist[] = protagonists;
}
