import { createFeatureSelector, createSelector } from '@ngrx/store'
import { TaskState } from './task-reducers'

export const selectDataState = createFeatureSelector<TaskState>('Task')

export const getkanbanData = createSelector(
  selectDataState,
  (state: TaskState) => state.kanban
)
