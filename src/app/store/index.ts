import { ActionReducerMap } from '@ngrx/store'
import { LayoutState, layoutReducer } from './layout/layout-reducers'
import { CalendarState, calendarReducer } from './calendar/calendar.reducer'
import { CRMReducer, CRMState } from './crm/crm.reducer'
import { EcommerceReducer, EcommerceState } from './ecommerce/ecommerce.reducer'
import { ProjectReducer, ProjectState } from './projects/project-reducers'
import { TaskReducer, TaskState } from './tasks/task-reducers'
import {
  AuthenticationState,
  authenticationReducer,
} from './authentication/authentication.reducer'

export type RootReducerState = {
  authentication: AuthenticationState
  layout: LayoutState
  Calendar: CalendarState
  CRM: CRMState
  Ecommerce: EcommerceState
  Project: ProjectState
  Task: TaskState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  authentication: authenticationReducer,
  layout: layoutReducer,
  Calendar: calendarReducer,
  CRM: CRMReducer,
  Ecommerce: EcommerceReducer,
  Project: ProjectReducer,
  Task: TaskReducer,
}
