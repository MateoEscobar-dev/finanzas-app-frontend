import { createFeatureSelector, createSelector } from '@ngrx/store'
import { ProjectState } from './project-reducers'

export const selectDataState = createFeatureSelector<ProjectState>('Project')

export const getprojects = createSelector(
  selectDataState,
  (state: ProjectState) => state.projects
)
