import { KanbanTaskItem } from '@core/model/tasks.model'
import { createAction, props } from '@ngrx/store'

// Product
export const fetchKanbanList = createAction('[Order] Fetch Kanban List')
export const fetchKanbanListtSuccess = createAction(
  '[Order] Fetch Kanban List Success',
  props<{ kanban: KanbanTaskItem[] }>()
)
export const fetchKanbanListFailure = createAction(
  '[Data] Fetch Kanban List Failure',
  props<{ error: string }>()
)

// Add Task Data
export const addKanban = createAction(
  '[Data] Add Kanban',
  props<{ newData: KanbanTaskItem }>()
)
export const addKanbanSuccess = createAction(
  '[Data] Add Kanban Success',
  props<{ newData: KanbanTaskItem }>()
)
export const addKanbanFailure = createAction(
  '[Data] Add Kanban Failure',
  props<{ error: string }>()
)

// Update Kanban Data
export const updateKanban = createAction(
  '[Data] Update Kanban',
  props<{ updatedData: KanbanTaskItem }>()
)
export const updateKanbanSuccess = createAction(
  '[Data] Update Kanban Success',
  props<{ updatedData: KanbanTaskItem }>()
)
export const updateKanbanFailure = createAction(
  '[Data] Update Kanban Failure',
  props<{ error: string }>()
)

// Delete Kanban Data
export const deleteKanban = createAction(
  '[Data] Delete Kanban',
  props<{ id: string }>()
)
export const deleteKanbanSuccess = createAction(
  '[Data] Delete Kanban Success',
  props<{ id: string }>()
)
export const deleteKanbanFailure = createAction(
  '[Data] Delete Kanban Failure',
  props<{ error: string }>()
)
