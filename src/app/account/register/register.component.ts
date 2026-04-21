import { AutenticacionService } from '@/app/services/autenticacion/autenticacion.service'
import { environment } from '@/environments/environment'
import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
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
import { Router, RouterModule } from '@angular/router'
import { AccountWrapperComponent } from '@auth/account-wrapper.component'
import { TranslateModule } from '@ngx-translate/core'
import Swal from 'sweetalert2'

function ageValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null
    const birthDate = new Date(control.value)
    if (isNaN(birthDate.getTime())) return { invalidDate: true }
    const today = new Date()
    if (birthDate > today) return { futureDate: true }
    const yearDiff = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    const dayDiff = today.getDate() - birthDate.getDate()
    const hasHadBirthday = monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)
    const age = hasHadBirthday ? yearDiff : yearDiff - 1
    if (age < minAge) return { underage: { required: minAge, actual: age } }
    return null
  }
}

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    AccountWrapperComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './register.component.html',
  styles: `
    .finance-input {
      border-radius: 8px;
      border: 1.5px solid #e2e8f0;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;

      &:focus {
        border-color: #10b981;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
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
      transition: background 0.2s ease, box-shadow 0.2s ease;

      &:hover:not(:disabled) {
        background: #059669;
        box-shadow: 0 4px 16px rgba(16, 185, 129, 0.28);
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

    .section-title {
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #94a3b8;
      padding-bottom: 6px;
      border-bottom: 1px solid #f1f5f9;
    }
  `,
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup
  formSubmitted = false
  showPassword = false
  isLoading = false
  appTitle = environment.appTitle
  maxBirthDate = ''

  private fb = inject(NonNullableFormBuilder)
  private autenticacionService = inject(AutenticacionService)
  private router = inject(Router)

  ngOnInit(): void {
    // Fecha máxima: hoy - 15 años
    const today = new Date()
    today.setFullYear(today.getFullYear() - 15)
    this.maxBirthDate = today.toISOString().split('T')[0]

    this.registerForm = this.fb.group({
      document: ['', [Validators.required, Validators.minLength(4)]],
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      second_name: [''],
      first_last_name: ['', [Validators.required, Validators.minLength(2)]],
      second_last_name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone: [''],
      phone_ext: [''],
      birth_day: ['', [Validators.required, ageValidator(15)]],
    })
  }

  get f() {
    return this.registerForm.controls
  }

  isInvalid(field: string): boolean {
    const ctrl = this.f[field]
    return this.formSubmitted && ctrl.invalid
  }

  onSubmit(): void {
    this.formSubmitted = true
    this.registerForm.markAllAsTouched()

    if (this.registerForm.invalid) {
      return
    }

    this.isLoading = true
    const raw = this.registerForm.getRawValue()

    this.autenticacionService
      .registrarUsuario({
        document: raw['document'],
        first_name: raw['first_name'],
        second_name: raw['second_name'] || undefined,
        first_last_name: raw['first_last_name'],
        second_last_name: raw['second_last_name'] || undefined,
        email: raw['email'],
        password: raw['password'],
        phone: raw['phone'] || undefined,
        phone_ext: raw['phone_ext'] || undefined,
        birth_day: raw['birth_day'],
      })
      .subscribe({
        next: () => {
          this.isLoading = false
          Swal.fire({
            title: '¡Registro exitoso!',
            text: 'Tu cuenta ha sido creada. Ahora puedes iniciar sesión.',
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
            title: 'Error al registrarse',
            text: 'No fue posible crear la cuenta. Intenta de nuevo.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#10b981',
          })
        },
      })
  }
}

