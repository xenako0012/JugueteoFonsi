import { Component, computed, signal } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

/**
 * «La sala de máquinas»: servidor isométrico animado que se puede toquetear.
 * Los controles escriben variables CSS en vivo sobre el SVG y el panel muestra
 * el código resultante, como un mini playground de CSS.
 */
@Component({
  selector: 'app-machine-room',
  imports: [RevealDirective],
  templateUrl: './machine-room.html',
  styleUrl: './machine-room.css',
})
export class MachineRoom {
  /** Altura del salto en px (se aplica negativa hacia arriba). */
  protected readonly bounceH = signal(20);
  /** Duración de la flotación en segundos. */
  protected readonly floatSpeed = signal(4);
  /** Duración del parpadeo de los LED en segundos. */
  protected readonly strobeSpeed = signal(0.8);
  /** Color del LED en modo seguro. */
  protected readonly ledSafe = signal('#17e300');
  /** Color del LED caliente (modo explotación). */
  protected readonly ledHot = signal('#ff5f4a');

  protected readonly mode = signal<'seguro' | 'ataque'>('seguro');
  protected readonly paused = signal(false);
  protected readonly shake = signal(false);
  protected readonly copied = signal(false);

  /** Código CSS vivo de lo que se está toqueteando. */
  protected readonly generatedCss = computed(
    () => `.server-toy {
  --bounce-h: ${-this.bounceH()}px;
  --float-speed: ${this.floatSpeed()}s;
  --strobe-speed: ${this.strobeSpeed()}s;
  --led-on: ${this.ledSafe()};
  --led-hot: ${this.ledHot()};
  /* modo: ${this.mode()} · animaciones: ${this.paused() ? 'en pausa' : 'activas'} */
}`,
  );

  protected setBounce(ev: Event): void {
    this.bounceH.set(+(ev.target as HTMLInputElement).value);
  }

  protected setFloat(ev: Event): void {
    this.floatSpeed.set(+(ev.target as HTMLInputElement).value);
  }

  protected setStrobe(ev: Event): void {
    this.strobeSpeed.set(+(ev.target as HTMLInputElement).value);
  }

  protected setLedSafe(ev: Event): void {
    this.ledSafe.set((ev.target as HTMLInputElement).value);
  }

  protected setLedHot(ev: Event): void {
    this.ledHot.set((ev.target as HTMLInputElement).value);
  }

  protected toggleMode(): void {
    this.mode.update((m) => (m === 'seguro' ? 'ataque' : 'seguro'));
    this.poke();
  }

  protected setMode(mode: 'seguro' | 'ataque'): void {
    this.mode.set(mode);
    this.poke();
  }

  protected togglePause(): void {
    this.paused.update((p) => !p);
  }

  protected reset(): void {
    this.bounceH.set(20);
    this.floatSpeed.set(4);
    this.strobeSpeed.set(0.8);
    this.ledSafe.set('#17e300');
    this.ledHot.set('#ff5f4a');
    this.mode.set('seguro');
    this.paused.set(false);
    this.poke();
  }

  /** Sacudida breve del servidor al tocarlo. */
  private poke(): void {
    this.shake.set(false);
    requestAnimationFrame(() => {
      this.shake.set(true);
      setTimeout(() => this.shake.set(false), 450);
    });
  }

  protected async copyCss(): Promise<void> {
    const css = this.generatedCss();
    try {
      await navigator.clipboard.writeText(css);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = css;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 1800);
  }
}
