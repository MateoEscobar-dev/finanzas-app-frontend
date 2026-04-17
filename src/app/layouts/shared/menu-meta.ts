import { MenuItem } from './models/menu.model'

export const MENU: MenuItem[] = [
  {
    key: 'navigation',
    label: 'navigation',
    isTitle: true,
  },
  {
    key: 'dashboard',
    icon: 'uil-home-alt',
    label: 'Dashboard',
    link: '/app/dashboard',
  },
]

export const HORIZONTAL_MENU: MenuItem[] = [
  {
    key: 'dashboard',
    icon: 'uil-dashboard',
    label: 'Dashboard',
    link: '/app/dashboard',
  },
]
