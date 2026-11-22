import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should render register page between header and footer when navigating to /register', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/register');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const header = compiled.querySelector('header');
    const footer = compiled.querySelector('footer');
    const registerPage = compiled.querySelector('[data-page="register"]');

    expect(header).toBeTruthy();
    expect(footer).toBeTruthy();
    expect(registerPage).toBeTruthy();

    const main = compiled.querySelector('main');
    expect(main).toBeTruthy();

    const headerPos = header!.compareDocumentPosition(registerPage!);
    const footerPos = footer!.compareDocumentPosition(registerPage!);

    expect(headerPos & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(footerPos & Node.DOCUMENT_POSITION_PRECEDING).toBeTruthy();
  });

  it('should open drawer with "Criar conta" and "Entrar" links when tapping ☰ button (CA8)', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/register');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const menuButton = compiled.querySelector<HTMLButtonElement>('[data-testid="menu-button"]');

    expect(menuButton).toBeTruthy();
    expect(compiled.querySelector('[data-testid="navigation-drawer"]')).toBeFalsy();

    menuButton!.click();
    fixture.detectChanges();

    const drawer = compiled.querySelector<HTMLElement>('[data-testid="navigation-drawer"]');
    expect(drawer).toBeTruthy();

    const drawerText = drawer!.textContent ?? '';
    expect(drawerText).toContain('Criar conta');
    expect(drawerText).toContain('Entrar');
  });

  it('should close drawer and navigate when tapping a drawer link (CA8b)', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/register');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const menuButton = compiled.querySelector<HTMLButtonElement>('[data-testid="menu-button"]');
    menuButton!.click();
    fixture.detectChanges();

    const loginLink = compiled.querySelector<HTMLAnchorElement>('[data-testid="drawer-link-login"]');
    expect(loginLink).toBeTruthy();

    loginLink!.click();
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(router.url).toBe('/login');
    expect(compiled.querySelector('[data-testid="navigation-drawer"]')).toBeFalsy();
  });
});
