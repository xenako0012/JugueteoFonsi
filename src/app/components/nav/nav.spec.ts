import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Nav } from './nav';

function click(el: Element | null): void {
  el!.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
}

describe('Nav — menú interactivo', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nav],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('abre el mega-menú al pulsar «Explorar»', () => {
    const fixture = TestBed.createComponent(Nav);
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    expect(root.querySelector('#mega-menu')).toBeNull();

    click(root.querySelector('.nav-explore-btn'));
    fixture.detectChanges();

    expect(root.querySelector('#mega-menu')).not.toBeNull();
    expect(root.querySelectorAll('.mega-item').length).toBeGreaterThan(5);
  });

  it('cierra el mega-menú al pulsar fuera', () => {
    const fixture = TestBed.createComponent(Nav);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;

    click(root.querySelector('.nav-explore-btn'));
    fixture.detectChanges();
    expect(root.querySelector('#mega-menu')).not.toBeNull();

    click(document.body);
    fixture.detectChanges();
    expect(root.querySelector('#mega-menu')).toBeNull();
  });

  it('abre el menú móvil con el botón hamburguesa', () => {
    const fixture = TestBed.createComponent(Nav);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;

    click(root.querySelector('.nav-burger'));
    fixture.detectChanges();
    expect(root.querySelector('.nav-mobile')).not.toBeNull();
  });
});

describe('ThemePicker — botón de colores', () => {
  it('abre el panel y cambia el tema', async () => {
    const { ThemePicker } = await import('../theme-picker/theme-picker');
    const { ThemeService } = await import('../../services/theme.service');

    await TestBed.configureTestingModule({ imports: [ThemePicker] }).compileComponents();
    const fixture = TestBed.createComponent(ThemePicker);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;

    // El panel está cerrado al inicio
    expect(root.querySelector('.tp-panel')).toBeNull();

    click(root.querySelector('.tp-fab'));
    fixture.detectChanges();
    expect(root.querySelector('.tp-panel')).not.toBeNull();
    expect(root.querySelectorAll('.tp-option').length).toBe(7);

    const options = root.querySelectorAll<HTMLButtonElement>('.tp-option');
    click(options[3]); // protanopia
    fixture.detectChanges();

    const themes = TestBed.inject(ThemeService);
    expect(themes.current()).toBe('protanopia');
    expect(document.documentElement.dataset['theme']).toBe('protanopia');
  });
});
