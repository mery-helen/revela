import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthRepository } from '../../../../core/data/repositories/auth-repository';
import { AuthSession } from '../../../../core/services/auth-session';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
})
export class LoginPage {
  private readonly authRepository = inject(AuthRepository);
  private readonly authSession = inject(AuthSession);
  private readonly router = inject(Router);

  protected readonly submitted = signal(false);
  protected readonly invalidCredentials = signal(false);
  protected readonly serverError = signal(false);
  protected readonly isSubmitting = signal(false);

  protected readonly loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  protected onSubmit(): void {
    if (this.isSubmitting()) {
      return;
    }

    this.submitted.set(true);
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.getRawValue();
    this.invalidCredentials.set(false);
    this.serverError.set(false);
    this.isSubmitting.set(true);

    this.authRepository.signIn(email, password).subscribe({
      next: (user) => {
        if (user) {
          this.authSession.setAuthenticatedUser(user);
          void this.router.navigate(['/groups']);
          this.isSubmitting.set(false);
          return;
        }

        this.invalidCredentials.set(true);
        this.isSubmitting.set(false);
      },
      error: () => {
        this.serverError.set(true);
        this.isSubmitting.set(false);
      },
    });
  }

  protected shouldShowError(controlName: 'email' | 'password'): boolean {
    const control = this.loginForm.controls[controlName];
    return control.invalid && (control.touched || this.submitted());
  }
}