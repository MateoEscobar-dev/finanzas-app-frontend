import { ILogin } from '@/app/interfaces/autenticacion/login.interface'
import { AutenticacionService } from '@/app/services/autenticacion/autenticacion.service'
import { environment } from '@/environments/environment'
import { CommonModule } from '@angular/common'
import { Component, inject, ViewChild } from '@angular/core'
import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { AccountWrapperComponent } from '@auth/account-wrapper.component'
import { AuthenticationService } from '@core/service/auth.service'
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
    .captcha-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 25px 0;
    }
  `,
})
export class LoginComponent {
  loginForm!: FormGroup
  formSubmitted: boolean = false
  showPassword: boolean = false

  autenticacionService = inject(AutenticacionService)
  router = inject(Router)

  constructor(
    private authenticationService: AuthenticationService,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm()
    // this.loginForm = this.fb.group({
    //   company: ['SCMChannel', Validators.required],
    //   email: ['hyper@coderthemes.com', [Validators.required, Validators.email]],
    //   password: ['Hyper', Validators.required],
    // })
  }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  onSubmit(): void {
    try {
      const datos = this.loginForm.getRawValue()

      if (!this.loginForm.valid) {
        const recaptchaControl = this.loginForm.get('recaptchaToken')

        Swal.fire({
          title: 'Datos errados',
          text: 'Debe ingresar el Usuario y la clave',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        })

        return
      }

      this.autenticacionService.inicioSesion<ILogin>(datos).subscribe({
        next: (data) => {
          console.log("Login:", data);
          this.router.navigate(['app'])
        },
        error: (err) => {
          console.error(err)
          Swal.fire({
            title: 'Acceso Negado',
            text: 'Usuario y/o contraseña incorrectos!',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          })
        },
      })
    } catch (error) {
      console.error('Error en el inicio de sesión:', error)
      return
    }
  }
}
