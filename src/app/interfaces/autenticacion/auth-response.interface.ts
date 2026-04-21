export interface IUser {
  id: number
  name: string | null
  email: string
  first_name: string
  second_name: string
  first_last_name: string
  second_last_name: string
  phone: string
  active: number
  imagen: string | null
  roles: string[]
  permissions: string[]
  lang?: string
}

export interface IAuthData {
  success: boolean
  token: string
  token_type: string
  abilities: string[]
  user: IUser
  requires_2fa?: boolean
}

export interface IAuthResponse {
  status: string
  message: string
  data: IAuthData
  pagination: boolean
  errors: string | null
  code: number
}

export interface ISessionData {
  token: string
  token_type: string
  user: IUser
  permissions: string[]
  roles: string[]
  abilities: string[]
}
