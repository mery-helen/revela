import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { environment } from '../../../../../environments/environment';
import { AuthSession } from '../../../../core/services/auth-session';
import { LoginPage } from './login-page';

@Component({ template: '' })
class GroupsStub {}

@Component({ template: '' })
class RegisterStub {}

describe('LoginPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([{ path: 'groups', component: GroupsStub }]),
      ],
    }).compileComponents();
  });

  it('should authenticate and redirect to groups on valid credentials (CA1)', async () => {
    const fixture = TestBed.createComponent(LoginPage);
    const httpTesting = TestBed.inject(HttpTestingController);
    const router = TestBed.inject(Router);
    const authSession = TestBed.inject(AuthSession);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const emailInput = compiled.querySelector<HTMLInputElement>('[data-testid="input-email"]');
    const passwordInput = compiled.querySelector<HTMLInputElement>('[data-testid="input-password"]');
    const submitButton = compiled.querySelector<HTMLButtonElement>('[data-testid="submit-login"]');

    emailInput!.value = '  MARIA@EXAMPLE.COM  ';
    emailInput!.dispatchEvent(new Event('input'));
    passwordInput!.value = '123456';
    passwordInput!.dispatchEvent(new Event('input'));

    submitButton!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const request = httpTesting.expectOne(`${environment.apiUrl}/users`);
    expect(request.request.method).toBe('GET');

    request.flush([
      { id: '1', name: 'Maria', email: 'maria@example.com', password: '123456' },
    ]);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(authSession.authenticatedUser()).toEqual({
      id: '1',
      name: 'Maria',
      email: 'maria@example.com',
    });
    expect(router.url).toBe('/groups');
  });

  it('should show an error under each invalid field and send no request when submitting invalid or empty fields (CA3)', async () => {
    const fixture = TestBed.createComponent(LoginPage);
    const httpTesting = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const emailInput = compiled.querySelector<HTMLInputElement>('[data-testid="input-email"]');
    const passwordInput = compiled.querySelector<HTMLInputElement>('[data-testid="input-password"]');
    const submitButton = compiled.querySelector<HTMLButtonElement>('[data-testid="submit-login"]');

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(submitButton).toBeTruthy();

    emailInput!.value = 'invalido';
    emailInput!.dispatchEvent(new Event('input'));
    passwordInput!.value = '';
    passwordInput!.dispatchEvent(new Event('input'));

    submitButton!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const emailError = compiled.querySelector('[data-testid="error-email"]');
    const passwordError = compiled.querySelector('[data-testid="error-password"]');

    expect(emailError).toBeTruthy();
    expect(emailError!.textContent?.trim().length).toBeGreaterThan(0);
    expect(passwordError).toBeTruthy();
    expect(passwordError!.textContent?.trim().length).toBeGreaterThan(0);

    httpTesting.expectNone(() => true);
  });

  it('should show "E-mail ou senha inválidos", stay on login, and preserve typed values when credentials are invalid (CA2)', async () => {
    const fixture = TestBed.createComponent(LoginPage);
    const httpTesting = TestBed.inject(HttpTestingController);
    const router = TestBed.inject(Router);
    const authSession = TestBed.inject(AuthSession);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const emailInput = compiled.querySelector<HTMLInputElement>('[data-testid="input-email"]');
    const passwordInput = compiled.querySelector<HTMLInputElement>('[data-testid="input-password"]');
    const submitButton = compiled.querySelector<HTMLButtonElement>('[data-testid="submit-login"]');

    emailInput!.value = 'naoexiste@example.com';
    emailInput!.dispatchEvent(new Event('input'));
    passwordInput!.value = '123456';
    passwordInput!.dispatchEvent(new Event('input'));

    submitButton!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const request = httpTesting.expectOne(`${environment.apiUrl}/users`);
    expect(request.request.method).toBe('GET');
    request.flush([]);
    fixture.detectChanges();
    await fixture.whenStable();

    const invalidCredentialsError = compiled.querySelector(
      '[data-testid="error-invalid-credentials"]',
    );

    expect(invalidCredentialsError).toBeTruthy();
    expect(invalidCredentialsError!.textContent?.trim()).toBe('E-mail ou senha inválidos');
    expect(router.url).not.toBe('/groups');
    expect(emailInput!.value).toBe('naoexiste@example.com');
    expect(passwordInput!.value).toBe('123456');
    expect(authSession.authenticatedUser()).toBeNull();
  });

  it('should display "Não foi possível conectar ao servidor. Tente novamente." at the top of the form, preserve input values, write nothing, and keep button enabled on server error (CA4)', async () => {
    const fixture = TestBed.createComponent(LoginPage);
    const httpTesting = TestBed.inject(HttpTestingController);
    const router = TestBed.inject(Router);
    const authSession = TestBed.inject(AuthSession);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const emailInput = compiled.querySelector<HTMLInputElement>('[data-testid="input-email"]');
    const passwordInput = compiled.querySelector<HTMLInputElement>('[data-testid="input-password"]');
    const submitButton = compiled.querySelector<HTMLButtonElement>('[data-testid="submit-login"]');

    emailInput!.value = 'maria@example.com';
    emailInput!.dispatchEvent(new Event('input'));
    passwordInput!.value = '123456';
    passwordInput!.dispatchEvent(new Event('input'));

    submitButton!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const request = httpTesting.expectOne(`${environment.apiUrl}/users`);
    expect(request.request.method).toBe('GET');
    request.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });
    fixture.detectChanges();
    await fixture.whenStable();

    const serverError = compiled.querySelector('[data-testid="error-server"]');
    expect(serverError).toBeTruthy();
    expect(serverError!.textContent?.trim()).toBe(
      'Não foi possível conectar ao servidor. Tente novamente.',
    );

    expect(emailInput!.value).toBe('maria@example.com');
    expect(passwordInput!.value).toBe('123456');
    expect(authSession.authenticatedUser()).toBeNull();
    expect(router.url).not.toBe('/groups');
    expect(submitButton!.disabled).toBe(false);
  });

  it('should disable "Entrar" button and send exactly one request during pending submission (CA5)', async () => {
    const fixture = TestBed.createComponent(LoginPage);
    const httpTesting = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const emailInput = compiled.querySelector<HTMLInputElement>('[data-testid="input-email"]');
    const passwordInput = compiled.querySelector<HTMLInputElement>('[data-testid="input-password"]');
    const submitButton = compiled.querySelector<HTMLButtonElement>('[data-testid="submit-login"]');

    emailInput!.value = 'maria@example.com';
    emailInput!.dispatchEvent(new Event('input'));
    passwordInput!.value = '123456';
    passwordInput!.dispatchEvent(new Event('input'));

    submitButton!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(submitButton!.disabled).toBe(true);

    submitButton!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const requests = httpTesting.match(`${environment.apiUrl}/users`);
    expect(requests.length).toBe(1);

    requests[0].flush([{ id: '1', name: 'Maria', email: 'maria@example.com', password: '123456' }]);
    fixture.detectChanges();
    await fixture.whenStable();

    httpTesting.expectNone(`${environment.apiUrl}/users`);
  });

  it('should navigate to register page when tapping "Não tem conta? Criar conta" (CA7)', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [LoginPage],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([{ path: 'register', component: RegisterStub }]),
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(LoginPage);
    const router = TestBed.inject(Router);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const registerLink = Array.from(compiled.querySelectorAll('a')).find(
      (anchor) => anchor.textContent?.trim() === 'Não tem conta? Criar conta',
    );

    expect(registerLink).toBeTruthy();
    expect(registerLink!.getAttribute('href')).toBe('/register');

    registerLink!.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(router.url).toBe('/register');
  });
});