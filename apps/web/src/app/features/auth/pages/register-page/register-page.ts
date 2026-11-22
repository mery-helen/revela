import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  protected readonly submitted = signal(false);

  protected readonly registerForm = new FormGroup({
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
  });

  protected onSubmit(): void {
    this.submitted.set(true);
    if (this.registerForm.invalid) {
      return;
    }
  }

  protected shouldShowError(controlName: 'name' | 'email' | 'password' | 'confirmPassword'): boolean {
    const control = this.registerForm.controls[controlName];
    return control.invalid && (control.touched || this.submitted());
  }
}
