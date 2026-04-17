import { Injectable } from '@angular/core'
import { of } from 'rxjs'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, tap } from 'rxjs/operators'

// Action
import { CrudService } from '@core/service/crud.service'
import {
  addKanban,
  addKanbanFailure,
  addKanbanSuccess,
  fetchKanbanList,
  fetchKanbanListFailure,
  fetchKanbanListtSuccess,
  updateKanban,
  updateKanbanFailure,
  updateKanbanSuccess,
} from './task-action'

@Injectable()
export class TaskEffects {
  // Kanbad
  fetchKanbanData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchKanbanList),
      mergeMap(() =>
        this.CrudService.fetchkanbantask().pipe(
          map((kanban) => fetchKanbanListtSuccess({ kanban })),
          catchError((error) => of(fetchKanbanListFailure({ error })))
        )
      )
    )
  )

  addKanban$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addKanban),
      mergeMap(({ newData }) =>
        this.CrudService.addkanbantask(newData).pipe(
          map(() => addKanbanSuccess({ newData })),
          catchError((error) => of(addKanbanFailure({ error })))
        )
      )
    )
  )

  updateKanbaData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateKanban),
      mergeMap(({ updatedData }) =>
        this.CrudService.updatekanbantask(updatedData).pipe(
          map(() => updateKanbanSuccess({ updatedData })),
          catchError((error) => of(updateKanbanFailure({ error })))
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private CrudService: CrudService
  ) {}
}
