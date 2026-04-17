import { User } from '@core/model/auth.models'
import { createAction, props } from '@ngrx/store'

// Register action
export const register = createAction(
  '[Authentication] Register',
  props<{ username: string; email: string; password: string }>()
)
export const registerSuccess = createAction(
  '[Authentication] Register Success',
  props<{ user: User }>()
)
export const registerFailure = createAction(
  '[Authentication] Register Failure',
  props<{ error: string }>()
)

// login action
export const login = createAction(
  '[Authentication] Login',
  props<{ email: string; password: string }>()
)
export const loginSuccess = createAction(
  '[Authentication] Login Success',
  props<{ user: User }>()
)
export const loginFailure = createAction(
  '[Authentication] Login Failure',
  props<{ error: string }>()
)

// logout action
export const logout = createAction('[Authentication] Logout')

export const logoutSuccess = createAction('[Auth] Logout Success')
