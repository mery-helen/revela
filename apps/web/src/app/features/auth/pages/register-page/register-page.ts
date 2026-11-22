import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthRepository } from '../../../../core/data/repositories/auth-repository';
import { AuthSession } from '../../../../core/services/auth-session';

const passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!confirmPassword) {
    return null;
  }

  return password === confirmPassword ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  private readonly authRepository = inject(AuthRepository);
  private readonly authSession = inject(AuthSession);
  private readonly router = inject(Router);

  protected readonly submitted = signal(false);

  protected readonly registerForm = new FormGroup(
    {
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3)],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)],
      }),
      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    { validators: passwordsMatchValidator },
  );

  protected onSubmit(): void {
    this.submitted.set(true);
    if (this.registerForm.invalid) {
      return;
    }

    const { name, email, password } = this.registerForm.getRawValue();
    this.authRepository.createAccount({ name, email, password }).subscribe((user) => {
      this.authSession.setAuthenticatedUser(user);
      void this.router.navigate(['/groups']);
    });
  }

  protected shouldShowError(controlName: 'name' | 'email' | 'password' | 'confirmPassword'): boolean {
    const control = this.registerForm.controls[controlName];
    const hasPasswordMismatch =
      controlName === 'confirmPassword' && this.registerForm.hasError('passwordMismatch');
    return (control.invalid || hasPasswordMismatch) && (control.touched || this.submitted());
  }
}
