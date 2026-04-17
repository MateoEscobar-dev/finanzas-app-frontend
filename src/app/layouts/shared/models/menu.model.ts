export type MenuItem = {
  id?: number
  key?: string
  label?: string
  icon?: string
  link?: string
  collapsed?: boolean
  subMenu?: MenuItem[]
  isTitle?: boolean
  badge?: {
    variant: string
    text: string
  }
  parentKey?: string
}
