import { Component, Input } from '@angular/core';

/** Onda dibujada a mano que separa secciones (toque «hecho a mano»). */
@Component({
  selector: 'app-squiggle',
  template: `
    <svg class="squiggle" [style.width.px]="width" viewBox="0 0 280 24" fill="none" aria-hidden="true">
      <path
        d="M4 12 C 18 3, 30 21, 44 12 S 70 3, 84 12 S 110 21, 124 12 S 150 3, 164 12 S 190 21, 204 12 S 230 3, 244 12 S 270 19, 276 11"
        stroke="currentColor"
        stroke-width="3.5"
        stroke-linecap="round"
      />
    </svg>
  `,
})
export class Squiggle {
  @Input() width = 280;
}
