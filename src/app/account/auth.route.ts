import { Route } from '@angular/router'
import { LoginComponent } from '@auth/login/login.component'
import { RegisterComponent } from './register/register.component'
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'
import { ResetPasswordComponent } from './reset-password/reset-password.component'
import { TwoFactorComponent } from './two-factor/two-factor.component'

export const AUTH_ROUTES: Route[] = [
  {
    path: '',
    component: LoginComponent,
    data: { title: 'Iniciar sesión' },
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Iniciar sesión' },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Registro de Usuario' },
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: { title: 'Recuperar contraseña' },
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: { title: 'Restablecer contraseña' },
  },
  {
    path: '2fa/verify',
    component: TwoFactorComponent,
    data: { title: 'Verificación en dos pasos' },
  },
]
