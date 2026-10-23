import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  inject,
} from '@angular/core';

/**
 * Perseguidor del ratón: un pequeño cargador de arcos orbitando que persigue
 * el cursor con retardo. Los colores salen de las variables del tema activo
 * (--primary / --voltage), así que cambia con el tema elegido.
 *
 * Solo se activa con puntero fino y sin «reduced motion»: en táctil o con
 * sensibilidad al movimiento no se renderiza ningún rastro.
 */
@Component({
  selector: 'app-cursor-follower',
  template: `
    <div class="cf" aria-hidden="true">
      <div class="loader">
        <div class="face">
          <div class="circle"></div>
        </div>
        <div class="face">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './cursor-follower.css',
})
export class CursorFollower implements AfterViewInit, OnDestroy {
  private readonly root = inject<ElementRef<HTMLElement>>(ElementRef);

  private raf = 0;
  private x = -200;
  private y = -200;
  private tx = -200;
  private ty = -200;
  private started = false;

  private readonly onMove = (ev: PointerEvent): void => {
    this.tx = ev.clientX;
    this.ty = ev.clientY;
    if (!this.started) {
      this.started = true;
      this.x = this.tx;
      this.y = this.ty;
      this.root.nativeElement.classList.add('cf-on');
    }
  };

  private readonly onLeave = (): void => {
    this.root.nativeElement.classList.remove('cf-on');
    this.started = false;
  };

  private readonly tick = (): void => {
    this.x += (this.tx - this.x) * 0.16;
    this.y += (this.ty - this.y) * 0.16;
    const cf = this.root.nativeElement.firstElementChild as HTMLElement | null;
    if (cf) {
      cf.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
    }
    this.raf = requestAnimationFrame(this.tick);
  };

  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (calm || !fine) return;

    window.addEventListener('pointermove', this.onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', this.onLeave);
    this.raf = requestAnimationFrame(this.tick);
  }

  ngOnDestroy(): void {
    if (typeof window === 'undefined') return;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('pointermove', this.onMove);
    document.documentElement.removeEventListener('pointerleave', this.onLeave);
  }
}
