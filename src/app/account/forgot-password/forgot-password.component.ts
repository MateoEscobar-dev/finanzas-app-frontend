import { AutenticacionService } from '@/app/services/autenticacion/autenticacion.service'
import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { RouterModule } from '@angular/router'
import { AccountWrapperComponent } from '@auth/account-wrapper.component'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-forgot-password',
  imports: [
    CommonModule,
    AccountWrapperComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './forgot-password.component.html',
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
export class ForgotPasswordComponent implements OnInit {
  forgotForm!: FormGroup
  formSubmitted = false
  isLoading = false

  private fb = inject(NonNullableFormBuilder)
  private autenticacionService = inject(AutenticacionService)

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  isInvalid(field: string): boolean {
    const ctrl = this.forgotForm.controls[field]
    return this.formSubmitted && ctrl.invalid
  }

  onSubmit(): void {
    this.formSubmitted = true
    this.forgotForm.markAllAsTouched()

    if (this.forgotForm.invalid) {
      return
    }

    this.isLoading = true

    this.autenticacionService
      .recuperarContrasena(this.forgotForm.getRawValue())
      .subscribe({
        next: () => {
          this.isLoading = false
          Swal.fire({
            title: 'Revisa tu correo',
            text: 'Si el correo está registrado, recibirás un enlace para restablecer tu contraseña en los próximos minutos.',
            icon: 'info',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#10b981',
          })
          this.forgotForm.reset()
          this.formSubmitted = false
        },
        error: () => {
          this.isLoading = false
          Swal.fire({
            title: 'Revisa tu correo',
            text: 'Si el correo está registrado, recibirás un enlace para restablecer tu contraseña en los próximos minutos.',
            icon: 'info',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#10b981',
          })
        },
      })
  }
}
