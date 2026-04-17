export interface IServerOS {
  id?: number
  name?: string
  slug?: string
  description?: string
  active?: boolean
  created_at?: Date
  updated_at?: Date
}

export interface IServerEnvironment {
  id?: number
  name?: string
  slug?: string
  description?: string
  active?: boolean
  created_at?: Date
  updated_at?: Date
}

export interface IServer {
  id?: number
  name?: string
  ip?: string
  username?: string
  password?: string
  default_root?: string
  port?: number
  server_os_id?: number
  server_environment_id?: number
  domain?: string
  email?: string
  service_status?: 'active' | 'inactive' | 'paused'
  description?: string
  active?: boolean
  last_connection?: Date
  notes?: string
  os?: IServerOS
  environment?: IServerEnvironment
  created_at?: Date
  updated_at?: Date
  change_domain?: boolean
  install?: boolean,
  program?: boolean
  program_id?: number
  app_name?: string
  app_env?: string
  app_key?: string
  app_debug?: boolean
  app_url?: string
  telegram_bot_token?: string
  telegram_chat_ids?: string
}

// =========================================
// INTERFACES PARA ACCIONES PERSONALIZADAS
// =========================================

export interface IBaseActionRequest {
  operationId: string
}

export interface IValidateStatusRequest extends IBaseActionRequest {}

export interface IInstallRequest extends IBaseActionRequest {
  domain: string
  email: string
}

export interface IAddProgramRequest extends IBaseActionRequest {
  programId: number
}

export interface IChangeDomainRequest extends IBaseActionRequest {
  newDomain: string
}

export interface IDeactivateServiceRequest extends IBaseActionRequest {}

export interface IActivateServiceRequest extends IBaseActionRequest {}

export interface IProgram {
  id: number
  name: string
  description?: string
  version?: string
}

// Respuesta genérica para acciones
export interface IActionResponse {
  success: boolean
  message?: string
  operationId: string
}
