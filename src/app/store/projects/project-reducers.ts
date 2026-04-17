import { createReducer, on, Action } from '@ngrx/store'
import { fetchProjectList, fetchProjectListSuccess } from './project-action'
import { Project } from '@core/model/project.model'

export type ProjectState = {
  projects: Project[]
}

export const initialState: ProjectState = {
  projects: [],
}

export const ProjectReducer = createReducer(
  initialState,
  on(fetchProjectList, (state) => {
    return { ...state }
  }),
  on(fetchProjectListSuccess, (state, { projects }) => {
    return { ...state, projects }
  })
)

// Selector
export function reducer(state: ProjectState | undefined, action: Action) {
  return ProjectReducer(state, action)
}
