import { Component } from '@angular/core';
import { CodeBlock } from '../../shared/code-block';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-php-basics',
  imports: [CodeBlock, RevealDirective],
  template: `
    <section class="section section-wash" id="php">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="chip chip-primary"><span class="dot"></span>Punto de partida</span>
          <h2>Antes de nada: <span class="grad-text">¿qué es PHP?</span></h2>
          <p class="lede">
            El incidente afecta al <strong>motor de PHP</strong>, no a una aplicación concreta. Para entenderlo
            bien, vamos a repasar en qué consiste PHP, cómo procesa una petición web y por qué un fallo en su
            núcleo pone en riesgo millones de sitios a la vez.
          </p>
        </div>

        <div class="grid grid-3 php-cards">
          <article class="card" appReveal data-delay="1">
            <div class="card-icon">🐘</div>
            <h3>Un lenguaje de servidor</h3>
            <p>
              PHP es un lenguaje de programación que se ejecuta <strong>en el servidor</strong>, no en el
              navegador. Su trabajo es generar la respuesta (HTML, JSON…) que después ve el usuario.
              Es la base de WordPress, Moodle, Drupal y de frameworks como <strong>Laravel</strong>.
            </p>
            <app-code-block [code]="helloPhp" />
          </article>

          <article class="card" appReveal data-delay="2">
            <div class="card-icon info">🔄</div>
            <h3>El ciclo de vida de una petición</h3>
            <p>
              Cada clic en una web dispara una petición HTTP. El servidor web (nginx o Apache) se la pasa a PHP
              mediante una <strong>SAPI</strong> (php-fpm, mod_php…) y el <strong>motor de PHP</strong> ejecuta
              el código de la aplicación. La vulnerabilidad vivía justo ahí: en el motor.
            </p>
            <div class="flow-diagram" aria-label="Flujo de una petición web">
              @for (step of flowSteps; track step.label; let last = $last) {
                <div class="flow-step" [class.flow-hot]="step.hot">
                  <span class="flow-icon">{{ step.icon }}</span>
                  <span class="flow-label">{{ step.label }}</span>
                </div>
                @if (!last) {
                  <div class="flow-arrow">→</div>
                }
              }
            </div>
          </article>

          <article class="card" appReveal data-delay="3">
            <div class="card-icon warn">🔢</div>
            <h3>Versiones y parches</h3>
            <p>
              PHP usa versiones <span class="code-inline">mayor.menor.parche</span> (por ejemplo
              <span class="code-inline">8.3.35</span>). Los cambios de seguridad se publican en el
              <strong>último número</strong>: por eso actualizar de 8.3.35 a 8.3.36 puede ser la diferencia
              entre estar expuesto o estar protegido.
            </p>
            <app-code-block [code]="versionExample" />
          </article>
        </div>

        <div class="card php-note" appReveal>
          <div class="card-icon danger">⚠️</div>
          <div>
            <h3>Por qué esto importa para el incidente</h3>
            <p>
              La mayoría de vulnerabilidades están en el <em>código de las aplicaciones</em> (un formulario mal
              validado, una consulta SQL sin filtrar…). <strong>php2bash / PHP2Shell es distinto</strong>: el
              fallo está en el propio intérprete de PHP. Esto significa que da igual lo bien escrita que esté tu
              aplicación —si tu servidor ejecuta una versión vulnerable de PHP, está en riesgo—. Laravel,
              WordPress, Joomla o una app propia: todos pasan por ese motor.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './php-basics.css',
})
export class PhpBasics {
  protected readonly helloPhp =
    '<?php\n// index.php — se ejecuta en el servidor\n$nombre = "mundo";\necho "<h1>Hola, $nombre</h1>";\n?>';

  protected readonly versionExample =
    'PHP 8.3.35  →  vulnerable  ⚠\nPHP 8.3.36  →  parcheado   ✓\n           ↑\n   solo cambia el parche';

  protected readonly flowSteps = [
    { icon: '🌐', label: 'Navegador', hot: false },
    { icon: '🧭', label: 'nginx / Apache', hot: false },
    { icon: '🔌', label: 'SAPI (php-fpm)', hot: false },
    { icon: '⚙️', label: 'Motor de PHP', hot: true },
    { icon: '📦', label: 'App (Laravel)', hot: false },
    { icon: '✅', label: 'Respuesta', hot: false },
  ];
}
