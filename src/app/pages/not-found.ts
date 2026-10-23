import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../shared/reveal.directive';

/** Página 404: con personalidad del sitio, Kuro incluida. */
@Component({
  selector: 'app-not-found',
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="section nf">
      <div class="container nf-inner">
        <p class="annotation" appReveal>
          <span class="hand-arrow">↳</span> error de navegación · ruta no encontrada
        </p>
        <h1 class="nf-code" appReveal>4<span class="grad-text">0</span>4</h1>
        <p class="lede" appReveal data-delay="1">
          Esta página no existe: puede que el enlace esté anticuado o que la ruta se haya escrito mal.
          Kuro ha mirado dentro de la caja y no había nada… <strong>solo huellas</strong>.
        </p>
        <p class="cat-mark">=^..^= aquí no hay nada que parchear</p>
        <div class="nf-actions" appReveal data-delay="2">
          <a class="btn btn-primary" routerLink="/">Volver a la portada</a>
          <a class="btn btn-ghost" routerLink="/caso-practico">Ir a la checklist</a>
          <a class="btn btn-ghost" routerLink="/faq">Consultar el FAQ</a>
        </div>
      </div>
    </section>
  `,
  styleUrl: './not-found.css',
})
export class NotFound {}
