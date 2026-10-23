import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../shared/reveal.directive';

type Tres = 'si' | 'no' | 'desconocido';
type PhpState = 'afectada' | 'parcheada' | 'desconocida';

interface Verdict {
  level: 'alto' | 'medio' | 'bajo' | 'inicio';
  icon: string;
  title: string;
  text: string;
  extra: string;
  actions: { label: string; path: string; primary: boolean }[];
}

/**
 * Formulario comprobador: diagnostica el riesgo de php2bash en el stack
 * del usuario y devuelve un veredicto con los pasos recomendados.
 */
@Component({
  selector: 'app-comprobador',
  imports: [RouterLink, RevealDirective],
  template: `
    <section class="section">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="chip chip-warn"><span class="dot"></span>Diagnóstico express</span>
          <h2>¿Es vulnerable <span class="grad-text">tu stack</span>?</h2>
          <p class="lede">
            Cinco preguntas y un veredicto. Nada se envía a ningún sitio: el diagnóstico se calcula
            aquí mismo en tu navegador, como el resto de herramientas de esta web.
          </p>
        </div>

        <div class="cb-grid">
          <!-- ── Formulario ── -->
          <form class="card cb-form" appReveal (submit)="$event.preventDefault()">
            <fieldset class="cb-field">
              <legend><span class="cb-num">01</span> ¿Qué versión de PHP ejecutas?</legend>
              <div class="cb-opts">
                <label class="cb-opt">
                  <input type="radio" name="php" [checked]="php() === 'afectada'" (change)="php.set('afectada')" />
                  <span class="cb-pill">5.4 – 8.5.11</span>
                </label>
                <label class="cb-opt">
                  <input type="radio" name="php" [checked]="php() === 'parcheada'" (change)="php.set('parcheada')" />
                  <span class="cb-pill">8.5.12 / 8.4.27 / 8.3.36 / 8.2.35 o superior</span>
                </label>
                <label class="cb-opt">
                  <input type="radio" name="php" [checked]="php() === 'desconocida'" (change)="php.set('desconocida')" />
                  <span class="cb-pill">No lo sé</span>
                </label>
              </div>
            </fieldset>

            <fieldset class="cb-field">
              <legend><span class="cb-num">02</span> ¿Cómo se ejecuta PHP en tu servidor?</legend>
              <div class="cb-opts">
                @for (s of sapis; track s.value) {
                  <label class="cb-opt">
                    <input
                      type="radio"
                      name="sapi"
                      [checked]="sapi() === s.value"
                      (change)="sapi.set(s.value)"
                    />
                    <span class="cb-pill">{{ s.label }}</span>
                  </label>
                }
              </div>
            </fieldset>

            <fieldset class="cb-field">
              <legend><span class="cb-num">03</span> ¿session.upload_progress está activado?</legend>
              <div class="cb-opts">
                <label class="cb-opt">
                  <input type="radio" name="upload" [checked]="upload() === 'si'" (change)="upload.set('si')" />
                  <span class="cb-pill">Sí, está activo</span>
                </label>
                <label class="cb-opt">
                  <input type="radio" name="upload" [checked]="upload() === 'no'" (change)="upload.set('no')" />
                  <span class="cb-pill">No, lo desactivé</span>
                </label>
                <label class="cb-opt">
                  <input type="radio" name="upload" [checked]="upload() === 'desconocido'" (change)="upload.set('desconocido')" />
                  <span class="cb-pill">No lo sé</span>
                </label>
              </div>
            </fieldset>

            <fieldset class="cb-field">
              <legend><span class="cb-num">04</span> ¿Has aplicado los parches de octubre de 2026?</legend>
              <div class="cb-opts">
                <label class="cb-opt">
                  <input type="radio" name="parche" [checked]="parche() === 'si'" (change)="parche.set('si')" />
                  <span class="cb-pill">Sí, actualizado</span>
                </label>
                <label class="cb-opt">
                  <input type="radio" name="parche" [checked]="parche() === 'no'" (change)="parche.set('no')" />
                  <span class="cb-pill">No todavía</span>
                </label>
                <label class="cb-opt">
                  <input type="radio" name="parche" [checked]="parche() === 'desconocido'" (change)="parche.set('desconocido')" />
                  <span class="cb-pill">No lo sé</span>
                </label>
              </div>
            </fieldset>

            <fieldset class="cb-field">
              <legend><span class="cb-num">05</span> ¿Tienes un WAF con virtual patching?</legend>
              <div class="cb-opts">
                <label class="cb-opt">
                  <input type="radio" name="waf" [checked]="waf() === 'si'" (change)="waf.set('si')" />
                  <span class="cb-pill">Sí</span>
                </label>
                <label class="cb-opt">
                  <input type="radio" name="waf" [checked]="waf() === 'no'" (change)="waf.set('no')" />
                  <span class="cb-pill">No</span>
                </label>
                <label class="cb-opt">
                  <input type="radio" name="waf" [checked]="waf() === 'desconocido'" (change)="waf.set('desconocido')" />
                  <span class="cb-pill">No lo sé</span>
                </label>
              </div>
            </fieldset>

            <div class="cb-form-foot">
              <button type="button" class="btn btn-ghost" (click)="reset()">↺ Reiniciar</button>
              <p class="cat-mark">=^..^= Kuro recuerda: php -v nunca miente</p>
            </div>
          </form>

          <!-- ── Veredicto ── -->
          <aside
            class="card cb-result"
            [class.cb-result-alto]="verdict().level === 'alto'"
            [class.cb-result-medio]="verdict().level === 'medio'"
            [class.cb-result-bajo]="verdict().level === 'bajo'"
            aria-live="polite"
            appReveal
            data-delay="1"
          >
            <div class="cb-result-head">
              <span class="cb-result-icon" aria-hidden="true">{{ verdict().icon }}</span>
              <div>
                <span class="chip" [class]="'chip chip-' + chipKind()">{{ verdict().title }}</span>
              </div>
            </div>
            <p class="cb-result-text">{{ verdict().text }}</p>
            @if (verdict().extra) {
              <p class="cb-result-extra">{{ verdict().extra }}</p>
            }
            <ul class="cb-actions">
              @for (a of verdict().actions; track a.label) {
                <li>
                  <a class="btn" [class.btn-primary]="a.primary" [class.btn-ghost]="!a.primary" [routerLink]="a.path">
                    {{ a.label }}
                  </a>
                </li>
              }
            </ul>
          </aside>
        </div>
      </div>
    </section>
  `,
  styleUrl: './comprobador.css',
})
export class Comprobador {
  protected readonly php = signal<PhpState>('desconocida');
  protected readonly sapi = signal<string>('desconocida');
  protected readonly upload = signal<Tres>('desconocido');
  protected readonly parche = signal<Tres>('desconocido');
  protected readonly waf = signal<Tres>('desconocido');

