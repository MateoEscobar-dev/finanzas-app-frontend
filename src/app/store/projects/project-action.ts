import { Project } from '@core/model/project.model'
import { createAction, props } from '@ngrx/store'

// Product
export const fetchProjectList = createAction('[Order] Fetch Project List')
export const fetchProjectListSuccess = createAction(
  '[Order] Fetch Project List Success',
  props<{ projects: Project[] }>()
)
export const fetchProjectListFailure = createAction(
  '[Data] Fetch Project List Failure',
  props<{ error: string }>()
)
