import { Injectable } from '@angular/core'
import { of } from 'rxjs'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, mergeMap, tap } from 'rxjs/operators'

// Action
import { CrudService } from '@core/service/crud.service'
import {
  fetchProjectList,
  fetchProjectListFailure,
  fetchProjectListSuccess,
} from './project-action'

@Injectable()
export class ProjectEffects {
  // Product
  fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchProjectList),
      mergeMap(() =>
        this.CrudService.fetchproject().pipe(
          map((projects) => fetchProjectListSuccess({ projects })),
          catchError((error) => of(fetchProjectListFailure({ error })))
        )
      )
    )
  )

  constructor(
    private actions$: Actions,
    private CrudService: CrudService
  ) {}
}
