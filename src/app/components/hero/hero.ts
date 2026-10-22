import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [RouterLink],
  template: `
    <section class="hero" id="top">
      <div class="blob blob-violet hero-blob-1" aria-hidden="true"></div>
      <div class="blob blob-blue hero-blob-2" aria-hidden="true"></div>
      <div class="blob blob-pink hero-blob-3" aria-hidden="true"></div>

      <div class="container hero-grid">
        <div class="hero-copy">
          <div class="hero-topline">
            <span class="chip chip-primary">
              <span class="dot"></span>
              Práctica de seguridad · Octubre de 2026
            </span>
            <span class="sticker">se admiten parches urgentes ✚</span>
          </div>

          <h1>
            De PHP a shell:<br />
            el incidente <span class="grad-text">php2bash</span> explicado paso a paso
          </h1>

          <p class="hero-lede">
            También conocido como <strong>PHP2Shell</strong>. Dos vulnerabilidades críticas en el
            <strong>motor de PHP</strong> permitieron ejecutar código remoto en millones de servidores sin
            iniciar sesión. Aquí tienes la historia completa, las versiones afectadas, las soluciones y cómo
            comprobar que un stack <strong>Angular + Laravel</strong> está protegido.
          </p>

          <div class="hero-actions-wrap">
            <div class="hero-actions">
              <a class="btn btn-primary" routerLink="/incidente">Entender el incidente</a>
              <a class="btn btn-ghost" routerLink="/soluciones">Cómo proteger mi sistema</a>
            </div>
            <p class="annotation hero-annotation">
              <span class="hand-arrow">↳</span> y si vas directo al grano, la checklist del caso práctico tiene
              su propia página
            </p>
          </div>

          <div class="hero-stats">
            <div class="stat">
              <span class="stat-value">2</span>
              <span class="stat-label">CVEs críticos</span>
            </div>
            <div class="stat">
              <span class="stat-value">9.2</span>
              <span class="stat-label">CVSS v4.0</span>
            </div>
            <div class="stat">
              <span class="stat-value">2012</span>
              <span class="stat-label">Código vulnerable desde</span>
            </div>
            <div class="stat">
              <span class="stat-value">21 oct</span>
              <span class="stat-label">Día del parche</span>
            </div>
          </div>
        </div>

        <div class="hero-visual" aria-hidden="true">
          <div class="terminal hero-terminal">
            <div class="terminal-head">
              <span class="tdot tdot-r"></span>
              <span class="tdot tdot-y"></span>
              <span class="tdot tdot-g"></span>
              <span class="terminal-title">servidor-web:~ comprobación de versión</span>
            </div>
            <pre>
<span class="cmt"># ¿Qué versión de PHP corre mi servidor?</span>
<span class="cmd">$</span> php -v
<span class="bad">PHP 8.3.35</span> (cli)  <span class="bad">⚠ VULNERABLE</span>

<span class="cmt"># Actualizo el paquete y reinicio...</span>
<span class="cmd">$</span> sudo apt install --only-upgrade "php*"
<span class="cmd">$</span> php -v
<span class="ok">PHP 8.3.36</span> (cli)  <span class="ok">✓ PROTEGIDO</span>

<span class="cmt"># CVE-2026-109618 · CVE-2026-109619 — corregidos</span>
<span class="str">La actualización tardó minutos. El riesgo, 14 años.</span>
            </pre>
          </div>

          <div class="float-card float-card-1">
            <span class="chip chip-danger"><span class="dot"></span>CVSS 9.2 · Crítico</span>
            <p>RCE sin autenticación</p>
          </div>
          <div class="float-card float-card-2">
            <span class="chip chip-ok"><span class="dot"></span>Parche disponible</span>
            <p>8.5.12 · 8.4.27 · 8.3.36 · 8.2.35</p>
          </div>
        </div>
      </div>

      <div class="hero-logos container">
        <span>Afecta a cualquier instalación de PHP que sirva la web:</span>
        <div class="logo-row">
          <span class="logo-pill">PHP-FPM</span>
          <span class="logo-pill">Apache mod_php</span>
          <span class="logo-pill">php-cgi</span>
          <span class="logo-pill">FrankenPHP</span>
          <span class="logo-pill">LiteSpeed</span>
        </div>
      </div>
    </section>
  `,
  styleUrl: './hero.css',
})
export class Hero {}
