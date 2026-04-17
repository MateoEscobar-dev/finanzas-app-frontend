import { Route } from '@angular/router'
import { LoginComponent } from '@auth/login/login.component'
import { RegisterComponent } from './register/register.component'
// Component

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
]
