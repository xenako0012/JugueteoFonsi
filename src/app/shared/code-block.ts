import { Component, Input, signal } from '@angular/core';

/** Bloque de código tipo terminal con botón de copiar. */
@Component({
  selector: 'app-code-block',
  template: `
    <div class="code-box">
      <button class="copy-btn" type="button" (click)="copy()" [attr.aria-label]="'Copiar código'">
        {{ copied() ? '¡Copiado!' : 'Copiar' }}
      </button>
      <pre><code>{{ code }}</code></pre>
    </div>
  `,
  styles: [
    `
      .code-box {
        margin-top: 12px;
      }
    `,
  ],
})
export class CodeBlock {
  @Input({ required: true }) code = '';
  protected readonly copied = signal(false);

  protected copy(): void {
    const done = () => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1800);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(this.code).then(done).catch(done);
    } else {
      done();
    }
  }
}
