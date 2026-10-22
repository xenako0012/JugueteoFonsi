import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemeId =
  | 'claro'
  | 'oscuro'
  | 'alto-contraste'
  | 'protanopia'
  | 'deuteranopia'
  | 'tritanopia'
  | 'acromatopsia';

export interface ThemeMeta {
  id: ThemeId;
  label: string;
  hint: string;
  /** Puntos de vista previa del selector. */
  swatches: [string, string, string];
}

export const THEMES: ThemeMeta[] = [
  {
    id: 'claro',
    label: 'Claro',
    hint: 'Papel cálido con tinta y amarillo voltaje',
    swatches: ['#f6f2ea', '#5b4ee0', '#ffd84d'],
  },
  {
    id: 'oscuro',
    label: 'Oscuro',
    hint: 'Terminal nocturna, suave con los ojos',
    swatches: ['#171310', '#a99bff', '#ffd84d'],
  },
  {
    id: 'alto-contraste',
    label: 'Alto contraste',
    hint: 'Máxima legibilidad (blanco y negro con señal)',
    swatches: ['#000000', '#ffff00', '#ffffff'],
  },
  {
    id: 'protanopia',
    label: 'Protanopia',
    hint: 'Sin rojo: paleta azul–naranja con iconos',
    swatches: ['#f4f6f9', '#005fcc', '#b24500'],
  },
  {
    id: 'deuteranopia',
    label: 'Deuteranopia',
    hint: 'Sin verde: paleta azul–naranja con iconos',
    swatches: ['#f4f6f9', '#7c3aed', '#b24500'],
  },
  {
    id: 'tritanopia',
    label: 'Tritanopia',
    hint: 'Sin azul: contraste rojo–verde con iconos',
    swatches: ['#f6f4ef', '#0f7a45', '#c21807'],
  },
  {
    id: 'acromatopsia',
    label: 'Acromatopsia',
    hint: 'Escala de grises con tramas de patrón',
    swatches: ['#f2f2f2', '#6b6b6b', '#000000'],
  },
];

const STORAGE_KEY = 'p2b-theme';

/** Gestiona el tema visual (color y accesibilidad) de toda la página. */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  readonly current = signal<ThemeId>('claro');

  readonly themes = THEMES;

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return;
    // Acceso defensivo: algunos entornos (iframes con sandbox) pueden
    // lanzar SecurityError y no deben tumbar el arranque de la aplicación.
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
      if (saved && THEMES.some((t) => t.id === saved)) {
        this.current.set(saved);
      } else if (
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        this.current.set('oscuro');
      }
    } catch {
      /* sin almacenamiento: tema por defecto */
    }
    this.apply(this.current());
  }

  set(id: ThemeId): void {
    this.current.set(id);
    if (!isPlatformBrowser(this.platformId)) return;
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* sin almacenamiento: el tema dura solo esta visita */
    }
    this.apply(id);
  }

  private apply(id: ThemeId): void {
    if (!isPlatformBrowser(this.platformId)) return;
    document.documentElement.dataset['theme'] = id;
  }
}