  protected readonly sapis: { value: string; label: string }[] = [
    { value: 'mod_php', label: 'mod_php (Apache)' },
    { value: 'fpm', label: 'PHP-FPM' },
    { value: 'cgi', label: 'php-cgi' },
    { value: 'frankenphp', label: 'FrankenPHP' },
    { value: 'litespeed', label: 'LiteSpeed' },
    { value: 'desconocida', label: 'No lo sé' },
  ];

  private readonly touched = computed(
    () =>
      this.php() !== 'desconocida' ||
      this.sapi() !== 'desconocida' ||
      this.upload() !== 'desconocido' ||
      this.parche() !== 'desconocido' ||
      this.waf() !== 'desconocido',
  );

  protected readonly verdict = computed<Verdict>(() => {
    if (!this.touched()) {
      return {
        level: 'inicio',
        icon: '⚖',
        title: 'Esperando tus respuestas',
        text: 'Responde el formulario y calcularé el riesgo de php2bash en tu stack, con los pasos recomendados.',
        extra: '',
        actions: [],
      };
    }

    const parcheado = this.parche() === 'si' || this.php() === 'parcheada';
    const modPhp = this.sapi() === 'mod_php';
    const desprotegidoUpload = this.upload() !== 'no';

    if (parcheado) {
      return {
        level: 'bajo',
        icon: '✓',
        title: 'Protegido',
        text:
          'Tu stack lleva los parches de octubre de 2026 (o una versión ya corregida): las dos ' +
          'vulnerabilidades quedan cerradas por completo.',
        extra: modPhp
          ? 'Ojo: con mod_php, cualquier fallo futuro del motor afecta al servidor completo — merece la pena planear el paso a PHP-FPM.'
          : 'Refuerza la defensa en profundidad y comprueba el resultado con la checklist completa.',
        actions: [
          { label: 'Confirma con la checklist', path: '/caso-practico', primary: true },
          { label: 'Leer el cierre', path: '/conclusiones', primary: false },
        ],
      };
    }

    if (this.php() === 'afectada' || this.php() === 'desconocida') {
      const mitigado = this.upload() === 'no' || this.waf() === 'si';
      if (mitigado) {
        return {
          level: 'medio',
          icon: '⚑',
          title: 'Mitigado, pero sin parchear',
          text:
            'Tienes alguna barrera (session.upload_progress desactivado y/o WAF con virtual patching), ' +
            'pero el motor sigue siendo vulnerable: la mitigación reduce el ataque, no lo elimina.',
          extra: this.php() === 'desconocida'
            ? 'Todavía no sabes tu versión de PHP: compruébala con php -v antes de bajar la guardia.'
            : 'El parche oficial es la única solución definitiva: aplica cuanto antes.',
          actions: [
            { label: 'Aplicar los parches', path: '/soluciones', primary: true },
            { label: 'Ver la checklist', path: '/caso-practico', primary: false },
          ],
        };
      }

      return {
        level: 'alto',
        icon: '☠',
        title: 'Riesgo alto',
        text:
          'PHP en rango afectado, sin parche y sin barreras: un atacante puede ejecutar comandos ' +
          'como el usuario del servidor sin autenticarse (RCE).',
        extra: [
          modPhp ? 'Con mod_php el impacto es máximo: el ataque llega al servidor completo.' : '',
          desprotegidoUpload
            ? 'session.upload_progress activo es el vector más cómodo para los atacantes.'
            : '',
          this.php() === 'desconocida' ? 'Damos por hecho lo peor porque no conoces tu versión: verifícala con php -v.' : '',
        ]
          .filter(Boolean)
          .join(' '),
        actions: [
          { label: 'Parchear ya', path: '/soluciones', primary: true },
          { label: 'Buscar explotación', path: '/deteccion', primary: false },
          { label: 'Checklist completa', path: '/caso-practico', primary: false },
        ],
      };
    }

    return {
      level: 'medio',
      icon: '⚑',
      title: 'Revisa los datos',
      text:
        'Tu versión de PHP parece corregida, pero no has confirmado los parches: asegúrate de estar ' +
        'en 8.5.12 / 8.4.27 / 8.3.36 / 8.2.35 (o su backport) con php -v.',
      extra: 'En cuanto lo confirmes, el riesgo queda cerrado.',
      actions: [
        { label: 'Ver versiones corregidas', path: '/versiones', primary: true },
        { label: 'Ir a la checklist', path: '/caso-practico', primary: false },
      ],
    };
  });

  protected readonly chipKind = computed(() => {
    switch (this.verdict().level) {
      case 'alto':
        return 'danger';
      case 'medio':
        return 'warn';
      case 'bajo':
        return 'ok';
      default:
        return 'info';
    }
  });

  protected reset(): void {
    this.php.set('desconocida');
    this.sapi.set('desconocida');
    this.upload.set('desconocido');
    this.parche.set('desconocido');
    this.waf.set('desconocido');
  }
}
