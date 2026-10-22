import { Component, Input } from '@angular/core';

/**
 * Banner ilustrado estilo sticker con bocadillo opcional.
 * Las imágenes dejan espacio libre a un lado; `side` sitúa el bocadillo ahí.
 */
@Component({
  selector: 'app-page-banner',
  template: `
    <figure class="pb" [class.pb-flip]="side === 'right'">
      <img class="pb-img" [src]="src" [alt]="alt" loading="lazy" />
      @if (tip) {
        <figcaption class="pb-bubble">
          <span class="pb-bubble-mark" aria-hidden="true">✦</span>
          {{ tip }}
        </figcaption>
      }
    </figure>
  `,
  styleUrl: './page-banner.css',
})
export class PageBanner {
  @Input({ required: true }) src = '';
  @Input({ required: true }) alt = '';
  @Input() tip = '';
  @Input() side: 'left' | 'right' = 'left';
}
