import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <div class="container footer-inner">
        <div class="footer-brand">
          <span class="brand-mark" aria-hidden="true">&lt;/&gt;</span>
          <div>
            <strong>php<span class="grad-text">2</span>bash</strong>
            <p>Análisis del incidente PHP2Shell (CVE-2026-109618 · CVE-2026-109619)</p>
          </div>
        </div>

        <nav class="footer-nav" aria-label="Navegación del pie">
          <a href="#php">PHP básico</a>
          <a href="#cronologia">Cronología</a>
          <a href="#incidente">El incidente</a>
          <a href="#soluciones">Soluciones</a>
          <a href="#caso-practico">Caso práctico</a>
          <a href="#deteccion">Detección</a>
        </nav>

        <div class="footer-meta">
          <p>Práctica académica de seguridad informática · Sitio construido con Angular</p>
          <p class="footer-note">
            El uso de IA está permitido y se ha utilizado en la elaboración de esta entrega. Contenido informativo:
            ante un incidente real, sigue siempre los advisories oficiales de tu proveedor.
          </p>
        </div>
      </div>
    </footer>
  `,
  styleUrl: './footer.css',
})
export class Footer {}
