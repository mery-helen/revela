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
});
