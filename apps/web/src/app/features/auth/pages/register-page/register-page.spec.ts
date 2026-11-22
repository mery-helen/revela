import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { environment } from '../../../../../environments/environment';
import { AuthSession } from '../../../../core/services/auth-session';
import { RegisterPage } from './register-page';

@Component({ template: '' })
class GroupsStub {}

describe('RegisterPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPage],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([{ path: 'groups', component: GroupsStub }]),
      ],
    }).compileComponents();
  });

  it('should show an error under each invalid field and send no request when submitting invalid or empty fields (CA3)', async () => {
    const fixture = TestBed.createComponent(RegisterPage);
    const httpTesting = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const nameInput = compiled.querySelector<HTMLInputElement>('[data-testid="input-name"]');
    const emailInput = compiled.querySelector<HTMLInputElement>('[data-testid="input-email"]');
    const passwordInput = compiled.querySelector<HTMLInputElement>('[data-testid="input-password"]');
    const confirmPasswordInput = compiled.querySelector<HTMLInputElement>(
      '[data-testid="input-confirm-password"]',
    );
    const submitButton = compiled.querySelector<HTMLButtonElement>('[data-testid="submit-register"]');

    expect(nameInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(confirmPasswordInput).toBeTruthy();
    expect(submitButton).toBeTruthy();

    nameInput!.value = 'ab';
    nameInput!.dispatchEvent(new Event('input'));
    emailInput!.value = 'invalido';
    emailInput!.dispatchEvent(new Event('input'));
    passwordInput!.value = '12345';
    passwordInput!.dispatchEvent(new Event('input'));
    confirmPasswordInput!.value = '';
    confirmPasswordInput!.dispatchEvent(new Event('input'));

    submitButton!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const nameError = compiled.querySelector('[data-testid="error-name"]');
    const emailError = compiled.querySelector('[data-testid="error-email"]');
    const passwordError = compiled.querySelector('[data-testid="error-password"]');
    const confirmPasswordError = compiled.querySelector('[data-testid="error-confirm-password"]');

    expect(nameError).toBeTruthy();
    expect(nameError!.textContent?.trim().length).toBeGreaterThan(0);
    expect(emailError).toBeTruthy();
    expect(emailError!.textContent?.trim().length).toBeGreaterThan(0);
    expect(passwordError).toBeTruthy();
    expect(passwordError!.textContent?.trim().length).toBeGreaterThan(0);
    expect(confirmPasswordError).toBeTruthy();
    expect(confirmPasswordError!.textContent?.trim().length).toBeGreaterThan(0);

    httpTesting.expectNone(() => true);
  });

  it('should show "As senhas não coincidem" below confirm password when passwords differ on submit (CA4)', async () => {
    const fixture = TestBed.createComponent(RegisterPage);
    const httpTesting = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const nameInput = compiled.querySelector<HTMLInputElement>('[data-testid="input-name"]');
    const emailInput = compiled.querySelector<HTMLInputElement>('[data-testid="input-email"]');
    const passwordInput = compiled.querySelector<HTMLInputElement>('[data-testid="input-password"]');
    const confirmPasswordInput = compiled.querySelector<HTMLInputElement>(
      '[data-testid="input-confirm-password"]',
    );
    const submitButton = compiled.querySelector<HTMLButtonElement>('[data-testid="submit-register"]');

    nameInput!.value = 'Maria';
    nameInput!.dispatchEvent(new Event('input'));
    emailInput!.value = 'maria@example.com';
    emailInput!.dispatchEvent(new Event('input'));
    passwordInput!.value = '123456';
    passwordInput!.dispatchEvent(new Event('input'));
    confirmPasswordInput!.value = '654321';
    confirmPasswordInput!.dispatchEvent(new Event('input'));

    submitButton!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const confirmPasswordError = compiled.querySelector('[data-testid="error-confirm-password"]');

    expect(confirmPasswordError).toBeTruthy();
    expect(confirmPasswordError!.textContent?.trim()).toBe('As senhas não coincidem');

    httpTesting.expectNone(() => true);
  });

  it('should create account, authenticate person, and redirect to groups on valid submit (CA1)', async () => {
    const fixture = TestBed.createComponent(RegisterPage);
    const httpTesting = TestBed.inject(HttpTestingController);
    const router = TestBed.inject(Router);
    const authSession = TestBed.inject(AuthSession);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const nameInput = compiled.querySelector<HTMLInputElement>('[data-testid="input-name"]');
    const emailInput = compiled.querySelector<HTMLInputElement>('[data-testid="input-email"]');
    const passwordInput = compiled.querySelector<HTMLInputElement>('[data-testid="input-password"]');
    const confirmPasswordInput = compiled.querySelector<HTMLInputElement>(
      '[data-testid="input-confirm-password"]',
    );
    const submitButton = compiled.querySelector<HTMLButtonElement>('[data-testid="submit-register"]');

    nameInput!.value = 'Maria';
    nameInput!.dispatchEvent(new Event('input'));
    emailInput!.value = 'maria@example.com';
    emailInput!.dispatchEvent(new Event('input'));
    passwordInput!.value = '123456';
    passwordInput!.dispatchEvent(new Event('input'));
    confirmPasswordInput!.value = '123456';
    confirmPasswordInput!.dispatchEvent(new Event('input'));

    submitButton!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const lookup = httpTesting.expectOne(`${environment.apiUrl}/users`);
    expect(lookup.request.method).toBe('GET');
    lookup.flush([]);
    fixture.detectChanges();
    await fixture.whenStable();

    const request = httpTesting.expectOne(`${environment.apiUrl}/users`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      name: 'Maria',
      email: 'maria@example.com',
      password: '123456',
    });

    request.flush({ id: '1', name: 'Maria', email: 'maria@example.com', password: '123456' });
    fixture.detectChanges();
    await fixture.whenStable();

    expect(authSession.authenticatedUser()).toEqual({
      id: '1',
      name: 'Maria',
      email: 'maria@example.com',
    });
    expect(router.url).toBe('/groups');
  });

  it('should show "Este e-mail já está em uso" and write nothing when the email is already registered (CA2)', async () => {
    const fixture = TestBed.createComponent(RegisterPage);
    const httpTesting = TestBed.inject(HttpTestingController);
    const router = TestBed.inject(Router);
    const authSession = TestBed.inject(AuthSession);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const nameInput = compiled.querySelector<HTMLInputElement>('[data-testid="input-name"]');
    const emailInput = compiled.querySelector<HTMLInputElement>('[data-testid="input-email"]');
    const passwordInput = compiled.querySelector<HTMLInputElement>('[data-testid="input-password"]');
    const confirmPasswordInput = compiled.querySelector<HTMLInputElement>(
      '[data-testid="input-confirm-password"]',
    );
    const submitButton = compiled.querySelector<HTMLButtonElement>('[data-testid="submit-register"]');

    nameInput!.value = 'Maria';
    nameInput!.dispatchEvent(new Event('input'));
    emailInput!.value = 'MARIA@EXAMPLE.COM';
    emailInput!.dispatchEvent(new Event('input'));
    passwordInput!.value = '123456';
    passwordInput!.dispatchEvent(new Event('input'));
    confirmPasswordInput!.value = '123456';
    confirmPasswordInput!.dispatchEvent(new Event('input'));

    submitButton!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const lookup = httpTesting.expectOne(`${environment.apiUrl}/users`);
    expect(lookup.request.method).toBe('GET');
    lookup.flush([{ id: '1', name: 'Maria', email: 'maria@example.com', password: '123456' }]);
    fixture.detectChanges();
    await fixture.whenStable();

    const duplicateError = compiled.querySelector('[data-testid="error-email-registered"]');
    expect(duplicateError).toBeTruthy();
    expect(duplicateError!.textContent?.trim()).toBe('Este e-mail já está em uso');

    httpTesting.expectNone(
      (request) => request.method === 'POST' && request.url === `${environment.apiUrl}/users`,
    );
    expect(authSession.authenticatedUser()).toBeNull();
    expect(router.url).not.toBe('/groups');
  });

  it('should navigate to login page when tapping "Já tem uma conta? Faça login" (CA9)', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [RegisterPage],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([{ path: 'login', component: RegisterPage }]),
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(RegisterPage);
    const router = TestBed.inject(Router);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const loginLink = Array.from(compiled.querySelectorAll('a')).find(
      (anchor) => anchor.textContent?.trim() === 'Já tem uma conta? Faça login',
    );

    expect(loginLink).toBeTruthy();
    expect(loginLink!.getAttribute('href')).toBe('/login');

    loginLink!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(router.url).toBe('/login');
  });
});
