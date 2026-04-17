import { AutenticacionService } from '@/app/services/autenticacion/autenticacion.service'
import { environment } from '@/environments/environment'
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
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    AccountWrapperComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styles: `
    .finance-icon-wrapper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: #ecfdf5;
      border: 2px solid #d1fae5;
    }

    .finance-icon {
      font-size: 1.5rem;
      color: #059669;
    }

    .finance-title {
      color: #0f172a;
      letter-spacing: -0.2px;
    }

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

      &:hover {
        background: #059669;
        box-shadow: 0 4px 16px rgba(16, 185, 129, 0.3);
        color: #ffffff;
      }

      &:active {
        background: #047857;
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
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  formSubmitted = false
  showPassword = false
  isLoading = false
  appTitle = environment.appTitle
  appDescription = environment.appDescription

  autenticacionService = inject(AutenticacionService)
  router = inject(Router)

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  isInvalid(field: string): boolean {
    const ctrl = this.loginForm.controls[field]
    return this.formSubmitted && ctrl.invalid
  }

  onSubmit(): void {
    this.formSubmitted = true
    this.loginForm.markAllAsTouched()

    if (!this.loginForm.valid) {
      return
    }

    this.isLoading = true
    const datos = this.loginForm.getRawValue()

    this.autenticacionService.inicioSesion(datos).subscribe({
      next: () => {
        this.isLoading = false
        this.router.navigate(['app'])
      },
      error: () => {
        this.isLoading = false
        Swal.fire({
          title: 'Acceso Negado',
          text: 'Usuario y/o contraseña incorrectos.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#10b981',
        })
      },
    })
  }
}
