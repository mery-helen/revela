import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { RegisterPage } from './register-page';

describe('RegisterPage', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPage],
      providers: [provideHttpClient(), provideHttpClientTesting()],
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
});
