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
});