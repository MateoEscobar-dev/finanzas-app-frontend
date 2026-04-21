import { AutenticacionService } from '@/app/services/autenticacion/autenticacion.service'
import { CommonModule } from '@angular/common'
import {
  AbstractControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms'
import { Component, inject, OnInit } from '@angular/core'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { AccountWrapperComponent } from '@auth/account-wrapper.component'
import Swal from 'sweetalert2'

function passwordMatchValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value
    const confirm = group.get('confirmPassword')?.value
    return password && confirm && password !== confirm
      ? { passwordMismatch: true }
      : null
  }
}

@Component({
  selector: 'app-reset-password',
  imports: [
    CommonModule,
    AccountWrapperComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './reset-password.component.html',
  styles: `
    .finance-input {
      border-radius: 8px;
      border: 1.5px solid #e2e8f0;
      background: #f8fafc;
      color: #0f172a;
      transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;

      &:focus {
        background: #ffffff;
        border-color: #10b981;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.12);
      }
    }

    .finance-toggle-btn {
      border-radius: 0 8px 8px 0;
      border-color: #e2e8f0;
      background: #f8fafc;
      color: #94a3b8;

      &:hover {
        background-color: #f1f5f9;
        color: #059669;
        border-color: #10b981;
      }
    }

    .finance-btn {
      background: #10b981;
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.95rem;
      letter-spacing: 0.2px;
      transition: background 0.2s ease, box-shadow 0.2s ease;

      &:hover:not(:disabled) {
        background: #059669;
        box-shadow: 0 4px 16px rgba(16, 185, 129, 0.3);
        color: #ffffff;
      }

      &:disabled {
        opacity: 0.65;
      }
    }

    .finance-link {
      color: #059669;
      text-decoration: none;
      font-weight: 500;

      &:hover {
        color: #047857;
        text-decoration: underline;
      }
    }
  `,
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup
  formSubmitted = false
  showPassword = false
  showConfirmPassword = false
  isLoading = false
  tokenInvalido = false

  private fb = inject(NonNullableFormBuilder)
  private autenticacionService = inject(AutenticacionService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  private token = ''
  private email = ''

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? ''
    this.email = this.route.snapshot.queryParamMap.get('email') ?? ''

    if (!this.token || !this.email) {
      this.tokenInvalido = true
    }

    this.resetForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: passwordMatchValidator() }
    )
  }

  get f() {
    return this.resetForm.controls
  }

  isInvalid(field: string): boolean {
    const ctrl = this.f[field]
    return this.formSubmitted && ctrl.invalid
  }

  onSubmit(): void {
    this.formSubmitted = true
    this.resetForm.markAllAsTouched()

    if (this.resetForm.invalid) {
      return
    }

    this.isLoading = true

    this.autenticacionService
      .restablecerContrasena({
        token: this.token,
        email: this.email,
        password: this.resetForm.getRawValue().password,
      })
      .subscribe({
        next: () => {
          this.isLoading = false
          Swal.fire({
            title: '¡Contraseña actualizada!',
            text: 'Tu contraseña ha sido restablecida exitosamente. Ya puedes iniciar sesión.',
            icon: 'success',
            confirmButtonText: 'Ir al login',
            confirmButtonColor: '#10b981',
          }).then(() => {
            this.router.navigate(['/login'])
          })
        },
        error: () => {
          this.isLoading = false
          Swal.fire({
            title: 'Error al restablecer',
            text: 'El enlace puede haber expirado o ser inválido. Solicita uno nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#10b981',
          })
        },
      })
  }
}
