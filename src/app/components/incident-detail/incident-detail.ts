import { Component, signal } from '@angular/core';
import { AttackFlow } from '../attack-flow/attack-flow';
import { CodeBlock } from '../../shared/code-block';
import { RevealDirective } from '../../shared/reveal.directive';

interface CveTab {
  id: string;
  chip: string;
  name: string;
  cve: string;
  ghsa: string;
  tagline: string;
  plain: string;
  technical: string[];
  code: string;
}

@Component({
  selector: 'app-incident-detail',
  imports: [AttackFlow, CodeBlock, RevealDirective],
  template: `
    <section class="section section-wash-alt" id="incidente">
      <div class="container">
        <div class="section-head" appReveal>
          <span class="chip chip-danger"><span class="dot"></span>¿En qué consiste el incidente?</span>
          <h2>Dos fallos de memoria que abrían <span class="grad-text">una shell remota</span></h2>
          <p class="lede">
            <strong>php2bash (PHP2Shell)</strong> es el nombre que se dio al par de vulnerabilidades
            <strong>CVE-2026-109618</strong> y <strong>CVE-2026-109619</strong>. Ambas permiten
            <strong>ejecución remota de código (RCE) sin autenticación</strong> en cualquier instalación de PHP que
            atienda peticiones web: el atacante pasa de ser un visitante a ejecutar comandos como el usuario del
            servidor web (normalmente <span class="code-inline">www-data</span>).
          </p>
        </div>

        <!-- ataque paso a paso (animado) -->
        <app-attack-flow />

        <!-- pestañas de los dos CVE -->
        <div class="cve-panel" appReveal>
          <div class="cve-tabs" role="tablist" aria-label="Vulnerabilidades">
            @for (tab of tabs; track tab.id) {
              <button
                type="button"
                role="tab"
                class="cve-tab"
                [class.active]="activeTab() === tab.id"
                [attr.aria-selected]="activeTab() === tab.id"
                (click)="activeTab.set(tab.id)"
              >
                {{ tab.name }}
              </button>
            }
          </div>

          @for (tab of tabs; track tab.id) {
            @if (activeTab() === tab.id) {
              <div class="cve-body">
                <div class="cve-info">
                  <div class="cve-chips">
                    <span class="chip chip-danger"><span class="dot"></span>{{ tab.cve }}</span>
                    <span class="chip chip-ghost">{{ tab.ghsa }}</span>
                    <span class="chip chip-warn">CVSS 9.2</span>
                  </div>
                  <h3>{{ tab.tagline }}</h3>
                  <p class="cve-plain">{{ tab.plain }}</p>
                  <ul class="tick-list">
                    @for (item of tab.technical; track item) {
                      <li>
                        <span class="tick danger">!</span>
                        <span>{{ item }}</span>
                      </li>
                    }
                  </ul>
                </div>
                <div class="cve-code">
                  <app-code-block [code]="tab.code" />
                </div>
              </div>
            }
          }
        </div>

        <!-- conceptos -->
        <div class="grid grid-3 concepts">
          <article class="card" appReveal data-delay="1">
            <div class="card-icon danger">⚠</div>
            <h3>¿Qué es una RCE?</h3>
            <p>
              <strong>Remote Code Execution</strong>: la peor pesadilla de un servidor. El atacante logra que el
              servidor ejecute código suyo (un comando, un script, una descarga). A partir de ahí puede robar la
              base de datos, leer el archivo <span class="code-inline">.env</span>, instalar una puerta trasera o
              usar el servidor para atacar a otros.
            </p>
          </article>
          <article class="card" appReveal data-delay="2">
            <div class="card-icon warn">∞</div>
            <h3>¿Qué es un «use-after-free»?</h3>
            <p>
              Imagina una habitación del hotel: un huésped se va (PHP libera la memoria), pero su llave sigue
              circulando. El siguiente huésped entra y encuentra las cosas del anterior, y alguien usa esa llave
              para abrir puertas que no debería. CVE-2026-109619 funciona así con el estado interno de PHP entre
              peticiones.
            </p>
          </article>
          <article class="card" appReveal data-delay="3">
            <div class="card-icon info">⊘</div>
            <h3>«Sin autenticación», en serio</h3>
            <p>
              No hace falta cuenta de usuario, ni formulario, ni siquiera una vulnerabilidad en la aplicación. Basta
              con una petición HTTP manipulada. En el escenario más peligroso (Apache + mod_php) el ataque funciona
              <strong>antes de que se ejecute una sola línea de código de la aplicación</strong>.
            </p>
          </article>
        </div>

        <div class="card impact-card" appReveal>
          <h3>Impacto real observado durante el incidente</h3>
          <div class="grid grid-2 impact-grid">
            <ul class="tick-list">
              <li><span class="tick danger">!</span><span>Ejecución de comandos como <span class="code-inline">www-data</span>: webshells, minería de criptomonedas, ransomware.</span></li>
              <li><span class="tick danger">!</span><span>Robo de datos: credenciales de base de datos, claves de API, datos personales de usuarios.</span></li>
            </ul>
            <ul class="tick-list">
              <li><span class="tick warn">!</span><span>Denegación de servicio (caídas) y exposición de memoria del proceso (fugas de información).</span></li>
              <li><span class="tick warn">!</span><span>Efecto dominó: WordPress, Drupal, Joomla, Moodle, Laravel… todo lo que corra sobre PHP vulnerable.</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './incident-detail.css',
})
export class IncidentDetail {
  protected readonly activeTab = signal('cve1');

  protected readonly tabs: CveTab[] = [
    {
      id: 'cve1',
      chip: 'CVE-2026-109618',
      name: 'CVE-2026-109618 · Corrupción por memoria',
      cve: 'CVE-2026-109618',
      ghsa: 'GHSA-w8hw-w9fx-j79w',
      tagline: 'Cuando se agota la memoria en el momento justo, PHP se confunde',
      plain:
        'Cuando una petición se queda sin memoria (OOM) en un instante crítico, PHP deja datos internos a medio ' +
        'inicializar y, al limpiar la petición, los trata como si fueran válidos. Un atacante puede provocarlo a ' +
        'voluntad con peticiones multipart que parecen legítimas pero están diseñadas para forzar ese agotamiento.',
      technical: [
        'Permite ejecución remota de código y también puede exponer memoria del proceso (fugas de datos).',
        'El código vulnerable existe desde PHP 5.4 (2012) en las rutas de limpieza y cierre de peticiones («bailout»).',
        'El propio changelog de PHP lo describe como «avoid state corruption via bailout».',
      ],
      code:
        'Petición HTTP multipart manipulada\n' +
        '  ↓\n' +
        'El worker de PHP agota memoria (OOM) en plena petición\n' +
        '  ↓\n' +
        'Datos internos quedan a medio inicializar\n' +
        '  ↓\n' +
        'La rutina de limpieza los trata como válidos\n' +
        '  ↓\n' +
        'Corrupción de estado → ejecución de código / fuga de memoria',
    },
    {
      id: 'cve2',
      chip: 'CVE-2026-109619',
      name: 'CVE-2026-109619 · Estado obsoleto',
      cve: 'CVE-2026-109619',
      ghsa: 'GHSA-6wmf-4rv5-p3rp',
      tagline: 'El estado de una petición sobrevive a su propia muerte (use-after-free)',
      plain:
        'Cuando una petición termina, PHP libera su memoria… pero parte de su estado interno sobrevive. La siguiente ' +
        'petición que atiende el mismo worker lo reutiliza como si fuera válido. Es un clásico ' +
        '<strong>use-after-free</strong> entre peticiones consecutivas.',
      technical: [
        'session.upload_progress, activado por defecto en PHP, es una vía de explotación confirmada.',
        'Es la técnica más observada en los ataques reales según Cloudflare («abusan de la ruta session upload-progress»).',
        'Al igual que el otro CVE, es un RCE sin autenticación con CVSS 9.2 (watchTowr lo evaluó 10.0).',
      ],
      code:
        'Petición A (subida de archivo con session.upload_progress)\n' +
        '  ↓\n' +
        'PHP libera la memoria de la petición, pero queda estado obsoleto\n' +
        '  ↓\n' +
        'Petición B del mismo worker reutiliza ese estado (use-after-free)\n' +
        '  ↓\n' +
        'El atacante controla el contenido reutilizado\n' +
        '  ↓\n' +
        'Ejecución de código con los permisos del servidor web',
    },
  ];
}
