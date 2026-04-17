import { Route } from '@angular/router'
import { IndexComponent } from './dashboard/index/index.component'
import { RolesComponent } from './permissions/roles/roles.component'
import { UsersComponent } from './system/configuration/users/users.component'
import { ServersComponent } from './orchestration/servers/servers.component'


export const PAGE_ROUTES: Route[] = [
  // Dashboard
  { path: '', component: IndexComponent, data: { title: 'Dashboard' } },
  {
    path: 'dashboard',
    component: IndexComponent,
    data: { title: 'Analytics' },
  },
  // permisos
  {
    path: 'roles',
    component: RolesComponent,
    data: { title: 'Roles' },
  },
  // Sistema
  {
    path: 'users',
    component: UsersComponent,
    data: { title: 'Users' },
  },
  // Orquestación
  {
    path: 'servers',
    component: ServersComponent,
    data: { title: 'Servers' },
  },
]
