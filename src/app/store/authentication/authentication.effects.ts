import { Injectable, Inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import {
  map,
  switchMap,
  catchError,
  exhaustMap,
  tap,
  first,
} from 'rxjs/operators'
import { from, of } from 'rxjs'
import { AuthenticationService } from '@core/service/auth.service'
import {
  login,
  loginSuccess,
  loginFailure,
  logout,
  logoutSuccess,
  register,
  registerSuccess,
  registerFailure,
} from './authentication.actions'
import { ActivatedRoute, Router } from '@angular/router'

@Injectable()
export class AuthenticationEffects {
  Register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      exhaustMap(({ username, email, password }) => {
        return this.AuthenticationService.signup(
          username,
          email,
          password
        ).pipe(
          map((user) => {
            this.router.navigate(['/pages-login'])
            return registerSuccess({ user })
          }),
          catchError((error) => of(registerFailure({ error })))
        )
      })
    )
  )

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(({ email, password }) => {
        return this.AuthenticationService.login(email, password).pipe(
          map((user) => {
            if (user) {
              const returnUrl =
                this.route.snapshot.queryParams['returnUrl'] || '/'
              this.router.navigateByUrl(returnUrl)
            }
            return loginSuccess({ user })
          }),
          catchError((error) => of(loginFailure({ error })))
        )
      })
    )
  )

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      exhaustMap(() => {
        this.AuthenticationService.logout()
        this.router.navigate(['/pages-logout'])
        return of(logoutSuccess())
      })
    )
  )

  constructor(
    @Inject(Actions) private actions$: Actions,
    private AuthenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
}
