import { Component, HostListener, ElementRef, inject, signal } from '@angular/core';
import { ThemeService, ThemeId } from '../../services/theme.service';

/** Selector de tema flotante: claro, oscuro, alto contraste y daltonismos. */
@Component({
  selector: 'app-theme-picker',
  template: `
    <div class="tp-wrap">
      @if (open()) {
        <div class="tp-panel card" role="dialog" aria-label="Elegir tema visual">
          <div class="tp-head">
            <strong>Apariencia</strong>
            <button class="tp-close" type="button" (click)="open.set(false)" aria-label="Cerrar">✕</button>
          </div>
          <p class="tp-hint">
            Elige tema y, si tienes <strong>daltonismo</strong>, el tipo que mejor se adapte a ti.
          </p>
          <div class="tp-grid" role="radiogroup" aria-label="Temas disponibles">
            @for (theme of themes.themes; track theme.id) {
              <button
                type="button"
                class="tp-option"
                role="radio"
                [attr.aria-checked]="themes.current() === theme.id"
                [class.active]="themes.current() === theme.id"
                (click)="pick(theme.id)"
              >
                <span class="tp-swatches" aria-hidden="true">
                  @for (c of theme.swatches; track c) {
                    <i [style.background]="c"></i>
                  }
                </span>
                <span class="tp-label">{{ theme.label }}</span>
                <span class="tp-hint-sm">{{ theme.hint }}</span>
              </button>
            }
          </div>
        </div>
      }

      <button
        class="tp-fab"
        type="button"
        (click)="toggle()"
        [attr.aria-expanded]="open()"
        aria-label="Cambiar apariencia de la página"
        title="Apariencia"
      >
        ◐
      </button>
    </div>
  `,
  styleUrl: './theme-picker.css',
})
export class ThemePicker {
  protected readonly themes = inject(ThemeService);
  private readonly el = inject(ElementRef<HTMLElement>);
  protected readonly open = signal(false);

  protected toggle(): void {
    this.open.update((v) => !v);
  }

  protected pick(id: ThemeId): void {
    this.themes.set(id);
    this.open.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocClick(event: Event): void {
    if (this.open() && !this.el.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    this.open.set(false);
  }
}
