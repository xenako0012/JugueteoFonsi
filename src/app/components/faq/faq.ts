import { Component, signal } from '@angular/core';
import { faqs, FaqItem } from '../../data/incident.data';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-faq',
  imports: [RevealDirective],
  template: `
    <section class="section section-wash-alt" id="faq">
      <div class="container faq-container">
        <div class="section-head" appReveal>
          <span class="chip chip-primary"><span class="dot"></span>Preguntas frecuentes</span>
          <h2>Dudas <span class="grad-text">rápidas</span></h2>
        </div>

        <div class="faq-list">
          @for (item of items; track item.q; let i = $index) {
            <details class="faq-item card" [attr.open]="openIndex() === i ? '' : null" appReveal>
              <summary (click)="toggle(i, $event)">
                <span class="faq-q">{{ item.q }}</span>
                <span class="faq-icon" aria-hidden="true">{{ openIndex() === i ? '−' : '+' }}</span>
              </summary>
              <p class="faq-a">{{ item.a }}</p>
            </details>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './faq.css',
})
export class Faq {
  protected readonly items: FaqItem[] = faqs;
  protected readonly openIndex = signal<number | null>(0);

  protected toggle(index: number, event: Event): void {
    event.preventDefault();
    this.openIndex.update((current) => (current === index ? null : index));
  }
}
