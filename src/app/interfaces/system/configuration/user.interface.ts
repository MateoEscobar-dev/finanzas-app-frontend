export interface IUser {
  id?: number;
  document?: string;
  first_name?: string;
  second_name?: string;
  first_last_name?: string;
  second_last_name?: string;
  address?: string;
  email?: string;
  phone?: string;
  phone_ext?: string;
  birth_day?: Date;
  password?: string;
  lang?: string;
  active?: boolean;
  imagen?: string;
  email_verified_at?: Date;
  last_notification?: number;
  remember_token?: string;
  created_at?: Date;
  updated_at?: Date;
}
