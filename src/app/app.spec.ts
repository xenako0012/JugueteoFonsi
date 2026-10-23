import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the site navigation', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand-text')?.textContent).toContain('php');
  });

  it('should keep the shell widgets wired (NG8113 regression)', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    // Si alguno de estos desaparece de la plantilla, el import queda
    // huérfano y el compilador lanza NG8113 (ScrollDock is not used…).
    expect(compiled.querySelector('app-scroll-dock')).toBeTruthy();
    expect(compiled.querySelector('app-cursor-follower')).toBeTruthy();
    expect(compiled.querySelector('a.skip-link')).toBeTruthy();
  });
});
