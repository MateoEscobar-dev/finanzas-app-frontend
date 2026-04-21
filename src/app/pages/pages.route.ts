import { Route } from '@angular/router'
import { IndexComponent } from './dashboard/index/index.component'
import { UsersComponent } from './system/configuration/users/users.component'
import { RolesComponent } from './permissions/roles/roles.component'
import { PermissionsComponent } from './system/configuration/permissions/permissions.component'

export const PAGE_ROUTES: Route[] = [
  { path: '', component: IndexComponent, data: { title: 'Dashboard' } },
  {
    path: 'dashboard',
    component: IndexComponent,
    data: { title: 'Analytics' },
  },
  // Permisos y roles
  {
    path: 'roles',
    component: RolesComponent,
    data: { title: 'Roles' },
  },
  {
    path: 'permissions',
    component: PermissionsComponent,
    data: { title: 'Permissions' },
  },
  // Sistema - Configuración
  {
    path: 'users',
    component: UsersComponent,
    data: { title: 'Users' },
  },
]
