import { createReducer, on, Action } from '@ngrx/store'
import {
  addKanbanSuccess,
  fetchKanbanList,
  fetchKanbanListtSuccess,
  updateKanbanSuccess,
} from './task-action'
import { KanbanTaskItem } from '@core/model/tasks.model'

export type TaskState = {
  kanban: KanbanTaskItem[]
}

export const initialState: TaskState = {
  kanban: [],
}

export const TaskReducer = createReducer(
  initialState,
  on(fetchKanbanList, (state) => {
    return { ...state }
  }),
  on(fetchKanbanListtSuccess, (state, { kanban }) => {
    return { ...state, kanban }
  }),

  on(addKanbanSuccess, (state, { newData }) => {
    return { ...state, kanban: [...state.kanban, newData], error: null }
  }),

  on(updateKanbanSuccess, (state, { updatedData }) => {
    return {
      ...state,
      Kanban: state.kanban.map((kanban) =>
        kanban.id === updatedData.id ? updatedData : kanban
      ),
      error: null,
    }
  })
)

// Selector
export function reducer(state: TaskState | undefined, action: Action) {
  return TaskReducer(state, action)
}
