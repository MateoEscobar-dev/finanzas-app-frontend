export interface IRole {
  id: number
  name: string
  description?: string
  active: boolean
  permissions?: Record<string, string[]>
  permissions_count?: number
}
