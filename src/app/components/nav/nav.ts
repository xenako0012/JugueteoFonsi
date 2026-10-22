import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { topicGroups, TopicInfo } from '../../data/topics.data';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="nav" [class.nav-scrolled]="scrolled()">
      <div class="container nav-inner">
        <a class="brand" routerLink="/" (click)="closeAll()">
          <span class="brand-mark" aria-hidden="true">&lt;/&gt;</span>
          <span class="brand-text">php<span class="grad-text">2</span>bash</span>
        </a>

        <nav class="nav-links" aria-label="Navegación principal">
          <a routerLink="/php" routerLinkActive="active">PHP básico</a>
          <a routerLink="/incidente" routerLinkActive="active">El incidente</a>
          <a routerLink="/soluciones" routerLinkActive="active">Soluciones</a>

          <div class="nav-explore">
            <button
              class="nav-explore-btn"
              type="button"
              (click)="megaOpen.update(v => !v)"
              [attr.aria-expanded]="megaOpen()"
              aria-controls="mega-menu"
            >
              Explorar
              <span class="nav-caret" [class.open]="megaOpen()" aria-hidden="true">▾</span>
            </button>

            @if (megaOpen()) {
              <div class="mega card" id="mega-menu" role="menu">
                @for (group of menuGroups; track group.title) {
                  <div class="mega-group">
                    <span class="mega-title">{{ group.title }}</span>
                    @for (item of group.items; track item.path) {
                      <a
                        class="mega-item"
                        role="menuitem"
                        [routerLink]="item.path"
                        routerLinkActive="mega-item-active"
                        (click)="closeAll()"
                      >
                        <span class="mega-icon" aria-hidden="true">{{ item.icon }}</span>
                        <span>
                          <strong>{{ item.label }}</strong>
                          <small>{{ item.desc }}</small>
                        </span>
                      </a>
                    }
                  </div>
                }
              </div>
            }
          </div>
        </nav>

        <a class="btn btn-primary btn-sm nav-cta" routerLink="/caso-practico">Caso práctico</a>

        <button
          class="nav-burger"
          type="button"
          (click)="mobileOpen.update(v => !v)"
          [attr.aria-expanded]="mobileOpen()"
          aria-label="Abrir menú"
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      @if (mobileOpen()) {
        <div class="nav-mobile">
          @for (group of menuGroups; track group.title) {
            <details class="nav-mgroup" [attr.open]="openGroup() === group.title ? '' : null">
              <summary (click)="toggleGroup(group.title, $event)">{{ group.title }}</summary>
              @for (item of group.items; track item.path) {
                <a class="nav-mitem" [routerLink]="item.path" (click)="closeAll()">
                  <span aria-hidden="true">{{ item.icon }}</span> {{ item.label }}
                </a>
              }
            </details>
          }
          <a class="btn btn-primary btn-sm" routerLink="/caso-practico" (click)="closeAll()">Ir al caso práctico</a>
        </div>
      }
    </header>
  `,
  styleUrl: './nav.css',
})
export class Nav {
  private readonly el = inject(ElementRef<HTMLElement>);
  protected readonly scrolled = signal(false);
  protected readonly megaOpen = signal(false);
  protected readonly mobileOpen = signal(false);
  protected readonly openGroup = signal<string | null>('Fundamentos');

  protected readonly menuGroups: { title: string; items: TopicInfo[] }[] = topicGroups;

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 12);
  }

  @HostListener('document:click', ['$event'])
  onDocClick(event: Event): void {
    if (this.megaOpen() && !this.el.nativeElement.contains(event.target as Node)) {
      this.megaOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    this.closeAll();
  }

  protected toggleGroup(title: string, event: Event): void {
    event.preventDefault();
    this.openGroup.update((current) => (current === title ? null : title));
  }

  protected closeAll(): void {
    this.megaOpen.set(false);
    this.mobileOpen.set(false);
  }
}
