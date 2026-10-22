import { Component, HostListener, signal } from '@angular/core';

interface NavLink {
  href: string;
  label: string;
}

@Component({
  selector: 'app-nav',
  template: `
    <header class="nav" [class.nav-scrolled]="scrolled()">
      <div class="container nav-inner">
        <a class="brand" href="#top" (click)="closeMenu()">
          <span class="brand-mark" aria-hidden="true">&lt;/&gt;</span>
          <span class="brand-text">php<span class="grad-text">2</span>bash</span>
        </a>

        <nav class="nav-links" aria-label="Navegación principal">
          @for (link of links; track link.href) {
            <a [href]="link.href">{{ link.label }}</a>
          }
        </nav>

        <a class="btn btn-primary btn-sm nav-cta" href="#caso-practico">Caso práctico</a>

        <button
          class="nav-burger"
          type="button"
          (click)="toggleMenu()"
          [attr.aria-expanded]="menuOpen()"
          aria-label="Abrir menú"
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      @if (menuOpen()) {
        <div class="nav-mobile">
          @for (link of links; track link.href) {
            <a [href]="link.href" (click)="closeMenu()">{{ link.label }}</a>
          }
          <a class="btn btn-primary btn-sm" href="#caso-practico" (click)="closeMenu()">Caso práctico</a>
        </div>
      }
    </header>
  `,
  styleUrl: './nav.css',
})
export class Nav {
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);

  protected readonly links: NavLink[] = [
    { href: '#php', label: 'PHP básico' },
    { href: '#cronologia', label: 'Cronología' },
    { href: '#incidente', label: 'El incidente' },
    { href: '#versiones', label: 'Versiones' },
    { href: '#soluciones', label: 'Soluciones' },
    { href: '#deteccion', label: 'Detección' },
    { href: '#faq', label: 'FAQ' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 12);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
