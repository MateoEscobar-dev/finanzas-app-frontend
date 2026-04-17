import { Route } from '@angular/router'
import { IndexComponent } from './dashboard/index/index.component'

export const PAGE_ROUTES: Route[] = [
  { path: '', component: IndexComponent, data: { title: 'Dashboard' } },
  {
    path: 'dashboard',
    component: IndexComponent,
    data: { title: 'Analytics' },
  },
]
