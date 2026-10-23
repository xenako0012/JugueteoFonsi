import { Component, computed, signal } from '@angular/core';
import { checklist, ChecklistStep } from '../../data/incident.data';
import { CodeBlock } from '../../shared/code-block';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-checklist',
  imports: [CodeBlock, RevealDirective],
  template: `
    <section class="section section-wash-alt" id="caso-practico">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="chip chip-primary"><span class="dot"></span>Caso práctico · Twinteach (Angular + Laravel)</span>
          <h2>Pasos para comprobar que <span class="grad-text">tu sistema está protegido</span></h2>
          <p class="lede">
            Un producto como Twinteach usa <strong>Angular en el frontend</strong> (no afectado: corre en el
            navegador) y <strong>Laravel en el backend</strong> (sí afectado: se ejecuta sobre PHP). Esta checklist
            interactiva recorre los pasos recomendados; márcalos como el equipo los vaya completando.
          </p>
        </div>

        <div class="ck-progress card" appReveal>
          <div class="ck-progress-head">
            <strong>Progreso de la auditoría</strong>
            <span class="chip chip-primary">{{ doneCount() }} / {{ steps.length }} pasos</span>
          </div>
          <div class="ck-bar" role="progressbar" [attr.aria-valuenow]="percent()" aria-valuemin="0" aria-valuemax="100">
            <div class="ck-bar-fill" [style.width.%]="percent()"></div>
          </div>
          @if (percent() === 100) {
            <p class="ck-done">✓ Auditoría completada: sistema verificado y protegido.</p>
          }
          <button class="btn btn-ghost btn-sm" type="button" (click)="reset()">Reiniciar checklist</button>
        </div>

        <div class="ck-list">
          @for (step of steps; track step.id; let i = $index) {
            <article class="card ck-item" [class.ck-item-done]="isDone(step.id)" appReveal [attr.data-delay]="i % 3">
              <label class="ck-ninja">
                <input
                  type="checkbox"
                  class="ck-ninja-input"
                  [checked]="isDone(step.id)"
                  (change)="toggle(step.id)"
                  [attr.aria-label]="'Marcar paso: ' + step.title"
                />
                <div class="ninja-container">
                  <div class="blade" style="--i: 1"></div>
                  <div class="blade" style="--i: 2"></div>
                  <div class="blade" style="--i: 3"></div>
                  <div class="blade" style="--i: 4"></div>
                  <div class="core"></div>
                </div>
              </label>
              <div class="ck-body">
                <div class="ck-title">
                  <span class="ck-icon">{{ step.icon }}</span>
                  <h3>{{ step.title }}</h3>
                </div>
                <p>{{ step.text }}</p>
                @for (cmd of step.commands; track cmd.label) {
                  <div class="ck-cmd">
                    <span class="ck-cmd-label">{{ cmd.label }}</span>
                    <app-code-block [code]="cmd.code" />
                  </div>
                }
              </div>
            </article>
          }
        </div>

        <div class="card ck-note" appReveal>
          <div class="card-icon info">✉</div>
          <div>
            <h3>¿Hosting gestionado o sin acceso al servidor?</h3>
            <p>
              Solicita por escrito la <strong>versión exacta de PHP</strong> en cada entorno, el paquete instalado y
              la confirmación del parche de octubre de 2026. Documenta las respuestas: si el proveedor no puede
              demostrarlo, tu sistema debe considerarse vulnerable.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './checklist.css',
})
export class Checklist {
  protected readonly steps: ChecklistStep[] = checklist;
  private readonly done = signal<Record<string, boolean>>({});

  protected readonly doneCount = computed(
    () => this.steps.filter((s) => this.done()[s.id]).length,
  );
  protected readonly percent = computed(() =>
    Math.round((this.doneCount() / this.steps.length) * 100),
  );

  protected isDone(id: string): boolean {
    return !!this.done()[id];
  }

  protected toggle(id: string): void {
    this.done.update((state) => ({ ...state, [id]: !state[id] }));
  }

  protected reset(): void {
    this.done.set({});
  }
}
