import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AutenticacionService } from '../autenticacion/autenticacion.service'

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AutenticacionService)
  const router = inject(Router)

  if (authService.currentUserValue) {
    return true
  }

  // redirección segura
  return router.createUrlTree(['/login'], {
    queryParams: {
      returnUrl: state.url === '/' ? null : state.url,
    },
    queryParamsHandling: 'merge',
  })
}
