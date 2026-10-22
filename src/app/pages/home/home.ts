import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Hero } from '../../components/hero/hero';
import { Squiggle } from '../../shared/squiggle';
import { RevealDirective } from '../../shared/reveal.directive';
import { topicGroups, TopicInfo } from '../../data/topics.data';

/**
 * Página principal resumida: una vista general del incidente y un menú
 * visual que lleva a cada página de contenido.
 */
@Component({
  selector: 'app-home',
  imports: [RouterLink, Hero, Squiggle, RevealDirective],
  template: `
    <app-hero />

    <!-- resumen express -->
    <section class="section home-summary">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="chip chip-danger"><span class="dot"></span>El incidente en 30 segundos</span>
          <h2>PHP se convirtió en <span class="grad-text">una shell remota</span></h2>
          <p class="lede">
            En octubre de 2026 se hicieron públicas dos vulnerabilidades críticas en el motor de PHP
            (<strong>CVE-2026-109618</strong> y <strong>CVE-2026-109619</strong>). Cualquier servidor con PHP
            vulnerable podía ejecutar comandos de un atacante sin iniciar sesión. El parche llegó el 21 de octubre;
            la explotación masiva, horas después.
          </p>
        </div>

        <div class="home-actions" appReveal>
          <a class="btn btn-primary" routerLink="/php">Empezar por lo básico</a>
          <a class="btn btn-ghost" routerLink="/caso-practico">Ir a la checklist</a>
        </div>
        <p class="annotation home-annotation" appReveal>
          <span class="hand-arrow">↳</span> cada tema vive en su propia página: elige por dónde entrar
        </p>
      </div>
    </section>

    <app-squiggle [width]="220" />

    <!-- menú visual de contenidos -->
    <section class="section home-menu">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="chip chip-primary"><span class="dot"></span>Índice interactivo</span>
          <h2>¿Por dónde quieres <span class="marker">empezar</span>?</h2>
        </div>

        @for (group of groups; track group.title; let g = $index) {
          <div class="home-group" appReveal [attr.data-delay]="g">
            <h3 class="home-group-title">
              <span class="home-group-rule" aria-hidden="true"></span>
              {{ group.title }}
            </h3>
            <div class="home-grid">
              @for (topic of group.items; track topic.path) {
                <a class="home-card card" [routerLink]="topic.path">
                  <span class="home-card-icon" aria-hidden="true">{{ topic.icon }}</span>
                  <h4>{{ topic.label }}</h4>
                  <p>{{ topic.desc }}</p>
                  <span class="home-card-go">Abrir página →</span>
                </a>
              }
            </div>
          </div>
        }
      </div>
    </section>

    <!-- cta final -->
    <section class="section home-cta">
      <div class="container">
        <div class="home-cta-box" appReveal>
          <div>
            <span class="sticker">para entregar 📚</span>
            <h2>¿Tu stack es Angular + Laravel?</h2>
            <p>
              La checklist del caso práctico recorre los 8 pasos para comprobar que el backend está protegido,
              con comandos listos para copiar y marcar a medida que avanzas.
            </p>
          </div>
          <a class="btn btn-primary" routerLink="/caso-practico">Abrir la checklist</a>
        </div>
      </div>
    </section>
  `,
  styleUrl: './home.css',
})
export class Home {
  protected readonly groups = topicGroups;
}
