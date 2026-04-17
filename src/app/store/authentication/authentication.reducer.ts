import { createReducer, on } from '@ngrx/store'
import {
  register,
  registerFailure,
  registerSuccess,
  login,
  loginFailure,
  loginSuccess,
  logout,
} from './authentication.actions'
import { User } from '@core/model/auth.models'

export interface AuthenticationState {
  isLoggedIn: boolean
  user: User | null
  error: string | null
}

const initialState: AuthenticationState = {
  isLoggedIn: false,
  user: null,
  error: null,
}

export const authenticationReducer = createReducer(
  initialState,
  on(register, (state) => ({ ...state, error: null })),
  on(registerSuccess, (state, { user }) => ({
    ...state,
    isLoggedIn: true,
    user,
    error: null,
  })),
  on(registerFailure, (state, { error }) => ({ ...state, error })),

  on(login, (state) => ({ ...state, error: null })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    isLoggedIn: true,
    user,
    error: null,
  })),
  on(loginFailure, (state, { error }) => ({ ...state, error })),
  on(logout, (state) => ({ ...state, user: null }))
)
