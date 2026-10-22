import { Component, HostListener, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemePicker } from '../theme-picker/theme-picker';

/** Dock flotante: progreso de lectura + botón de volver arriba + selector de tema. */
@Component({
  selector: 'app-scroll-dock',
  imports: [ThemePicker],
  template: `
    <div class="dock">
      @if (showTop()) {
        <button
          class="dock-btn dock-top"
          type="button"
          (click)="toTop()"
          aria-label="Volver al principio de la página"
          title="Volver arriba"
        >
          <svg viewBox="0 0 44 44" class="dock-ring" aria-hidden="true">
            <circle class="dock-ring-bg" cx="22" cy="22" r="18"></circle>
            <circle
              class="dock-ring-fg"
              cx="22"
              cy="22"
              r="18"
              [style.strokeDasharray]="circumference"
              [style.strokeDashoffset]="dashOffset()"
            ></circle>
          </svg>
          <span class="dock-arrow" aria-hidden="true">↑</span>
        </button>
      }
      <app-theme-picker />
    </div>
  `,
  styleUrl: './scroll-dock.css',
})
export class ScrollDock {
  private readonly platformId = inject(PLATFORM_ID);
  protected readonly showTop = signal(false);
  protected readonly progress = signal(0);

  /** Perímetro del círculo del anillo de progreso (r=18). */
  protected readonly circumference = 2 * Math.PI * 18;
  protected readonly dashOffset = () => this.circumference * (1 - this.progress());

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Estado inicial correcto si se recarga a mitad de página.
      queueMicrotask(() => this.onScroll());
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const y = window.scrollY;
    this.showTop.set(y > 400);
    this.progress.set(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
  }

  protected toTop(): void {
    const reduce =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  }
}
