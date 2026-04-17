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
      width: 56px;
      height: 56px;
      border-radius: 16px;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
    }

    .finance-icon {
      font-size: 1.75rem;
      color: #ffffff;
    }

    .finance-title {
      color: #1a6b4b;
      letter-spacing: 0.3px;
    }

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
      color: #64748b;

      &:hover {
        background-color: #f1f5f9;
        color: #10b981;
      }
    }

    .finance-btn {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      letter-spacing: 0.3px;
      transition: transform 0.15s ease, box-shadow 0.15s ease;

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 20px rgba(16, 185, 129, 0.35);
        color: #ffffff;
      }

      &:active {
        transform: translateY(0);
      }
    }

    .finance-link {
      color: #10b981;
      text-decoration: none;

      &:hover {
        color: #059669;
        text-decoration: underline;
      }
    }
  `,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  formSubmitted = false
  showPassword = false
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
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      Swal.fire({
        title: 'Datos errados',
        text: 'Debe ingresar el Usuario y la clave',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      })
      return
    }

    const datos = this.loginForm.getRawValue()

    this.autenticacionService.inicioSesion(datos).subscribe({
      next: () => {
        this.router.navigate(['app'])
      },
      error: () => {
        Swal.fire({
          title: 'Acceso Negado',
          text: 'Usuario y/o contraseña incorrectos!',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        })
      },
    })
  }
}
