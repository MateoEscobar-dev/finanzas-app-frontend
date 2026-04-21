export interface IForgotPassword {
  email: string
}

export interface IResetPassword {
  token: string
  email: string
  password: string
}
