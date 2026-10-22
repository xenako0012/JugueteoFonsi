import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

interface Lesson {
  icon: string;
  kind: 'primary' | 'danger' | 'warn' | 'ok' | 'info';
  title: string;
  text: string;
}

@Component({
  selector: 'app-lessons',
  imports: [RevealDirective],
  template: `
    <section class="section section-wash" id="aspectos">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="chip chip-info"><span class="dot"></span>Otros aspectos importantes</span>
          <h2>Lo que este incidente <span class="grad-text">nos deja claro</span></h2>
          <p class="lede">
            Más allá de los parches, php2bash / PHP2Shell enseña lecciones que van de la gestión de inventarios al
            papel de la inteligencia artificial en la ciberseguridad.
          </p>
        </div>

        <div class="grid grid-3">
          @for (lesson of lessons; track lesson.title; let i = $index) {
            <article class="card" appReveal [attr.data-delay]="i % 3">
              <div class="card-icon" [class]="'card-icon ' + lesson.kind">{{ lesson.icon }}</div>
              <h3>{{ lesson.title }}</h3>
              <p>{{ lesson.text }}</p>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class Lessons {
  protected readonly lessons: Lesson[] = [
    {
      icon: '★',
      kind: 'primary',
      title: 'PHP mueve gran parte de internet',
      text:
        'Se estima que PHP impulsa alrededor del 70% de los sitios web con lenguaje de servidor conocido: WordPress, ' +
        'Drupal, Joomla, Moodle, Laravel… Por eso un fallo del motor es un incidente global, no un problema local.',
    },
    {
      icon: '⌘',
      kind: 'info',
      title: 'La IA, coprotagonista del hallazgo',
      text:
        'Los descubridores usaron agentes de IA (GPT‑5.6 Sol, Wiz Atlas con Gemini 4 Argon) para auditar millones de ' +
        'líneas. Es una doble filo: la misma capacidad estará al alcance de los atacantes. La velocidad de defensa ' +
        'importará más que nunca.',
    },
    {
      icon: '☠',
      kind: 'danger',
      title: 'La ventana de «seguridad por oscuridad» ya no existe',
      text:
        'Hubo intentos de explotación cuatro días antes del anuncio público y PoC 12 horas antes del embargo. ' +
        'Asumir que nadie sabe de un fallo hasta que se publica es un error: monitoriza siempre.',
    },
    {
      icon: '✉',
      kind: 'warn',
      title: 'La divulgación coordinada es frágil',
      text:
        'Los advisories se publicaron 26 minutos antes de lo anunciado y los detalles circularon antes de tiempo. ' +
        'Lección para fabricantes y equipos: tener el parche y el plan de comunicación listos antes del anuncio ' +
        '(«pre-patching»), y a los usuarios: prepararse para parchear en horas, no en semanas.',
    },
    {
      icon: '✚',
      kind: 'ok',
      title: 'Defensa en profundidad: el WAF compra tiempo, el parche cura',
      text:
        'Las reglas de Cloudflare bloquearon miles de intentos, pero los atacantes cambiaron tácticas para evadirse. ' +
        'WAF, segmentación de red, mínimo privilegio y monitorización son capas necesarias; ninguna sustituye a la ' +
        'actualización del motor.',
    },
    {
      icon: '☰',
      kind: 'primary',
      title: 'No se parchea lo que no se inventaría',
      text:
        'Contenedores olvidados, entornos de staging, imágenes de CI… El primer paso de cualquier plan de respuesta ' +
        'es un inventario completo de versiones de PHP. La gestión de parches y la cadena de suministro (paquetes de ' +
        'distribución, imágenes Docker, hosting gestionado) son parte de la seguridad, no un trámite.',
    },
  ];
}
