import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/reveal.directive';

/** Sección «Conoce a tu guía»: la mascota del sitio y su voz personal. */
@Component({
  selector: 'app-guide-intro',
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="section gi">
      <div class="container gi-grid">
        <div class="gi-art" appReveal>
          <img
            class="gi-img"
            src="art/mascota-guia.webp"
            alt="Bit, la mascota del sitio: un personaje chibi abrazando una terminal con el prompt >_"
            loading="lazy"
          />
          <span class="sticker gi-sticker">hola, soy Bit ✦</span>
        </div>

        <div class="gi-copy" appReveal data-delay="1">
          <span class="chip chip-primary"><span class="dot"></span>Conoce a tu guía</span>
          <h2 class="sticker-title">Esta práctica tiene cara propia</h2>
          <p>
            Soy <strong>Bit</strong> y te voy a acompañar por el incidente php2bash. Y esta es
            <strong>Kuro</strong>, mi gatita con aire kuromi (gorro bufón rosa y calaverita incluidos): le
            encantan los gatos… bueno, es un gato, y donde hay huellas suyas hay buena suerte.
          </p>
          <p>
            Este sitio no es un muro de texto: cada tema vive en su página, con resúmenes visuales, comandos
            para copiar y detalles desplegables para leer solo lo que necesites. Empieza por lo básico si PHP
            te suena a chino, o salta directo a la checklist. <strong>Tú eliges el camino.</strong>
          </p>
          <div class="gi-actions">
            <a class="btn btn-primary" routerLink="/php">Empezar por lo básico</a>
            <a class="btn btn-ghost" routerLink="/caso-practico">Ir a la checklist</a>
          </div>
          <p class="cat-mark gi-note">=^..^= Kuro aprueba este mensaje</p>
        </div>
      </div>
    </section>
  `,
  styleUrl: './guide-intro.css',
})
export class GuideIntro {}
