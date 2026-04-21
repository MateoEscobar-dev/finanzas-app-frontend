export interface IUser {
  id: number
  document?: string
  first_name: string
  second_name?: string
  first_last_name: string
  second_last_name?: string
  email: string
  password?: string
  phone?: string
  phone_ext?: string
  birth_day?: string
  lang?: string
  active: boolean | number
  roles?: ({ id: number; name: string } | string)[]
}
