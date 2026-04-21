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
import { Router, RouterModule } from '@angular/router'
import { AccountWrapperComponent } from '@auth/account-wrapper.component'
import { TranslateModule } from '@ngx-translate/core'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-two-factor',
  imports: [
    CommonModule,
    AccountWrapperComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './two-factor.component.html',
  styles: `
    .finance-input {
      border-radius: 8px;
      border: 1.5px solid #e2e8f0;
      background: #f8fafc;
      color: #0f172a;
      text-align: center;
      font-size: 1.6rem;
      letter-spacing: 0.4rem;
      font-weight: 600;
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
export class TwoFactorComponent implements OnInit {
  twoFactorForm!: FormGroup
  formSubmitted = false
  isLoading = false

  private fb = inject(NonNullableFormBuilder)
  private autenticacionService = inject(AutenticacionService)
  private router = inject(Router)

  ngOnInit(): void {
    this.twoFactorForm = this.fb.group({
      code: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.pattern(/^\d{6}$/),
        ],
      ],
    })
  }

  isInvalid(field: string): boolean {
    const ctrl = this.twoFactorForm.controls[field]
    return this.formSubmitted && ctrl.invalid
  }

  onSubmit(): void {
    this.formSubmitted = true
    this.twoFactorForm.markAllAsTouched()

    if (this.twoFactorForm.invalid) {
      return
    }

    this.isLoading = true

    this.autenticacionService
      .verificar2FA(this.twoFactorForm.getRawValue())
      .subscribe({
        next: () => {
          this.isLoading = false
          this.router.navigate(['/app'])
        },
        error: () => {
          this.isLoading = false
          Swal.fire({
            title: 'Código inválido',
            text: 'El código ingresado no es válido o ha expirado. Verifica tu aplicación de autenticación.',
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo',
            confirmButtonColor: '#10b981',
          })
          this.twoFactorForm.reset()
          this.formSubmitted = false
        },
      })
  }
}
