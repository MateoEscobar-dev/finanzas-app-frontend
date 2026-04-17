import { Routes } from '@angular/router'
import { PrivateLayoutComponent } from './layouts/private-layout/private-layout.component'
import { authGuard } from './services/autenticacion/auth.guard'

export const routes: Routes = [
  {
    path: 'app',
    component: PrivateLayoutComponent,
    loadChildren: () =>
      import('./pages/pages.route').then((mod) => mod.PAGE_ROUTES),
    canActivate: [authGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('./account/auth.route').then((mod) => mod.AUTH_ROUTES),
  },
]
